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
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Designation",
    id: "designation",
    type: "textbox",
    rules: {
      required: true,
      maxLength: {
        value: 25,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "About",
    id: "about",
    type: "textbox",
    rules: {
      required: true,
      maxLength: {
        value: 80,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Phone Number",
    id: "phoneNumber",
    type: "textbox",
    rules: {
      required: true,
      maxLength: {
        value: 15,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Email Address",
    id: "emailAddress",
    type: "textbox",
    rules: {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Please enter a valid email !",
      },
      maxLength: {
        value: 25,
        message: "Too Many Characters",
      },
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
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
    ],
    placeHolder: "Select Gender",
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
  {
    label: "Coaching Sports",
    id: "coachingSports",
    type: "select",
    options: [],
    placeHolder: "Coaching Sports",
    rules: {
      required: true,
    },
    isMulti: true,
  },
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
    placeHolder: "Training level expertise",
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
