import React from "react";
import Button from "../Button";
import {
  FormContext,
  type FormContextTypes,
} from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";

export const Steps = ({
  title,
  children,
  stepCount,
  maxCount,
}: {
  title: string;
  children: React.ReactNode;
  stepCount: number;
  maxCount: number;
}) => {
  const { useContext } = React;
  const {
    stepData: { currentStep, setCurrentStep },
  } = useContext<FormContextTypes>(FormContext);

  const nextClickHandler = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevClickHandler = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <div className="text-lg font-bold">{title}</div>
      <div className="h-full">{children}</div>
      {currentStep !== 1 && <Button onClick={prevClickHandler}>Prev</Button>}
      {stepCount !== maxCount && (
        <Button onClick={nextClickHandler}>Next</Button>
      )}
      {stepCount === maxCount && <Button>Finish</Button>}
    </div>
  );
};

export default Steps;
