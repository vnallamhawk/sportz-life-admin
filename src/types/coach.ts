export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface Pattern {
  value: RegExp;
  message: string;
}

interface MaxLength {
  value: number;
  message: string;
}

interface Rules {
  required?: boolean;
  pattern?: Pattern;
  maxLength?: MaxLength;
}
export interface COACH_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id:
    | "coachName"
    | "designation"
    | "phoneNumber"
    | "emailAddress"
    | "payroll"
    | "dateOfBirth"
    | "gender"
    | "coachingSports";
  type: Type;
  placeHolder?: string;
  options?: MultiSelectOption[];
  defaultValue?: string;
  rules?: Rules;
  pattern?: Pattern;
  isMulti?: boolean;
}

export interface COACH_CERTIFICATE_TABLE_TYPES {
  instituteName: string;
  name: string;
}

export interface ASSIGN_BATCHES_TYPES {
  centerName: string;
  batchName: string;
}

export const GENDER_VALUES = ["MALE", "FEMALE"] as const;
export interface COACH_TYPES {
  coachName: string;
  designation: string;
  phoneNumber: string;
  emailAddress: string;
  dateOfBirth?: string;
  gender?: MultiSelectOption;
  payroll: string;
  coachingSports: MultiSelectOption[];
}

export interface MULTI_FORM_TYPES extends COACH_TYPES {
  certificateData: COACH_CERTIFICATE_TABLE_TYPES[];
  batchData: ASSIGN_BATCHES_TYPES[];
}
