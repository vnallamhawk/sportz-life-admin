export const ASSESSMENT_MODE = ["recurring", "one_time"] as const;

export const ASSESSMENT_INTERVAL = ["weekly", "monthly"] as const;

export const ASSESSMENT_STATUS = [
    "ongoing",
    "completed",
    "upcoming"
] as const;