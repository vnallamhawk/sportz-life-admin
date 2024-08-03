import React, { useContext, useState } from "react";
import AddForm from "~/common/AddForm";
import { COACHING_DETAILS_CONSTANTS } from "~/constants/drillConstant";
import { FormContext } from "~/pages/drills/AddDrills/AddCoachingDrills";
import { FormValues } from "~/types/common";

const AddCoachingDrillDetails = () => {
  const [formConstantValues, setFormConstantValues] = useState(
    COACHING_DETAILS_CONSTANTS
  );
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  return (
    <>
      <AddForm
        cardTitle="ADD COACHING DRILL"
        cardSubTitle="COACHING DRILL DETAILS"
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

export default AddCoachingDrillDetails;
