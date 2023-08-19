import React, { useContext } from "react";
import CardTitle from "~/components/Card/CardTitle";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import Select from "~/components/Select/Select";
import Textbox from "~/components/Textbox";
import { type COACH_DETAILS_CONSTANTS_TYPES } from "~/types/coach";
import { FormContext } from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";

export default function AddCoach() {
  let inputElement;
  const {
    stepData: { currentStep },
  } = useContext(FormContext);

  const getInputElement = (props: COACH_DETAILS_CONSTANTS_TYPES) => {
    const { type } = props;
    switch (type) {
      case "select":
        const { options } = props;
        inputElement = (
          <Select
            options={options ?? []}
            defaultValue={props?.defaultValue}
            placeholder={props.placeHolder}
          />
        );
        break;
      default:
        inputElement = (
          <Textbox className="h-12 w-96" placeHolder={props.label} />
        );
    }

    return inputElement;
  };

  return (
    <>
      {currentStep === 1 ? (
        <>
          <CardTitle title="ADD COACH" />
          <div className="text-lg font-bold">COACH DETAILS</div>
          <div className="mt-10 grid grid-cols-2 gap-y-12">
            {COACH_DETAILS_CONSTANTS.map((props) => (
              <div key={props.id}>{getInputElement(props)}</div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
