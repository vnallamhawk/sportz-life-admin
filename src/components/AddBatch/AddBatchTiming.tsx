import React, { useEffect, useContext, useState, useRef } from "react";
import CardTitle from "~/components/Card/CardTitle";
// import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox";
import {
  type CENTER_BATCH_TYPES,
  type BATCH_DETAILS_CONSTANTS_TYPES,
} from "~/types/batch";
import { FormContext } from "../../pages/centers/Batch/[id]";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import Timepicker from "~/components/TimePicker/TimePickerWrapper";
import { api } from "~/utils/api";
import Select from "react-select";
import {
  BATCH_DETAILS_CONSTANTS,
  BATCH_DETAILS_TIMING,
} from "~/constants/batchConstant";
import Table from "../Table";
import BatchTimeTableHeader from "../BatchTiming/BatchTimingTableHeader";
import BatchTimeTableBody from "../BatchTiming/BatchTimingTableBody";

export default function AddBatchTiming(props: any) {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<any>({ mode: "onSubmit" });

  // useForm<CENTER_BATCH_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();
  const [currentBatchDetail, setCurrentBatchDetail] = useState<any>({});

  const [formConstantValues, setFormConstantValues] =
    useState(BATCH_DETAILS_TIMING);

  const [batchTimings, setBatchTimings] = useState([]);

  // useEffect(() => {
  //   if (sports?.length && hasExecuted.current) {
  //     const updatedFormConstantValues = formConstantValues.map(
  //       (formConstant) => {
  //         if (formConstant.id === "coachingSports") {
  //           return {
  //             ...formConstant,
  //             options: sports.map((sport: { name: string; id: number }) => ({
  //               label: sport.name,
  //               value: sport.id.toString(),
  //             })),
  //           };
  //         } else {
  //           return formConstant;
  //         }
  //       }
  //     );
  //     hasExecuted.current = false;
  //     setFormConstantValues(updatedFormConstantValues);
  //   }
  // }, [formConstantValues, sports, sports?.length]);

  // useEffect(() => {
  //   // if (!isEditMode) {
  //   // eslint-disable-next-line no-console
  //   reset({
  //     ...currentFormValues,
  //     ...formData,
  //   });
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData]);
  //test commit

  const handleChangeBatch = (value: any, id: string | number) => {
    const batchDetails = { ...currentBatchDetail };
    batchDetails[id] = value 
    setCurrentBatchDetail(batchDetails);
  };

  const getInputElement = (props: any) => {
    const { type, rules, id, pattern, placeHolder } = props;
    switch (type) {
      case "select":
        const { options } = props;
        inputElement = (
          <Controller
            control={control}
            name={id}
            rules={rules}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  isMulti={props?.isMulti ?? false}
                  options={options}
                  value={value}
                  placeholder={placeHolder}
                  className="w-full"
                  onChange={(element) => {
                    handleChangeBatch(element?.value, id);
                  }}
                />
              );
            }}
          />
        );
        break;
      case "time":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Timepicker
                  placeHolder={props.placeHolder}
                  value={
                    currentBatchDetail[id] ? currentBatchDetail[id] : "10:00"
                  }
                  className="h-12"
                  onChangeHandler={(value) => handleChangeBatch(value, id)}
                />
              );
            }}
            name={id}
            rules={rules}
          />
        );
        break;
      default:
        inputElement = (
          <Controller
            control={control}
            name={id}
            render={({ field: { onChange, value } }) => (
              <Textbox
                className="h-12 w-full"
                placeHolder={props.label}
                // If batch Timing Error come unComment this
                // onChange={(e: any) =>
                //   handleChangeBatch(e.target.value, id)
                // }
                onChangeHandler={(e: any) =>
                  handleChangeBatch(e.target.value, id)
                }
                // TODO: FIX THIS TS ERROR
                value={value as string}
              />
            )}
            rules={rules}
            {...(pattern ? { pattern } : {})}
          />
        );
    }

    return inputElement;
  };

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const submitCallback = () => {
    const finalFormData = {
      ...formData,
      batchTimings,
    };
    props?.finalFormSubmissionHandler(finalFormData);
  };

  const onAddBatchTiming = (e: any) => {
    e.preventDefault();
    const arr: any = [...batchTimings];
    arr.push(currentBatchDetail);
    setBatchTimings(arr);
    setCurrentBatchDetail({});
  };

  return (
    <>
      <CardTitle title="ADD BATCH" />
      <div className="text-lg font-bold">BATCH TIMINGS</div>
      <div className="mt-10 grid grid-cols-3 gap-x-10 gap-y-12">
        {formConstantValues.map((props) => (
          <div key={props.id}>
            {getInputElement(props)}

            <span className="text-red-800">
              {errors[props.id]?.type === "required" && (
                <div>This field is required</div>
              )}
              {errors[props.id]?.type === "pattern" && (
                <div> This field is not matching the pattern</div>
              )}
              {errors[props.id]?.type === "maxLength" && (
                <div>{`This field is exceeding the max. character limit`}</div>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mr-10 mt-10 flex justify-start">
        <Button
          className="border-1 mx-3 border-pink-600"
          type="button"
          onClick={(e) => onAddBatchTiming(e)}
        >
          ADD
        </Button>
      </div>
      <Table
        tableHeader={BatchTimeTableHeader()}
        tableBody={BatchTimeTableBody(batchTimings)}
      />
      <div className="mr-10 mt-10 flex justify-end">
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
    </>
  );
}
