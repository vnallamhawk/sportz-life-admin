import React, {useContext, useEffect, useState} from 'react'
import {FormContext} from '~/pages/centers/AddCenter/AddCenterForm'
import {api} from '~/utils/api'
import {useSession} from 'next-auth/react'
import AddForm from '~/common/AddForm/AddForm'

import {useRouter} from 'next/router'
import {ASSIGN_TEST_BANK_TABLE_HEADERS} from '~/constants/assessment'

interface Options {
  label: string | undefined
  value: string | number | undefined
}

const AssessmentParticipants = () => {
  const router = useRouter()
  const [participants, setParticipants] = useState<{[key: string]: any}[]>([])
  const [finalOptions, setFinalOptions] = useState<Options[]>([])
  const [showModal, setShowModal] = useState(false)
  const {data: sessionData} = useSession()

  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId

  const {data: allSports} = api.sports.getAllSports.useQuery()

  const {mutate: createMutate} = api.sports.createSports.useMutation({
    onSuccess: (response) => {
      const arr: Options[] = [...finalOptions]
      arr.push({label: response?.name, value: response?.id})
      setFinalOptions(arr)
    },
  })

  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const onSaveParticipants = (currentParticipantsData: {[key: string]: any}) => {
    const arr: {[key: string]: any}[] = [...participants]
    arr.push({
      ...currentParticipantsData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      sportId: parseInt(currentParticipantsData?.value),
    })
    setParticipants(arr)
  }

  const removeParticipants = (index: number) => {
    const arr = [...participants]
    arr.splice(index, 1)
    setParticipants(arr)
  }

  return (
    <>
      <AddForm
        cardTitle='CREATE ASSESSMENT'
        tableTitle='SCHEDULE PARTICIPANTS'
        tableFields={[
          {
            type: 'select',
            name: 'center',
            placeholder: 'Center',
            options: finalOptions,
          },
          {
            type: 'select',
            name: 'sport',
            placeholder: 'Sport',
            options: finalOptions,
          },
          {
            type: 'select',
            name: 'batch',
            placeholder: 'Batch',
            options: finalOptions,
          },
          {
            type: 'select',
            name: 'athlete',
            placeholder: 'Athlete',
            options: finalOptions,
          },
        ]}
        TableHeadings={ASSIGN_TEST_BANK_TABLE_HEADERS}
        tablekey='participants'
        tableData={participants}
        addTableData={onSaveParticipants}
        buttonItems={{next: true}}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButton={() => {
          setShowModal(!showModal)
        }}
        onRemoveTableButton={removeParticipants}
      />
    </>
  )
}

export default AssessmentParticipants
