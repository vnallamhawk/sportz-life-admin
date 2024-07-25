import classNames from "classnames";
import DatePicker from "react-datepicker";
import { dateFormat } from "~/helpers/date";
import { forwardRef, useState } from "react";
import { CgCalendarDates } from "react-icons/cg";
import Textbox from "~/components/Textbox/Textbox";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

export default function TimePickerWrapper({
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
  console.log(value, "ddsnmmnnf");
  return (
    <TimePicker
      onChange={(value) => onChangeHandler(value)}
      value={value}
      format="hh:mm a"
    />
  );
}
