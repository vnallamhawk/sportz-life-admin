import React from "react";
import { SPORTS_TABLE_HEADERS } from "~/constants/sportConstants";

export default function InventoryTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {SPORTS_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
