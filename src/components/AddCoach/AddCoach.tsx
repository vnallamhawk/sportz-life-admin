import React, { useContext } from "react";
import CardTitle from "~/components/Card/CardTitle";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import Select from "~/components/Select/Select";
import Textbox from "~/components/Textbox";
import {
  type COACH_TYPES,
  type COACH_DETAILS_CONSTANTS_TYPES,
} from "~/types/coach";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";

export default function AddCoach() {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
  } = useContext(FormContext);

  const {
    control,
    trigger,
    formState: { errors },
  } = useForm<COACH_TYPES>();

  const getInputElement = (props: COACH_DETAILS_CONSTANTS_TYPES) => {
    const { type, rules, id } = props;
    switch (type) {
      case "select":
        const { options } = props;
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                options={options ?? []}
                defaultValue={props?.defaultValue}
                placeholder={props.placeHolder}
                onChangeHandler={onChange}
                // {...rules}
              />
            )}
            name={id}
            rules={rules}
          />
        );
        break;
      case "calendar":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              console.log(value);
              return (
                <Datepicker
                  placeHolder={props.placeHolder}
                  className="h-12 w-48"
                  onChangeHandler={onChange}
                />
              );
            }}
            name={id}
            rules={{ required: true }}
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
                className="h-12 w-96"
                placeHolder={props.label}
                onChangeHandler={onChange}
                value={value}
                // {...rules}
              />
            )}
            rules={rules}
          />
        );
    }

    return inputElement;
  };

  const nextClickHandler = async () => {
    console.log("inside");
    const result = await trigger();
    if (result) {
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };

  // const onSubmit = (data: COACH_TYPES) => {
  //   console.log(data);
  //   if (!errors) {
  //     setCurrentStep && setCurrentStep(currentStep + 1);
  //   }
  // };

  return (
    <>
      {currentStep === 1 ? (
        // <form onSubmit={void handleSubmit(onSubmit)}>
        // <form onSubmit={void handleSubmit(onSubmit)}>
        <>
          <CardTitle title="ADD COACH" />
          <div className="text-lg font-bold">COACH DETAILS</div>
          <div className="mt-10 grid grid-cols-2 gap-y-12">
            {COACH_DETAILS_CONSTANTS.map((props) => (
              <>
                <div key={props.id}>
                  {getInputElement(props)}

                  <span className="text-red-800">
                    {errors[props.id] && <div>This field is required</div>}
                  </span>
                </div>
              </>
            ))}
          </div>
          <div className="mr-10 mt-10 flex justify-end">
            <Button
              className="mx-3 bg-pink-500"
              type="button"
              onClick={() => void nextClickHandler()}
              // onClick={async () => {
              //   const result = await trigger();
              //   if (result) {
              //     setCurrentStep && setCurrentStep(currentStep + 1);
              //   }
              // }}
            >
              Next
            </Button>
          </div>
        </>
      ) : // </form>
      null}
    </>
  );
}
