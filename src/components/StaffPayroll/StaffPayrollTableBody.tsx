import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Dropdown, DropdownHeader } from "flowbite-react";

export default function StaffPayrollTableBody(tableData: any) {
  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        tableData?.map(
          (
            {
              StaffDesignation,
              grossSalary,
              tax,
              netSalary,
              id,
            }: {
              StaffDesignation: any;
              grossSalary: number;
              tax: number | string;
              netSalary: number;
              id: number;
            },
            index: number
          ) => (
            <tr
              key={`${id}-${index}`}
              className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
                {StaffDesignation?.designation}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {grossSalary}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {grossSalary - netSalary}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {netSalary}
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
