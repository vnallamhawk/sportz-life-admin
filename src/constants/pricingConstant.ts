import type { FeePlans_feeType, FeePlans_lateFeeType, FeePlans_recurringType } from "@prisma/client";

export const PRICING_TABLE_HEADER = [
  { label: "Fee Plan Name", id: "name" },
  { label: "Fee Type", id: "feeType" },
  { label: "Fee Amt.", id: "amount" },
  { label: "Status", id: "status" },
  { label: "Action", id: "action" },
];


export const PLANNING_FEE_TYPE: Record<FeePlans_feeType,string> = {
  "one_time": "One Time",
  "recurring": "Recurring",
  "free": "Free"
}


export const PLANNING_FEE_TYPE_OPTIONS = [
  { value: "one_time", label: "One Time" },
  { value: "recurring", label: "Recurring" },
  { value: "free", label: "Free" },
];

export const PLANNING_RECURRING_OPTIONS:{value: FeePlans_recurringType ,label: string}[] = [
  { value: "Bi_Monthly", label: "Bi-Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Half_Yearly", label: "Half Yearly" },
  { value: "Annually", label: "Annually" },
];

export const LATE_FEE_TYPE_OPTION : {value: FeePlans_lateFeeType, label:string}[] =  [
  {value: 'amount', label: 'Amount'},
  {value: 'percentage', label: 'Percentage'},
]
