import type { FormValues } from "~/types/common";

export const FITNESS_PLAN_CONSTANTS: FormValues[] = [
    {
      label: "Select Fitness Component",
      id: "component",
      type: "select",
      placeHolder:"Select Fitness Component",
      rules: {
        required: true,
      },
    },
    {
      label: "Training level",
      id: "t_level",
      type: "select",
      placeHolder:"Training level",
      rules: {
        required: true,
      },
    },
    {
      label: "Plan Name",
      id: "name",
      type: "textbox",
      placeHolder: "Plan Name",
      rules: {
        required: true,
        maxLength: {
          value: 25,
          message: "Too Many Characters",
        },
      },
    },
    {
      label: "Resource : Add File/Image/Video",
      id: "image",
      type: "image",
      placeHolder: "Resource : Add File/Image/Video",
      rules: {
        required: true,
      },
    },{
        label: "Plan Duration: Daily",
        id: "duration",
        type: "select",
        placeHolder:"Plan Duration: Daily",
        rules: {
          required: true,
        },
      },

      {
        label: "Plan Description",
        id: "description",
        type: "textarea",
        placeHolder:"Plan Description",
        rules: {
          required: true,
        },
      },
      {
        label: "Plan Objective",
        id: "objective",
        type: "textarea",
        placeHolder:"Plan Objective",
        rules: {
          required: true,
        },
      },
      {
        label: "Coaching Points",
        id: "points",
        type: "textarea",
        placeHolder:"Coaching Points",
        rules: {
          required: true,
        },
      },
  ];
  