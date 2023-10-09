/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
import Select from "~/components/Select";
import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox/Textbox";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Button from "~/components/Button/Button";
import { Controller, useForm } from "react-hook-form";
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
    reset,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      instituteName: "",
      startEnd: "",
      endDate: "",
    },
  });

  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext<FormContextTypes>(FormContext);

  const [tableData, setTableData] = useState<COACH_CERTIFICATE_TABLE_TYPES[]>(
    []
  );

  const onAddHandler = async () => {
    const data = getValues();
    let result = true;
    if (!data.name || !data.instituteName) {
      result = await trigger();
    }
    if (data.startEnd) data.startEnd = new Date(data.startEnd).toISOString();

    if (data.endDate) data.endDate = new Date(data.endDate).toISOString();

    if (result) {
      if (tableData?.length) {
        setTableData([data, ...tableData]);
      } else {
        setTableData([data]);
      }
      reset();
    }
  };

  const prevClickHandler = () => {
    setFormData && setFormData({ ...formData, certificates: tableData });
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const onNextClickHandler = () => {
    if (Object.keys(errors).length === 0) {
      setFormData && setFormData({ ...formData, certificates: tableData });
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    if (formData?.certificates) {
      setTableData(formData.certificates);
    }
  }, [formData?.certificates]);

  return (
    <>
      <div>
        <CardTitle title="ADD COACH" />
        <div className="text-xl font-bold">ADD CERTIFICATES</div>
        <div className="mt-10 flex flex-row justify-between gap-5">
          <div className="w-full">
            <Controller
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    className="h-12 w-full"
                    {...COACH_CERTIFICATES_CONSTANTS}
                    onChangeHandler={onChange}
                    value={value ?? undefined}
                  />
                );
              }}
              rules={{ required: true }}
              name="name"
            />
            {errors.name && (
              <div className="text-red-800">This field is required</div>
            )}
          </div>

          <div className="w-full">
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textbox
                  placeHolder="Institute Name"
                  className="h-12 w-full"
                  onChangeHandler={onChange}
                  value={value}
                />
              )}
              name="instituteName"
              rules={{ required: true }}
            />
            {errors.instituteName && (
              <div className="text-red-800">This field is required</div>
            )}
          </div>
        </div>
        <div className="mt-10 grid w-2/3 grid-cols-3 gap-5">
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Datepicker
                  placeHolder="Start"
                  className="h-12 w-full"
                  onChangeHandler={onChange}
                  value={new Date(value)}
                />
              );
            }}
            name="startEnd"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Datepicker
                  className="ml-3 h-12 w-full"
                  placeHolder="End"
                  onChangeHandler={onChange}
                  value={new Date(value)}
                />
              );
            }}
            name="endDate"
          />
          <Button className="ml-2 w-20" onClick={onAddHandler}>
            Add
          </Button>
        </div>
        {tableData.length !== 0 && (
          <div className="mt-5">
            <Table
              tableHeader={<CertificateTableHeader />}
              tableBody={
                <CertificateTableBody data={tableData} setData={setTableData} />
              }
            />
          </div>
        )}
        <div className="mt-5 flex justify-end">
          <Button
            className="bg-pink-600 hover:bg-pink-800"
            onClick={prevClickHandler}
          >
            Prev
          </Button>
          <Button
            className="mx-3 bg-pink-600 hover:bg-pink-800"
            onClick={onNextClickHandler}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
