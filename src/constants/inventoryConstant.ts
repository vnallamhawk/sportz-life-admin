import type { MultiSelectOption } from "~/types/select";

export const INVENTORY_TABLE_HEADERS = [
  {
    id: "name",
    label: "Inventory",
  },
  {
    label: "Qty",
    id: "quantity",
  },
  {
    label: "Action",
    id: "action",
  },
];
export const DRILL_INVENTORY_TABLE_HEADERS = [
  {
    id: "name",
    label: "Equipment",
  },
  {
    label: "Qty",
    id: "quantity",
  },
  {
    label: "Action",
    id: "action",
  },
];
export const options: MultiSelectOption[] = [
  {
    label: "Wristle",
    value: "wristle",
  },
  {
    label: "Mat Carpet",
    value: "mat_carpet",
  },
  { label: "White Board", value: "white_board" },
];
