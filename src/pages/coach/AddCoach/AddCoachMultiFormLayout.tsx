import React, { useState, useContext } from "react";
import Card from "~/components/Card";
import ImageWithFallback from "~/components/ImageWithFallback";
import { useForm } from "react-hook-form";
import AddCoach from "../../../components/AddCoach/AddCoach";
import AddCoachCertificates from "~/components/AddCoach/AddCoachCertificates";
import AssignBatches from "~/components/AddCoach/AssignBatches";
import {
  type TRAINING_LEVEL,
  type GENDER_VALUES,
  type MULTI_FORM_TYPES,
  type EXPERIENCE_LEVEL,
} from "~/types/coach";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";

const multiFormData: MULTI_FORM_TYPES = {
  phoneNumber: "",
  coachName: "",
  designation: "",
  emailAddress: "",
  about: "",
  dateOfBirth: undefined,
  payroll: "",
  coachingSports: [],
  certificateData: [],
  batchIds: [],
  trainingLevel: {
    value: "",
    label: "",
  },
  experienceLevel: {
    value: "",
    label: "",
  },
};

const defaultValues = {
  stepData: {
    currentStep: 1,
  },
  multiFormData: {
    formData: multiFormData,
  },
};
export interface FormContextTypes {
  stepData: {
    currentStep: number;
    setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  };
  multiFormData: {
    formData: MULTI_FORM_TYPES;
    setFormData?: React.Dispatch<React.SetStateAction<MULTI_FORM_TYPES>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddCoachMultiFormLayout() {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MULTI_FORM_TYPES>(
    defaultValues.multiFormData.formData
  );
  const { openToast, setOpenToast } = useContext(ToastContext);
  const router = useRouter();

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const {
    // data,
    mutate,
    // isLoading: isLoading,
  } = api.coach.createCoach.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      void router.push(`/coach/${response?.id ?? ""}`);
    },
  });

  const finalFormSubmissionHandler = (
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    mutate({
      name: finalForm.coachName,
      about: finalForm.about,
      contactNumber: finalForm.phoneNumber,
      emailAddress: finalForm.emailAddress,
      designation: finalForm.designation,
      gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
      certificates: finalForm.certificateData,
      dateOfBirth: new Date(finalForm.dateOfBirth),
      sports: finalForm.coachingSports,
      trainingLevel: finalForm.trainingLevel
        .value as (typeof TRAINING_LEVEL)[number],
      experienceLevel: finalForm.experienceLevel
        .value as (typeof EXPERIENCE_LEVEL)[number],
      batchIds: finalForm.batchIds,
    });
  };

  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
          {currentStep === 1 && <AddCoach />}
          {currentStep === 2 && <AddCoachCertificates />}
          {currentStep === 3 && (
            <AssignBatches
              // TODO: fix this TS error
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Unreachable code error
              finalFormSubmissionHandler={finalFormSubmissionHandler}
            />
          )}
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
        {/* <pre>{JSON.stringify(watch())}</pre> */}
      </div>
    </FormContext.Provider>
  );
}
