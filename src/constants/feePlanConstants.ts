import type { FEE_PLAN_TABLE_ID } from "~/types/feePlan";


export const FEE_PLAN_TABLE_HEADER: Array<{label:string,id: FEE_PLAN_TABLE_ID}> = [
  { label: "Fee Plan Name", id: "name" },
  { label: "Fee Type", id: "feeType" },
  { label: "Fee Amt.", id: "amount" },
  { label: "Status", id: "status" },
  { label: "Action", id: "action" },
] as const;