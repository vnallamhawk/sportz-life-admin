import React, {useEffect, useState} from 'react'
import {COACH_DETAILS_CONSTANTS} from '~/constants/coachConstants'

import {api} from '~/utils/api'
import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'
import router from 'next/router'

export default function AddCoach() {
  const {data: sports} = api.sports.getAllSports.useQuery()

  const [formConstantValues, setFormConstantValues] =
    useState<FormValues[]>(COACH_DETAILS_CONSTANTS)

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
  }, [sports?.length])

  return (
    <>
      <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
        {router?.asPath?.includes('edit') ? 'EDIT COACH DETAILS' : 'COACH DETAILS'}
      </div>
      <AddForm formConstantValues={formConstantValues} imageTitle='Coach Image' />
    </>
  )
}
