import * as Popover from "@radix-ui/react-select";
import Datepicker from "./DatePicker";
import Textbox from "~/components/Textbox/Textbox";
import { useState } from "react";
import { DATE_TIME_FORMAT } from "~/globals/globals";

export default function DatePickerWrapper({
  className,
  placeHolder,
  onChangeHandler,
}: {
  className?: string;
  placeHolder?: string;
  onChangeHandler?: (arg0: string) => void;
  value?: string;
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);

  const onDateSelected = ({ date }: { date: Date }) => {
    setSelectedDate(DATE_TIME_FORMAT.format(date));
    onChangeHandler && onChangeHandler(DATE_TIME_FORMAT.format(date));
    setOpen(false);
  };
  return (
    <Popover.Root open={open}>
      <Popover.Trigger>
        <Textbox
          className={className}
          onClick={() => setOpen(true)}
          value={selectedDate}
          placeHolder={placeHolder}
        />
      </Popover.Trigger>
      <Popover.Content style={{ width: 250 }}>
        <Datepicker onDateSelected={onDateSelected} />
      </Popover.Content>
    </Popover.Root>
  );
}
