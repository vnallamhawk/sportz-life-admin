export const InputType = ["textbox", "select", "calendar"] as const;

type Type = (typeof InputType)[number];

interface SelectOption {
  label: string;
  value: string;
  id: string;
}

export interface COACH_DETAILS_CONSTANTS_TYPES {
  label?: string;
  id: string;
  type: Type;
  placeHolder?: string;
  options?: SelectOption[];
  defaultValue?: string;
}
