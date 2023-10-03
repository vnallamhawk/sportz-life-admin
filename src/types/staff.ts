import { type Pattern, type Rules } from "./rules";
import { type MultiSelectOption } from "./select";

export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];

export interface STAFF_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id:
    | "staffName"
    | "designation"
    | "phoneNumber"
    | "emailAddress"
    | "dateOfBirth"
    | "gender"
    | "center";
  type: Type;
  placeHolder?: string;
  options?: MultiSelectOption[];
  defaultValue?: string;
  rules?: Rules;
  pattern?: Pattern;
  isMulti?: boolean;
}

export interface STAFF_TYPES {
  staffName: string;
  designation: string;
  phoneNumber: string;
  emailAddress: string;
  dateOfBirth?: string;
  gender?: MultiSelectOption;
  center: MultiSelectOption[];
}

export type STAFF_MULTI_FORM_TYPES = STAFF_TYPES;
