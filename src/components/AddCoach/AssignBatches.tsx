/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useContext, useEffect, useState} from 'react'
// import { useForm } from "react-hook-form";
import type {COACH_CENTER_BATCHES} from '~/types/coach'
import {type MULTI_FORM_TYPES} from '~/types/coach'
import {FormContext} from '~/pages/coach/AddCoach/AddCoachMultiFormLayout'
import {api} from '~/utils/api'
import AddForm from '~/common/AddForm'
import {COACH_BATCH_CONSTANTS} from '~/constants/coachConstants'

export default function AssignBatches({
  finalFormSubmissionHandler,
}: {
  finalFormSubmissionHandler: (data: MULTI_FORM_TYPES) => void
}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [formConstantValues, setFormConstantValues] = useState<COACH_CENTER_BATCHES[] | undefined>(
    COACH_BATCH_CONSTANTS
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [tableData, setTableData] = useState<any>([])
  // const [centerId, setCenterId] = useState<number>();
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)
  const {data: centers} = api.center.getAllCenters.useQuery()
  const {data: batches} = api.batches.getAllBatches.useQuery()

  useEffect(() => {
    if (centers?.length && centers?.length > 0 && batches?.length && batches?.length > 0) {
      const updatedFormConstantValues: COACH_CENTER_BATCHES[] | undefined = formConstantValues?.map(
        (formConstant) => {
          if (formConstant.id === 'centerId') {
            return {
              ...formConstant,
              options: centers?.map((center: {name: string; id: number}) => ({
                label: center.name,
                value: center.id,
              })),
            }
          } else if (formConstant.id === 'batches') {
            return {
              ...formConstant,
              options: batches?.map((center: {name: string; id: number}) => ({
                label: center.name,
                value: center.id,
              })),
            }
          } else {
            return formConstant
          }
        }
      )
      setFormConstantValues(updatedFormConstantValues)
    }
  }, [centers, batches])

  // useEffect(() => {
  //   if (formData.centerId) {
  //     const center = centers?.find((item) => item?.id == formData.centerId)
  //     const updatedFormConstantValues: COACH_CENTER_BATCHES[] = formConstantValues?.map(
  //       (formConstant) => {
  //         if (formConstant.id === 'batches') {
  //           return {
  //             ...formConstant,
  //             isDisabled: false,
  //             options:
  //               center?.Batches?.map((batch: {name: string; id: number}) => ({
  //                 label: batch.name,
  //                 value: batch.id,
  //               })) ?? [],
  //           }
  //         } else {
  //           return formConstant
  //         }
  //       }
  //     )
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     setFormConstantValues(updatedFormConstantValues)
  //   } else {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     const updatedFormConstantValues: unknown = formConstantValues?.map((formConstant: any) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //       if (formConstant.id === 'batches') {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //         return {
  //           ...formConstant,
  //           isDisabled: true,
  //           options: [],
  //         }
  //       } else {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //         return formConstant
  //       }
  //     })
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     setFormConstantValues(updatedFormConstantValues)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData.centerId])

  useEffect(() => {
    if (formData && formData?.coachBatches) {
      setTableData(
        formData?.CoachCentersBatches.map((coachCenterBatch) => ({
          centerLabel: coachCenterBatch.Centers.name,
          batchLabel: coachCenterBatch.Batches.name,
        }))
      )
    }
  }, [formData])

  const submitCallback = (finalData: MULTI_FORM_TYPES) => {
    const finalFormData = {
      ...finalData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      coachBatches: tableData,
    }
    finalFormSubmissionHandler(finalFormData)
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  const onAddBatchHandler = async (data: MULTI_FORM_TYPES) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const arr = [...tableData]
    const center = centers?.find((center) => center.id === data?.centerId)
    const obj = {
      ...data,
      centerLabel: center?.name,
      batchLabel: batches
        ?.filter((batch) => data.batches.includes(batch.id))
        .map(({name}) => name)
        .join(' ,'),
    }
    arr.push(obj)

    setTableData(arr)
  }

  const removeAssignBatches = (index: number) => {
    // eslint-disable-next-line
    const arr = [...tableData]
    arr.splice(index, 1)
    setTableData(arr)
  }

  return (
    <div>
      <AddForm
        cardTitle='ADD COACH'
        cardSubTitle='ASSIGN BATCHES'
        formConstantValues={formConstantValues}
        buttonItems={{prevFinish: true}}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tableTitle='Batches'
        mobileAddButtonText="Add another center's batch"
        TableHeadings={[
          {label: 'Center', id: 'centerLabel'},
          {label: 'Batches', id: 'batchLabel'},
          {label: 'Action', id: 'action'},
        ]}
        // tableFields={formConstantValues}
        tablekey='coachBatches'
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tableData={tableData}
        isFormTable={true}
        addTableData={onAddBatchHandler}
        finalFormSubmissionHandler={submitCallback}
        // dependentKey='center'
        // setDependentKey={(value: number) => setCenterId(value)}
        onRemoveTableButton={removeAssignBatches}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        shouldDisableAddTableButton={tableData?.length === 1}
      />
    </div>
  )
}
