import React, { useEffect, useContext, useState, useRef } from "react";
import CardTitle from "~/components/Card/CardTitle";
import { ATHLETE_DETAILS_CONSTANTS } from "~/constants/athleteConstants";
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
import Card from "../Card";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import AddForm from "~/common/AddForm";

export default function AddCoach() {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  const [medicalHistoryData,setMedicalHistoryData]=useState([])

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<COACH_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    ATHLETE_DETAILS_CONSTANTS
  );

  useEffect(() => {
    if (sports?.length && hasExecuted.current) {
      const updatedFormConstantValues = formConstantValues.map(
        (formConstant) => {
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


  const addTableData=(currentData)=>{
    let arr=[...medicalHistoryData]
    let obj={...currentData,["No."]:arr.length+1}
    arr.push(obj)
    setMedicalHistoryData(arr)
  }

  return (
    <>
    <AddForm cardTitle="ADD ATHLETE" cardSubTitle="Athlete Personal Details" formConstantValues={formConstantValues} imageTitle="Attach Athlete Image" tableTitle="Medical History" tableDescription={"Kindly list down if your child has any allergies, major injuries, chronic diseases, physical disabilities & Children with special needs (CWSN)"} mobileAddButtonText="Add another medical history" TableHeadings={[{label:"#",id:"No."},{label:"Medical History",id:"medicalHistory"},{label:"Action",id:"action"}]} tablekey="medicalHistory" tableData={medicalHistoryData} addTableData={addTableData} buttonItems={{next:true}} setFormData={setFormData} formData={formData} currentStep={currentStep} setCurrentStep={setCurrentStep}/>

    </>
  )
}
