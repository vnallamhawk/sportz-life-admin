import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// import { ATHLETE_INJURY_LOGS_TABLE_HEADERS } from "~/constants/injuryLogsConstants";
const ATHLETE_INJURY_LOGS_TABLE_HEADERS = [
  { id: "id1", label: "label1" },
  { id: "id2", label: "label2" },
  { id: "id3", label: "label3" },
];
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
      {ATHLETE_INJURY_LOGS_TABLE_HEADERS.map(
        ({ id, label }: { id: string; label: string }) => (
          <th key={id} className="px-6 py-3 text-left">
            {getRenderComponent(id, label)}
          </th>
        )
      )}
    </tr>
  );
}
