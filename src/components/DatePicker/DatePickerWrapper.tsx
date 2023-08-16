import * as Popover from "@radix-ui/react-select";
import Datepicker from "./DatePicker";
import Textbox from "~/components/Textbox/Textbox";
import { useState } from "react";
import { DATE_TIME_FORMAT } from "~/globals/globals";

export default function DatePickerWrapper({
  placeHolder,
}: // onDateSelectedCallback,
{
  placeHolder: string;
  // onDateSelectedCallback: ({ date }: { date: Date }) => void;
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);

  const onDateSelected = ({ date }: { date: Date }) => {
    setSelectedDate(DATE_TIME_FORMAT.format(date));
    // onDateSelectedCallback();
    setOpen(false);
  };
  return (
    <Popover.Root open={open}>
      <Popover.Trigger>
        <Textbox
          onClick={() => setOpen(true)}
          value={selectedDate}
          placeHolder={placeHolder}
        />
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Datepicker onDateSelected={onDateSelected} />
      </Popover.Content>
    </Popover.Root>
  );
}
