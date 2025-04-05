import type { FormValues } from "~/types/common";

export const ASSESSMENT_TABLE_HEADERS = [
  {
    label: "Assessment Name",
    id: "name",
  },

  {
    label: "Sport",
    id: "sportName",
  },
  {
    label: "Training Level",
    id: "level",
  },
  {
    label: "Status",
    id: "assessmentStatus",
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
    id: "fitness_type",
  },
  {
    label: "Fitness Component",
    id: "fitness_component",
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
    id: "sportName",
  },
  {
    label: "Test Type",
    id: "test_type",
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
    type: "select",
    placeHolder: "Training level",
    options: [
      {
        label: "Beginner",
        value: "beginner",
      },
      { label: "Developer", value: "developer" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
    ],
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
    id: "fitnessType",
    type: "select",
    placeHolder: "Test Related To",
    options: [
      {
        label: "General Fitness",
        value: "general_fitness",
      },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Fitness Component ",
    id: "fitnessComponent",
    type: "select",
    placeHolder: "Fitness Component",
    options: [
      {
        label: "Endurance",
        value: "endurance",
      },
      { label: "Speed", value: "speed" },
      { label: "Strength", value: "strength" },
      { label: "Agility", value: "agility" },
      { label: "Movement Coordination", value: "movement_coordination" },
      { label: "Balance", value: "balance" },
      { label: "Flexiblity", value: "flexiblity" },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Training level",
    id: "trainingLevel",
    type: "select",
    placeHolder: "Training level",
    options: [
      {
        label: "Beginner",
        value: "beginner",
      },
      { label: "Developer", value: "developer" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
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
    id: "measureType",
    type: "select",
    placeHolder: "Measure test as",
    options: [
      {
        label: "Numeric value",
        value: "numeric_value",
      },
      { label: "Star Rating Index", value: "star_rating_index" },
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

export const ASSIGN_PARTICIPANT_TABLE_HEADERS = [
  {
    id: "name",
    label: "Participant Name",
  },
  {
    label: "Action",
    id: "action",
  },
]

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
    options: [
      {
        label: "Recurring",
        value: "recurring",
      },
      { label: "One Time", value: "one_time" }
    ],
    rules: {
      required: true,
    },
  },

  {
    label: "Recurring Type",
    id: "type",
    type: "select",
    options: [
      {
        label: "Monthly",
        value: "monthly",
      },
      { label: "Weekly", value: "weekly" }
    ],
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


export const ASSESSMENT_ASSIGNED_TABLE_HEADERS = [
  {
    label: "Athlete Name",
    id: "athleteName",
  },

  {
    label: "Batch",
    id: "batchName",
  },
  {
    label: "Center",
    id: "centerName",
  },
  {
    label: "Coach",
    id: "coachName",
  }
];
