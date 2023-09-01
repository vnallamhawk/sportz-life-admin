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
    rules: {
      required: true,
    },
  },
  {
    label: "Designation",
    id: "designation",
    type: "textbox",
    rules: {
      required: true,
    },
  },
  {
    label: "Phone Number",
    id: "phoneNumber",
    type: "textbox",
    rules: {
      required: true,
    },
  },
  {
    label: "Email Address",
    id: "emailAddress",
    type: "textbox",
    rules: {
      required: true,
    },
  },
  {
    label: "Date of Birth",
    id: "dateOfBirth",
    type: "calendar",
    placeHolder: "Date of Birth",
    rules: {
      required: true,
    },
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
    rules: {
      required: true,
    },
  },
  {
    label: "Select Payroll",
    id: "payroll",
    type: "select",
    options: [
      { label: "Junior Coach", value: "junior", id: "junior" },
      { label: "Senior Coach", value: "senior", id: "senior" },
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

export const COACH_CERTIFICATES_CONSTANTS = [
  {
    label: "Bachelor Certificate in Athlete Coaching",
    id: "bachelorCertificate",
    value: "bachelorCertificate",
  },
  {
    label: "Diploma Certificate in General Coaching",
    id: "diplomaCertificate",
    value: "diplomaCertificate",
  },
];

export const CENTERS_CONSTANTS = [
  {
    label: "Nethaji Indoor Stadium",
    id: "nethaji",
    value: "nethaji",
  },
  {
    label: "Biswa Bharat Stadium",
    id: "biswa",
    value: "biswa",
  },
];

export const BATCHES_CONSTANTS = [
  {
    label: "Tennis-Advanced",
    id: "tennis",
    value: "tennis",
  },
  {
    label: "Basketball-Beginner",
    id: "basketball",
    value: "basketball",
  },
  {
    label: "Volleyball-Intermediate",
    id: "volleyball",
    value: "volleyball",
  },
];

export const COACH_CERTIFICATE_TABLE_HEADERS = [
  {
    label: "Certificate",
    id: "certificate",
  },
  {
    label: "Institute",
    id: "institute",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const CENTER_BATCH_TABLE_HEADERS = [
  {
    label: "Center",
    id: "center",
  },
  {
    label: "Batch",
    id: "batch",
  },
  {
    label: "Action",
    id: "action",
  },
];
