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

export default function AddGeneralDetails({finalFormSubmissionHandler}:any) {
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
  } = useForm({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const { data: centers } = api.center.getAllCenters.useQuery();
  const [centerId,setCenterId]=useState<number>()

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
    if(centerId){
      const center=centers?.find((item)=>item?.id==centerId)
      let updatedFormConstantValues
      if (center?.CenterSports?.length ) {
         updatedFormConstantValues = formConstantValues?.map(
          (formConstant) => {
            if (formConstant.id === "sport") {
              return {
                ...formConstant,
                options: center?.CenterSports?.map((CenterSport) => ({
                  label: CenterSport?.Sports?.name,
                  value: CenterSport?.Sports?.id.toString(),
                })),
              };
            } else {
              return formConstant;
            }
          }
        );
      }
      if (center?.CenterSports?.length ) {
         updatedFormConstantValues = updatedFormConstantValues?.map(
          (formConstant) => {
            if (formConstant.id === "batch") {
              return {
                ...formConstant,
                options: center?.Batches?.map((batch: { name: string; id: number }) => ({
                  label: batch.name,
                  value: batch.id.toString(),
                })),
              };
            } else {
              return formConstant;
            }
          }
        );
      }
      setFormConstantValues(updatedFormConstantValues);

    }

  },[ centers, centerId, formConstantValues])

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
        dependentKey="center"
        setDependentKey={(value)=>setCenterId(value)}
      />

<AddForm
        cardSubTitle="Contact Details"
        formConstantValues={formConstantValues1}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        buttonItems={{prevFinish:true}}
        finalFormSubmissionHandler={finalFormSubmissionHandler}
      />


      </>
      );
}
