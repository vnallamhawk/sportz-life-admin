import React, {useContext, useEffect, useRef, useState} from 'react'
import {STAFF_DETAILS_CONSTANTS} from '~/constants/staffConstants'
import type {STAFF_TYPES} from '~/types/staff'
import {useForm} from 'react-hook-form'
import {FormContext} from '~/pages/staff/AddStaff/AddStaffMultiFormLayout'
import {api} from '~/utils/api'

import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'

const AddStaff = ({onDropCallback}: {onDropCallback: (files: Array<File>) => void}) => {
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const {getValues} = useForm<STAFF_TYPES>({mode: 'onSubmit'})

  const {data: payroll} = api.staffPayroll.getAllPayroll.useQuery()
  const {data: designation} = api.staffDesignation.getAllDesignation.useQuery()
  const {data: centers} = api.center.getAllCenters.useQuery()

  const [formConstantValues, setFormConstantValues] =
    useState<FormValues[]>(STAFF_DETAILS_CONSTANTS)
  useEffect(() => {
    let updatedFormConstantValues: FormValues[] = formConstantValues
    if (payroll && payroll?.length > 0) {
      updatedFormConstantValues = formConstantValues.map((formConstant: FormValues) => {
        if (formConstant.id === 'payroll') {
          return {
            ...formConstant,
            options: payroll.map((payroll, index) => ({
              label: payroll?.StaffDesignation?.designation,
              value: payroll.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
    }
    if (designation && designation?.length > 0) {
      updatedFormConstantValues = updatedFormConstantValues.map((formConstant: FormValues) => {
        if (formConstant.id === 'designation') {
          return {
            ...formConstant,
            options: designation.map((desig: {designation: string; id: number}) => ({
              label: desig.designation,
              value: desig.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
    }
    if (centers && centers?.length > 0) {
      updatedFormConstantValues = updatedFormConstantValues.map((formConstant: FormValues) => {
        // Todo staff center
        if (formConstant.id === 'center') {
          return {
            ...formConstant,
            options: centers?.map((center: {name: string; id: number}) => ({
              label: center.name,
              value: center.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
    }
    setFormConstantValues(updatedFormConstantValues)
  }, [centers, designation, formConstantValues, payroll])

  // useEffect(() => {
  //   // if (!isEditMode) {
  //   // eslint-disable-next-line no-console
  //   reset({
  //     ...currentFormValues,
  //     ...formData,
  //   });
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData]);

  return (
    <>
      <AddForm
        cardTitle='ADD STAFFS'
        cardSubTitle='STAFF DETAILS'
        formConstantValues={formConstantValues}
        imageTitle='Staff Image'
        buttonItems={{next: true}}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onDropCallback={onDropCallback}
      />
    </>
  )
}

export default AddStaff
