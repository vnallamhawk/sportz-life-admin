import React, { useState } from "react";
import Select from "~/components/Select";
import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox/Textbox";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Button from "~/components/Button/Button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Table from "~/components/Table";
import CertificateTableHeader from "../CertificateTable/CertificateTableHeader";
import CertificateTableBody from "../CertificateTable/CertificateTableBody";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";

export default function AddCoachCertificates() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      certificate: "",
      instituteName: "",
    },
  });

  const [tableData, setTableData] = useState<
    COACH_CERTIFICATE_TABLE_TYPES[] | []
  >([]);

  const onSubmit: SubmitHandler<COACH_CERTIFICATE_TABLE_TYPES> = (data) => {
    console.log(data);
    if (tableData?.length) {
      setTableData([data, ...tableData]);
    } else {
      setTableData([data]);
    }
  };

  return (
    <form onSubmit={() => void handleSubmit(onSubmit)}>
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
          name="certificate"
        />
        {errors.certificate && <span>This field is required</span>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Textbox
              placeHolder="Institute Name"
              className="w-96"
              onBlur={onBlur}
              onChangeHandler={onChange}
              value={value}
            />
          )}
          name="instituteName"
        />
        {errors.instituteName && <span>This field is required</span>}
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
          tableHeader={CertificateTableHeader()}
          tableBody={CertificateTableBody(tableData)}
        />
      )}
    </form>
  );
}
