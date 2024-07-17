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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const shifts = ["Morning", "Afternoon", "Evening"];

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
  const [staffShiftDetails, setStaffShiftDetails] = useState({});
  const {
    control,
    formState: { errors },
    getValues,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      dutyDay: undefined,
      dutyShift: undefined,
    },
  });

  // const [tableData, setTableData] = useState<BatchTableData[]>([]);
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData },
  } = useContext(FormContext);

  const submitCallback = () => {
    // eslint-disable-next-line no-console
    console.log("submit", { ...formData, ...staffShiftDetails });
    const finalFormData = {
      ...formData,
      ...staffShiftDetails,
    };
    finalFormSubmission(finalFormData);
  };

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const onAddBatchHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = getValues();
    const tableDataFormatter = formatBatchesTableData(data);
    const result = await trigger();

    // eslint-disable-next-line no-console

    if (result && Object.keys(errors).length === 0) {
      if (tableData?.length) {
        setTableData((prev) => [...prev, tableDataFormatter]);
      } else {
        setTableData([tableDataFormatter]);
      }
      reset();
    }
  };

  const handleChangeStaffDetails = (
    name: string,
    event: { label: string; value: string }
  ) => {
    let obj = { ...staffShiftDetails, [name]: event.value };
    setStaffShiftDetails(obj);
  };

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
                // Todo: fix this TS error
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore: Unreachable code error
                options={daysOptions}
                placeholder={"Select Day"}
                onChange={(value) => {
                  handleChangeStaffDetails("dutyDay", value);
                }}
                value={value}
              />
            );
          }}
          name="dutyDay"
        />
        <div className="text-red-800">
          {errors.dutyDay && <span>This field is required</span>}
        </div>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              className="h-12 w-full"
              // Todo: fix this TS error
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Unreachable code error
              options={shiftOptions}
              placeholder="Select Shift"
              onChange={(event) => {
                handleChangeStaffDetails("dutyShift", event);
              }}
              value={value}
            />
          )}
          rules={{
            required: true,
          }}
          name="dutyShift"
        />
        {errors.dutyShift && (
          <div className="text-red-800">This field is required</div>
        )}
      </div>

      <Button type="button" className="mb-5" onClick={() => {}}>
        Add
      </Button>
      {/* {tableData?.length !== 0 && (
        <Table
          tableHeader={<StaffShiftTableHeader />}
          tableBody={<StaffShiftTableBody />}
        />
      )} */}

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
