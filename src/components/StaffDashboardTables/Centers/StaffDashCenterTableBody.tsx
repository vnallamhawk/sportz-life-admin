import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Dropdown, DropdownHeader } from "flowbite-react";
import React from "react";
const tableData = [
  {
    centerName: "Netaji Indoor Stadium",
    location: "Belepole,Howarh",
    no_of_staff: 30,
    no_of_student: 64,
    no_of_batches: 12,
  },
  {
    centerName: "Netaji Indoor Stadium",
    location: "Belepole,Howarh",
    no_of_staff: 30,
    no_of_student: 64,
    no_of_batches: 12,
  },
  {
    centerName: "Netaji Indoor Stadium",
    location: "Belepole,Howarh",
    no_of_staff: 30,
    no_of_student: 64,
    no_of_batches: 12,
  },
];
export default function StaffDashCenterTableBody(data = []) {
  return (
    <>
      {/* {
        data &&
        data.length > 0 &&
        //  tableData?.map(({ name, address, batches, mobile }, index) => (
         data?.map((inventory, index) => (
          <tr
            key={`${inventory?.id}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {inventory?.Inventories?.name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {inventory?.quantity}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              Remove
            </td>
          </tr>
        ))} */}
      {tableData?.map(
        (
          { centerName, location, no_of_staff, no_of_student, no_of_batches },
          index
        ) => (
          <tr
            key={`${centerName}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {centerName}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {location}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {no_of_staff}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {no_of_student}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {no_of_batches}
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
                    <button
                      className="mx-1 text-white"
                      //   onClick={() => router.push(`/edit-center-${id}`)}
                      onClick={() => {}}
                    >
                      Edit
                    </button>
                    <button
                      className="mx-1 text-white"
                      //   onClick={() => router.push(`/centers/${id ?? ""}`)}
                      onClick={() => {}}
                    >
                      View
                    </button>
                    <button
                      className="mx-1 text-white"
                      //   onClick={() => deleteCenter(id)}
                      onClick={() => {}}
                    >
                      Delete
                    </button>
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
