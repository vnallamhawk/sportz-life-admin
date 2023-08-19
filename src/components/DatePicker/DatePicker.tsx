import React from "react";
import { useDayzed } from "dayzed";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DatePicker {
  onDateSelected: ({ date }: { date: Date }) => void;
}

export default function DatePicker(props: DatePicker) {
  const { calendars, getBackProps, getForwardProps, getDateProps } =
    useDayzed(props);
  if (calendars.length) {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div>
          <button {...getBackProps({ calendars })}>Back</button>
          <button {...getForwardProps({ calendars })}>Next</button>
        </div>
        {calendars.map((calendar) => (
          <div
            key={`${calendar.month}${calendar.year}`}
            style={{
              display: "inline-block",
              // width: "65%",
              padding: "0 10px 30px",
              boxSizing: "border-box",
            }}
          >
            <div>
              {monthNamesShort[calendar.month]} {calendar.year}
            </div>
            {weekdayNamesShort.map((weekday) => (
              <div
                key={`${calendar.month}${calendar.year}${weekday}`}
                style={{
                  display: "inline-block",
                  width: "calc(100% / 7)",
                  border: "none",
                  background: "transparent",
                }}
              >
                {weekday}
              </div>
            ))}
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, index) => {
                const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                if (!dateObj) {
                  return (
                    <div
                      key={key}
                      style={{
                        display: "inline-block",
                        width: "calc(100% / 7)",
                        border: "none",
                        background: "transparent",
                      }}
                    />
                  );
                }
                const { date, selected, selectable, today } = dateObj;
                let background = today ? "cornflowerblue" : "";
                background = selected ? "purple" : background;
                background = !selectable ? "teal" : background;
                return (
                  <button
                    style={{
                      display: "inline-block",
                      width: "calc(100% / 7)",
                      border: "none",
                      background,
                    }}
                    key={key}
                    {...getDateProps({ dateObj })}
                  >
                    {selectable ? date.getDate() : "X"}
                  </button>
                );
              })
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
}
