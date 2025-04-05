import React, {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {FormContext} from '~/pages/competitions/AddCompetitions/AddCompetitionsMultiFormLayout'
import {api} from '~/utils/api'

import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'
import {COMPETITION_DETAILS_CONSTANTS} from '~/constants/competitionConstants'

const AddCompetition = () => {
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const {getValues} = useForm<any>({mode: 'onSubmit'})

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    COMPETITION_DETAILS_CONSTANTS
  )
  // useEffect(() => {
  //   let updatedFormConstantValues: any = formConstantValues;
  //   if (payroll && payroll?.length > 0) {
  //     updatedFormConstantValues = formConstantValues.map((formConstant:FormValues) => {
  //       if (formConstant.id === "payroll") {
  //         // console.log("payroll", payroll);
  //         return {
  //           ...formConstant,
  //           options: payroll.map((payroll, index) => ({
  //             label: payroll?.StaffDesignation?.designation,
  //             value: payroll.id.toString(),
  //           })),
  //         };
  //       } else {
  //         return formConstant;
  //       }
  //     });
  //   }
  //   if (centers && centers?.length > 0) {
  //     updatedFormConstantValues = updatedFormConstantValues.map(
  //       (formConstant: any) => {
  //         // Todo staff center
  //         if (formConstant.id === "center") {
  //           return {
  //             ...formConstant,
  //             options: centers?.map((center: { name: string; id: number }) => ({
  //               label: center.name,
  //               value: center.id.toString(),
  //             })),
  //           };
  //         } else {
  //           return formConstant;
  //         }
  //       }
  //     );
  //   }
  //   setFormConstantValues(updatedFormConstantValues);
  // }, [centers, designation, formConstantValues, payroll]);

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
        cardTitle='ADD COMPETITION'
        cardSubTitle='COMPETITION DETAILS'
        formConstantValues={formConstantValues}
        buttonItems={{next: true}}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  )
}

export default AddCompetition
