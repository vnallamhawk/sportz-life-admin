import React from "react";

export default function CenterDashInventoryTableBody(data: any) {
  return (
    <>
      {data &&
        data.length > 0 &&
        // tableData?.map(({ name, address, batches, mobile }, index) => (
        data?.map((inventory: any, index: number) => (
          <tr
            key={`${inventory?.id}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {inventory?.Inventories?.name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {inventory?.quantity}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              Remove
            </td>
          </tr>
        ))}
    </>
  );
}
