import type { FeePlans} from "@prisma/client";
import { FeePlans_recurringType } from "@prisma/client";

export const FEE_PLAN_FEE_TYPE = ["free", "one_time", "recurring"] as const;

export const FEE_PLAN_RECURRING_TYPE = [
  FeePlans_recurringType.Bi_Monthly,
  FeePlans_recurringType.Quarterly,
  FeePlans_recurringType.Half_Yearly,
  FeePlans_recurringType.Annually,
] as const;

export const LATE_FEE_TYPE = [
  "amount",
  "percentage"
] as const;

export type FEE_PLAN_ID = 'feeType'|'isFractionalFee'|'status'|'amount'

export type FEE_PLAN_TABLE = Pick<FeePlans, 'feeType'|'isFractionalFee'|'status'|'amount'|'id'>

export type FEE_PLAN_TABLE_ID = FEE_PLAN_ID | 'action'



