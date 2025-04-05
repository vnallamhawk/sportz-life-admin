/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useEffect, useContext, useState, useRef} from 'react'
import {ATHLETE_CONTACT_CONSTANTS, ATHLETE_GENRAL_CONSTANTS} from '~/constants/athleteConstants'

import {FormContext} from '~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout'
import {useForm} from 'react-hook-form'
import {api} from '~/utils/api'
import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'
import {Centers, Sports} from '@prisma/client'

export default function AddGeneralDetails({finalFormSubmissionHandler}: any) {
  const {
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: {errors},
  } = useForm({mode: 'onSubmit'})
  const {data: centers} = api.center.getAllCenters.useQuery()
  const [centerId, setCenterId] = useState<number>()
  const [sportIds, setSportIds] = useState<number[]>([])

  const [formConstantValues, setFormConstantValues] =
    useState<FormValues[]>(ATHLETE_GENRAL_CONSTANTS)

  const [formConstantValues1, setFormConstantValues1] =
    useState<FormValues[]>(ATHLETE_CONTACT_CONSTANTS)

  useEffect(() => {
    if (centers?.length) {
      let updatedFormConstantValues: FormValues[] = formConstantValues

      updatedFormConstantValues = formConstantValues?.map((formConstant: FormValues) => {
        if (
          formConstant.id === 'centerId' &&
          formConstant?.options &&
          formConstant?.options.length == 0
        ) {
          return {
            ...formConstant,
            options: centers.map((center) => ({
              label: center.name,
              value: center?.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
      setFormConstantValues(updatedFormConstantValues)
    }
  }, [formConstantValues, centers, centers?.length])

  useEffect(() => {
    if (centerId && formConstantValues && formConstantValues.length > 0) {
      const center = centers?.find((item) => item?.id == centerId)
      let updatedFormConstantValues: FormValues[] = formConstantValues
      if (center?.CenterSports && center?.CenterSports?.length > 0) {
        updatedFormConstantValues = formConstantValues?.map((formConstant: FormValues) => {
          if (
            formConstant.id === 'sportId' &&
            formConstant?.options &&
            formConstant?.options.length == 0
          ) {
            const data = {
              ...formConstant,
              options: center.CenterSports.map((CenterSport) => ({
                label: CenterSport?.Sports?.name,
                value: CenterSport?.Sports?.id.toString(),
              })),
            }

            return data
          } else {
            return formConstant
          }
        })
      }

      if (center?.Batches && center?.Batches?.length > 0) {
        updatedFormConstantValues = updatedFormConstantValues?.map((formConstant: FormValues) => {
          if (
            formConstant.id === 'batch' &&
            formConstant?.options &&
            formConstant?.options.length == 0
          ) {
            return {
              ...formConstant,
              options: center.Batches.map((batch) => ({
                label: batch?.name,
                value: batch?.id.toString(),
              })),
            }
          } else {
            return formConstant
          }
        })
      }

      setFormConstantValues(updatedFormConstantValues)
    }
  }, [centers, centerId, formConstantValues])

  useEffect(() => {
    if (sportIds && sportIds.length > 0 && formConstantValues && formConstantValues.length > 0) {
      let updatedFormConstantValues: FormValues[] = formConstantValues
      const center = centers?.find((item) => item?.id == centerId)
      const finalBatches = center?.Batches?.filter((item) => sportIds.includes(item?.sportId))

      updatedFormConstantValues = updatedFormConstantValues?.map((formConstant: FormValues) => {
        if (
          formConstant.id === 'batch' &&
          formConstant?.options &&
          formConstant?.options.length == 0
        ) {
          return {
            ...formConstant,
            options: finalBatches?.map((batch: {name: string; id: number}) => ({
              label: batch.name,
              value: batch.id.toString(),
            })),
          }
        } else {
          return formConstant
        }
      })
      setFormConstantValues(updatedFormConstantValues)
    }
  }, [centerId, centers, formConstantValues, sportIds])

  // console.log({ formConstantValues, centerId })
  return (
    <>
      <AddForm
        cardTitle='ADD ATHLETE'
        cardSubTitle='Athlete General Details'
        formConstantValues={formConstantValues}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        dependentKey='centerId'
        dependentKey1='sportId'
        setDependentKey1={(value: string) => {
          const arr: number[] = [...sportIds]
          arr.push(parseInt(value))
          setSportIds(arr)
        }}
        setDependentKey={(value: number) => setCenterId(value)}
        buttonItems={{}}
      />

      <AddForm
        cardSubTitle='Contact Details'
        formConstantValues={formConstantValues1}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        buttonItems={{prevFinish: true}}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        finalFormSubmissionHandler={finalFormSubmissionHandler}
      />
    </>
  )
}
