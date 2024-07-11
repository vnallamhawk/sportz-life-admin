import { type COACH_DETAILS_CONSTANTS_TYPES } from "~/types/coach";

export const ATHLETE_TABLE_HEADERS = [
  {
    id: "selectControl",
  },
  {
    label: "Coach Name",
    id: "name",
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

export const ATHLETE_DETAILS_CONSTANTS: COACH_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Athlete Name",
    id: "name",
    type: "textbox",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Date of Birth",
    id: "dateOfBirth",
    type: "calendar",
    rules: {
      required: true,
      maxLength: {
        value: 25,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    rules: {
      required: true,
      maxLength: {
        value: 80,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Height",
    id: "name",
    type: "select",
    rules: {
      required: true,
      maxLength: {
        value: 15,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Weight",
    id: "gender",
    type: "select",
    options: [
      { label: "50", value: "50" },
      { label: "60", value: "60" },
    ],
    placeHolder: "Select Weight",
    rules: {
      required: true,
    },
  },
  {
    label: "Blood Group",
    id: "gender",
    type: "select",
    options: [
      { label: "A+", value: "A+" },
      { label: "B+", value: "B+" },
    ],
    placeHolder: "Select Blood Group",
    rules: {
      required: true,
    },
  },
  // TODO: add this functionality for second phase
  // {
  //   label: "Select Payroll",
  //   id: "payroll",
  //   type: "select",
  //   options: [
  //     { label: "Junior Coach", value: "junior", id: "junior" },
  //     { label: "Senior Coach", value: "senior", id: "senior" },
  //   ],
  //   placeHolder: "Select Payroll",
  // },
  // {
  //   label: "Coaching Sports",
  //   id: "coachingSports",
  //   type: "select",
  //   options: [],
  //   placeHolder: "Coaching Sports",
  //   rules: {
  //     required: true,
  //   },
  //   isMulti: true,
  // },
  {
    label: "Training level expertise",
    id: "trainingLevel",
    type: "select",
    options: [
      { label: "Beginner", value: "BEGINNER" },
      { label: "Developer", value: "DEVELOPER" },
      { label: "Intermediate Level", value: "INTERMEDIATE_LEVEL" },
      { label: "Advanced Level", value: "ADVANCED_LEVEL" },
    ],
    placeHolder: "Training level expertise",
    rules: {
      required: true,
    },
  },
  {
    label: "Years of Coaching Experience",
    id: "experienceLevel",
    type: "select",
    options: [
      { label: "0-1 year", value: "ZERO_ONE" },
      { label: "2-5 years", value: "TWO_FIVE" },
      { label: "6-10 years", value: "SIX_TEN" },
      { label: "10+ years", value: "TEN_OVER" },
    ],
    placeHolder: "Experience Level",
    rules: {
      required: true,
    },
  },
];

export const COACH_CERTIFICATES_CONSTANTS = {
  placeholder: "Select Coach Certificates",
  id: "certificates",
  options: [
    {
      label: "Bachelor Certificate in Sports",
      id: "bachelorCertificate",
      value: "bachelorCertificate",
    },
    {
      label: "Masters Certificate in Sports",
      id: "mastersCertificate",
      value: "mastersCertificate",
    },
    {
      label: "Diploma in Sports Coaching",
      id: "diplomaSports",
      value: "diplomaSports",
    },
  ],
};

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
    label: "Start Date",
    id: "startDate",
  },
  {
    label: "End Date",
    id: "endDate",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const CENTER_BATCH_TABLE_HEADERS = [
  {
    label: "Center Name",
    id: "center",
  },
  {
    label: "Location",
    id: "location",
  },
  {
    label: "Batches",
    id: "batch",
  },
  {
    label: "Contact Number",
    id: "mobile",
  },
  {
    label: "Action",
    id: "action",
  },
];
