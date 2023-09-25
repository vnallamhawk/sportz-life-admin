import classNames from "classnames";
import DatePicker from "react-datepicker";
import { useState } from "react";

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
  //console.log(value === "");
  // console.log(typeof value);
  //const [open, setOpen] = useState(false);
  //const datePickerRef = useRef<HTMLDivElement>(null);

  // useOutsideClick(datePickerRef, () => {
  //   setOpen(false);
  // });

  // const onDateSelected = ({ date }: { date: Date }) => {
  //   setSelectedDate(DATE_TIME_FORMAT.format(date));
  //   onChangeHandler && onChangeHandler(DATE_TIME_FORMAT.format(date));
  //   setOpen(false);
  // };
  function dateFormat(date: Date | undefined): string {
    if (date == undefined) return "";
    
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();
    const yyyy = date.getFullYear().toString();

    dd.length == 1 ? dd = "0" + dd : dd;
    mm.length == 1 ? mm = "0" + mm : mm;

    return dd + "/" + mm + "/" + yyyy;
  }

  return (
    <DatePicker 
      className={classNames("rounded-lg border-2 border-solid pl-3", {
        [className as string]: className !== "",
      })}
      placeholderText={ placeHolder }
      value={ 
        value?.toString() == "Invalid Date" ? 
          "" : 
          dateFormat(value)
      }
      selected={ 
        value?.toString() == "Invalid Date" ? 
          new Date() : 
          value
      } 
      onChange={ date => onChangeHandler!(date as Date) }
      showMonthDropdown
      showYearDropdown
      dropdownMode="select" 
      wrapperClassName="w-full" />
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
