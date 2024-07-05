import React from "react";
import { INVENTORY_TABLE_HEADERS } from "~/constants/inventoryConstant";

export default function InventoryTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {INVENTORY_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
