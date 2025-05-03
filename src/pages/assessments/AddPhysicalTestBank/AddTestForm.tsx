/* eslint-disable */
import React, {useState, useContext, useCallback, useEffect, useRef} from 'react'
import Card from '~/components/Card'
import {useForm} from 'react-hook-form'

import {api} from '~/utils/api'
import {useRouter} from 'next/router'
import {ToastContext} from '~/contexts/Contexts'
import {useSession} from 'next-auth/react'
import {Centers} from '@prisma/client'
import AddTestBank from '~/components/AddTestBank/AddTestBank'

const multiFormData = {
  name: '',
  image: '',
  phoneNumber: '',
  email: '',
  address: '',
  sports: [],
  isEditMode: false,
}

const defaultValues = {
  stepData: {
    currentStep: 1,
  },
  multiFormData: {
    formData: multiFormData,
  },
}
export interface FormContextTypes {
  stepData: {
    currentStep: number
    setCurrentStep?: React.Dispatch<React.SetStateAction<number>>
  }
  multiFormData: {
    formData: any
    setFormData?: React.Dispatch<React.SetStateAction<any>>
  }
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues)

export default function AddTestBankForm() {
  const router = useRouter()
  const id = Number(router?.query?.id)
  const {data: sessionData} = useSession()
  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId

  const methods = useForm()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<any>(defaultValues.multiFormData.formData)
  const {setOpenToast} = useContext(ToastContext)
  const centerData = id && api.center.getCenterById.useQuery({id})

  const formProviderData = {
    ...methods,
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  }

  const finalFormSubmissionHandler = async (finalForm: any) => {
    if (formData?.isEditMode) {
    } else {
    }
  }
  return (
    <FormContext.Provider value={formProviderData}>
      <div className='bg-s-gray lg:px-6 lg:pb-7'>
        <div className='grid grid-cols-6 grid-rows-1'>
          <Card className='relative col-span-12 h-full min-h-[535px] !rounded-r-none rounded-l-xl p-0 pb-0 pt-10 lg:col-span-4 lg:bg-white lg:pb-6 '>
            {currentStep === 1 && (
              <AddTestBank
                finalFormSubmissionHandler={finalFormSubmissionHandler}
                physical={true}
              />
            )}

            {/* {currentStep === 3 && (
              <AddInventory
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}  */}
          </Card>
        </div>
      </div>
    </FormContext.Provider>
  )
}
