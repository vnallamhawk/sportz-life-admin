import React from "react";
import Button from "~/components/Button";
import { type BatchData } from "~/types/coach";
import * as Tooltip from "@radix-ui/react-tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface centerTableFilter {
  str: string;
}
const testData = [
  {
    inventories: "Wristle",
    quantity: 20,
    action: "Remove",
  },
  {
    inventories: "Mat Carpet",
    quantity: 2,
    action: "Remove",
  },
  {
    inventories: "White Board",
    quantity: 2,
    action: "Remove",
  },
];

export default function InventoryTableBody(
  data: BatchData[],
  handleLoading: (isLoading: boolean) => void
) {
  return (
    <>
      {testData?.map(({ inventories, quantity, action }, index) => (
        <tr
          key={`${inventories}-${index}`}
          className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          onClick={() => {}}
        >
          <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
            {inventories}
          </td>
          <td className="border-y-2 border-solid px-6 py-3 text-left">
            {quantity}
          </td>
          <td className="border-y-2 border-solid px-6 py-3 text-left">
            {action}
          </td>
        </tr>
      ))}
    </>
  );
}
