import React from "react";
import Button from "~/components/Button";
import { type BatchData } from "~/types/coach";
import * as Tooltip from "@radix-ui/react-tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

interface centerTableFilter {
  str: string;
}
const testData = [
  {
    centerName: "test",
    location: "delhi",
    batches: 3,
    contactNumber: "1234566",
  },
  {
    centerName: "test2",
    location: "mohali",
    batches: 2,
    contactNumber: "1234566",
  },
  {
    centerName: "test3",
    location: "haryana",
    batches: 1,
    contactNumber: "1234566",
  },
];

export default function CenterBatchTableBody(
  data: BatchData[],
  handleLoading: (isLoading: boolean) => void
) {
  return (
    <>
      {testData?.map(
        ({ centerName, location, batches, contactNumber }, index) => (
          <tr
            key={`${centerName}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            onClick={() => {}}
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {centerName}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {location}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {batches}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {contactNumber}
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
                        <p>View</p>
                        <p>Delete</p>
                      </div>
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </td>
          </tr>
        )
      )}
    </>
  );
}
