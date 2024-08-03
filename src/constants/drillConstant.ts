import type { FormValues } from "~/types/common";

export const FITNESS_DRILL_TABLE_HEADERS = [
  {
    label: "Drill Name",
    id: "drillName",
  },
  {
    label: "Fitness Component",
    id: "fitness",
  },
  {
    label: "Training Level",
    id: "level",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const COACHING_DRILL_TABLE_HEADERS = [
  {
    label: "Drill Name",
    id: "drillName",
  },
  {
    label: "Sport",
    id: "sport",
  },
  {
    label: "Training Level",
    id: "level",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const FITNESS_DETAILS_CONSTANTS: FormValues[] = [
  {
    label: "Select Fitness Component",
    id: "fitnessComponent",
    type: "select",
    options: [
      {
        label: "FitnessComp1",
        value: "fitness_comp1",
      },
      {
        label: "FitnessComp2",
        value: "fitness_comp2",
      },
      {
        label: "FitnessComp3",
        value: "fitness_comp3",
      },
      {
        label: "FitnessComp4",
        value: "fitness_comp4",
      },
    ],
    placeHolder: "Select Fitness Component",
    rules: {
      required: true,
    },
  },
  {
    label: "Drill Name",
    id: "name",
    type: "textbox",
    placeHolder: "Drill Name",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Drill Description",
    id: "drill_desc",
    type: "textarea",
    placeHolder: "Drill Description",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Coaching Points",
    id: "coaching_points",
    type: "textarea",
    placeHolder: "Coaching Points",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Training Level",
    id: "training_level",
    type: "select",
    options: [
      {
        label: "Training Levell",
        value: "training_level1",
      },
      {
        label: "Training Level2",
        value: "training_level2",
      },
      {
        label: "Training Level3",
        value: "training_level3",
      },
      {
        label: "Training Level4",
        value: "training_level4",
      },
    ],
    placeHolder: "Training Level",
    rules: {
      required: true,
    },
  },
  {
    label: "Drill Setup",
    id: "drill_setup",
    type: "textbox",
    placeHolder: "Drill Setup",
    rules: {
      required: true,
      maxLength: {
        value: 15,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Drill Objective",
    id: "drill_objective",
    type: "textarea",
    placeHolder: "Drill Objective",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
];

export const COACHING_DETAILS_CONSTANTS: FormValues[] = [
  {
    label: "Sport",
    id: "sport",
    type: "select",
    options: [
      {
        label: "Sport1",
        value: "sport1",
      },
      {
        label: "Sport2",
        value: "sport2",
      },
      {
        label: "Sport3",
        value: "sport3",
      },
      {
        label: "Sport4",
        value: "sport4",
      },
    ],
    placeHolder: "Select Fitness Component",
    rules: {
      required: true,
    },
  },
  {
    label: "Drill Name",
    id: "name",
    type: "textbox",
    placeHolder: "Drill Name",
    rules: {
      required: true,
      maxLength: {
        value: 35,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Drill Description",
    id: "drill_desc",
    type: "textarea",
    placeHolder: "Drill Description",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Coaching Points",
    id: "coaching_points",
    type: "textarea",
    placeHolder: "Coaching Points",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Training Level",
    id: "training_level",
    type: "select",
    options: [
      {
        label: "Training Levell",
        value: "training_level1",
      },
      {
        label: "Training Level2",
        value: "training_level2",
      },
      {
        label: "Training Level3",
        value: "training_level3",
      },
      {
        label: "Training Level4",
        value: "training_level4",
      },
    ],
    placeHolder: "Training Level",
    rules: {
      required: true,
    },
  },
  {
    label: "Drill Setup",
    id: "drill_setup",
    type: "textbox",
    placeHolder: "Drill Setup",
    rules: {
      required: true,
      maxLength: {
        value: 15,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Drill Objective",
    id: "drill_objective",
    type: "textarea",
    placeHolder: "Drill Objective",
    rules: {
      required: true,
      maxLength: {
        value: 100,
        message: "Too Many Characters",
      },
    },
  },
];
