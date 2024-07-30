// export const STAFF_DETAILS_CONSTANT: CENTER_DETAILS_CONSTANTS_TYPES[] = [
export const STAFF_DETAILS_CONSTANT = [
  {
    label: "Designation",
    id: "designationId",
    type: "select",
    placeholder: "Select Designation",
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
