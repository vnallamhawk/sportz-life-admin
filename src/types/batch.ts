import { type Pattern, type Rules } from "./rules";
import { MultiSelectOption } from "./select";

export interface BatchTableData {
  centerName: string;
  centerId?: number;
  batchName: string;
  batchIds: number[];
}
export const InputType = ["textbox", "select", "calendar"] as const;
type Type = (typeof InputType)[number];
export interface BATCH_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id:
    | "name"
    | "selectSports"
    | "selectCoach"
    | "maxCapacity"
    | "selectBatchFee"
    | "selectDay"
    | "startTime"
    | "endTIme";
  type: Type;
  placeHolder?: string;
  options?: MultiSelectOption[];
  defaultValue?: string;
  rules?: Rules;
  pattern?: Pattern;
  isMulti?: boolean;
}
export interface CENTER_BATCH_TYPES {
  batchName: string;
  // selectSports: MultiSelectOption[];
  selectSports: MultiSelectOption;
  selectCoaches: MultiSelectOption;
  maxCapicity: Number;
  selectBatchFee: MultiSelectOption;
}
