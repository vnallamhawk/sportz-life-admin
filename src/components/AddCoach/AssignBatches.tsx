/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { type MULTI_FORM_TYPES } from "~/types/coach";
import Table from "../Table";
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [formConstantValues, setFormConstantValues] = useState<any>(
    COACH_BATCH_CONSTANTS
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [tableData, setTableData] = useState<any>([]);
  const [centerId, setCenterId] = useState<number>();
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const { data: centers } = api.center.getAllCenters.useQuery();
  const { data: batches } = api.batches.getAllBatches.useQuery();

  useEffect(() => {
    if (centers?.length && centers?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const updatedFormConstantValues: unknown = formConstantValues?.map(
        (formConstant:any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (formConstant.id === "center") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
              ...formConstant,
              options: centers?.map((center: { name: string; id: number }) => ({
                label: center.name,
                value: center.id,
              })),
            };
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return formConstant;
          }
        }
      );
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, centers, centers?.length, batches]);

  useEffect(() => {
    if (centerId) {
      const center = centers?.find((item) => item?.id == centerId);
      if (center?.Batches?.length && center?.Batches?.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const updatedFormConstantValues: unknown = formConstantValues?.map(
          (formConstant:any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (formConstant.id === "batches") {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return {
                ...formConstant,
                options: center?.Batches.map(
                  (batch: { name: string; id: number }) => ({
                    label: batch.name,
                    value: batch.id,
                  })
                ),
              };
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return formConstant;
            }
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFormConstantValues(updatedFormConstantValues);
      }
    }
  }, [centerId, centers, formConstantValues]);

  useEffect(() => {
    if ( formData && formData?.coachBatches) {
      setTableData(formData?.coachBatches);
    }
  }, [formData]);

  const submitCallback = (finalData: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const finalFormData = {
      ...finalData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      coachBatches: tableData,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    finalFormSubmissionHandler(finalFormData);
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const onAddBatchHandler = async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const arr = [...tableData];
    const batches =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      data?.batches && data?.batches.length > 0 ? [...data?.batches] : [];
    for (let i = 0; i < batches.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const obj = {
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        centerId: parseInt(data?.center?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        batchId: parseInt(data?.batches[i]?.value),
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      arr.push(obj);
    }

    setTableData(arr);
  };

  return (
    <div>
      <AddForm
        cardTitle="ADD COACH"
        cardSubTitle="ASSIGN BATCHES"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tableData={tableData}
        isFormTable={true}
        addTableData={onAddBatchHandler}
        finalFormSubmissionHandler={submitCallback}
        dependentKey="center"
        setDependentKey={(value: number) => setCenterId(value)}
      />
    </div>
  );
}
