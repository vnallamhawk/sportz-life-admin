/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
import {
  //  Controller,
  useForm,
} from "react-hook-form";
// import Select from "react-select";
import { type MULTI_FORM_TYPES } from "~/types/coach";
import Table from "../Table";
import CenterBatchTableHeader from "../CenterBatchTable/CenterBatchTableHeader";
import CenterBatchTableBody from "../CenterBatchTable/CenterBatchTableBody";
import Button from "../Button/Button";
import CardTitle from "../Card/CardTitle";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
// import { api } from "~/utils/api";
import { formatBatchesTableData } from "~/helpers/batches";
import { type BatchTableData } from "~/types/batch";

// interface ApiData {
//   name: string;
//   id: number;
// }

export default function AssignBatches({
  finalFormSubmissionHandler,
}: {
  finalFormSubmissionHandler: (data: MULTI_FORM_TYPES) => void;
}) {
  const {
    // control,
    formState: { errors },
    getValues,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      centerName: undefined,
      batchName: undefined,
    },
  });

  const [tableData, setTableData] = useState<BatchTableData[]>([]);
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData },
  } = useContext(FormContext);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const { data: centers } = api.center.getAllCenters.useQuery();
  // const { data: batches } = api.batches.getAllBatches.useQuery();

  // const dropDownFormatter = <T extends ApiData>(options: T[]) => {
  //   return (
  //     options?.map(({ id, name }) => ({
  //       label: name,
  //       value: id,
  //     })) ?? []
  //   );
  // };

  // const [centersOptions, setCentersOptions] = useState(
  //   centers?.map(({ id, name }) => ({
  //     label: name,
  //     value: id,
  //   })) ?? []
  // );

  // const [batchesOptions, setBatchesOptions] = useState(
  //   batches?.map(({ id, name }) => ({
  //     label: name,
  //     value: id,
  //   })) ?? []
  // );

  // useEffect(() => {
  //   if (centers) {
  //     setCentersOptions(dropDownFormatter(centers));
  //   }
  // }, [centers]);

  // useEffect(() => {
  //   if (batches) {
  //     setBatchesOptions(dropDownFormatter(batches));
  //   }
  // }, [batches]);

  useEffect(() => {
    if (formData?.batchTableData?.length) {
      setTableData(formData?.batchTableData);
    }
  }, [formData?.batchTableData]);

  const submitCallback = () => {
    const finalFormData = {
      ...formData,
      batchIds: tableData?.reduce<number[]>((accumulator, current) => {
        if (current?.batchIds?.length) {
          accumulator.push(...current.batchIds);
        }
        return accumulator;
      }, []),
      centerIds: tableData?.reduce<number[]>((accumulator, current) => {
        if (current.centerId) {
          accumulator.push(Number(current.centerId));
        }
        return accumulator;
      }, []),
    };
    finalFormSubmissionHandler(finalFormData);
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
  // eslint-disable-next-line no-console
  console.log(tableData);

  return (
    <div>
      <CardTitle title="ADD COACH" />
      <div className="mb-3 text-lg font-bold">ASSIGN BATCHES</div>

      <div className="mb-3 flex justify-between gap-2">
        {/* <Controller
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
                options={centersOptions}
                placeholder={"Select Center"}
                onChange={(event) => {
                  setBatchesOptions(
                    dropDownFormatter(
                      batches
                        ? batches.filter(
                            ({ centerId }) =>
                              // Todo: fix this TS error
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              // @ts-ignore: Unreachable code error
                              centerId === event?.value
                          )
                        : []
                    )
                  );
                  onChange(event);
                }}
                value={value}
              />
            );
          }}
          name="centerName"
        /> */}
        <div className="text-red-800">
          {errors.centerName && <span>This field is required</span>}
        </div>

        {/* <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              className="h-12 w-full"
              // Todo: fix this TS error
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Unreachable code error
              options={batchesOptions}
              placeholder="Select Batches"
              onChange={(event) => {
                onChange(event);
              }}
              value={value}
              isMulti={true}
            />
          )}
          rules={{
            required: true,
          }}
          name="batchName"
        /> */}
        {errors.batchName && (
          <div className="text-red-800">This field is required</div>
        )}
      </div>

      <Button type="button" className="mb-5" onClick={onAddBatchHandler}>
        Add
      </Button>
      {tableData?.length !== 0 && (
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
  );
}
