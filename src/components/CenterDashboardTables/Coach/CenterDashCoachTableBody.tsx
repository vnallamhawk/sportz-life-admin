import React from "react";

export default function CenterDashCoachTableBody() {

  //hardcoded table data
  const tableData = [
    {
      name: "John.h.martin",
      coaching: "Basketball",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
    {
      name: "John.h.martin2",
      coaching: "Basketball2",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
    {
      name: "John.h.martin3",
      coaching: "Basketball3",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
    {
      name: "John.h.martin4",
      coaching: "Basketball4",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
  ];

  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        tableData?.map(({ name, coaching, age, batches, phone }, index) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {coaching}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {age}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {batches}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {phone}
            </td>
          </tr>
        ))}
    </>
  );
}
