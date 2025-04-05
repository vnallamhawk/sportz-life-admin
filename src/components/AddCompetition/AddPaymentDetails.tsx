/* eslint-disable @typescript-eslint/no-misused-promises */
import React, {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'

import {FormContext} from '~/pages/competitions/AddCompetitions/AddCompetitionsMultiFormLayout'

import AddForm from '~/common/AddForm/AddForm'
import {STAFF_SHIFT_CONSTANTS} from '~/constants/staffConstants'
import {STAFF_TIMINGS_TABLE_HEADERS} from '~/constants/staffTimingConstants'
import type {FormValues} from '~/types/common'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Switch,
  DialogHeader,
  Dialog,
  DialogBody,
} from '@material-tailwind/react'
import {BANK_DETAILS_CONSTANTS} from '~/constants/competitionConstants'

export default function AddPaymentDetails({finalFormSubmission}: any) {
  const [bankDetails, setBankDetails] = useState<{[key: string]: any}[]>([])
  const [activeKey, setActiveKey] = useState('0')

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(BANK_DETAILS_CONSTANTS)
  const {
    control,
    formState: {errors},
    getValues,
    reset,
    trigger,
  } = useForm({
    defaultValues: {
      day: undefined,
      shift: undefined,
      startTime: '10:00',
      endTime: '10:00',
    },
  })

  // const [tableData, setTableData] = useState<BatchTableData[]>([]);
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const submitCallback = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const finalFormData = {
      ...formData,
      bankDetails,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setFormData(finalFormData)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    finalFormSubmission(finalFormData)
  }

  const addTableData = (currentData: any) => {
    const arr: any = [...bankDetails]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access
    const obj = {...currentData}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    arr.push(obj)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setBankDetails(arr)
  }

  return (
    <>
      <Tabs value={'BANK ACCCOUNT'} activeKey={activeKey}>
        <div className='pricing-tabs mb-6 flex items-center justify-center lg:justify-between'>
          <TabsHeader
            className='pricing-tabs justify-center lg:justify-start'
            indicatorProps={{
              className: 'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
            }}
          >
            <Tab
              value={'BANK ACCCOUNT'}
              className={`${
                activeKey === '0' ? 'active' : ''
              } text-nowrap w-1/2 bg-[#EAEAEA] px-0 font-heading text-2xl lg:w-auto lg:bg-transparent lg:font-medium lg:uppercase`}
              key={'0'}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
              onClick={() => setActiveKey('0')}
            >
              BANK ACCCOUNT
            </Tab>
            <Tab
              value={'QR CODE'}
              className={`${
                activeKey === '1' ? 'active' : ''
              } text-nowrap ml-4 w-1/2 bg-[#EAEAEA] px-0 font-heading text-2xl lg:w-auto lg:bg-transparent lg:font-medium lg:uppercase`}
              key={'1'}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
              onClick={() => setActiveKey('1')}
            >
              QR CODE
            </Tab>
          </TabsHeader>
        </div>

        <TabsBody>
          {activeKey === '0' && (
            <TabPanel value={'BANK ACCCOUNT'}>
              <AddForm
                cardTitle='ADD COMPETITION'
                cardSubTitle='Payment Mode Options'
                formConstantValues={formConstantValues}
                tableTitle='Bank Added'
                mobileAddButtonText='Add Bank'
                TableHeadings={[
                  {label: 'Bank', id: 'bankName'},
                  {label: 'Branch', id: 'bankBranch'},
                  {label: 'Account No.', id: 'accountNo'},
                  {label: 'IFSC', id: 'ifsc'},
                  {label: 'Holder Name', id: 'name'},
                  {label: 'Action', id: 'action'},
                ]}
                tablekey='bankDetails'
                tableData={bankDetails}
                addTableData={addTableData}
                buttonItems={{next: true}}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                setFormData={setFormData}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                formData={formData}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </TabPanel>
          )}

          <TabPanel value={'QR CODE'} className='px-2'>
            {activeKey === '1' && (
              <>
                <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
                  QR CODE
                </div>
                <div className='col-span-2'>
                  <label
                    className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                    // for="file_input"
                    htmlFor='file_input'
                  >
                    Upload QR CODE IMAGE
                  </label>
                  <input
                    className='block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm
 text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700
 dark:text-gray-400 dark:placeholder-gray-400'
                    aria-describedby='file_input_help'
                    id='file_input'
                    type='file'
                  />
                  <p className='mt-1 text-sm text-gray-500 dark:text-gray-300' id='file_input_help'>
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                </div>
              </>
            )}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </>
  )
}
