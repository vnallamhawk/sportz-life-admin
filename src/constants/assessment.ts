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


export const ASSESSMENT_SCORING_OPTIONS=[
  
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
  
]

export const ASSESSMENT_SCHEDULE=[
  
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
      required: true
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
 

]