import React from "react";

import * as Tooltip from "@radix-ui/react-tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { Dropdown, DropdownHeader } from "flowbite-react";

export default function CenterDashBatchTableBody(tableData,center) {
  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        // tableData?.map(({ name, address, batches, mobile }, index) => (
        tableData?.map(({ name, Coach, capacity, Sports, date }, index) => (
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
              {capacity}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {Sports?.name}
            </td>
            {/* <td className="border-y-2 border-solid px-6 py-3 text-left">
              {date}
            </td> */}

            <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
            <Dropdown label="" dismissOnClick={false} placement="top" className="view-drop bg-black rounded-lg" renderTrigger={() =>     
                        <button className="py-2">
                        <DotsHorizontalIcon />

                      </button>}>
                      <DropdownHeader>
                          <div className="flex items-center">
                              <button className="mx-1 text-white" >Edit</button>
                              <button className="mx-1 text-white">View</button>
                              <button className="mx-1 text-white">Delete</button>
                          </div>
                      </DropdownHeader>                    
                      </Dropdown>  
            </td>
          </tr>
        ))}
    </>
  );
}
