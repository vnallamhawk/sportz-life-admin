import type { FormValues } from "~/types/common";

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

export const ATHLETE_DETAILS_CONSTANTS: FormValues[] = [
  {
    label: "Athlete Name",
    id: "name",
    pattern: "pattern",
    placeHolder: "Athlete Name",
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
    id: "dob",
    type: "calendar",
    pattern: "pattern",
    placeHolder: "Date of Birth",
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
    pattern: "pattern",
    placeHolder: "Gender",
    options: [
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Height",
    id: "height",
    type: "number",
    pattern: "pattern",
    placeHolder: "Height",
    rules: {
      required: true,
    },
  },
  {
    label: "Weight",
    id: "weight",
    type: "number",
    pattern: "pattern",
    placeHolder: "Weight",
    rules: {
      required: true,
    },
  },
  {
    label: "Blood Group",
    id: "bloodGroup",
    type: "select",
    pattern: "pattern",
    options: [
      { label: "A+", value: "APos" },
      { label: "B+", value: "BPos" },
      { label: "A-", value: "ANeg" },
      { label: "B-", value: "BNeg" },
      { label: "AB+", value: "ABPos" },
      { label: "O+", value: "OPos" },
      { label: "AB-", value: "ABNeg" },
      { label: "O-", value: "ONeg" },
    ],
    placeHolder: "Blood Group",
    rules: {
      required: true,
    },
  },
];

export const ATHLETE_GENRAL_CONSTANTS = [
  {
    label: "Center",
    id: "center",
    type: "select",
    options: [],
    placeHolder: "Center",
    rules: {
      required: true,
    },
  },
  {
    label: "Sport",
    id: "sport",
    type: "select",
    options: [],
    placeHolder: "Sport",
    rules: {
      required: true,
    },
  },
  {
    label: "Training Level",
    id: "training_level",
    type: "select",
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Developer", value: "developer" },
      { label: "Intermediate Level", value: "intermediate" },
      { label: "Advanced Level", value: "advanced" },
    ],
    placeHolder: "Training Level",
    rules: {
      required: true,
    },
  },
  {
    label: "Father's Name",
    id: "fatherName",
    type: "textbox",
    placeHolder: "Father's Name",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },

  {
    label: "Batch",
    id: "batch",
    type: "select",
    options: [],
    placeHolder: "Batch",
    rules: {
      required: true,
    },
  },
];
export const ATHLETE_CONTACT_CONSTANTS = [
  {
    label: "Email",
    id: "email",
    type: "textbox",
    placeHolder: "Email",
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
    label: "Phone Number",
    id: "phone",
    type: "textbox",
    placeHolder: "Phone Number",
    rules: {
      required: true,
      maxLength: {
        value: 25,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Residential Address",
    id: "name",
    type: "textarea",
    placeHolder: "Residential Address",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
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

export const ATHLETE_BATCH_TABLE_HEADERS = [
  {
    label: "Batch Name",
    id: "batchName",
  },
  {
    label: "Coach",
    id: "coach",
  },
  {
    label: "Sport",
    id: "sport",
  },
  {
    label: "No. of Students",
    id: "students",
  },
  {
    label: "Batch Fee",
    id: "batchFee",
  },
  {
    label: "Action",
    id: "action",
  },
];
export const ATHLETE_MEDICAL_TABLE_HEADERS = [
  {
    label: "#",
    id: "no.",
  },
  {
    label: "Medical History",
    id: "medical_history",
  },
  {
    label: "Action",
    id: "action",
  },
];
