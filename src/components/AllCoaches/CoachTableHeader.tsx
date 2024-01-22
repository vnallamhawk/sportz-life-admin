import { COACH_TABLE_HEADERS } from "~/constants/coachConstants";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";

export default function CoachTableHeader() {
  const getRenderComponent = (id: string, label?: string) => {
    let component;
    if (id === "selectControl") {
      component = (
        <Checkbox.Root className="absolute left-1 top-0 h-full w-full" id="c1">
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
    <tr className="text-base leading-tight text-neutral-400 ">
      {COACH_TABLE_HEADERS.map(({ id, label }) => (
        <th
          key={id}
          className="font-['DM Sans'] relative w-3 rounded-md border-red-100 text-left font-medium first:border-2 first:text-center "
        >
          {getRenderComponent(id, label)}
        </th>
      ))}
    </tr>
  );
}
