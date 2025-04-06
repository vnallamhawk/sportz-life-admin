/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useContext, useEffect, useState} from 'react'
// import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
// import { useForm } from "react-hook-form";
import {type COACH_CERTIFICATE_TABLE_TYPES} from '~/types/coach'
import {type CoachQualifications} from '@prisma/client'
// import { CoachQualifications_certificateType } from "@prisma/client";
import Button from '~/components/Button'

import {
  FormContext,
  multiFormData,
  type FormContextTypes,
} from '~/pages/coach/AddCoach/AddCoachMultiFormLayout'
import {dateFormat} from '~/helpers/date'
import AddForm from '~/common/AddForm/AddForm'
import {
  COACH_CERTIFICATES_CONSTANTS,
  COACH_QUALIFICATION_CERTIFICATE_TYPE,
} from '~/constants/coachConstants'
import type {MULTI_FORM_COACH_QUALIFICATION, MULTI_FORM_TYPES} from '~/types/coach'
import {useFieldArray, useForm, useFormContext} from 'react-hook-form'
import CoachCertificateTable from './CoachCertificateTable'

export default function AddCoachCertificates({}) {
  // const {currentStep, setCurrentStep} =
  //   // multiFormData: {formData, setFormData},
  //   useContext<FormContextTypes>(FormContext)

  const {
    control, // For <Controller> components
    register, // For native inputs
    handleSubmit, // Submission handler
    watch, // Track specific fields
    getValues, // Get current field values
    setValue, // Update a field programmatically
    formState: {errors, isDirty, isValid}, // Form state
    reset, // Reset the form
  } = useFormContext<MULTI_FORM_TYPES>() // Replace with your form type
  const certificates = watch('certificates')
  const instituteName = watch('instituteName')
  const startDate = watch('startDate')
  const endDate = watch('endDate')
  const coachQualification = watch('CoachQualifications')
  console.log(JSON.stringify(getValues()))

  const formData = getValues()
  const [tableData, setTableData] = useState<Partial<COACH_CERTIFICATE_TABLE_TYPES>[] | undefined>()

  useEffect(() => {
    const subscription = watch((value) => {})
    return () => subscription.unsubscribe() // Cleanup
  }, [watch])

  const onAddHandler = () => {
    const newQualification: MULTI_FORM_COACH_QUALIFICATION = {
      startDate: startDate,
      certificateType: certificates,
      certificateTypeLabel: certificates
        ? COACH_QUALIFICATION_CERTIFICATE_TYPE[certificates]
        : undefined,
      endDate: endDate,
      instituteName: instituteName,
    }
    console.log(newQualification)
    console.log([...coachQualification, newQualification])

    setValue('CoachQualifications', [...coachQualification, newQualification])
    // setTableData([...tableData, newQualification])
  }

  const removeCertificate = (index: number) => {
    // const coachQualification = [...formData.CoachQualifications]
    // coachQualification.splice(index, 1)
    // setFormData?.((prevFormData) => ({
    //   ...prevFormData,
    //   instituteName: undefined,
    //   CoachQualifications: coachQualification,
    // }))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // const arr = [...certificates]
    // arr.splice(index, 1)
    // setCertificates(arr)
    // console.log('inside rmove')
    // console.log(coachQualification.splice(index, 1))
    setValue('CoachQualifications', coachQualification.splice(index, 1))
  }

  useEffect(() => {
    if (formData?.CoachQualifications) {
      const updatedQualifications = formData.CoachQualifications.map((qualification) => ({
        ...qualification,
        certificateTypeLabel: qualification.certificateType
          ? COACH_QUALIFICATION_CERTIFICATE_TYPE[qualification.certificateType]
          : undefined,
      }))
      // setTableData(updatedQualifications)
      setValue('CoachQualifications', updatedQualifications)
    }
  }, [formData.certificates])

  return (
    <>
      <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
        ADD CERTIFICATES
      </div>
      <AddForm
        cardTitle='ADD COACH'
        cardSubTitle='ADD CERTIFICATES'
        formConstantValues={COACH_CERTIFICATES_CONSTANTS}
        // buttonItems={{prevNext: true}}
        // mobileAddButtonText='Add another certificate'
        // TableHeadings={[
        //   {label: 'Certificate', id: 'certificateTypeLabel'},
        //   {label: 'Institute', id: 'instituteName'},
        //   {label: 'Action', id: 'action'},
        // ]}
      />
      <Button
        className='border-1 ml-7 hidden rounded-md border-blush-light px-8 py-3 text-lg font-bold text-[#FF9678] hover:border-blush-dark hover:text-blush-dark lg:block'
        type='button'
        onClick={() => onAddHandler()}
      >
        Add
      </Button>
      <CoachCertificateTable
        tableData={coachQualification}
        onRemoveTableButton={removeCertificate}
      />
    </>
  )
}
