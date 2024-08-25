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

  export const ASSESSMENT_DETAILS_CONSTANTS:FormValues[]=[
    {
      label: "Assessment Name",
      id: "name",
      type: "textbox",
      placeHolder:"Assessment Name",
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
      placeHolder:"Sport",
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

  ]



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
