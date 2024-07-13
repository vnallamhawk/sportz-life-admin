export const CENTER_DASH_BATCH_TABLE_HEADERS = [
  {
    label: "Batch Name",
    id: "batch",
  },
  {
    label: "Coach",
    id: "coach",
  },
  {
    label: "No. of Students",
    id: "students",
  },
  {
    label: "Sport",
    id: "sport",
  },
  // {
  //   label: "Date",
  //   id: "date",
  // },
  {
    label: "Action",
    id: "action",
  },
];
export const CENTER_DASH_COACH_TABLE_HEADERS = [
  {
    label: "Coach Name",
    id: "name",
  },
  {
    label: " Sport Coaching",
    id: "coaching",
  },
  {
    label: "Age",
    id: "age",
  },
  {
    label: "Sport",
    id: "sport",
  },

  {
    label: "Training Level",
    id: "training",
  },
];

export const CENTER_DASH_ATHLETE_TABLE_HEADERS = [
  {
    label: "Athlete Name",
    id: "name",
  },

  {
    label: "Age",
    id: "age",
  },
  {
    label: "Batches",
    id: "batches",
  },
  {
    label: "Contact Number",
    id: "contact",
  },
];
export const CENTER_DASH_INVENTORY_TABLE_HEADERS = [
  {
    label: "Inventory",
    id: "name",
  },

  {
    label: "Quantity",
    id: "quantity",
  },
  {
    label: "Action",
    id: "action",
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
    label: "About",
    id: "about",
    type: "textbox",
    rules: {
      required: true,
      maxLength: {
        value: 80,
        message: "Too Many Characters",
      },
    },
  },
  {
    label: "Phone Number",
    id: "contactNumber",
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
  // TODO: add this functionality for second phase
  // {
  //   label: "Select Payroll",
  //   id: "payroll",
  //   type: "select",
  //   options: [
  //     { label: "Junior Coach", value: "junior", id: "junior" },
  //     { label: "Senior Coach", value: "senior", id: "senior" },
  //   ],
  //   placeHolder: "Select Payroll",
  // },
  // {
  //   label: "Coaching Sports",
  //   id: "coachingSports",
  //   type: "select",
  //   options: [],
  //   placeHolder: "Coaching Sports",
  //   rules: {
  //     required: true,
  //   },
  //   isMulti: true,
  // },
  {
    label: "Training level expertise",
    id: "trainingLevel",
    type: "select",
    options: [
      { label: "Beginner", value: "BEGINNER" },
      { label: "Developer", value: "DEVELOPER" },
      { label: "Intermediate Level", value: "INTERMEDIATE_LEVEL" },
      { label: "Advanced Level", value: "ADVANCED_LEVEL" },
    ],
    placeHolder: "Training level expertise",
    rules: {
      required: true,
    },
  },
  {
    label: "Years of Coaching Experience",
    id: "experienceLevel",
    type: "select",
    options: [
      { label: "0-1 year", value: "ZERO_ONE" },
      { label: "2-5 years", value: "TWO_FIVE" },
      { label: "6-10 years", value: "SIX_TEN" },
      { label: "10+ years", value: "TEN_OVER" },
    ],
    placeHolder: "Experience Level",
    rules: {
      required: true,
    },
  },
];
