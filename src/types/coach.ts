import { Batches, Center, CoachesOnBatches } from "@prisma/client";

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
    | "about"
    | "designation"
    | "phoneNumber"
    | "emailAddress"
    | "payroll"
    | "dateOfBirth"
    | "gender"
    | "coachingSports"
    | "trainingLevel"
    | "experienceLevel";
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
  startEnd: string;
  endDate: string;
}

export interface ASSIGN_BATCHES_TYPES {
  centerName: MultiSelectOption;
  batchName: MultiSelectOption[];
}

export const GENDER_VALUES = ["MALE", "FEMALE"] as const;
export const TRAINING_LEVEL = [
  "BEGINNER",
  "DEVELOPER",
  "INTERMEDIATE_LEVEL",
  "ADVANCED_LEVEL",
] as const;
export const EXPERIENCE_LEVEL = [
  "ZERO_ONE",
  "TWO_FIVE",
  "SIX_TEN",
  "TEN_OVER",
] as const;
export interface COACH_TYPES {
  coachName: string;
  about: string;
  designation: string;
  phoneNumber: string;
  emailAddress: string;
  dateOfBirth?: string;
  gender?: MultiSelectOption;
  payroll: string;
  coachingSports: MultiSelectOption[];
  trainingLevel: MultiSelectOption;
  experienceLevel: MultiSelectOption;
}

export interface BatchData {
  centerName: string;
  batchName: string;
}

export interface MULTI_FORM_TYPES extends COACH_TYPES {
  certificateData: COACH_CERTIFICATE_TABLE_TYPES[];
  batchIds: number[];
}

export interface batchWithCenter extends CoachesOnBatches {
  batch: Batches;
  center: Center;
}

export enum TrainingLevelEnum {
  BEGINNER = "Beginner",
  DEVELOPER = "Developer",
  INTERMEDIATE_LEVEL = "Intermediate Level",
  ADVANCED_LEVEL = "Advanced Level",
}

export enum ExperienceLevelEnum {
  ZERO_ONE = "0-1 year",
  TWO_FIVE = "2-5 years",
  SIX_TEN = "6-10 years",
  TEN_OVER = "10+ years",
}
