import type { FormValues } from "~/types/common";

export const STAFF_DETAILS_CONSTANT: FormValues[] = [
    {
      label: "Designation",
      id: "designationId",
      type: "select",
      placeHolder:"Select Designation",
      rules: {
        required: true,
       
      },
    },
    {
      label: "Salary Amount",
      id: "grossSalary",
      type: "number",
      rules: {
        required: true,
        maxLength: {
          value: 25,
          message: "Too Many Characters",
        },
      },
    },
    {
        label: "Taxable",
        id: "taxable",
        type: "switch",
        rules: {
          required: true,
          maxLength: {
            value: 25,
            message: "Too Many Characters",
          },
        },
      },
    // {
    //   label: "Tax Deduction",
    //   id: "percentage",
    //   type: "number",
    //   rules: {
    //     required: true,
    //     maxLength: {
    //       value: 25,
    //       message: "Too Many Characters",
    //     },
    //   },
    // },
   
  ];