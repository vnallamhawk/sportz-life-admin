import { type Pattern, type Rules } from "./rules";
import { type MultiSelectOption } from "./select";

export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];
export interface CENTER_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id:
    | "name"
    | "phoneNumber"
    | "email"
    | "location"
    | "selectSports"
    | "selectCoaches";
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
  startDate: string;
  endDate: string;
}

export interface ASSIGN_BATCHES_TYPES {
  centerName: MultiSelectOption;
  batchName: MultiSelectOption[];
}

export const SELECT_SPORTS = [
  "BASKETBALL",
  "VOLLEYBALL",
  "FOOTBALL",
  "CRICKET",
] as const;
export const SELECT_COACHES = ["COACH1", "COACH2", "COACH3", "COACH4"] as const;
// export interface COACH_TYPES {
//   name: string;
//   about: string;
//   designation: string;
//   contactNumber: string;
//   email: string;
//   dateOfBirth?: string;
//   gender?: MultiSelectOption;
//   payroll?: string;
//   coachingSports: MultiSelectOption[];
//   trainingLevel?: MultiSelectOption;
//   experienceLevel?: MultiSelectOption;
// }
export interface CENTER_TYPES {
  centerName: string;
  phoneNumber: string;
  email: string;
  location: string;
  // selectSports: MultiSelectOption[];
  selectCoaches: MultiSelectOption;
  selectSports: MultiSelectOption;
}
export interface MULTI_FORM_TYPES extends CENTER_TYPES {
  // certificates: COACH_CERTIFICATE_TABLE_TYPES[];
  // batchTableData?: BatchTableData[];
  batchIds?: number[];
  // centerIds?: number[];
  isEditMode: boolean;
  centerId?: number;
}

export interface InventoryData {
  value?: any;
  name: string;
  quantity: number;
}

export interface SportsData {
  name: string;
  value?: any;
}

// export interface MULTI_FORM_TYPES extends COACH_TYPES {
//   certificates: COACH_CERTIFICATE_TABLE_TYPES[];
//   batchTableData?: BatchTableData[];
//   batchIds?: number[];
//   centerIds?: number[];
//   isEditMode: boolean;
//   coachId?: number;
// }

// export interface batchWithCenter extends CoachesOnBatches {
//   batch: Batches;
//   center: Centers;
// }

export enum SelectSports {
  BASKETBALL = "Basketball",
  VOLLEYBALL = "Volleyball",
  FOOTBALL = "Football",
  CRICKET = "Cricket",
}

export enum SelectCoaches {
  COACH1 = "COACH1",
  COACH2 = "COACH2",
  COACH3 = "COACH3",
  COACH4 = "COACH4",
}

// export type CoachWithRelations = Coaches & {
//   // certificates: Certificates[];
//   sports: Sports[];
//   Batches: Batches[];
// };

// export type CoachWithRelationsEditForm = Coaches & {
//   // certificates: Certificates[];
//   // sports: CoachesOnSports[];
//   // batches: CoachesOnBatches[];
//   batchTableData?: BatchTableData[];
// };

export interface MULTI_FORM_BATCH_TYPES {
  batchName: string;
  selectSports: MultiSelectOption[];
  selectCoaches: MultiSelectOption[];
  capacity: number;
  price: number;
}
