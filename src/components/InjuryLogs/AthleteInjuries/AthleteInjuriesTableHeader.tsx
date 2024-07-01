import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ATHLETE_INJURY_LOGS_TABLE_HEADERS } from "~/constants/injuryLogsConstants";

export default function AthleteInjuriesTableHeader() {
  const getRenderComponent = (id: string, label?: string) => {
    let component;
    if (id === "kebabMenu") {
      component = (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="IconButton" aria-label="Customise options">
              <HamburgerMenuIcon />
            </button>
          </DropdownMenu.Trigger>
        </DropdownMenu.Root>
      );
    } else {
      component = label;
    }
    return component;
  };

  return (
    <tr className="text-sm uppercase leading-normal text-gray-600">
      {ATHLETE_INJURY_LOGS_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {getRenderComponent(id, label)}
        </th>
      ))}
    </tr>
  );
}
