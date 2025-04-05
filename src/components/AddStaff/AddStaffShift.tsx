/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'

import {FormContext} from '~/pages/staff/AddStaff/AddStaffMultiFormLayout'

import AddForm from '~/common/AddForm/AddForm'
import {STAFF_SHIFT_CONSTANTS} from '~/constants/staffConstants'
import {STAFF_TIMINGS_TABLE_HEADERS} from '~/constants/staffTimingConstants'
import type {FormValues} from '~/types/common'

export default function AddStaffShift({finalFormSubmission}: any) {
  const [staffShiftDetails, setStaffShiftDetails] = useState<{[key: string]: any}[]>([])
  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(STAFF_SHIFT_CONSTANTS)
  const {
    control,
    formState: {errors},
    getValues,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      day: undefined,
      shift: undefined,
      startTime: '10:00',
      endTime: '10:00',
    },
  })

  // const [tableData, setTableData] = useState<BatchTableData[]>([]);
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const submitCallback = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const finalFormData = {
      ...formData,
      staffShiftDetails,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setFormData(finalFormData)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    finalFormSubmission(finalFormData)
  }

  const onAddStaffTiming = (currentStaffShift: {[key: string]: any}) => {
    const arr: {[key: string]: any}[] = [...staffShiftDetails]
    arr.push({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      day: currentStaffShift?.day.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      shift: currentStaffShift?.shift.value,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      startTime: formData?.startTime,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      endTime: formData?.endTime,
    })
    setStaffShiftDetails(arr)
  }
  return (
    <div>
      <AddForm
        cardTitle='ADD STAFF'
        cardSubTitle='DUTY SHIFT'
        formConstantValues={formConstantValues}
        buttonItems={{prevFinish: true}}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tableTitle='SHIFTS'
        mobileAddButtonText='Add another shift'
        TableHeadings={STAFF_TIMINGS_TABLE_HEADERS}
        //  tableFields={STAFF_SHIFT_CONSTANTS}
        tablekey='staffShiftDetails'
        tableData={staffShiftDetails}
        addTableData={onAddStaffTiming}
        finalFormSubmissionHandler={submitCallback}
        isFormTable={true}
      />
    </div>
  )
}
