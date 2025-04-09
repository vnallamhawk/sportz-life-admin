import React, {useContext, useEffect, useState} from 'react'
import {type COACH_CERTIFICATE_TABLE_TYPES} from '~/types/coach'
import Button from '~/components/Button'

import AddForm from '~/common/AddForm/AddForm'
import {
  COACH_CERTIFICATES_CONSTANTS,
  COACH_QUALIFICATION_CERTIFICATE_TYPE,
} from '~/constants/coachConstants'
import type {MULTI_FORM_COACH_QUALIFICATION, MULTI_FORM_TYPES} from '~/types/coach'
import {useFormContext} from 'react-hook-form'

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

  const formData = getValues()

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

    setValue('CoachQualifications', [...coachQualification, newQualification])
  }

  const removeCertificate = (index: number) => {
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
      setValue('CoachQualifications', updatedQualifications)
    }
  }, [formData.certificates])

  return (
    <>
      <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
        ADD CERTIFICATES
      </div>
      <AddForm formConstantValues={COACH_CERTIFICATES_CONSTANTS} />
      <Button
        className='border-1 ml-7 hidden rounded-md border-blush-light px-8 py-3 text-lg font-bold text-[#FF9678] hover:border-blush-dark hover:text-blush-dark lg:block'
        type='button'
        onClick={() => onAddHandler()}
      >
        Add
      </Button>
      <FeePlanTable tableData={coachQualification} onRemoveTableButton={removeCertificate} />
    </>
  )
}
