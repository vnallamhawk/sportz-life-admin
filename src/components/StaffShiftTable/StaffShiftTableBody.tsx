import React from "react";
// import type { InventoryData } from "~/types/center";
// import {options} from "../../constants/inventoryConstant"

interface StaffShift{
  day: string; shift: string; startTime: string; endTime: string
}

export default function StaffShiftTableBody(data: StaffShift[]) {
  return (
    <>
      {data?.map(
        (
          {
            day,
            shift,
            startTime,
            endTime,
          }:StaffShift,
          index: number
        ) => {
          return (
            <tr
              key={`${day}-${index}`}
              className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
                {day}
              </td>
              <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
                {shift}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {startTime}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {endTime}
              </td>
            </tr>
          );
        }
      )}
    </>
  );
}
