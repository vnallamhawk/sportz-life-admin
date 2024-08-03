import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Dropdown, DropdownHeader } from "flowbite-react";



export default function TaxSlabTableBody(tableData:any) {
  return (
    <>
      {tableData &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        tableData.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        tableData?.map(
          (
            {
              fromAmount,
              toAmount,
              percentage,
              id,
            }:any,
            index: number
          ) => (
            <tr
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              key={`${id}-${index}`}
              className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
                {fromAmount}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {toAmount}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {percentage}
              </td>

              <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  placement="top"
                  className="view-drop rounded-lg bg-black"
                  renderTrigger={() => (
                    <button className="py-2">
                      <DotsHorizontalIcon />
                    </button>
                  )}
                >
                  <DropdownHeader>
                    <div className="flex items-center">
                      <button className="mx-1 text-white">Edit</button>
                      <button className="mx-1 text-white">Delete</button>
                    </div>
                  </DropdownHeader>
                </Dropdown>
              </td>
            </tr>
          )
        )}
    </>
  );
}
