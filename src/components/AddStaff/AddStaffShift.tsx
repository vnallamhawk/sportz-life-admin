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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const shifts = ["Day", "Night"];

const daysOptions =
  days?.map((day) => ({
    label: day,
    value: day,
  })) ?? [];

const shiftOptions =
  shifts?.map((day) => ({
    label: day,
    value: day,
  })) ?? [];

export default function AddStaffShift({ finalFormSubmission }) {
  const [staffShiftDetails, setStaffShiftDetails] = useState([]);
  const [currentStaffShift,setCurrentStaffShift]=useState({})

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

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };



  

  const handleChangeStaffTime=(value,id)=>{
    let staffDetails={...currentStaffShift}
    staffDetails[id]=value
    setCurrentStaffShift(staffDetails)
  }

  const onAddStaffTiming=(e)=>{
    e.preventDefault()
    let arr=[...staffShiftDetails]
    arr.push(currentStaffShift)
    setStaffShiftDetails(arr)
    setCurrentStaffShift({})
  }
  return (
    <div>
      <CardTitle title="ADD STAFF" />
      <div className="mb-3 text-lg font-bold">DUTY SHIFT</div>

      <div className="mb-3 flex justify-between gap-2">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                className="h-12 w-full"
                options={daysOptions}
                placeholder={"Select Day"}
                onChange={(event) => {
                  handleChangeStaffTime(event?.value, "day");
                }}
                value={value}
              />
            );
          }}
          name="day"
        />
        <div className="text-red-800">
          {errors.day && <span>This field is required</span>}
        </div>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              className="h-12 w-full"
              options={shiftOptions}
              placeholder="Select Shift"
              onChange={(event) => {
                handleChangeStaffTime(event?.value, "shift");
              }}
              value={value}
            />
          )}
          rules={{
            required: true,
          }}
          name="shift"
        />
          <div className="text-red-800">
          {errors.shift && <span>This field is required</span>}
        </div>

        <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Timepicker
                placeHolder={"Enter Start Time"}
                  value={currentStaffShift['startTime']?currentStaffShift['startTime']:"10:00"}
                  className="h-12"
                  onChangeHandler={(value)=>handleChangeStaffTime(value,"startTime")}
                />
              );
            }}
            name={'startTime'}
            rules={{
              required: true,
            }}
          />
            <div className="text-red-800">
          {errors.startTime && <span>This field is required</span>}
        </div>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Timepicker
                placeHolder={"Enter End Time"}
                value={currentStaffShift['endTime']?currentStaffShift['endTime']:"10:00"}
                className="h-12"
                  onChangeHandler={(value)=>handleChangeStaffTime(value,"endTime")}
                />
              );
            }}
            name='endTime'
            rules={{
              required: true,
            }}          />
        {errors.endTime && (
          <div className="text-red-800">This field is required</div>
        )}
      </div>

      <Button type="button" className="mb-5" onClick={(e) => onAddStaffTiming(e)}>
        Add
      </Button>
      <Table
          tableHeader={StaffShiftTableHeader()}
          tableBody={StaffShiftTableBody(staffShiftDetails)}
        />
    

      <div className="flex justify-end">
        <Button
          type="button"
          className="mx-3 bg-pink-600 hover:bg-pink-800"
          onClick={prevClickHandler}
        >
          Prev
        </Button>
        <Button
          type="button"
          className="mx-3 bg-pink-600 hover:bg-pink-800"
          onClick={submitCallback}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
