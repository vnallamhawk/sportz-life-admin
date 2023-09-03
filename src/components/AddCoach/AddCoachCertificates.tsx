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

export default function AddCoachCertificates({}) {
  const {
    control,
    handleSubmit,
    reset,
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
    multiFormData: { formData, setFormData },
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
    // setCurrentStep && setCurrentStep(currentStep + 1);
  };

  const onAddHandler = () => {
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

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const onNextClickHandler = () => {
    if (Object.keys(errors).length === 0) {
      setFormData && setFormData({ ...formData, certificateData: tableData });
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardTitle title="ADD COACH" />
        <div className="text-xl font-bold">ADD CERTIFICATES</div>
        <div className="mt-10 flex justify-between">
          <div>
            <Controller
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  options={COACH_CERTIFICATES_CONSTANTS}
                  placeholder={"Select Coach Certificate"}
                  onChangeHandler={onChange}
                  value={value}
                />
              )}
              name="certificate"
            />
            {/* {errors.certificate && (
              <div className="text-red-800">This field is required</div>
            )} */}
          </div>

          <div>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textbox
                  placeHolder="Institute Name"
                  className="w-96"
                  onChangeHandler={onChange}
                  value={value}
                />
              )}
              name="institute"
            />
            {/* {errors.institute && (
              <div className="text-red-800">This field is required</div>
            )} */}
          </div>
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
          <Button className="mx-3 bg-pink-500" onClick={onNextClickHandler}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
}