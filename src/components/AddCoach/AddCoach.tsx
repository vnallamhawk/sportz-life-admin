import React, { useEffect, useContext, useState, useRef } from "react";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import { type COACH_TYPES } from "~/types/coach";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import AddForm from "~/common/AddForm";

export default function AddCoach() {
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const { getValues, reset } = useForm<COACH_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();
  const { data: staffPayroll } = api.staffPayroll.getAllPayroll.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    COACH_DETAILS_CONSTANTS
  );

  useEffect(() => {
    let updatedFormConstantValues = formConstantValues;
    if (sports?.length) {
      updatedFormConstantValues = formConstantValues.map((formConstant) => {
        if (formConstant.id === "coachingSports") {
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
      });
      hasExecuted.current = false;
    }
    if (staffPayroll?.length && staffPayroll?.length! > 0) {
      updatedFormConstantValues = updatedFormConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "payroll") {
            // console.log("payroll", payroll);
            return {
              ...formConstant,
              options: staffPayroll?.map((payroll, index) => ({
                label: payroll?.StaffDesignation?.designation,
                value: payroll.id.toString(),
              })),
            };
          } else {
            return formConstant;
          }
        }
      );
    }
    setFormConstantValues(updatedFormConstantValues);
  }, [formConstantValues, sports, sports?.length]);

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
        cardTitle="ADD COACH"
        cardSubTitle="COACH DETAILS"
        formConstantValues={formConstantValues}
        imageTitle="Coach Image"
        buttonItems={{ next: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
}
