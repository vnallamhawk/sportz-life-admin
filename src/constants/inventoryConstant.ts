import { MultiSelectOption } from "~/types/select";


export const INVENTORY_TABLE_HEADERS = [
  {
    id: "inventories",
    label: "Inventories",
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