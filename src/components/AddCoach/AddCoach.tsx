import React, {useEffect, useContext, useState} from 'react'
import {COACH_DETAILS_CONSTANTS} from '~/constants/coachConstants'
// import {FormContext} from '~/pages/coach/AddCoach/AddCoachMultiFormLayout'

import {api} from '~/utils/api'
import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'
import {useFormContext} from 'react-hook-form'
import type {MULTI_FORM_TYPES} from '~/types/coach'
import {FormContext} from '~/hooks/useMultiStepFormContext'

export default function AddCoach() {
  const {
    currentStep,
    setCurrentStep,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // multiFormData: { formData, setFormData },
  } = useContext(FormContext)
  // const isEditMode = router.asPath.includes("edit");

  const {data: sports} = api.sports.getAllSports.useQuery()
  // const { data: staffPayroll } = api.staffPayroll.getAllPayroll.useQuery();

  const {
    control,
    getValues,
    trigger,
    formState: {errors},
    watch,
  } = useFormContext<MULTI_FORM_TYPES>()
  const formData = getValues()
  const isEditMode = watch('isEditMode')

  const [formConstantValues, setFormConstantValues] =
    useState<FormValues[]>(COACH_DETAILS_CONSTANTS)
  // TODO: FIX THIS TS ERROR
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const updatedFormData = {
  //   ...formData,
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   coachingSports:
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     //@ts-expect-error
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     formData?.CoachSportsMaps?.map(
  //       (coachSportsMaps) =>
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //         coachSportsMaps['sportId']
  //     ) ?? [],
  // }

  // console.log({updatedFormData})
  useEffect(() => {
    let updatedFormConstantValues: FormValues[] = formConstantValues
    if (sports?.length) {
      updatedFormConstantValues = formConstantValues.map((formConstant: FormValues) => {
        if (formConstant.id === 'coachingSports') {
          return {
            ...formConstant,
            options: sports.map((sport: {name: string; id: number}) => ({
              label: sport.name,
              value: sport.id,
            })),
          }
        } else {
          return formConstant
        }
      })
    }
    setFormConstantValues(updatedFormConstantValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sports?.length])

  // useEffect(() => {
  //   let updatedFormConstantValues: FormValues[] = formConstantValues;
  //   if (sports?.length) {
  //     console.log("inside");
  //     updatedFormConstantValues = formConstantValues.map(
  //       (formConstant: FormValues) => {
  //         if (formConstant.id === "coachingSports") {
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
  //   }
  //   if (staffPayroll?.length && staffPayroll?.length > 0) {
  //     updatedFormConstantValues = updatedFormConstantValues.map(
  //       (formConstant: FormValues) => {
  //         if (formConstant.id === "payroll") {
  //           // console.log("payroll", payroll);
  //           return {
  //             ...formConstant,
  //             options: staffPayroll?.map((payroll, index) => ({
  //               label: payroll?.StaffDesignation?.designation,
  //               value: payroll.id.toString(),
  //             })),
  //           };
  //         } else {
  //           return formConstant;
  //         }
  //       }
  //     );
  //   }
  //   setFormConstantValues(updatedFormConstantValues);
  // }, [formConstantValues, sports, sports?.length, staffPayroll]);

  console.log({values: getValues()})
  return (
    <>
      <AddForm
        cardTitle={isEditMode ? 'EDIT COACH' : 'ADD COACH'}
        cardSubTitle='COACH DETAILS'
        formConstantValues={formConstantValues}
        imageTitle='Coach Image'
        buttonItems={{next: true}}
        // setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // formData={updatedFormData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  )
}
