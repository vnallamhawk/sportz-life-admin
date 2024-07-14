import React from "react";

export default function CenterDashAthleteTableBody() {

  //hardcoded table data
  const tableData = [
    {
      name: "John.h.martin",
      age: 33,
      sport: "Basketball",
      level: "beginner",
    },
    {
      name: "John.h.martin",
      age: 33,
      sport: "Basketball",
      level: "beginner",
    },
    {
      name: "John.h.martin",
      age: 33,
      sport: "Basketball",
      level: "beginner",
    },
    {
      name: "John.h.martin",
      age: 33,
      sport: "Basketball",
      level: "beginner",
    },
  ];

  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        // tableData?.map(({ name, address, batches, mobile }, index) => (
        tableData?.map(({ name, age, sport, level }, index) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {age}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {sport}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {level}
            </td>
          </tr>
        ))}
    </>
  );
}
