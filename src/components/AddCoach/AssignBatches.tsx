/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
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

interface ApiData {
  name: string;
  id: number;
}

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
    multiFormData: { formData },
  } = useContext(FormContext);
  const centersDataSet = useRef(false);
  const batchesDataSet = useRef(false);
  console.log(getValues());

  const { data: centers } = api.center.getAllCenters.useQuery();
  const { data: batches } = api.batches.getAllBatches.useQuery();

  const dropDownFormatter = <T extends ApiData>(options: T[]) => {
    console.log(options);
    console.log(
      options?.map(({ id, name }) => ({
        label: name,
        value: id,
      }))
    );
    return (
      options?.map(({ id, name }) => ({
        label: name,
        value: id,
      })) ?? []
    );
  };

  const [centersOptions, setCentersOptions] = useState(
    centers?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) ?? []
  );
  const [batchesOptions, setBatchesOptions] = useState(
    batches?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) ?? []
  );

  useEffect(() => {
    if (centers) {
      setCentersOptions(dropDownFormatter(centers));
      centersDataSet.current = true;
    }
  }, [centers]);

  useEffect(() => {
    if (batches) {
      setBatchesOptions(dropDownFormatter(batches));
      batchesDataSet.current = true;
    }
  }, [batches]);

  const submitCallback = () => {
    const finalFormData = { ...formData, batchData: tableData };
    finalFormSubmissionHandler(finalFormData);
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
          />
          {errors.centerName && <span>This field is required</span>}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                className="h-12 w-96"
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
