export const FEE_PLAN_FEE_TYPE = ["free", "one_time", "recurring"] as const;

export const FEE_PLAN_RECURRING_TYPE = [
  "bi_monthly",
  "quarterly",
  "half_yearly",
  "annually",
] as const;

export const LATE_FEE_TYPE = [
  "amount",
  "percentage"
] as const;
