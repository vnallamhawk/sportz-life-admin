import * as Popover from "@radix-ui/react-select";
import Datepicker from "./DatePicker";
import Textbox from "~/components/Textbox/Textbox";

export default function DatePickerWrapper({
  placeHolder,
  onDateSelected,
}: {
  placeHolder: string;
  onDateSelected: ({ date }: { date: Date }) => void;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Textbox type="text" value={placeHolder} />
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Datepicker onDateSelected={onDateSelected} />
      </Popover.Content>
    </Popover.Root>
  );
}
