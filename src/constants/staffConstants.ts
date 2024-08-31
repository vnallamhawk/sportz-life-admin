import type { FormValues } from "~/types/common";
import { type STAFF_DETAILS_CONSTANTS_TYPES } from "~/types/staff";

export const STAFF_TABLE_HEADERS = [
  {
    label: "Staff Name",
    id: "name",
  },
  {
    label: "Designation",
    id: "designation",
  },
  {
    label: "Age",
    id: "age",
  },
  {
    label: "Gender",
    id: "gender",
  },
  {
    label: "Center",
    id: "center",
  },
  {
    label: "Contact No",
    id: "phone",
  },
  {
    label:"Action",
    id:"action"
  }
];
export const STAFF_DASH_CENTER_TABLE_HEADERS = [
  {
    label: "Center Name",
    id: "center",
  },
  {
    label: "Location",
    id: "location",
  },
  {
    label: "No. of Shifts",
    id: "no_of_shifts",
  },
  {
    label: "No. of Students",
    id: "no_of_students",
  },
  {
    label: "No. of batches",
    id: "no_of_batches",
  },
  {
    label: "Action",
    id: "action",
  },
];
export const STAFF_DASH_PAYROLL_TABLE_HEADERS = [
  {
    label: "Months",
    id: "months",
  },
  {
    label: "Payroll",
    id: "payroll",
  },
  {
    label: "Salary Date",
    id: "salary_date",
  },
  {
    label: "Payment Status",
    id: "payment_status",
  },
  {
    label: "Amount",
    id: "amount",
  },
];
export const STAFF_DASH_DUTY_TABLE_HEADERS = [
  {
    label: "Days",
    id: "days",
  },
  {
    label: "Shift name",
    id: "shift_name",
  },
  {
    label: "Center name",
    id: "center_name",
  },
  {
    label: "Shift start time",
    id: "start_time",
  },
  {
    label: "Shift start time",
    id: "end_time",
  },
];
export const STAFF_DETAILS_CONSTANTS: FormValues[] = [
  {
    label: "Staff Name",
    placeHolder: "Staff Name",
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
    options: [
      { label: "payroll1", value: "Pay1" },
      { label: "payroll2", value: "Pay2" },
    ],
    placeHolder: "Select Designation",
    rules: {
      required: true,
    },
  },
  {
    label: "Phone Number",
    id: "phone",
    placeHolder: "Phone Number",
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
    placeHolder: "Email Address",
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
    label: "Payroll",
    id: "payroll",
    type: "select",
    options: [
      { label: "payroll1", value: "Pay1" },
      { label: "payroll2", value: "Pay2" },
    ],
    placeHolder: "Select Payroll",
    rules: {
      required: true,
    },
  },
  {
    label: "Center",
    id: "center",
    type: "select",
    options: [
      { label: "center1", value: "Center1" },
      { label: "center2", value: "Center2" },
    ],
    placeHolder: "Select Center",
    rules: {
      required: true,
    },
  },
];

export const STAFF_SHIFT_CONSTANTS = [
  {
    label: "Day",
    id: "day",
    type: "select",
    placeHolder: "Select Day",
    options: [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
    ],
    rules: {
      required: true,
    },
  },
  {
    label: "Shift",
    id: "shift",
    type: "select",
    options: [
      { label: "Day", value: "day" },
      { label: "Night", value: "night" },
    ],
    placeHolder: "Select Shift",
    rules: {
      required: true,
    },
  },
  {
    label: "Start Time",
    id: "startTime",
    type: "time",
    rules: {
      required: true,
    },
  },
  {
    label: "End Time",
    id: "endTime",
    type: "time",
    rules: {
      required: true,
    },
  },
];
