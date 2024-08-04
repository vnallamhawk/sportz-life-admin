import React, { useEffect, useContext, useState, useRef } from "react";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import { type COACH_TYPES } from "~/types/coach";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import AddForm from "~/common/AddForm";
import type { FormValues } from "~/types/common";

export default function AddCoach() {
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const { getValues, reset } = useForm<COACH_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();
  const { data: staffPayroll } = api.staffPayroll.getAllPayroll.useQuery();

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    COACH_DETAILS_CONSTANTS
  );

  useEffect(() => {
    let updatedFormConstantValues: FormValues[] = formConstantValues;
    if (sports?.length) {
      updatedFormConstantValues = formConstantValues.map((formConstant:FormValues) => {
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
    if (staffPayroll?.length && staffPayroll?.length > 0) {
      updatedFormConstantValues = updatedFormConstantValues.map(
        (formConstant: FormValues) => {
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
  }, [formConstantValues, sports, sports?.length,staffPayroll]);


  return (
    <>
      <AddForm
        cardTitle="ADD COACH"
        cardSubTitle="COACH DETAILS"
        formConstantValues={formConstantValues}
        imageTitle="Coach Image"
        buttonItems={{ next: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
}
