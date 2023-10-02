import classNames from "classnames";
import DatePicker from "react-datepicker";
import { dateFormat } from "~/helpers/date";
import { forwardRef } from "react";
import { CgCalendarDates } from "react-icons/cg";
import Textbox from "~/components/Textbox/Textbox";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerWrapper({
  value,
  className,
  placeHolder,
  onChangeHandler,
}: {
  className?: string;
  placeHolder?: string;
  onChangeHandler?: (arg0: Date) => void;
  value?: Date;
}) {
  const CustomInput = forwardRef(function CustomInput(
    {
      value,
      onClick,
      onChange,
    }: {
      value: string;
      onClick: React.MouseEventHandler;
      onChange: React.MouseEventHandler;
    },
    ref
  ): JSX.Element {
    return (
      <div>
        <Textbox
          value={value}
          className="h-12 w-full"
          onClick={onClick}
          onChange={onChange}
          placeHolder={placeHolder}
          ref={ref}
        ></Textbox>
        <CgCalendarDates className="date-picker-icon"></CgCalendarDates>
      </div>
    );
  });

  return (
    <DatePicker
      className={classNames("rounded-lg border-2 border-solid pl-3", {
        [className as string]: className !== "",
      })}
      placeholderText={placeHolder}
      value={value?.toString() == "Invalid Date" ? "" : dateFormat(value)}
      selected={value?.toString() == "Invalid Date" ? new Date() : value}
      onChange={(date) => onChangeHandler?.(date as Date)}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      wrapperClassName="w-full"
      customInput={<CustomInput />}
    />
    // </div>
    // <Popover.Root open={open}>
    //   <Popover.Trigger>
    //     <Textbox
    //       className={className}
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         setOpen(true);
    //       }}
    //       value={value === "" ? "" : selectedDate.toString()}
    //       placeHolder={placeHolder}
    //     />
    //   </Popover.Trigger>
    //   <Popover.Content style={{ width: 250 }}>
    //     {/*<Datepicker onDateSelected={onDateSelected} ref={datePickerRef} />*/}
    //   </Popover.Content>
    // </Popover.Root>
  );
}
