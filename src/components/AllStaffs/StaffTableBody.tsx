import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import { differenceInYears } from "date-fns";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NO_DATA } from "~/globals/globals";
import { centerDictionaryServices } from "~/services/centerServices";

interface staffTableFilter {
  name: string;
}

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
      {staffs?.map(
        (
          { center, name, dateOfBirth, designation, gender, contactNumber, id },
          index
        ) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            onClick={() => onClickHandler(id)}
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
              {differenceInYears(new Date(), new Date(dateOfBirth))}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {designation}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {gender}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {center?.length
                ? center
                    .map(({ centerId }) => centerDictionary?.[centerId]?.name)
                    .join(", ")
                : NO_DATA}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {contactNumber}
            </td>
            <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="IconButton" aria-label="Customise options">
                    <HamburgerMenuIcon />
                  </button>
                </DropdownMenu.Trigger>
              </DropdownMenu.Root>
            </td>
          </tr>
        )
      )}
    </>
  );
}
