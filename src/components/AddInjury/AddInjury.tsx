import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AddForm from "~/common/AddForm";
import { INJURY_DETAILS_CONSTANTS } from "~/constants/injuryLog";
import { FormContext } from "~/pages/injurylog/AddInjury/AddInjuryMultiFormLayout";
import type { FormValues } from "~/types/common";
import { api } from "~/utils/api";
import Image from "next/image";
import { Dropdown, Radio } from "flowbite-react";

export default function AddInjury() {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  const [medicalHistoryData, setMedicalHistoryData] = useState([]);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: athletes } = api.athlete.getAllAthletes.useQuery();

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    INJURY_DETAILS_CONSTANTS
  );
  const customTheme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg bg-white rounded-r-md border-gray-200 border-l w-full  focus:outline-none  font-medium px-5 py-2 justify-between inline-flex items-center ",
  };

  useEffect(() => {
    if (athletes?.length && hasExecuted.current) {
      const updatedFormConstantValues: FormValues[] = formConstantValues.map(
        (formConstant: FormValues) => {
          if (formConstant.id === "selectedId") {
            return {
              ...formConstant,
              options: athletes.map((sport: { name: string; id: number }) => ({
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, athletes, athletes?.length]);

  useEffect(() => {
    // if (!isEditMode) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
        cardTitle="ADD INJURY LOG"
        cardSubTitle="Injured Information"
        formConstantValues={formConstantValues}
        tableData={medicalHistoryData}
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
