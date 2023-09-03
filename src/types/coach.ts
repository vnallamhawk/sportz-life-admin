export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];

interface SelectOption {
  label: string;
  value: string;
  id: string;
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
  options?: SelectOption[];
  defaultValue?: string;
  rules?: Record<string, boolean>;
}

export interface COACH_CERTIFICATE_TABLE_TYPES {
  institute: string;
  certificate: string;
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
  gender?: (typeof GENDER_VALUES)[number];
  payroll: string;
  coachingSports: string;
}

export interface MULTI_FORM_TYPES extends COACH_TYPES {
  certificateData: COACH_CERTIFICATE_TABLE_TYPES[];
  batchData: ASSIGN_BATCHES_TYPES[];
}
