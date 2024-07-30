import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AddForm from "~/common/AddForm";
import { ATHLETE_DETAILS_CONSTANTS } from "~/constants/athleteConstants";
import { FormContext } from "~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout";
import type { ATHLETE_TYPES } from "~/types/athlete";
import { api } from "~/utils/api";

export default function AddCoach() {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  const [medicalHistoryData, setMedicalHistoryData] = useState([]);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ATHLETE_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    ATHLETE_DETAILS_CONSTANTS
  );

  useEffect(() => {
    if (sports?.length && hasExecuted.current) {
      const updatedFormConstantValues: any = formConstantValues.map(
        (formConstant: any) => {
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
        }
      );
      hasExecuted.current = false;
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, sports, sports?.length]);

  useEffect(() => {
    // if (!isEditMode) {
    reset({
      ...currentFormValues,
      ...formData,
    });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  //test commit

  const addTableData = (currentData: any) => {
    const arr: any = [...medicalHistoryData];
    const obj = { ...currentData, ["No."]: arr.length + 1 };
    arr.push(obj);
    setMedicalHistoryData(arr);
  };

  return (
    <>
      <AddForm
        cardTitle="ADD ATHLETE"
        cardSubTitle="Athlete Personal Details"
        formConstantValues={formConstantValues}
        imageTitle="Attach Athlete Image"
        tableTitle="Medical History"
        tableDescription={
          "Kindly list down if your child has any allergies, major injuries, chronic diseases, physical disabilities & Children with special needs (CWSN)"
        }
        mobileAddButtonText="Add another medical history"
        TableHeadings={[
          { label: "#", id: "No." },
          { label: "Medical History", id: "medicalHistory" },
          { label: "Action", id: "action" },
        ]}
        tableFields={[
          {
            type: "textarea",
            name: "medicalHistory",
            placeholder: "Medical Pre-History 1",
          },
        ]}
        tablekey="medicalHistory"
        tableData={medicalHistoryData}
        addTableData={addTableData}
        buttonItems={{ next: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
}
