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
    options: [
      { label: "Volleyball", value: "Volleyball" },
      { label: "Volleyball", value: "Volleyball" },
      { label: "Volleyball", value: "Volleyball" },
      { label: "Volleyball", value: "Volleyball" },
    ],
    isMulti: true,
    placeHolder: "Select Sports",
    rules: {
      required: true,
    },
  },
  {
    label: "Select Coach",
    id: "selectCoach",
    type: "select",
    options: [
      { label: "Coach1", value: "Coach1" },
      { label: "Coach1", value: "Coach1" },
      { label: "Coach1", value: "Coach1" },
      { label: "Coach1", value: "Coach1" },
    ],
    isMulti: true,
    placeHolder: "Select Coaches",
    rules: {
      required: true,
    },
  },
  {
    label: "Max Batch Capacity",
    id: "maxCapacity",
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
    label: "Select Batch Fee",
    id: "selectBatchFee",
    type: "select",
    options: [
      { label: "5000", value: "5000" },
      { label: "5000", value: "5000" },
      { label: "5000", value: "5000" },
      { label: "5000", value: "5000" },
    ],
    isMulti: true,
    placeHolder: "Select Coaches",
    rules: {
      required: false,
    },
  },
];

export const BATCH_DETAILS_TIMING: BATCH_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Select Day",
    id: "selectDay",
    type: "select",
    options: [
      { label: "Sunday", value: "Sunday" },
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thrusday", value: "Thrusday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
    ],
    isMulti: true,
    placeHolder: "Select Sports",
    rules: {
      required: true,
    },
  },
  {
    label: "Start Time",
    id: "startTime",
    type: "textbox",
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
    id: "endTIme",
    type: "textbox",
    rules: {
      required: true,
      maxLength: {
        value: 2,
        message: "Too Many Characters",
      },
    },
  },
];
