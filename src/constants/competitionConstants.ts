import type { FormValues } from "~/types/common";

export const COMPETITION_DETAILS_CONSTANTS: FormValues[] = [
    {
      label: "Competition Name",
      id: "name",
      type: "textbox",
      placeHolder:"Competition Name",
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
        options:[]
      },
      {
        label: "Age From",
        id: "ageFrom",
        type: "number",
        placeHolder:"Age From",
        rules: {
          required: true,
        },
      },
      {
        label: "Age To",
        id: "ageTo",
        type: "number",
        placeHolder:"Age To",
        rules: {
          required: true,
        },
      },

      {
        label: "Tournament Type",
        id: "tournamentType",
        type: "select",
        placeHolder:"Tournament Type",
        rules: {
          required: true,
        },
        options:[]
      },
    {
      label: "Registration Fee",
      id: "fee",
      type: "textbox",
      placeHolder: "Registration Fee",
      rules: {
        required: true,
      },
    },
    {
        label: "Start Date",
        id: "startDate",
        type: "calendar",
        placeHolder: "Start Date",
        rules: {
          required: true
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
      {
        label: "Venue Location",
        id: "venue",
        type: "textbox",
        placeHolder:"Venue Location",
        rules: {
          required: true,
          maxLength: {
            value: 35,
            message: "Too Many Characters",
          },
        },
      },
      {
        label: "City",
        id: "city",
        type: "select",
        placeHolder:"City",
        rules: {
          required: true,
         
        },
        options:[]
      },
      {
        label: "State",
        id: "state",
        type: "select",
        placeHolder:"State",
        rules: {
          required: true,
        },
        options:[]
      },
      {
        label: "Country",
        id: "country",
        type: "select",
        placeHolder:"Country",
        rules: {
          required: true,
        },
        options:[]
      },
    {
      label: "Event Description",
      id: "description",
      type: "textarea",
      placeHolder:"Event Description",
      rules: {
        required: true,
      },
    },
  
  ];

  export const COMPETITION_TABLE_HEADERS = [
    {
      label: "Competition Name",
      id: "name",
    },
    {
      label: "Sport",
      id: "sport",
    },
    {
      label: "Age Limit",
      id: "ageLimit",
    },
    {
      label: "Type",
      id: "tournamentType",
    },
    {
      label: "Competition Date",
      id: "competitionDate",
    },
    {
      label: "Entry Fee",
      id: "fee",
    },
    {
        label: "Action",
        id: "action",
      },
  ];