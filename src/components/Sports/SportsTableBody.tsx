import React from "react";
import type { SportsData } from "~/types/center";

export default function SportsTableBody(
  data: SportsData[],
  removeSports: any,
  finalOptions: any
) {
  return (
    <>
      {data?.map(({ value }, index) => {
        const label = finalOptions?.find(
          (op: any) => op?.value == value
        )?.label;

        return (
          <tr
            key={`${value}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {label}
            </td>
            <td
              className="border-y-2 border-solid px-6 py-3 text-left"
              onClick={() => removeSports(index)}
            >
              Remove
            </td>
          </tr>
        );
      })}
    </>
  );
}
