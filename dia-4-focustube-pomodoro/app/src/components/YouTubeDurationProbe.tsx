import { useEffect, useRef } from "react";
import { loadYouTubeApi, type YouTubePlayer } from "./YouTubeBreakPlayer";
import type { VideoInput } from "../types";

interface Props {
  videos: VideoInput[];
  onResolved: (videoId: string, durationSeconds: number) => void;
  onUnavailable: (videoId: string) => void;
}

export function YouTubeDurationProbe({ videos, onResolved, onUnavailable }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const queueRef = useRef<string[]>([]);
  const activeRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const attemptsRef = useRef(0);

  useEffect(() => {
    queueRef.current = videos.filter((video) => video.durationSeconds <= 0).map((video) => video.videoId);
    void bootAndProbe();

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videos.map((video) => `${video.videoId}:${video.durationSeconds}`).join("|")]);

  async function bootAndProbe() {
    if (!queueRef.current.length) return;
    await loadYouTubeApi();
    if (!hostRef.current) return;

    if (!playerRef.current) {
      const firstVideoId = queueRef.current[0];
      activeRef.current = firstVideoId;
      playerRef.current = new window.YT!.Player(hostRef.current, {
        videoId: firstVideoId,
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
          rel: 0,
          modestbranding: 1,
          playsinline: 1
        },
        events: {
          onReady: () => scheduleDurationRead(),
          onStateChange: (event) => {
            if (event.data === window.YT!.PlayerState.CUED) scheduleDurationRead();
          },
          onError: () => {
            if (activeRef.current) onUnavailable(activeRef.current);
            probeNext();
          }
        }
      });
      return;
    }

    probeNext();
  }

  function scheduleDurationRead() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      const currentVideoId = activeRef.current;
      const duration = Math.round(playerRef.current?.getDuration() || 0);
      if (!currentVideoId) return;

      if (duration > 0) {
        onResolved(currentVideoId, duration);
      } else if (attemptsRef.current < 8) {
        attemptsRef.current += 1;
        scheduleDurationRead();
        return;
      } else {
        onUnavailable(currentVideoId);
      }
      probeNext();
    }, 600);
  }

  function probeNext() {
    const remaining = queueRef.current.filter((videoId) => videoId !== activeRef.current);
    queueRef.current = remaining;
    const nextVideoId = remaining[0];
    activeRef.current = nextVideoId ?? null;
    attemptsRef.current = 0;
    if (nextVideoId && playerRef.current) {
      playerRef.current.cueVideoById(nextVideoId);
      scheduleDurationRead();
    }
  }

  return <div ref={hostRef} className="duration-probe" aria-hidden="true" />;
}
