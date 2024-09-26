import React, { useEffect, useContext, useState, useRef } from "react";

import type {
  CENTER_TYPES} from "~/types/coach";

import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { CENTER_DETAILS_CONSTANTS } from "~/constants/centerConstants";

import AddForm from "~/common/AddForm";
import type { FormValues } from "~/types/common";

export default function AddTestBank(props: { finalFormSubmissionHandler: any; physical:boolean}) {
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CENTER_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();
 
  const { data: coaches } = api.coach.getAllCoaches.useQuery()

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    CENTER_DETAILS_CONSTANTS
  );

    useEffect(() => {
      if (sports?.length && hasExecuted.current) {
        const updatedFormConstantValues = formConstantValues.map(
          (formConstant) => {
            if (formConstant.id === "selectSports") {
              return {
                ...formConstant,
                options: sports.map((sport: { name: string; id: number }) => ({
                  label: sport.name,
                  value: sport.id.toString(),
                })),
              };
            } else {
              return formConstant;
            }
          }
        );
        hasExecuted.current = false;
        setFormConstantValues(updatedFormConstantValues);
      }
    }, [formConstantValues, sports, sports?.length]);

    useEffect(() => {
      if (coaches?.length && hasExecuted.current) {
        const updatedFormConstantValues = formConstantValues.map(
          (formConstant) => {
            if (formConstant.id === "selectCoaches") {
              return {
                ...formConstant,
                options: coaches.map((coach: { name: string; id: number }) => ({
                  label: coach.name,
                  value: coach.id.toString(),
                })),
              };
            } else {
              return formConstant;
            }
          }
        );
        hasExecuted.current = false;
        setFormConstantValues(updatedFormConstantValues);
      }
    }, [formConstantValues, coaches, coaches?.length]);


  return (
    <>
<AddForm
        cardTitle="ADD CENTER"
        cardSubTitle="CENTER DETAILS"
        formConstantValues={formConstantValues}
        imageTitle="Center Image"
        buttonItems={{ next: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        finalFormSubmissionHandler={props?.finalFormSubmissionHandler}
      />
      
    </>
  );
}
