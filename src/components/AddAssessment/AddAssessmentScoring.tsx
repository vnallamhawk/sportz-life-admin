import React, {useEffect, useContext, useState, useRef} from 'react'

import type {CENTER_TYPES} from '~/types/coach'

import {useForm} from 'react-hook-form'
import {api} from '~/utils/api'

import AddForm from '~/common/AddForm'
import type {FormValues} from '~/types/common'
import {ASSESSMENT_SCORING_OPTIONS} from '~/constants/assessment'
import {FormContext} from '~/pages/assessments/AddAssessment/AddAssessmentForm'

export default function AddAssessmentScoring() {
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: {errors},
  } = useForm({mode: 'onSubmit'})
  const currentFormValues = getValues()
  const hasExecuted = useRef(true)
  const {data: sports} = api.sports.getAllSports.useQuery()

  const {data: coaches} = api.coach.getAllCoaches.useQuery()

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    ASSESSMENT_SCORING_OPTIONS
  )

  // useEffect(() => {
  //   if (sports?.length && hasExecuted.current) {
  //     const updatedFormConstantValues = formConstantValues.map(
  //       (formConstant) => {
  //         if (formConstant.id === "sportId") {
  //           return {
  //             ...formConstant,
  //             options: sports.map((sport: { name: string; id: number }) => ({
  //               label: sport.name,
  //               value: sport.id.toString(),
  //             })),
  //           };
  //         } else {
  //           return formConstant;
  //         }
  //       }
  //     );
  //     hasExecuted.current = false;
  //     setFormConstantValues(updatedFormConstantValues);
  //   }
  // }, [formConstantValues, sports, sports?.length]);

  //   useEffect(() => {
  //     // if (!isEditMode) {
  //     // eslint-disable-next-line no-console
  //     reset({
  //       ...currentFormValues,
  //       ...formData,
  //     });
  //     // }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [formData]);
  //test commit

  return (
    <>
      <AddForm
        cardTitle='CREATE ASSESSMENT'
        cardSubTitle='ASSESSMENT SCORING OPTIONS'
        formConstantValues={formConstantValues}
        buttonItems={{prevNext: true}}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  )
}
