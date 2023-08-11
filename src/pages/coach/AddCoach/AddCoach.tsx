import React from "react";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import ImageWithFallback from "~/components/ImageWithFallback";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import Select from "~/components/Select/Select";
import Textbox from "~/components/Textbox";
import { type COACH_DETAILS_CONSTANTS_TYPES } from "~/types/coach";
import Button from "~/components/Button";

export default function AddCoach() {
  let inputElement;
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
        inputElement = <Textbox placeholder={props.label} />;
    }

    return inputElement;
  };

  return (
    <div className="grid h-full grid-cols-4">
      <Card className="col-span-3">
        <CardTitle title="ADD COACH" />
        <div className="font-bold">COACH DETAILS</div>
        <div className="mt-10 grid grid-cols-2 gap-y-12">
          {COACH_DETAILS_CONSTANTS.map((props) => (
            <div key={props.id}>{getInputElement(props)}</div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button>Next</Button>
        </div>
      </Card>
      <Card className="bg-gray-100">
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
  );
}
