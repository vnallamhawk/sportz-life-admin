import React from "react";
// import AddCoach from "./AddCoach";
import AddCoachCertificates from "./AddCoachCertificates";
import Card from "~/components/Card";
import Steps from "~/components/Steps";
import ImageWithFallback from "~/components/ImageWithFallback";

export default function AddCoachMultiFormLayout() {
  return (
    <div className="grid grid-cols-6 grid-rows-1">
      <Card className="col-span-4 h-full">
        {/* <AddCoach /> */}
        <Steps title={"Add Coach"} stepCount={1} maxCount={3}>
          <AddCoachCertificates />
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
  );
}
