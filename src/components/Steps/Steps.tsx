import React from "react";
import Button from "../Button";
import {
  FormContext,
  type FormContextTypes,
} from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";

export const Steps = ({
  // title,
  children,
  stepCount,
  maxCount,
}: {
  // title: string;
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
    <>
      {/* <div className="text-lg font-bold">{title}</div> */}
      <div className="h-[calc(100%-5rem)]">{children}</div>
      <div className="flex justify-end">
        {currentStep !== 1 && (
          <Button className="bg-pink-500" onClick={prevClickHandler}>
            Prev
          </Button>
        )}
        {/* <div className="mr-10 flex justify-end"> */}
        {stepCount !== maxCount && (
          <Button className="mx-3 bg-pink-500" onClick={nextClickHandler}>
            Next
          </Button>
        )}
        {stepCount === maxCount && (
          <Button className="bg-pink-500">Finish</Button>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default Steps;
