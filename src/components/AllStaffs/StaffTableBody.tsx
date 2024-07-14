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
import { useEffect } from "react";
import { NO_DATA } from "~/globals/globals";
import { centerDictionaryServices } from "~/services/centerServices";
import { Dropdown, DropdownHeader } from "flowbite-react";
import Image from "next/image";

interface staffTableFilter {
  name: string;
}

let tableData = [
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

  const { data: centers } = api.center.getAllCenters.useQuery();

  const { data: staffs, isLoading } =
    filter.name == ""
      ? api.staff.getAllStaffs.useQuery()
      : api.staff.getAllStaffsByName.useQuery(filter);
  const centerDictionary = centerDictionaryServices(centers);

  useEffect(() => {
    handleIsLoading(isLoading);
  }, [handleIsLoading, isLoading]);

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
              onClick={() => {}}
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
                        onClick={() => router.push(`/edit-center-${id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="mx-1 text-white"
                        onClick={() => router.push(`/centers/${id ?? ""}`)}
                      >
                        View
                      </button>
                      <button
                        className="mx-1 text-white"
                        onClick={() => deleteCenter(id)}
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
