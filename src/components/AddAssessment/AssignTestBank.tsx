import React, {useContext, useEffect, useState} from 'react'
import {api} from '~/utils/api'
import {useSession} from 'next-auth/react'
import AddForm from '~/common/AddForm'

import {useRouter} from 'next/router'
import {ASSIGN_TEST_BANK_TABLE_HEADERS} from '~/constants/assessment'
import {FormContext} from '~/pages/assessments/AddAssessment/AddAssessmentForm'

interface TestBanksOptions {
  label: string | undefined
  value: string | number | undefined
}

interface TestsOptions {
  label: string | undefined
  value: string | number | undefined
}

const AssignTestBank = () => {
  const router = useRouter()
  const [testBanks, setTestBanks] = useState<{testBankId: number; testId: number}[]>([])
  const [finalOptions, setFinalOptions] = useState<TestBanksOptions[]>([])
  const [testFinalOptions, setTestFinalOptions] = useState<TestsOptions[]>([])
  const [selectedTestBankId, setSelectedTestBankId] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const {data: sessionData} = useSession()

  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId

  const {data: allTestBanks} = api.testBank.getAllTestBanks.useQuery()
  const {data: allTests} = api.test.getAllTests.useQuery()

  // Populate Test Bank options
  useEffect(() => {
    if (Array.isArray(allTestBanks) && allTestBanks.length > 0) {
      const arr: TestBanksOptions[] = allTestBanks
        .filter(
          (testBank) => testBank && !testBanks.some((item) => item.testBankId === testBank.id)
        )
        .map((testBank) => ({
          label: testBank.title ?? '',
          value: testBank.id,
        }))

      setFinalOptions(arr)
    }
  }, [testBanks, allTestBanks])

  // Update Tests dropdown when a test bank is selected
  useEffect(() => {
    if (selectedTestBankId !== null && Array.isArray(allTests)) {
      const filteredTests = allTests
        .filter((test) => test.testBankId === selectedTestBankId)
        .map((test) => ({
          label: test.name ?? '',
          value: test.id,
        }))

      setTestFinalOptions(filteredTests)
    }
  }, [selectedTestBankId, allTests])

  const {
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  // Save selected test bank
  const onSaveTestbank = (currentTestBankData: {name: string; value: number}) => {
    setTestBanks((prevTestBanks) => [
      ...prevTestBanks,
      {
        testBankId: selectedTestBankId ?? 0,
        testId: currentTestBankData.value ?? 0,
        name: currentTestBankData.name,
      },
    ])
  }

  // Remove test bank from selection
  const removeTestBanks = (index: number) => {
    setTestBanks((prevTestBanks) => {
      const updatedTestBanks = [...prevTestBanks]
      updatedTestBanks.splice(index, 1)
      return updatedTestBanks
    })

    // Reset test options when removing a test bank
    setTestFinalOptions([])
    setSelectedTestBankId(null)
  }

  return (
    <>
      <AddForm
        cardTitle='CREATE ASSESSMENT'
        tableTitle='ASSIGN TEST BANK'
        tableFields={[
          {
            type: 'select',
            name: 'type',
            placeholder: 'Select Test Bank Type',
            options: finalOptions,
          },
          {
            type: 'select',
            name: 'name',
            placeholder: 'Select Test Name',
            options: testFinalOptions,
          },
        ]}
        TableHeadings={ASSIGN_TEST_BANK_TABLE_HEADERS}
        tablekey='testBanks'
        tableData={testBanks}
        addTableData={onSaveTestbank}
        buttonItems={{prevNext: true}}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButton={() => {
          setShowModal(!showModal)
        }}
        onRemoveTableButton={removeTestBanks}
        dependentKey='testBankId'
        setDependentKey={(value: number) => setSelectedTestBankId(value)}
      />
    </>
  )
}

export default AssignTestBank
