import React, { useEffect } from "react";
import DatePicker, {
  type ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import CardTitle from "~/components/Card/CardTitle";

export default function CoachAttendanceCalendarView() {
  const customHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: ReactDatePickerCustomHeaderProps) => (
    <div className="flex flex-row">
      <button
        className="mx-4 cursor-pointer border-0 text-gray-500"
        onClick={decreaseMonth}
      >
        &#60;
      </button>
      <span className="grow leading-10">
        {date.toLocaleString("default", { month: "long" })}
        &#160;
        {date.getFullYear().toString()}
      </span>
      <button
        className="mx-4 cursor-pointer border-0 text-gray-500"
        onClick={increaseMonth}
      >
        &#62;
      </button>
    </div>
  );

  const formatWeekDay = (day: string) => (
    <div className="text-xs text-gray-500">{day.slice(0, 3).toUpperCase()}</div>
  );

  const renderDayContents = (dayOfMonth: number, date?: Date) => {
    if (dayOfMonth % 2 == 0)
      return (
        <div className={`relative`}>
          <div className="text-indigo-600">{dayOfMonth}</div>
          <div className="text-ls absolute inset-0 top-3 text-indigo-600">
            ●
          </div>
        </div>
      );
    return <div>{dayOfMonth}</div>;
  };

  return (
    <div className="coachAttendanceCalendarView ml-5 mr-5 mt-5 w-full flex-1 rounded-xl border p-5">
      <div className="text-lg font-bold">CALENDAR VIEW</div>
      <DatePicker
        onChange={() => {
          /* do nothing */
        }}
        renderCustomHeader={customHeader}
        inline
        readOnly
        onSelect={() => {
          /* do nothing */
        }}
        formatWeekDay={formatWeekDay}
        renderDayContents={renderDayContents}
      />
    </div>
  );
}
