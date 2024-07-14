import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Dropdown, DropdownHeader } from "flowbite-react";

export default function TaxSlabTableBody(tableData) {
  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        tableData?.map(({ fromAmount, toAmount, tax_percent, id }, index) => (
          <tr
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
              {tax_percent}
            </td>
          
            <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
            <Dropdown label="" dismissOnClick={false} placement="top" className="view-drop bg-black rounded-lg" renderTrigger={() =>     
                        <button className="py-2">
                        <DotsHorizontalIcon />

                      </button>}>
                      <DropdownHeader>
                          <div className="flex items-center">
                              <button className="mx-1 text-white" >Edit</button>
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
