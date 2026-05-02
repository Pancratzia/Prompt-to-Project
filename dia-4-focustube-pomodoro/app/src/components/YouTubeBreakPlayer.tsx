import { useEffect, useRef, useState } from "react";
import type { SavedVideo } from "../types";

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events: {
            onReady: (event: { target: YouTubePlayer }) => void;
            onStateChange: (event: { data: number; target: YouTubePlayer }) => void;
            onError: () => void;
          };
        }
      ) => YouTubePlayer;
      PlayerState: { ENDED: number; CUED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export interface YouTubePlayer {
  cueVideoById: (videoId: string) => void;
  loadVideoById: (options: { videoId: string; startSeconds?: number }) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface Props {
  activeVideo: SavedVideo | null;
  shouldPlay: boolean;
  onReady: (player: YouTubePlayer) => void;
  onEnded: () => void;
  onError: () => void;
}

let apiPromise: Promise<void> | null = null;

export function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      window.onYouTubeIframeAPIReady = () => resolve();
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    });
  }
  return apiPromise;
}

export function YouTubeBreakPlayer({ activeVideo, shouldPlay, onReady, onEnded, onError }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [ready, setReady] = useState(false);
  const activeVideoRef = useRef(activeVideo);

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  useEffect(() => {
    let disposed = false;
    loadYouTubeApi().then(() => {
      if (disposed || !activeVideo || playerRef.current || !hostRef.current) return;
      playerRef.current = new window.YT!.Player(hostRef.current, {
        videoId: activeVideo.videoId,
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
          rel: 0,
          modestbranding: 1,
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            if (!activeVideoRef.current) return;
            setReady(true);
            event.target.seekTo(activeVideoRef.current.savedPositionSeconds, true);
            onReady(event.target);
          },
          onStateChange: (event) => {
            if (event.data === window.YT!.PlayerState.ENDED) onEnded();
          },
          onError
        }
      });
    });

    return () => {
      disposed = true;
      try {
        playerRef.current?.pauseVideo();
      } catch {
        // The YouTube iframe can already be gone during fast route/dev reload teardown.
      }
    };
  }, []);

  useEffect(() => {
    if (!ready || !playerRef.current || !activeVideo) return;
    playerRef.current.loadVideoById({
      videoId: activeVideo.videoId,
      startSeconds: Math.floor(activeVideo.savedPositionSeconds)
    });
  }, [activeVideo?.id, ready]);

  useEffect(() => {
    if (!ready || !playerRef.current) return;
    if (shouldPlay) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [shouldPlay, ready, activeVideo?.id]);

  return <div ref={hostRef} className="youtube-frame" />;
}
