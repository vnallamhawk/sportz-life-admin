import { COACH_TABLE_HEADERS } from "~/constants/coachConstants";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";

export default function CoachTableHeader() {
  const getRenderComponent = (id: string, label?: string) => {
    let component;
    if (id === "selectControl") {
      component = (
        <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      );
    } else if (id === "kebabMenu") {
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
      {COACH_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {getRenderComponent(id, label)}
        </th>
      ))}
    </tr>
  );
}
