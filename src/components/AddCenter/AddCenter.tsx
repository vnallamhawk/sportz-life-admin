import React, {useEffect, useContext, useState, useRef} from 'react'

import type {CENTER_TYPES} from '~/types/coach'

import {FormContext} from '~/pages/centers/AddCenter/AddCenterForm'
import {useForm} from 'react-hook-form'
import {api} from '~/utils/api'
import {CENTER_DETAILS_CONSTANTS} from '~/constants/centerConstants'

import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'

export default function AddCenter() {
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
  } = useForm<CENTER_TYPES>({mode: 'onSubmit'})
  const currentFormValues = getValues()
  const hasExecuted = useRef(true)
  const {data: sports} = api.sports.getAllSports.useQuery()

  const {data: coaches} = api.coach.getAllCoaches.useQuery()

  const [formConstantValues, setFormConstantValues] =
    useState<FormValues[]>(CENTER_DETAILS_CONSTANTS)

  useEffect(() => {
    if (sports?.length && hasExecuted.current) {
      const updatedFormConstantValues = formConstantValues.map((formConstant) => {
        if (formConstant.id === 'selectSports') {
          return {
            ...formConstant,
            options: sports.map((sport: {name: string; id: number}) => ({
              label: sport.name,
              value: sport.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
      hasExecuted.current = false
      setFormConstantValues(updatedFormConstantValues)
    }
  }, [formConstantValues, sports, sports?.length])

  useEffect(() => {
    if (coaches?.length && hasExecuted.current) {
      const updatedFormConstantValues = formConstantValues.map((formConstant) => {
        if (formConstant.id === 'selectCoaches') {
          return {
            ...formConstant,
            options: coaches.map((coach: {name: string; id: number}) => ({
              label: coach.name,
              value: coach.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
      hasExecuted.current = false
      setFormConstantValues(updatedFormConstantValues)
    }
  }, [formConstantValues, coaches, coaches?.length])

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
        cardTitle='ADD CENTER'
        cardSubTitle='CENTER DETAILS'
        formConstantValues={formConstantValues}
        imageTitle='Center Image'
        buttonItems={{next: true}}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      {/* <CardTitle title="" />
      <div className="text-lg font-bold">CENTER DETAILS</div>
      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12">
        {formConstantValues.map((props) => (
          <div key={props.id}>
            {getInputElement(props)}

            <span className="text-red-800">
              {errors[props.id]?.type === "required" && (
                <div>This field is required</div>
              )}
              {errors[props.id]?.type === "pattern" && (
                <div> This field is not matching the pattern</div>
              )}
              {errors[props.id]?.type === "maxLength" && (
                <div>{`This field is exceeding the max. character limit`}</div>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mr-10 mt-10 flex justify-end">
        <Button
          className="border-1 mx-3 bg-pink-600 hover:bg-pink-800"
          type="button"
          onClick={() => void nextClickHandler()}
        >
          Next
        </Button>
      </div> */}
    </>
  )
}
