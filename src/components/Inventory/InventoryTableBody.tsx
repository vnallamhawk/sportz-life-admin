import React from "react";
import type { InventoryData } from "~/types/center";


export default function InventoryTableBody(
  data: InventoryData[],
  removeInventory
) {
  return (
    <>
      {data?.map(({ name, quantity }, index) => (
        <tr
          key={`${name}-${index}`}
          className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
        >
          <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
            {name}
          </td>
          <td className="border-y-2 border-solid px-6 py-3 text-left">
            {quantity}
          </td>
          <td className="border-y-2 border-solid px-6 py-3 text-left"           onClick={() => removeInventory(index)}>
            Remove
          </td>
        </tr>
      ))}
    </>
  );
}
