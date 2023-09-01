import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";

export default function CoachTableBody() {
  let tableData;
  const { data: coaches } = api.coach.getAllCoaches.useQuery();
  const { data: sports } = api.sports.getAllSports.useQuery();

  if (coaches && sports) {
    tableData = coaches.map((coach) => ({
      ...coach,
      batch: coach.batch.length,
      sports: coach.sports
        .map((sport) => sports.find((s) => s.id === sport.sportId)?.name)
        .join(","),
    }));
  }

  return (
    <>
      {tableData?.map(
        (
          { name, age, designation, sports, gender, batch, contactNumber },
          index
        ) => (
          <tr
            key={`${name}-${index}`}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="px-6 py-3 text-left">
              <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                <Checkbox.Indicator className="CheckboxIndicator">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </td>
            <td className="whitespace-nowrap px-6 py-3 text-left">{name}</td>
            <td className="px-6 py-3 text-left">{age}</td>
            <td className="px-6 py-3 text-left">{designation}</td>
            <td className="px-6 py-3 text-left">{sports}</td>
            <td className="px-6 py-3 text-left">{gender}</td>
            <td className="px-6 py-3 text-left">{batch}</td>
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
