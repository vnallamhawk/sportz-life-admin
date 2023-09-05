/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "../Select";
import {
  BATCHES_CONSTANTS,
  CENTERS_CONSTANTS,
} from "~/constants/coachConstants";
import {
  type MULTI_FORM_TYPES,
  type ASSIGN_BATCHES_TYPES,
} from "~/types/coach";
import Table from "../Table";
import CenterBatchTableHeader from "../CenterBatchTable/CenterBatchTableHeader";
import CenterBatchTableBody from "../CenterBatchTable/CenterBatchTableBody";
import Button from "../Button/Button";
import CardTitle from "../Card/CardTitle";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { api } from "~/utils/api";

export default function AssignBatches({
  finalFormSubmissionHandler,
}: {
  finalFormSubmissionHandler: (data: MULTI_FORM_TYPES) => void;
}) {
  const {
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      centerName: "",
      batchName: "",
    },
  });

  const [tableData, setTableData] = useState<ASSIGN_BATCHES_TYPES[]>([]);
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: {
      formData,
      // setFormData
    },
  } = useContext(FormContext);

  const { data: centers } = api.center.getAllCenters.useQuery();

  // const onSubmit: SubmitHandler<ASSIGN_BATCHES_TYPES> = (data) => {
  //   if (tableData?.length) {
  //     setTableData([data, ...tableData]);
  //   } else {
  //     setTableData([data]);
  //   }
  // };

  const submitCallback = () => {
    // const currentFormData = getValues();
    const finalFormData = { ...formData, batchData: tableData };
    finalFormSubmissionHandler(finalFormData);
    // setFormData && setFormData(finalFormData);
  };

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const onAddBatchHandler = () => {
    const data = getValues();
    if (Object.keys(errors).length === 0) {
      if (tableData?.length) {
        setTableData([data, ...tableData]);
      } else {
        setTableData([data]);
      }
      reset();
    }
  };

  return (
    <>
      <div>
        <CardTitle title="ADD COACH" />
        <div className="mb-3 text-lg font-bold">ASSIGN BATCHES</div>

        <div className="mb-3 flex justify-between">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => {
              console.log(value);
              return (
                <Select
                  className="h-12 w-96"
                  options={
                    centers?.map(({ id, name }) => ({
                      label: name,
                      value: id,
                      id: id,
                    })) ?? []
                  }
                  placeholder={"Select Center"}
                  onChangeHandler={onChange}
                  value={value}
                />
              );
            }}
            name="centerName"
          />
          {errors.centerName && <span>This field is required</span>}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                className="h-12 w-96"
                options={BATCHES_CONSTANTS}
                placeholder="Select Batches"
                onChangeHandler={onChange}
                value={value}
              />
            )}
            name="batchName"
          />
          {errors.batchName && <span>This field is required</span>}
        </div>

        <Button type="submit" className="mb-5" onClick={onAddBatchHandler}>
          Add
        </Button>
        {tableData.length !== 0 && (
          <Table
            tableHeader={<CenterBatchTableHeader />}
            tableBody={<CenterBatchTableBody data={tableData} />}
          />
        )}

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
    </>
  );
}
