// import {useParams, useSearchParams} from 'next/navigation'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import AddCoachingDrillDetails from '~/components/AddDrillDetails/AddCoachingDrillDetails'
// import AddFitnessDrillDetails from '~/components/AddDrillDetails/AddDrillDetails'
import AddFitnessDrillInventory from '~/components/AddDrillInventory/AddDrillInventory'
// import AddDrillInventory from '~/components/AddDrillInventory/AddDrillInventory'
// import AddInventory from "~/components/AddInventory/AddInventory";
import Card from '~/components/Card'

const multiFormData = {
  selectSport: [],
  drillName: '',
  drillDescription: '',
  coahingPoints: '',
  trainingLevel: [],
  drillSetup: '',
  drillObjective: '',
  selectEquipment: [],
  equipmentQty: 4,
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

const AddCoachingDrills = () => {
  const methods = useForm()
  const [currentStep, setCurrentStep] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [formData, setFormData] = useState<any>(defaultValues.multiFormData.formData)
  const formProviderData = {
    ...methods,
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  }
  return (
    <FormContext.Provider value={formProviderData}>
      <div className='bg-s-gray lg:px-6 lg:pb-7'>
        <div className='grid grid-cols-6 grid-rows-1'>
          <Card className='relative col-span-12 h-full min-h-[535px] !rounded-r-none rounded-l-xl p-0 pb-0 pt-10 lg:col-span-4 lg:bg-white lg:pb-6 '>
            {currentStep === 1 && <AddCoachingDrillDetails />}
            {currentStep === 2 && (
              <AddFitnessDrillInventory
              // finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}
          </Card>
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default AddCoachingDrills
