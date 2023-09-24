import * as Popover from "@radix-ui/react-select";
import Datepicker from "./DatePicker";
import Textbox from "~/components/Textbox/Textbox";
import { useRef, useState } from "react";
import { DATE_TIME_FORMAT } from "~/globals/globals";
import useOutsideClick from "~/hooks/useOutsideClick";

export default function DatePickerWrapper({
  value,
  className,
  placeHolder,
  onChangeHandler,
}: {
  className?: string;
  placeHolder?: string;
  onChangeHandler?: (arg0: string) => void;
  value?: string;
}) {
  console.log(value === "");
  console.log(typeof value);
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(datePickerRef, () => {
    setOpen(false);
  });

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
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          value={value === "" ? "" : selectedDate}
          placeHolder={placeHolder}
        />
      </Popover.Trigger>
      <Popover.Content style={{ width: 250 }}>
        <Datepicker onDateSelected={onDateSelected} ref={datePickerRef} />
      </Popover.Content>
    </Popover.Root>
  );
}
