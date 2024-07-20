import React, { useEffect, useContext, useState, useRef } from "react";
import CardTitle from "~/components/Card/CardTitle";
import { ATHLETE_CONTACT_CONSTANTS, ATHLETE_GENRAL_CONSTANTS } from "~/constants/athleteConstants";
import Textbox from "~/components/Textbox";
import {
  type COACH_TYPES,
  type COACH_DETAILS_CONSTANTS_TYPES,
} from "~/types/coach";
import { FormContext } from "~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import { api } from "~/utils/api";
import Select from "react-select";
import AddForm from "~/common/AddForm";

export default function AddGeneralDetails() {
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
  } = useForm<COACH_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: centers } = api.center.getAllCenters.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    ATHLETE_GENRAL_CONSTANTS
  );

  const [formConstantValues1, setFormConstantValues1] = useState(
    ATHLETE_CONTACT_CONSTANTS
  );

  useEffect(() => {
   
    if (centers?.length ) {
      const updatedFormConstantValues = formConstantValues?.map(
        (formConstant) => {
          if (formConstant.id === "center") {
            return {
              ...formConstant,
              options: centers.map((center: { name: string; id: number }) => ({
                label: center.name,
                value: center.id.toString(),
              })),
            };
          } else {
            return formConstant;
          }
        }
      );
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, centers, centers?.length]);

  useEffect(()=>{
    if(formData?.center && centers.length>0){
      const center=centers?.find((item)=>item?.id==formData?.center?.value)
      if (center?.CenterSports?.length ) {
        const updatedFormConstantValues = formConstantValues?.map(
          (formConstant) => {
            if (formConstant.id === "sport") {
              return {
                ...formConstant,
                options: center?.CenterSports?.map((sport: { name: string; id: number }) => ({
                  label: sport.name,
                  value: sport.id.toString(),
                })),
              };
            } else {
              return formConstant;
            }
          }
        );
        setFormConstantValues(updatedFormConstantValues);
      }
    }

  },[formData?.center,centers])

  useEffect(() => {
    // if (!isEditMode) {
    // eslint-disable-next-line no-console
    reset({
      ...currentFormValues,
      ...formData,
    });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  //test commit
  const getInputElement = (props: COACH_DETAILS_CONSTANTS_TYPES) => {
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
                  className="w-full border-1 border-gray-300 c-select"
                  classNamePrefix="react-select"
                  onChange={(element) => {
                    onChange(element);
                  }}
                />
              );
            }}
          />
        );
        break;
      case "calendar":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Datepicker
                  placeHolder={props.placeHolder}
                  value={new Date(value as string)}
                  className="h-12"
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
                className="h-12 w-full"
                placeHolder={props.label}
                onChangeHandler={onChange}
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

  const nextClickHandler = async () => {
    const result = await trigger();
    if (result) {
      const currentFormValues = getValues();
      setFormData && setFormData({ ...formData, ...currentFormValues });
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <AddForm
        cardTitle="ADD ATHLETE"
        cardSubTitle="Athlete General Details"
        formConstantValues={formConstantValues}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

<AddForm
        cardSubTitle="Contact Details"
        formConstantValues={formConstantValues1}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        buttonItems={{prevFinish:true}}
      />


      </>
      );
}
