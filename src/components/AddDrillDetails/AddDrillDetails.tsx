import React, {useContext, useState} from 'react'
import AddForm from '~/common/AddForm/AddForm'
import {FITNESS_DETAILS_CONSTANTS} from '~/constants/drillConstant'
import {FormContext} from '~/pages/drills/AddDrills/AddFitnessDrills'
import {FormValues} from '~/types/common'

const AddFitnessDrillDetails = () => {
  const [formConstantValues, setFormConstantValues] = useState(FITNESS_DETAILS_CONSTANTS)
  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)
  return (
    <>
      <AddForm
        cardTitle='ADD FITNESS DRILL'
        cardSubTitle='FITNESS DRILL DETAILS'
        formConstantValues={formConstantValues}
        imageTitle=''
        buttonItems={{next: true}}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  )
}

export default AddFitnessDrillDetails
