import type { FormValues } from "~/types/common";

export const ASSESSMENT_TABLE_HEADERS = [
  {
    label: "Assessment Name",
    id: "name",
  },

  {
    label: "Sport",
    id: "sport",
  },
  {
    label: "Training Level",
    id: "trainingLevel",
  },
  {
    label: "Status",
    id: "status",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const PHYSICAL_TEST_TABLE_HEADERS = [
  {
    label: "Test Name",
    id: "name",
  },

  {
    label: "Test Related To",
    id: "test Related to",
  },
  {
    label: "Fitness Component",
    id: "component",
  },
  {
    label: "Training Level",
    id: "trainingLevel",
  },

  {
    label: "Action",
    id: "action",
  },
];

export const SPORT_SPECIFIC_TABLE_HEADERS = [
  {
    label: "Test Name",
    id: "name",
  },

  {
    label: "Sport",
    id: "sport",
  },
  {
    label: "Test Type",
    id: "type",
  },
  {
    label: "Training Level",
    id: "trainingLevel",
  },

  {
    label: "Action",
    id: "action",
  },
];

export const ASSESSMENT_DETAILS_CONSTANTS: FormValues[] = [
  {
    label: "Assessment Name",
    id: "name",
    type: "textbox",
    placeHolder: "Assessment Name",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Sport",
    id: "sportId",
    type: "select",
    placeHolder: "Sport",
    rules: {
      required: true,
    },
  },
  {
    label: "Training level",
    id: "level",
    type: "textbox",
    placeHolder: "Training level",

    rules: {
      required: true,
    },
  },

  {
    label: "Description",
    id: "description",
    type: "textarea",
    placeHolder: "Description",
    rules: {
      required: true,
    },
  },
];

export const PHYSICAL_TEST_BANK: FormValues[] = [
  {
    label: "Test Name",
    id: "name",
    type: "textbox",
    placeHolder: "Test Name",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Test Related To",
    id: "sportId",
    type: "select",
    placeHolder: "Test Related To",
    options: [
      {
        label: "General Fitness",
        value: "General Fitness",
      },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Fitness Component ",
    id: "sportId",
    type: "select",
    placeHolder: "Fitness Component",
    options: [
      {
        label: "Endurance",
        value: "Endurance",
      },
      { label: "Speed", value: "Speed" },
      { label: "Strength", value: "Strength" },
      { label: "Agility", value: "Agility" },
      { label: "Movement Coordination", value: "Movement Coordination" },
      { label: "Balance", value: "Balance" },
      { label: "Flexiblity", value: "flexiblity" },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Training level",
    id: "level",
    type: "select",
    placeHolder: "Training level",
    options: [
      {
        label: "Beginner",
        value: "Beginner",
      },
      { label: "Developer", value: "Developer" },
      { label: "Intermediate", value: "Intermediate" },
      { label: "Advanced", value: "Advanced" },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Test Objective",
    id: "objective",
    type: "textarea",
    placeHolder: "Test Objective",
    rules: {
      required: true,
    },
  },
  {
    label: "Test Desciption",
    id: "description",
    type: "textarea",
    placeHolder: "Test Desciption",
    rules: {
      required: true,
    },
  },
  {
    label: "Measure test as",
    id: "measure_type",
    type: "select",
    placeHolder: "Measure test as",
    options: [
      {
        label: "Numeric value",
        value: "Numeric value",
      },
      { label: "Star Rating Index", value: "Star Rating Index" },
    ],
    rules: {
      required: true,
    },
  },
];

export const NUMERIC_TYPE: FormValues[] = [
  {
    label: "Unit Type",
    id: "sportId",
    type: "select",
    placeHolder: "Unit Type",
    options: [
      {
        label: "Metric Units (mm or cm or m or km)",
        value: "Metric Units (mm or cm or m or km)",
      },
      {
        label: "Time Units (sec or min or hour)",
        value: "Time Units (sec or min or hour)",
      },
      {
        label: "Heart Rate",
        value: "Heart Rate",
      },
      {
        label: "Reps",
        value: "Reps",
      },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Min Value",
    id: "name",
    type: "number",
    placeHolder: "Min Value",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Max Value",
    id: "name",
    type: "number",
    placeHolder: "Max Value",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    id: "level",
    type: "select",
    options: [
      {
        label: "Lowest value is high",
        value: "Lowest value is high",
      },
      { label: "Highest value is high", value: "Highest value is high" },
    ],
    rules: {
      required: true,
    },
  },
];
export const ASSIGN_TEST_BANK_TABLE_HEADERS = [
  {
    id: "name",
    label: "Physical Test name",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const ASSESSMENT_SCORING_OPTIONS = [
  {
    label: "Allow Athletes to self-assess",
    id: "name",
    type: "switch",
    rules: {
      required: true,
    },
  },

  {
    label: "Allow Coach to assess",
    id: "name",
    type: "switch",
    rules: {
      required: true,
    },
  },
  {
    label: "Add Areas of Strength",
    id: "name",
    type: "switch",
    rules: {
      required: true,
    },
  },
  {
    label: "Add Areas of Weakness",
    id: "name",
    type: "switch",
    rules: {
      required: true,
    },
  },
  {
    label: "Add Coach's Comments",
    id: "name",
    type: "switch",
    rules: {
      required: true,
    },
  },
];

export const ASSESSMENT_SCHEDULE = [
  {
    label: "Select Duration:Recurring",
    id: "duration",
    type: "select",
    rules: {
      required: true,
    },
  },

  {
    label: "Recurring Type",
    id: "type",
    type: "select",
    rules: {
      required: true,
    },
  },
  {
    label: "Start",
    id: "startDate",
    type: "calendar",
    placeHolder: "Start Date",
    rules: {
      required: true,
    },
  },

  {
    label: "End",
    id: "endDate",
    type: "calendar",
    placeHolder: "End Date",
    rules: {
      required: true,
    },
  },
];
