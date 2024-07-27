import { type COACH_DETAILS_CONSTANTS_TYPES } from "~/types/coach";

export const COACH_TABLE_HEADERS = [
 
  {
    label: "Coach Name",
    id: "name",
  },
  {
    label: "Age",
    id: "age",
  },
  {
    label: "Designation",
    id: "designation",
  },
  {
    label: "Sport Coaching",
    id: "sportCoaching",
  },

  {
    label: "Gender",
    id: "gender",
  },
  {
    label: "Batches",
    id: "batches",
  },
  {
    label: "Contact No",
    id: "phone",
  },
  {
    id: "action",
    label:"Action"
  },
];

export const COACH_DETAILS_CONSTANTS: COACH_DETAILS_CONSTANTS_TYPES[] = [
  {
    label: "Coach Name",
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
    label: "Designation",
    id: "designation",
    type: "select",
    options:[
      {
        label:"Technical Director",value:"technical_director"
      },
      {label:"Head Coach",value:"head_coach"},
      {label:"Coach",value:"coach"},
      {label:"Assistant Coach",value:"assistant_coach"},
      {label:"Trainee Coach",value:"trainee_coach"}
    ],
    placeHolder: "Select Designation",
    rules: {
      required: true
    },
  },
  {
    label: "Phone Number",
    id: "phone",
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
    label: "Date of Birth",
    id: "dateOfBirth",
    type: "calendar",
    placeHolder: "Date of Birth",
    rules: {
      required: true,
    },
  },
  {
    label: "Gender",
    id: "gender",
    type: "select",
    options: [
      { label: "Male", value: "MALE" },
      { label: "Female", value: "FEMALE" },
    ],
    placeHolder: "Select Gender",
    rules: {
      required: true,
    },
  },
  {
    label: "Select Payroll",
    id: "payroll",
    type: "select",
    placeHolder: "Select Payroll",
    rules: {
      required: true,
    }, 
  },
  {
    label: "Coaching Sports",
    id: "coachingSports",
    type: "select",
    isMulti:true,
    placeHolder: "Coaching Sports",
    rules: {
      required: true,
    },
  },
  {
    label: "Training level expertise",
    id: "trainingLevel",
    type: "select",
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Developer", value: "developer" },
      { label: "Intermediate Level", value: "intermediate" },
      { label: "Advanced Level", value: "advanced" },
    ],
    placeHolder: "Training level expertise",
    rules: {
      required: true,
    },
  },
];

export const COACH_CERTIFICATES_CONSTANTS = [
  {
    placeHolder: "Select Coach Certificates",
    id: "certificates",
    type:"select",
    rules: {
      required: true,
    },
    options: [
      {
        label: "Bachelor Certificate in Sports",
        id: "bachelorCertificate",
        value: "bachelor_degree_in_sports_or_fitness_training",
      },
      {
        label: "Masters Certificate in Sports",
        id: "mastersCertificate",
        value: "masters_degree_in_sports_or_fitness_training",
      },
      {
        label: "Diploma in Sports Coaching",
        id: "diplomaSports",
        value: "diploma_in_sports_coaching_or_fitness_training",
      },
      {
        label: "Coaching License",
        id: "coaching_license",
        value: "coaching_license",
      },
      {
        label: "Certification in Sports Coaching or Fitness Training",
        id: "certification_in_sports_coaching_or_fitness_training",
        value: "certification_in_sports_coaching_or_fitness_training",
      },
    ],
  },{
    label: "Institute Name",
    id: "instituteName",
    placeHolder: "Institute Name",
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
    label: "Start Date",
    id: "startDate",
    type: "calendar",
    placeHolder: "Start Date",
    rules: {
      required: true,
    },
  },
  {
    label: "End Date",
    id: "endDate",
    type: "calendar",
    placeHolder: "End Date",
    rules: {
      required: true,
    },
  },
];

export const COACH_BATCH_CONSTANTS = [
  {
    placeHolder: "Select Center",
    id: "center",
    type:"select",
    options: [
    ],
    rules: {
      required: true,
    }
  },{
    placeHolder: "Select Batches",
    id: "batches",
    isMulti:true,
    type:"select",
    options: [
    ],
    rules: {
      required: true,
    }
  }
];

export const COACH_CERTIFICATE_TABLE_HEADERS = [
  {
    label: "Certificate",
    id: "certificate",
  },
  {
    label: "Institute",
    id: "institute",
  },
  {
    label: "Start Date",
    id: "startDate",
  },
  {
    label: "End Date",
    id: "endDate",
  },
  {
    label: "Action",
    id: "action",
  },
];

export const CENTER_BATCH_TABLE_HEADERS = [
  {
    label: "Center Name",
    id: "name",
  },
  {
    label: "Location",
    id: "address",
  },
  {
    label: "Batches",
    id: "batches",
  },
  {
    label: "Contact Number",
    id: "mobile",
  },
  {
    label: "Action",
    id: "action",
  },
];
