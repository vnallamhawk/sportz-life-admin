import React from "react";

import * as Tooltip from "@radix-ui/react-tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function CenterDashBatchTableBody() {


  //hardcoded table data
  const tableData = [
    {
      name: "Tennis Beginner",
      Coach: "Andrew Martin",
      student: 3,
      Sport: "tennis",
      date: "24-06-2023",
    },
    {
      name: "Volleyball Advance",
      Coach: "gerge Higgins",
      student: 5,
      Sport: "Volleyball",
      date: "24-06-2023",
    },
    {
      name: "Cricket Beginner",
      Coach: "Rahul Dravid",
      student: 5,
      Sport: "Cricket",
      date: "24-06-2023",
    },
    {
      name: "Football Intermediate",
      Coach: "Sunil Chetri",
      student: 8,
      Sport: "Football",
      date: "24-06-2023",
    },
  ];

  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        // tableData?.map(({ name, address, batches, mobile }, index) => (
        tableData?.map(({ name, Coach, student, Sport, date }, index) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {Coach}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {student}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {Sport}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {date}
            </td>

            <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className="IconButton">
                      <DotsHorizontalIcon />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                      <div className="flex justify-evenly gap-3 rounded-lg bg-black p-2 text-[12px] text-white">
                        <p>Edit</p>
                        <p onClick={() => {}}>View</p>
                        <p>Delete</p>
                      </div>
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </td>
          </tr>
        ))}
    </>
  );
}
