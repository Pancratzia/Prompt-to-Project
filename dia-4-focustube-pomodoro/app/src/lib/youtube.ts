import type { SavedVideo, VideoInput } from "../types";

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.replace("/", "") || null;
    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) return parsed.pathname.split("/")[2] || null;
      if (parsed.pathname.startsWith("/embed/")) return parsed.pathname.split("/")[2] || null;
      return parsed.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

export function buildQueuedVideo(url: string, index: number): VideoInput | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  return {
    videoId,
    url,
    title: `YouTube ${index + 1}`,
    durationSeconds: 0
  };
}

export function getNextPlayableVideo(videos: SavedVideo[]): SavedVideo | null {
  return videos.find((video) => !video.completed && video.savedPositionSeconds < video.durationSeconds - 3) ?? null;
}

export function secondsToClock(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function secondsToHoursMinutes(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.round((safeSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function videoSuggestionKey(energy: number): "low" | "mid" | "high" {
  if (energy <= 2) return "low";
  if (energy === 3) return "mid";
  return "high";
}
