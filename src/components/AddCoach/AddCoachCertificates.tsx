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
          <div className="text-lg font-bold">ADD COACH</div>
          <div className="text-xl font-bold">ADD CERTIFICATES</div>
          <div className="flex justify-between">
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
                  // value={value}
                />
              )}
              name="centers"
            />
            {errors.centers && <span>This field is required</span>}

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
            {errors.batches && <span>This field is required</span>}
          </div>
          <div></div>
          <div>
            <Datepicker
              placeHolder="Start"
              // onDateSelectedCallback={_handleOnDateSelected}
            />
            <Datepicker
              placeHolder="End"
              // onDateSelectedCallback={_handleOnDateSelected}
            />
            <Button type="submit" className="Button">
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
