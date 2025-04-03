import React, { useEffect, useContext, useState, useRef } from "react";

import type {
  CENTER_TYPES
} from "~/types/coach";

import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { NUMERIC_TYPE, PHYSICAL_TEST_BANK } from "~/constants/assessment";

import AddForm from "~/common/AddForm";
import type { FormValues } from "~/types/common";
import { FormContext } from "~/pages/assessments/AddPhysicalTestBank/AddTestForm";

export default function AddTestBank(props: { finalFormSubmissionHandler: any; physical: boolean }) {
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
  } = useForm({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();

  const { data: coaches } = api.coach.getAllCoaches.useQuery()
  const [measureType, setMeasureType] = useState<string>("")
  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    PHYSICAL_TEST_BANK
  );

  useEffect(() => {
    if (!props.physical) {
      if (sports?.length && hasExecuted.current) {
        const updatedFormConstantValues = formConstantValues.map(
          (formConstant, index) => {
            if (index == 1) {
              return {
                ...formConstant,
                id: "sport",
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
    }

  }, [formConstantValues, sports, sports?.length, props.physical]);

  useEffect(() => {

    if (measureType === "Numeric value") {
      const arr: FormValues[] = [...formConstantValues, ...NUMERIC_TYPE]

      setFormConstantValues(arr);
      setMeasureType('')
    }
  }, [formConstantValues, measureType]);


  return (
    <>
      <AddForm
        cardTitle={props?.physical ? "ADD PHYSICAL PERFORMANCE TESTS" : "ADD SPORTS-SPECIFIC PERFORMANCE TESTS"}
        cardSubTitle={props?.physical ? "PHYSICAL TESTS DETAILS" : "SPORTS-SPECIFIC TESTS DETAILS"}
        formConstantValues={formConstantValues}
        buttonItems={{ finish: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setDependentKey={(value: string) => setMeasureType(value)}
        dependentKey="measure_type"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        finalFormSubmissionHandler={props?.finalFormSubmissionHandler}
      />

    </>
  );
}
