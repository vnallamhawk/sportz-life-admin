import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import { differenceInYears } from "date-fns";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface coachTableFilter {
  name: string;
}

export default function CoachTableBody(
  filter: coachTableFilter,
  handleIsLoading: (isLoading: boolean) => void
) {
  let tableData;
  const router = useRouter();

  const { data: centers } =
    filter.name == ""
      ? api.center.getAllCenters.useQuery()
      : api.center.getCentersByName.useQuery(filter);
  const { data: sports, isLoading } = api.sports.getAllSports.useQuery();

  if (centers && sports) {
    tableData = centers.map((center) => ({
      ...center,
      // sports: coach?.sports
      //   ? coach?.sports
      //       ?.map((sport) => sports.find((s) => s.id === sport.sportId)?.name)
      //       ?.join(",")
      //   : "",
    }));
  }

  useEffect(() => {
    handleIsLoading(isLoading);
  }, [handleIsLoading, isLoading]);

  const onClickHandler = (id: number) => {
    void router.push(`/centers/${id ?? ""}`);
  };

  return (
    <>
      {/* {tableData?.map(({ name, location, email, phoneNumber, id }, index) => ( */}
      {tableData?.map(({ name, email, id }, index) => (
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
          {/* <td className="border-y-2 border-solid px-6 py-3 text-left">
              {differenceInYears(new Date(), new Date(dateOfBirth))}
            </td> */}

          {/* <td className="border-y-2 border-solid px-6 py-3 text-left">
              {location}
            </td> */}

          {/* <td className="border-y-2 border-solid px-6 py-3 text-left">
              {sports}
            </td> */}
          <td className="border-y-2 border-solid px-6 py-3 text-left">
            {email}
          </td>
          <td className="border-y-2 border-solid px-6 py-3 text-left">{`batch`}</td>

          {/* <td className="border-y-2 border-solid px-6 py-3 text-left">
              {phoneNumber}
            </td> */}

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
      ))}
    </>
  );
}
