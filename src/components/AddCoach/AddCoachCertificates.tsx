/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from "react";
import Select from "~/components/Select";
import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox/Textbox";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Button from "~/components/Button/Button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Table from "~/components/Table";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";
import CertificateTableHeader from "../CertificateTable/CertificateTableHeader";
import CertificateTableBody from "../CertificateTable/CertificateTableBody";
import {
  FormContext,
  type FormContextTypes,
} from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import CardTitle from "../Card/CardTitle";

export default function AddCoachCertificates(
  {
    // control,
    // errors,
    // handleSubmit,
  }
) {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     certificate: "",
  //     institute: "",
  //   },
  // });

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      certificate: "",
      institute: "",
    },
  });

  const {
    stepData: { currentStep, setCurrentStep },
  } = useContext<FormContextTypes>(FormContext);

  const [tableData, setTableData] = useState<
    COACH_CERTIFICATE_TABLE_TYPES[] | []
  >([]);

  const onSubmit: SubmitHandler<COACH_CERTIFICATE_TABLE_TYPES> = (data) => {
    console.log(data);
    // if (tableData?.length) {
    //   setTableData([data, ...tableData]);
    // } else {
    //   setTableData([data]);
    // }
    setCurrentStep(currentStep + 1);
  };

  const onAddHandler = () => {
    const data = getValues();
    if (!errors) {
      if (tableData?.length) {
        setTableData([data, ...tableData]);
      } else {
        setTableData([data]);
      }
    }
  };

  // const nextClickHandler = (trigger) => {
  //   console.log(trigger);
  //   trigger();
  //   setCurrentStep(currentStep + 1);
  // };

  const prevClickHandler = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardTitle title="ADD COACH" />
        <div className="text-xl font-bold">ADD CERTIFICATES</div>
        <div className="mt-10 flex justify-between">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Select
                options={COACH_CERTIFICATES_CONSTANTS}
                placeholder={"Select Certificate"}
                onChangeHandler={onChange}
              />
            )}
            name="certificate"
          />
          {errors.certificate && (
            <span className="text-red-800">This field is required</span>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Textbox
                placeHolder="Institute Name"
                className="w-96"
                onChangeHandler={onChange}
              />
            )}
            name="institute"
          />
          {errors.institute && (
            <span className="text-red-800">This field is required</span>
          )}
        </div>
        <div className="mt-10">
          <Datepicker placeHolder="Start" className="h-12 w-48" />
          <Datepicker className="ml-3 h-12 w-48" placeHolder="End" />
          <Button
            className="ml-3"
            // type="submit"
            onClick={onAddHandler}
          >
            Add
          </Button>
        </div>
        {tableData.length !== 0 && (
          <div className="mt-5">
            <Table
              tableHeader={<CertificateTableHeader />}
              tableBody={<CertificateTableBody data={tableData} />}
            />
          </div>
        )}
        <div className="mt-5 flex justify-end">
          <Button className="bg-pink-500" onClick={prevClickHandler}>
            Prev
          </Button>
          <Button
            className="mx-3 bg-pink-500"
            onClick={() => {
              void trigger();
            }}
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
}
