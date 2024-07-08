import React from "react";


export default function CenterDashInventoryTableBody() {

  //hardcoded table data
const  tableData = [
    {
      name: "whistle",
      quantity: 6,
      action: "Add More Quantity",
    },
    {
      name: "whistle",
      quantity: 6,
      action: "Add More Quantity",
    },
    {
      name: "whistle",
      quantity: 6,
      action: "Add More Quantity",
    },
    {
      name: "whistle",
      quantity: 6,
      action: "Add More Quantity",
    },
  ];

  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        // tableData?.map(({ name, address, batches, mobile }, index) => (
        tableData?.map(({ name, quantity, action }, index) => (
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
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {action}
            </td>
          </tr>
        ))}
    </>
  );
}
