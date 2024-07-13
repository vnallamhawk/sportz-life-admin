import React from "react";
import { BATCH_TIMING_TABLE_HEADERS } from "~/constants/batchConstant";

export default function BatchTimeTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {BATCH_TIMING_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
