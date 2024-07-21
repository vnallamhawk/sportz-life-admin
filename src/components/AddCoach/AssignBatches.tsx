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
  const [centerId,setCenterId]=useState<number>()
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
  
  if(centerId){
    const center=centers?.find((item)=>item?.id==centerId)
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
},[centerId, centers, formConstantValues])

  useEffect(() => {
    if (formData?.coachBatches?.length) {
      setTableData(formData?.coachBatches);
    }
  }, [formData?.coachBatches]);

  const submitCallback = (finalData) => {
    const finalFormData = {
      ...finalData,
      coachBatches:tableData,
    };
    finalFormSubmissionHandler(finalFormData);
  };

  const onAddBatchHandler = async (data) => {
    const arr=[...tableData]
    const batches=data?.batches && data?.batches.length>0?[...data?.batches]:[]
    for(let i=0;i<batches.length;i++){
      const obj={...data,centerId:parseInt(data?.center?.value),batchId:parseInt(data?.batches[i]?.value),}
      arr.push(obj)
    }
  
    setTableData(arr)
    }
  


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
          { label: "Center", id: "centerId" },
          { label: "Batches", id: "batchId" },
          { label: "Action", id: "action" },
        ]}
        // tableFields={formConstantValues}
        tablekey="coachBatches"
        tableData={tableData}
        isFormTable={true}
        addTableData={onAddBatchHandler}
        finalFormSubmissionHandler={submitCallback}
        dependentKey="center"
        setDependentKey={(value)=>setCenterId(value)}
      />
    </div>
  );
}
