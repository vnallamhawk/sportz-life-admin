import { type BATCH_DETAILS_CONSTANTS_TYPES } from "~/types/batch";
export const BATCH_DETAILS_CONSTANTS: BATCH_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Batch Name",
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
    label: "Select Sports",
    id: "selectSports",
    type: "select",
    // options: [
    //   { label: "Volleyball", value: "Volleyball" },
    //   { label: "Volleyball", value: "Volleyball" },
    //   { label: "Volleyball", value: "Volleyball" },
    //   { label: "Volleyball", value: "Volleyball" },
    // ],
    // isMulti: true,
    placeHolder: "Select Sports",
    rules: {
      required: true,
    },
  },
  // {
  //   label: "Select Coach",
  //   id: "selectCoach",
  //   type: "select",
  //   options: [
  //     { label: "Coach1", value: "Coach1" },
  //     { label: "Coach1", value: "Coach1" },
  //     { label: "Coach1", value: "Coach1" },
  //     { label: "Coach1", value: "Coach1" },
  //   ],
  //   isMulti: true,
  //   placeHolder: "Select Coaches",
  //   rules: {
  //     required: true,
  //   },
  // },
  {
    label: "Max Batch Capacity",
    id: "capacity",
    type: "number",
    rules: {
      required: true,
      maxLength: {
        value: 25,
        message: "Too Many Characters",
      },
    },
  },

  {
    label: "Select Batch Fee",
    id: "price",
    type: "number",
    isMulti: true,
    placeHolder: "Select Batch Fee",
    rules: {
      required: false,
    },
  },
];

export const BATCH_DETAILS_TIMING = [
  {
    label: "Select Day",
    id: "day",
    type: "select",
    options: [
      { label: "Sunday", value: "sun" },
      { label: "Monday", value: "mon" },
      { label: "Tuesday", value: "tue" },
      { label: "Wednesday", value: "wed" },
      { label: "Thrusday", value: "thu" },
      { label: "Friday", value: "fri" },
      { label: "Saturday", value: "sat" },
    ],
    // isMulti: true,
    placeHolder: "Select Day",
    rules: {
      required: true,
    },
  },
  {
    label: "Start Time",
    id: "startTime",
    type: "time",
    rules: {
      required: true,
      maxLength: {
        value: 2,
        message: "Too Many Characters",
      },
    },
  },

  {
    label: "End Time",
    id: "endTime",
    type: "time",
    rules: {
      required: true,
      maxLength: {
        value: 2,
        message: "Too Many Characters",
      },
    },
  },
];


export const BATCH_TIMING_TABLE_HEADERS = [
  {
    id: "day",
    label: "Day",
  },
  {
    label: "Start Time",
    id: "startTime",
  },
  {
    label: "End Time",
    id: "endTime",
  },
];
