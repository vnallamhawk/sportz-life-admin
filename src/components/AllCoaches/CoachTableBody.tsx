import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";
import { differenceInYears } from "date-fns";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface coachTableFilter {
  name: string
}

export default function CoachTableBody(filter: coachTableFilter, handleIsLoading: (isLoading: boolean) => void) {
  let tableData;
  const router = useRouter();

  const { data: coaches } = filter.name == "" ? 
    api.coach.getAllCoaches.useQuery() :
    api.coach.getCoachesByName.useQuery(filter);
  const { data: sports, isLoading } = api.sports.getAllSports.useQuery();

  if (coaches && sports) {
    tableData = coaches.map((coach) => ({
      ...coach,
      sports: coach?.sports
        ? coach?.sports
            ?.map((sport) => sports.find((s) => s.id === sport.sportId)?.name)
            ?.join(",")
        : "",
    }));
  }

  useEffect(() => {
    handleIsLoading(isLoading)
  }, [isLoading])

  const onClickHandler = (id: number) => {
    void router.push(`/coach/${id ?? ""}`);
  };

  return (
    <>
        {tableData?.map(
        (
          { name, dateOfBirth, designation, sports, gender, contactNumber, id },
          index
        ) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            onClick={() => onClickHandler(id)}
          >
            <td className="px-6 py-3 text-left">
              <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                <Checkbox.Indicator className="CheckboxIndicator">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </td>
            <td className="whitespace-nowrap px-6 py-3 text-left">{name}</td>
            <td className="px-6 py-3 text-left">
              {differenceInYears(new Date(), new Date(dateOfBirth))}
            </td>
            <td className="px-6 py-3 text-left">{designation}</td>
            <td className="px-6 py-3 text-left">{sports}</td>
            <td className="px-6 py-3 text-left">{gender}</td>
            <td className="px-6 py-3 text-left">{`batch`}</td>
            <td className="px-6 py-3 text-left">{contactNumber}</td>
            <td className="px-6 py-3 text-left">
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
