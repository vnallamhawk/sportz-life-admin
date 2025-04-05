import type { CoachCentersBatches, Coaches_experienceLevel, Coaches_gender, Coaches_trainingLevel, CoachQualifications, CoachQualifications_certificateType, Sports } from "@prisma/client";
import {
  type Coaches,
  type Batches,
  // type Centers,
  // type CoachesOnBatches,
  // type Certificates,
  // type CoachesOnSports
} from "@prisma/client";
import { type Pattern, type Rules } from "./rules";
import { type MultiSelectOption } from "./select";
import { type BatchTableData } from "./batch";

export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];
export interface COACH_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id:
  | "name"
  | "about"
  | "designation"
  | "contactNumber"
  | "email"
  | "payroll"
  | "dateOfBirth"
  | "gender"
  | "coachingSports"
  | "trainingLevel"
  | "experienceLevel"
  | "phone";
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
  certificateType: CoachQualifications_certificateType
  certificateTypeLabel: string
  startDate: string;
  endDate: string;
}

export interface COACH_CENTER_BATCH_TABLE {
  centerName: string;
  batchName: string
}

export interface ASSIGN_BATCHES_TYPES {
  centerName: MultiSelectOption;
  batchName: MultiSelectOption[];
}

export const GENDER_VALUES = ["male", "female"] as const;
export const BLOOD_GROUPS = ["APos",
  "ANeg",
  "BPos",
  "BNeg",
  "ABPos",
  "ABNeg",
  "OPos",
  "ONeg"] as const;

export const TRAINING_LEVEL = [
  "beginner",
  "intermediate",
  "advanced",
  "developer",
] as const;
export const EXPERIENCE_LEVEL = [
  "zero_one",
  "two_five",
  "six_ten",
  "ten_over",
] as const;
export interface COACH_TYPES {
  name: string;
  about: string;
  designation: string;
  contactNumber: string;
  phone?: string;
  email?: string;
  experience?: string
  dateOfBirth: string | Date;
  gender?: Coaches_gender ;
  payroll?: string;
  coachingSports: number[];
  trainingLevel?: Coaches_trainingLevel
  experienceLevel?:  Coaches_experienceLevel
  image?: string
  batches: number[]
}
export interface CENTER_TYPES {
  centerName: string;
  phoneNumber: string;
  email: string;
  location: string;
  // selectSports: MultiSelectOption[];
  selectCoaches: MultiSelectOption;
  selectSports: MultiSelectOption;
}

export interface BatchData {
  centerName: string;
  batchName: string;
}

type UpdatedCoachCentersBatches = CoachCentersBatches & {
  Centers: {name: string}
  Batches: {name: string}
}

export type MULTI_FORM_COACH_QUALIFICATION = Partial<CoachQualifications & {certificateTypeLabel?: string}>
export interface MULTI_FORM_TYPES extends COACH_TYPES {
  certificates?: CoachQualifications_certificateType;
  batchTableData?: BatchTableData[];
  batchIds?: number[];
  centerIds?: number[];
  coachId?: number;
  CoachQualifications: Partial<MULTI_FORM_COACH_QUALIFICATION>[]
  CoachCentersBatches: UpdatedCoachCentersBatches[]
  Batches: Batches
  centerId?: number
  isEditMode ?:boolean
  startDate?: Date | string
  endDate ?: Date | string
  instituteName?: string
  batches?: Batches['id'][]
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

export type CoachWithRelations = Coaches & {
  // certificates: Certificates[];
  sports: Sports[];
  Batches: Batches[];
};

export type CoachWithRelationsEditForm = Coaches & {
  // certificates: Certificates[];
  // sports: CoachesOnSports[];
  // batches: CoachesOnBatches[];
  batchTableData?: BatchTableData[];
};

export const COACH_CERTIFICATE_FILE_TYPE = [
  "link",
  "image",
  "pdf",
  "video"
] as const;

type Option = {
  label: string;
  value: string | number; // Assuming ID can be string or number
};

export type COACH_CENTER_BATCHES = {
  placeHolder: string;
  id:  'centerId' | 'batches';
  type: "select";
  options: Option[];
  rules: {
    required: boolean;
  };
  isDisabled?: boolean;
  isMulti?: boolean;
};
