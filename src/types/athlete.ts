import type { MultiSelectOption } from "./select";

export interface ATHLETE_TYPES {
  name: string;
  about: string;
  designation: string;
  contactNumber: string;
  email: string;
  dateOfBirth?: string;
  gender?: MultiSelectOption;
  payroll?: string;
  coachingSports: MultiSelectOption[];
  trainingLevel?: MultiSelectOption;
  experienceLevel?: MultiSelectOption;
}
