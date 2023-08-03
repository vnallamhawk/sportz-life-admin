import { type COACH_DETAILS_CONSTANTS_TYPES } from "~/types/coach";

export const COACH_TABLE_HEADERS = [
  {
    id: "selectControl",
  },
  {
    label: "Coach Name",
    id: "coachName",
  },
  {
    label: "Age",
    id: "age",
  },
  {
    label: "Designation",
    id: "designation",
  },
  {
    label: "Sport Coaching",
    id: "sportCoaching",
  },

  {
    label: "Gender",
    id: "gender",
  },
  {
    label: "Batches",
    id: "batches",
  },
  {
    label: "Contact No",
    id: "contactNo",
  },
  {
    id: "kebabMenu",
  },
];

export const COACH_DETAILS_CONSTANTS: COACH_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Coach Name",
    id: "coachName",
    type: "textbox",
  },
  {
    label: "Designation",
    id: "designation",
    type: "textbox",
  },
  {
    label: "Phone Number",
    id: "phoneNumber",
    type: "textbox",
  },
  {
    label: "Email Address",
    id: "emailAddress",
    type: "textbox",
  },
  {
    label: "Date of Birth",
    id: "dateOfBirth",
    type: "calendar",
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: [
      { label: "Male", value: "male", id: "male" },
      { label: "Female", value: "female", id: "female" },
    ],
    placeHolder: "Select Gender",
  },
  {
    label: "Select Payroll",
    id: "selectPayroll",
    type: "select",
    options: [
      { label: "Male", value: "male", id: "male" },
      { label: "Female", value: "female", id: "female" },
    ],
    placeHolder: "Select Payroll",
  },
  {
    label: "Coaching Sports",
    id: "coachingSports",
    type: "select",
    options: [
      { label: "Volleyball", value: "volleyball", id: "volleyball" },
      { label: "Basketball", value: "basketball", id: "basketball" },
      { label: "Swimming", value: "swimming", id: "swimming" },
    ],
    placeHolder: "Coaching Sports",
  },
];
