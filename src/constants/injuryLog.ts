import type { FormValues } from "~/types/common";

export const INJURY_ATHLETE_TABLE_HEADER = [
    { label: "Athlete Name", id: "name" },
    { label: "Injury", id: "injury" },
    { label: "Injury Type", id: "type" },
    { label:  "Date of Injury", id: "date" },
    { label: "Injury Status", id: "status" },
    { label: "Action", id: "action" },
  ];
  

  export const INJURY_COACH_TABLE_HEADER = [
    { label: "Coach Name", id: "name" },
    { label: "Injury", id: "injury" },
    { label: "Injury Type", id: "type" },
    { label:  "Date of Injury", id: "date" },
    { label: "Injury Status", id: "status" },
    { label: "Action", id: "action" },
  ];

  export const INJURY_DETAILS_CONSTANTS : FormValues[]=[
    {
      label: "Injured Person",
      placeHolder: "Injured Person",
      id: "selectedId",
      type: "select",
      rules: {
        required: true
      },
    },
      {
        label: "Date of Injury",
        id: "dateOfInjury",
        type: "calendar",
        placeHolder: "Date of Injury",
        rules: {
          required: true,
        },
      },
      {
        label: "Time of Injury",
        id: "timeOfInjury",
        type: "time",
        placeHolder: "Time of Injury",
        rules: {
          required: true,
        },
      },
    {
      label: "Type of activity at the time of injury",
      id: "activityType",
      type: "select",
      placeHolder:"Type of activity at the time of injury",
      rules: {
        required: true,
      },
      options:[
        {label:"Training",value:"Training"},
        {label:"Competition",value:"Competition"},
        {label:"Other",value:"Other"},

      ]
    },
    {
        label: "Injured Body Part",
        id: "injuredBodyPart",
        type: "select",
        placeHolder:"Injured Body Part",
        rules: {
          required: true,
        },
        options:[
          {label:"Upper Body",value:"Upper Body"},
          {label:"Medial",value:"Medial"},
          {label:"Lower Body",value:"Lower Body"},
        ]
      },
      
  ];

  export const INJURY_MORE_DETAILS=[
    {
        label: "Injury Body Part Name",
        id: "bodypartname",
        type: "select",
        placeHolder:"Injured Body Part",
        rules: {
          required: true,
        },
        options:[
        ]
      },
      
      {
        label: "Body Injury Type",
        id: "injureType",
        type: "select",
        placeHolder:"Body Injury Type",
        rules: {
          required: true,
        },
        options:[
          {label:"Severe",value:"Severe"},
          {label:"Moderate",value:"Moderate"},
          {label:"Mild",value:"Mild"},
        ]
      },
      {
        label: "Approximate Recovery Time",
        id: "recoveryTime",
        type: "select",
        placeHolder:"Approximate Recovery Time",
        rules: {
          required: true,
        },
        options:[
          {label:"3 - 5 Days",value:"3-5"},
          {label:"1 - 2 weeks",value:"7-14"},
          {label:"Less than a month",value:"<30"},
          {label:"1 - 3 Months",value:"30-90"},
          {label:"More than 3 months",value:">90"},

        ]
      },
      {
        label: "Injury Image",
        id: "image",
        type: "image",
        placeHolder:"Injury Image",
        rules: {
          required: true,
        },
      },

      {
        label: "Attach Medical Report",
        id: "medicalreport",
        type: "image",
        placeHolder:"Attach Medical Report",
        rules: {
          required: true,
        },
      },
      {
        label: "Would you like to share any more details about the injury?",
        id: "description",
        type: "textArea",
        placeHolder:"Would you like to share any more details about the injury?",
        rules: {
          required: true,
        },
      },

     
      
  ]


  export const UPPER_BODY_PARTS=[
    {
      label:"Head",value:"head"
      
    },
    {label:"Neck",value:"neck"
    
    },
    {
      label:"Left Shoulder",value:"left_shoulder"
    },
    {
      label:"Right Shoulder",value:"right_shoulder"
    
    },
    {
      label:"Chest",value:"chest"
      
    },
    {
      label:"Upper Back",value:"upper_back"
    },
    {
      label:"Left Elbow",value:"left_elbow"
    },
    {
      label:"Right Elbow",value:"right_elbow"
    },
    {
      label:"Left Wrist",value:"left_wrist"
    },
    {
      label:"Right Wrist",value:"right_wrist"
    },
    {
      label:"Left Finger",value:"left_finger"
    },
    {
      label:"Right Finger",value:"right_finger"
    }
  ]
  
  export const MEDIAL_BODY_PARTS=[
    {label:"Abdomen" ,value:"abdomen"},
     {
      label:"Lower Back",value:"lower_back"
     }
  ]
  export const LOWER_BODY_PARTS=[
    {label:"Groin" ,value:"groin"},
     {
      label:"Glutes",value:"glutes"
     },
     {
      label:"Left Thigh",value:"left_thigh"
     },
     {
      label:"Right Thigh",value:"right_thigh"
     },
     {
      label:"Left Hamstring",value:"left_hamstring"
     },
     {
      label:"Right Hamstring",value:"right_hamstring"
     },
     {
      label:"Left Knee",value:"left_knee"
     },
     {
      label:"Right Knee",value:"right_knee"
     },
     {
      label:"Left Calf Muscle",value:"left_calf_muscle"
     },
     {
      label:"Right Calf Muscle",value:"right_calf_muscle"
     },
     {
      label:"Left Ankle",value:"left_ankle"
     },
     {
      label:"Right Ankle",value:"right_ankle"
     },
     {
      label:"Left Achillis",value:"left_achillis"
     },
     {
      label:"Right Achillis",value:"right_achillis"
     },
     {
      label:"Left Heel",value:"left_heel"
     },
     {
      label:"Right Heel",value:"right_heel"
     },
     {
      label:"Left Toe Finger",value:"left_toe_finger"
     },
     {
      label:"Right Toe Finger",value:"right_toe_finger"
     },
  ]