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

export default function AddCoachCertificates() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      centers: "",
      batches: "",
    },
  });
  const {
    stepData: { currentStep },
  } = useContext<FormContextTypes>(FormContext);

  const [tableData, setTableData] = useState<
    COACH_CERTIFICATE_TABLE_TYPES[] | []
  >([]);

  const onSubmit: SubmitHandler<COACH_CERTIFICATE_TABLE_TYPES> = (data) => {
    if (tableData?.length) {
      setTableData([data, ...tableData]);
    } else {
      setTableData([data]);
    }
  };

  return (
    <>
      {currentStep === 2 ? (
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
              name="centers"
            />
            {errors.centers && (
              <span className="text-red-800">This field is required</span>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Textbox
                  placeHolder="Institute Name"
                  className="w-96"
                  onChangeHandler={onChange}
                  value={value}
                />
              )}
              name="batches"
            />
            {errors.batches && (
              <span className="text-red-800">This field is required</span>
            )}
          </div>
          <div className="mt-10">
            <Datepicker placeHolder="Start" className="h-12 w-48" />
            <Datepicker className="ml-3 h-12 w-48" placeHolder="End" />
            <Button type="submit" className="ml-3">
              Add
            </Button>
          </div>
          {tableData.length !== 0 && (
            <Table
              tableHeader={<CertificateTableHeader />}
              tableBody={<CertificateTableBody data={tableData} />}
            />
          )}
        </form>
      ) : null}
    </>
  );
}
