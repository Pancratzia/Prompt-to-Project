export type Language = "en" | "es";
export type CycleType = "focus" | "break";
export type TimerStatus = "idle" | "running" | "paused";

export interface VideoInput {
  videoId: string;
  url: string;
  title: string;
  durationSeconds: number;
}

export interface SavedVideo extends VideoInput {
  id: number;
  planId: number;
  savedPositionSeconds: number;
  completed: boolean;
  sortOrder: number;
}

export interface DailyPlan {
  id: number;
  date: string;
  plannedPomodoros: number;
  focusMinutes: number;
  breakMinutes: number;
  requiredBreakSeconds: number;
  videos: SavedVideo[];
}

export interface CycleRecord {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  cycleType: CycleType;
  taskDescription: string;
  energyBefore: number | null;
  focusAfter: number | null;
  completed: boolean;
  canceled: boolean;
  videoId: string | null;
  timestampStartSeconds: number;
  timestampEndSeconds: number;
  durationSeconds: number;
}

export interface Metrics {
  completedPomodoros: number;
  totalFocusSeconds: number;
  totalBreakSeconds: number;
  completionRate: number;
  averageEnergy: number;
  averageFocus: number;
  totalVideoSeconds: number;
  adaptation: {
    suggestFocusMinutes: number | null;
    suggestBreakMinutes: number | null;
  };
}
