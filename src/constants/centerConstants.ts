import { type CENTER_DETAILS_CONSTANTS_TYPES } from "~/types/center";
export const CENTER_DETAILS_CONSTANTS: CENTER_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Center Name",
    id: "centerName",
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
    label: "Phone Number",
    id: "phoneNumber",
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
    label: "Select Sports",
    id: "selectSports",
    type: "select",
    options: [],
    placeHolder: "Select Sports",
    rules: {
      required: true,
    },
  },
  {
    label: "Location",
    id: "location",
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
    label: "Select Coaches",
    id: "selectCoaches",
    type: "select",
    options: [],
    placeHolder: "Select Coaches",
    rules: {
      required: false,
    },
  },
];
