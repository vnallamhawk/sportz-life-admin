/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { type MULTI_FORM_TYPES } from "~/types/coach";
import Table from "../Table";
import CenterBatchTableHeader from "../CenterBatchTable/CenterBatchTableHeader";
import CenterBatchTableBody from "../CenterBatchTable/CenterBatchTableBody";
import Button from "../Button/Button";
import CardTitle from "../Card/CardTitle";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { api } from "~/utils/api";
import { formatBatchesTableData } from "~/helpers/batches";
import { type BatchTableData } from "~/types/batch";
import AddForm from "~/common/AddForm";
import { COACH_BATCH_CONSTANTS } from "~/constants/coachConstants";


export default function AssignBatches({
  finalFormSubmissionHandler,
}: {
  finalFormSubmissionHandler: (data: MULTI_FORM_TYPES) => void;
}) {
  const {
    control,
    formState: { errors },
    getValues,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      centerName: undefined,
      batchName: undefined,
    },
  });
  const [formConstantValues, setFormConstantValues] = useState(
    COACH_BATCH_CONSTANTS
  );
  const [tableData, setTableData] = useState<BatchTableData[]>([]);
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData,setFormData },
  } = useContext(FormContext);

  const { data: centers } = api.center.getAllCenters.useQuery();
  const { data: batches } = api.batches.getAllBatches.useQuery();


 
  useEffect(() => {
    if (centers?.length > 0) {
     const  updatedFormConstantValues = formConstantValues?.map(
        (formConstant) => {
          if (formConstant.id === "center") {
            return {
              ...formConstant,
              options: centers?.map((center: { name: string; id: number }) => ({
                label: center.name,
                value: center.id,
              })),
            };
          } else {
            return formConstant;
          }
        }
      );
      setFormConstantValues(updatedFormConstantValues);
    }
 

  }, [formConstantValues, centers, centers?.length,batches,]);

useEffect(()=>{
  if(formData?.center){
    const center=centers?.find((item)=>item?.id==formData?.center?.value)
    if (center?.Batches?.length >0) {
     const updatedFormConstantValues = formConstantValues?.map(
       (formConstant) => {
         if (formConstant.id === "batches") {
           return {
             ...formConstant,
             options: center?.Batches.map((batch: { name: string; id: number }) => ({
               label: batch.name,
               value: batch.id,
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
},[formData?.center])

  useEffect(() => {
    if (formData?.batchTableData?.length) {
      setTableData(formData?.batchTableData);
    }
  }, [formData?.batchTableData]);

  const submitCallback = () => {
    const finalFormData = {
      ...formData,
      batchIds: tableData?.reduce<number[]>((accumulator, current) => {
        if (current?.batchIds?.length) {
          accumulator.push(...current.batchIds);
        }
        return accumulator;
      }, []),
      centerIds: tableData?.reduce<number[]>((accumulator, current) => {
        if (current.centerId) {
          accumulator.push(Number(current.centerId));
        }
        return accumulator;
      }, []),
    };
    finalFormSubmissionHandler(finalFormData);
  };

  const onAddBatchHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const data = getValues();
    const tableDataFormatter = formatBatchesTableData(data);
    const result = await trigger();

    // eslint-disable-next-line no-console

    if (result && Object.keys(errors).length === 0) {
      if (tableData?.length) {
        setTableData((prev) => [...prev, tableDataFormatter]);
      } else {
        setTableData([tableDataFormatter]);
      }
      reset();
    }
  };

  console.log(formConstantValues,"formConstantValuesformConstantValues");

  return (
    <div>
        <AddForm
        cardTitle="ADD COACH"
        cardSubTitle="ASSIGN BATCHES"
        formConstantValues={formConstantValues}
        buttonItems={{ prevFinish: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tableTitle="Batches"
        mobileAddButtonText="Add another center's batch"
        TableHeadings={[
          { label: "Center", id: "center" },
          { label: "Batches", id: "batches" },
          { label: "Action", id: "action" },
        ]}
        // tableFields={formConstantValues}
        tablekey="batchTableData"
        tableData={tableData}
        addTableData={onAddBatchHandler}
        finalFormSubmissionHandler={submitCallback}
      />
    </div>
  );
}
