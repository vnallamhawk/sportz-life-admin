import React from "react";
import Select from "~/components/Select";
import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox/Textbox";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Button from "~/components/Button/Button";

export default function AddCoachCertificates() {
  const _handleOnDateSelected = ({ date }: { date: Date }) => {
    console.log("inside");
    console.log(date);
  };

  return (
    <>
      <div>
        <Select
          options={COACH_CERTIFICATES_CONSTANTS}
          // defaultValue={props?.defaultValue}
          placeholder={"Select Certificate"}
        />
        <Textbox placeHolder="Institute Name" />
      </div>
      <div></div>
      <div>
        <Datepicker
          placeHolder="Start"
          onDateSelected={_handleOnDateSelected}
          // selected={currentDate}
          // onDateSelected={_handleOnDateSelected}
        />
        <Datepicker
          placeHolder="End"
          onDateSelected={_handleOnDateSelected}
          // selected={currentDate}
          // onDateSelected={_handleOnDateSelected}
        />
        <Button type="submit">Add</Button>
      </div>
    </>
  );
}
