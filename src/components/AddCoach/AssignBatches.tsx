/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "../Select";
import {
  BATCHES_CONSTANTS,
  CENTERS_CONSTANTS,
} from "~/constants/coachConstants";
import { type ASSIGN_BATCHES_TYPES } from "~/types/coach";
import Table from "../Table";
import CenterBatchTableHeader from "../CenterBatchTable/CenterBatchTableHeader";
import CenterBatchTableBody from "../CenterBatchTable/CenterBatchTableBody";
import Button from "../Button/Button";
import CardTitle from "../Card/CardTitle";

export default function AssignBatches() {
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      centerName: "",
      batchName: "",
    },
  });

  const [
    tableData,
    // setTableData
  ] = useState<ASSIGN_BATCHES_TYPES[]>([]);

  // const onSubmit: SubmitHandler<ASSIGN_BATCHES_TYPES> = (data) => {
  //   if (tableData?.length) {
  //     setTableData([data, ...tableData]);
  //   } else {
  //     setTableData([data]);
  //   }
  // };

  const submitCallback = () => {
    console.log("submit");
  };

  return (
    <>
      <div>
        <CardTitle title="ADD COACH" />
        <div className="mb-3 text-lg font-bold">ASSIGN BATCHES</div>

        {/* <div className="flex justify-between"> */}
        <div className="mb-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Select
                className="mr-3"
                options={CENTERS_CONSTANTS}
                placeholder={"Select Center"}
                onChangeHandler={onChange}
              />
            )}
            name="centerName"
          />
          {errors.centerName && <span>This field is required</span>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <Select
                options={BATCHES_CONSTANTS}
                placeholder={"Select Certificate"}
                onChangeHandler={onChange}
                // value={value}
              />
            )}
            name="batchName"
          />
          {errors.batchName && <span>This field is required</span>}
        </div>

        <Button type="submit" className="Button">
          Add
        </Button>
        {/* </div> */}
        {tableData.length !== 0 && (
          <Table
            tableHeader={<CenterBatchTableHeader />}
            tableBody={<CenterBatchTableBody data={tableData} />}
          />
        )}

        <Button className="mx-3 bg-pink-500" onClick={() => submitCallback}>
          Finish
        </Button>
        {/* </form> */}
      </div>
    </>
  );
}
