/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Table from "../Table";
import Button from "../Button/Button";
import CardTitle from "../Card/CardTitle";
import { FormContext } from "~/pages/staff/AddStaff/AddStaffMultiFormLayout";
import { formatBatchesTableData } from "~/helpers/batches";
import { type BatchTableData } from "~/types/batch";
import StaffShiftTableHeader from "../StaffShiftTable/StaffShiftTableHeader";
import StaffShiftTableBody from "../StaffShiftTable/StaffShiftTableBody";
import Timepicker from "~/components/TimePicker/TimePickerWrapper";
import AddForm from "~/common/AddForm";
import { STAFF_SHIFT_CONSTANTS } from "~/constants/staffConstants";
import { STAFF_TIMINGS_TABLE_HEADERS } from "~/constants/staffTimingConstants";



export default function AddStaffShift({ finalFormSubmission }) {
  const [staffShiftDetails, setStaffShiftDetails] = useState([]);
  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_SHIFT_CONSTANTS
  );
  const {
    control,
    formState: { errors },
    getValues,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      day: undefined,
      shift: undefined,
      startTime:"10:00",
      endTime:"10:00"
    },
  });

  // const [tableData, setTableData] = useState<BatchTableData[]>([]);
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData,setFormData },
  } = useContext(FormContext);

  const submitCallback = () => {
    // eslint-disable-next-line no-console
    console.log("submit", { ...formData, staffShiftDetails });
    const finalFormData = {
      ...formData,
      staffShiftDetails,
    };
    setFormData(finalFormData)
    finalFormSubmission(finalFormData);
  };


  const onAddStaffTiming=(currentStaffShift)=>{
    let arr=[...staffShiftDetails]
    arr.push({day:currentStaffShift?.day.value,shift:currentStaffShift?.shift.value,startTime:formData?.startTime,endTime:formData?.endTime})
    setStaffShiftDetails(arr)
  }
  return (
    <div>
         <AddForm
        cardTitle="ADD STAFF"
        cardSubTitle="DUTY SHIFT"
        formConstantValues={formConstantValues}
        buttonItems={{ prevFinish: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tableTitle="SHIFTS"
        mobileAddButtonText="Add another shift"
        TableHeadings={STAFF_TIMINGS_TABLE_HEADERS}
        //  tableFields={STAFF_SHIFT_CONSTANTS}
        tablekey="staffShiftDetails"
        tableData={staffShiftDetails}
        addTableData={onAddStaffTiming}
        finalFormSubmissionHandler={submitCallback}
        isFormTable={true}
      />
      </div>
  );
}
