import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  CheckIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import { differenceInYears } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NO_DATA } from "~/globals/globals";
import { centerDictionaryServices } from "~/services/centerServices";
import { Dropdown, DropdownHeader } from "flowbite-react";
import Image from "next/image";
import moment from "moment-timezone";

interface staffTableFilter {
  name: string;
}

const tableData = [
  {
    name: "staff1",
    designation: "desig1",
    age: 25,
    gender: "male",
    center: "center1",
    contact: "+3543415224",
  },
  {
    name: "staff1",
    designation: "desig1",
    age: 25,
    gender: "male",
    center: "center1",
    contact: "+3543415224",
  },
  {
    name: "staff1",
    designation: "desig1",
    age: 25,
    gender: "male",
    center: "center1",
    contact: "+3543415224",
  },
  {
    name: "staff1",
    designation: "desig1",
    age: 25,
    gender: "male",
    center: "center1",
    contact: "+3543415224",
  },
];

export default function StaffTableBody(
  filter: staffTableFilter,
  handleIsLoading: (isLoading: boolean) => void
) {
  // let tableData;
  const router = useRouter();

  // const [tableData, setTableData] = useState([]);

  const { data: centers } = api.staff.getAllStaffs.useQuery();

  const { data: staffs, isLoading } =
    filter.name == ""
      ? api.staff.getAllStaffs.useQuery()
      : api.staff.getAllStaffsByName.useQuery(filter);
  // const centerDictionary = centerDictionaryServices(centers);


  useEffect(() => {
    if (staffs && staffs.length > 0) {
      // setTableData(staffs)
      handleIsLoading(false);
    } else {
      handleIsLoading(isLoading);
    }
  }, [handleIsLoading, isLoading, staffs]);

  // delete mutate
  // const { mutate: deleteMutate } = api.staff.deleteStaff.useMutation({
  //   onSuccess: (response) => {
  //     let arr = [...tableData]
  //     const index = tableData?.findIndex((item) => item?.id == response?.id);
  //     if (index > -1) {
  //       arr.splice(index,1)
  //     }
  //     setTableDate(arr);
  //     return response;
  //   }
  // })

  // const deleteStaff = (id: number) => {
  //   deleteMutate({ staffId: id, deletedAt: moment().toISOString() });
  // }

  const onClickHandler = (id: number) => {
    void router.push(`/staff/${id ?? ""}`);
  };

  return (
    <>
      {
        // staffs?.map(
        // (
        //   { center, name, dateOfBirth, designation, gender, contactNumber, id },
        //   index
        // ) => (
        tableData.map(
          ({ name, center, age, gender, contact, designation }, index) => (
            <tr
              key={`${name}-${index}`}
              className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
              // onClick={() => onClickHandler(id)}
              // onClick={() => {}}
            >
              <td className="rounded-l-lg border-y-2 border-l-2 border-solid pl-5">
                <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                  <Checkbox.Indicator className="CheckboxIndicator">
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </td>
              <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
                {name}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {/* {differenceInYears(new Date(), new Date(dateOfBirth))} */}
                {designation}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {age}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {gender}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {/* {center?.length
                ? center
                    .map(({ centerId }) => centerDictionary?.[centerId]?.name)
                    .join(", ")
                : NO_DATA} */}
                {center}
              </td>
              <td className="border-y-2 border-solid px-6 py-3 text-left">
                {contact}
              </td>
              {/* <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      className="IconButton"
                      aria-label="Customise options"
                    >
                      <HamburgerMenuIcon />
                    </button>
                  </DropdownMenu.Trigger>
                </DropdownMenu.Root>
              </td> */}

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
                        // onClick={() => router.push(`/edit-staff-${id}`)}
                        // onClick={() => {}}
                      >
                        Edit
                      </button>
                      <button
                        className="mx-1 text-white"
                        // onClick={() => router.push(`/staffs/${id ?? ""}`)}
                        // onClick={() => {}}
                      >
                        View
                      </button>
                      <button
                        className="mx-1 text-white"
                        // onClick={() => deleteStaff(id)}
                        // onClick={() => {}}
                      >
                        Delete
                      </button>
                    </div>
                  </DropdownHeader>
                </Dropdown>
              </td>
            </tr>
          )
        )
      }
    </>
  );
}
