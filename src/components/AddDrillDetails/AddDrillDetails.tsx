import React, { useContext, useState } from "react";
import AddForm from "~/common/AddForm";
import { FITNESS_DETAILS_CONSTANTS } from "~/constants/drillConstant";
import { FormContext } from "~/pages/drills/AddDrills/AddDrills";
import { FormValues } from "~/types/common";

const AddDrillDetails = () => {
  const [formConstantValues, setFormConstantValues] = useState(
    FITNESS_DETAILS_CONSTANTS
  );
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  return (
    <>
      <AddForm
        cardTitle="ADD FITNESS DRILL"
        cardSubTitle="FITNESS DRILL DETAILS"
        formConstantValues={formConstantValues}
        imageTitle=""
        buttonItems={{ next: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </>
  );
};

export default AddDrillDetails;
