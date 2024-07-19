import { type Pattern, type Rules } from "./rules";
import { type MultiSelectOption } from "./select";

export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];

export interface STAFF_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id:
    | "name"
    | "designation"
    | "contactNumber"
    | "email"
    | "dateOfBirth"
    | "gender"
    | "payroll"
    | "center";
  type: Type;
  placeHolder?: string;
  options?: MultiSelectOption[];
  defaultValue?: string;
  rules?: Rules;
  pattern?: Pattern;
  isMulti?: boolean;
}

export interface STAFF_DUTY_SHIFT {
  day: string;
  shift: string;
  startTime:string;
  endTime:string
}

export interface STAFF_TYPES {
  name: string;
  designation: MultiSelectOption[];
  contactNumber: string;
  email: string;
  dateOfBirth?: string;
  gender?: MultiSelectOption[];
  payroll: MultiSelectOption[];
  center: MultiSelectOption[];
}

export interface STAFF_MULTI_FORM_TYPES extends STAFF_TYPES, STAFF_DUTY_SHIFT {}
