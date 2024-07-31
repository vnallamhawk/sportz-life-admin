import React from "react";
// import type { InventoryData } from "~/types/center";
// import {options} from "../../constants/inventoryConstant"

interface BatchTime{
  [key:string]:string
}

export default function BatchTimeTableBody(data: BatchTime[]) {
  return (
    <>
      {data?.map(
        (
          {
            day,
            startTime,
            endTime,
          }: BatchTime,
          index: number
        ) => {
          return (
            <tr
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              key={`${day}-${index}`}
              className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
                {day}
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
