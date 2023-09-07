import React, { useEffect, useContext } from "react";
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
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<COACH_TYPES>({ mode: "onChange" });
  const currentFormValues = getValues();
  console.log(errors);

  useEffect(() => {
    reset({
      ...currentFormValues,
      ...formData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInputElement = (props: COACH_DETAILS_CONSTANTS_TYPES) => {
    const { type, rules, id, pattern } = props;
    switch (type) {
      case "select":
        const { options } = props;
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  className="h-12 w-96"
                  options={options ?? []}
                  placeholder={props.placeHolder}
                  onChangeHandler={onChange}
                  value={value}
                />
              );
            }}
            name={id}
            rules={rules}
          />
        );
        break;
      case "calendar":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange } }) => {
              return (
                <Datepicker
                  placeHolder={props.placeHolder}
                  className="h-12 w-96"
                  onChangeHandler={onChange}
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
                className="h-12 w-96"
                placeHolder={props.label}
                onChangeHandler={onChange}
                value={value}
              />
            )}
            rules={rules}
            {...(pattern ? { pattern } : {})}
            // ...(pattern) && {pattern})
          />
        );
    }

    return inputElement;
  };

  const nextClickHandler = async () => {
    const result = await trigger();
    if (result) {
      const currentFormValues = getValues();
      setFormData && setFormData({ ...formData, ...currentFormValues });
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
                    {errors[props.id]?.type === "required" && (
                      <div>This field is required</div>
                    )}
                    {errors[props.id]?.type === "pattern" && (
                      <div> This field is not matching the pattern</div>
                    )}
                  </span>
                </div>
              </>
            ))}
          </div>
          <div className="mr-10 mt-10 flex justify-end">
            <Button
              className="border-1 mx-3 bg-pink-600 hover:bg-pink-800"
              type="button"
              onClick={() => void nextClickHandler()}
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
