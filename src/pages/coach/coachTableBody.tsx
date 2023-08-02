import { coachTableBodyStub } from "./__stubs__/coachStubs";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";

export default function CoachTableBody() {
  return (
    <>
      {coachTableBodyStub.map(
        (
          {
            coachName,
            age,
            designation,
            sportCoaching,
            gender,
            batches,
            contactNo,
          },
          index
        ) => (
          <tr
            key={`${coachName}-${index}`}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="px-6 py-3 text-left">
              <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                <Checkbox.Indicator className="CheckboxIndicator">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </td>
            <td className="whitespace-nowrap px-6 py-3 text-left">
              {coachName}
            </td>
            <td className="px-6 py-3 text-left">{age}</td>
            <td className="px-6 py-3 text-left">{designation}</td>
            <td className="px-6 py-3 text-left">{sportCoaching}</td>
            <td className="px-6 py-3 text-left">{gender}</td>
            <td className="px-6 py-3 text-left">{batches}</td>
            <td className="px-6 py-3 text-left">{contactNo}</td>
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
