import React, { useState } from "react";
import Card from "~/components/Card";
import Steps from "~/components/Steps";
import ImageWithFallback from "~/components/ImageWithFallback";
import { useForm } from "react-hook-form";
import AddCoach from "../../../components/AddCoach/AddCoach";
import AddCoachCertificates from "~/components/AddCoach/AddCoachCertificates";
import AssignBatches from "~/components/AddCoach/AssignBatches";

const defaultValues = {
  stepData: {
    currentStep: 1,
  },
};

export interface FormContextTypes {
  stepData: {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddCoachMultiFormLayout() {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepData = {
    currentStep,
    setCurrentStep,
  };
  const formProviderData = {
    ...methods,
    stepData,
  };

  console.log(stepData.currentStep);

  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 h-full">
          <Steps title={"Add Coach"} stepCount={1} maxCount={3}>
            <AddCoach />
            <AddCoachCertificates />
            <AssignBatches />
          </Steps>
        </Card>
        <Card className="col-span-2 bg-gray-100">
          <div className="mb-10 font-bold">Coach Image</div>
          <div>
            <ImageWithFallback
              width={500}
              height={500}
              src=""
              alt=""
              fallbackSrc="/images/fallback.png"
            />
          </div>
          <a className="mb-10 flex justify-center"> Upload Image</a>
          <div>
            <span className="mb-5 font-bold">Note</span>
            <ul className="list-disc">
              <li>Please upload jpg, png, .tiff file formats only</li>
              <li>Maximum Size 100 MB</li>
              <li>Minimum dimension 500px width by 500px height</li>
            </ul>
          </div>
        </Card>
      </div>
    </FormContext.Provider>
  );
}
