import type { FormValues } from "~/types/common";
export const CENTER_DETAILS_CONSTANTS: FormValues[] = [
  {
    label: "Center Name",
    id: "name",
    type: "textbox",
    placeHolder: "Center Name",
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
    id: "mobile",
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
    label: "Email Address",
    id: "email",
    type: "textbox",
    placeHolder: "Email Address",

    rules: {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Please enter a valid email !",
      },
      maxLength: {
        value: 50,
        message: "Too Many Characters",
      },
    },
  },
  // {
  //   label: "Select Sports",
  //   id: "selectSports",
  //   type: "select",
  //   options: [],
  //   isMulti:true,
  //   placeHolder: "Select Sports",
  //   rules: {
  //     required: true,
  //   },
  // },
  {
    label: "Location",
    id: "address",
    type: "textbox",
    placeHolder: "Location",
    rules: {
      required: true,
      maxLength: {
        value: 15,
        message: "Too Many Characters",
      },
    },
  },
  // {
  //   label: "Select Coaches",
  //   id: "selectCoaches",
  //   type: "select",
  //   options: [],
  //   isMulti:true,
  //   placeHolder: "Select Coaches",
  //   rules: {
  //     required: false,
  //   },
  // },
];
