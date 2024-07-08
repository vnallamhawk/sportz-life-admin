import { type STAFF_DETAILS_CONSTANTS_TYPES } from "~/types/staff";

export const STAFF_TABLE_HEADERS = [
  {
    id: "selectControl",
  },
  {
    label: "Staff Name",
    id: "staffName",
  },
  {
    label: "Designation",
    id: "designation",
  },
  {
    label: "Age",
    id: "age",
  },
  {
    label: "Gender",
    id: "gender",
  },
  {
    label: "Center",
    id: "center",
  },
  {
    label: "Contact No",
    id: "contactNo",
  },
  {
    id: "kebabMenu",
  },
];

export const STAFF_DETAILS_CONSTANTS: STAFF_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Staff Name",
    id: "staffName",
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
    label: "Phone Number",
    id: "contactNumber",
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
    id: "email",
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
  {
    label: "Center",
    id: "center",
    type: "select",
    options: [],
    placeHolder: "Select Center",
    rules: {
      required: true,
    },
  },
];
