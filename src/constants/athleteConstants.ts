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

export const ATHLETE_DETAILS_CONSTANTS = [
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
    id: "dob",
    type: "calendar",
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
    placeHolder: "Height",
    rules: {
      required: true,
    },
  },
  {
    label: "Weight",
    id: "weight",
    type: "number",
    placeHolder: "Weight",
    rules: {
      required: true,
    },
  },
  {
    label: "Blood Group",
    id: "gender",
    type: "select",
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
    options: [
    ],
    placeHolder: "Center",
    rules: {
      required: true,
    },
  },
  {
    label: "Sport",
    id: "sport",
    type: "select",
    options: [
    ],
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
      { label: "A+", value: "A+" },
      { label: "B+", value: "B+" },
    ],
    placeHolder: "Training Level",
    rules: {
      required: true,
    },
  },
  {
    label: "Father's Name",
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
    label: "Batch",
    id: "batch",
    type: "select",
    options: [
     
    ],
    placeHolder: "Batch",
    rules: {
      required: true,
    },
  },
  
]
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
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
]

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
    label: "Actions",
    id: "actions",
  },
];