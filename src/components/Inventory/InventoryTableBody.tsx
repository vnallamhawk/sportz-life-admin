import React from "react";
import type { InventoryData } from "~/types/center";
// import {options} from "../../constants/inventoryConstant"

export default function InventoryTableBody(
  data: InventoryData[],
  removeInventory: any,
  finalOptions: any
) {
  return (
    <>
      {data?.map(({ value, quantity }, index) => {
        const label = finalOptions?.find(
          (op: any) => op?.value == value
        )?.label;
        return (
          <tr
            key={`${value}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {label}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {quantity}
            </td>
            <td
              className="border-y-2 border-solid px-6 py-3 text-left"
              onClick={() => removeInventory(index)}
            >
              Remove
            </td>
          </tr>
        );
      })}
    </>
  );
}
