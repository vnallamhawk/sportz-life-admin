/* eslint-disable */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Card from "~/components/Card";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";

import AddAthlete from "../../../components/AddAthlete/AddAthlete";
import AddGeneralDetails from "~/components/AddAthlete/AddGeneralDetails";
import AddInjury from "~/components/AddInjury/AddInjury";

// const multiFormData: MULTI_FORM_TYPES = {
const multiFormData = {
  phone: "",
  name: "",
  bloodGroup: "",
  email: "",
  about: "",
  dob: undefined,
  payroll: "",
  coachingSports: [],
  certificates: [],
  batchIds: [],
  centerId: undefined,
  isEditMode: false,
  coachId: undefined,
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
    formData: any;
    setFormData?: React.Dispatch<React.SetStateAction<any>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddInjuryMultiFormLayout() {
  const router = useRouter();
  const id = Number(router?.query?.id);

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.athlete.createAthlete.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setOpenToast(true);
      void router.push(`/athlete/${response?.id ?? ""}`);
    },
  });



  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    setPreview(
      acceptedFiles.map((upFile) =>
        Object.assign(upFile, {
          preview: URL.createObjectURL(upFile),
        })
      )
    );
  }, []);

  const finalFormSubmissionHandler = (
    finalForm:any
  ) => {
    if (formData.isEditMode) {
      // editMutate({
      //   name: finalForm.name,
      //   about: finalForm.about,
      //   contactNumber: finalForm.contactNumber,
      //   email: finalForm.email,
      //   designation: finalForm.designation,
      //   gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
      //   certificates: finalForm.certificates.map((certificate) => ({
      //     ...certificate,
      //     startDate: new Date(certificate.startDate),
      //     endDate: new Date(certificate.endDate),
      //   })),
      //   dateOfBirth: new Date(finalForm.dateOfBirth),
      //   sports: finalForm.coachingSports,
      //   trainingLevel: finalForm.trainingLevel
      //     .value as (typeof TRAINING_LEVEL)[number],
      //   experienceLevel: finalForm.experienceLevel
      //     .value as (typeof EXPERIENCE_LEVEL)[number],
      //   batchIds: finalForm.batchIds,
      //   centerIds: finalForm.centerIds,
      //   coachId: finalForm.coachId,
      // });
    } else {
      // eslint-disable-next-line no-console
      console.log(finalForm);
      // eslint-disable-next-line no-console
      console.log(finalForm, "djbsdbfn");
      // createMutate({
      //   name: finalForm.name,
      //   phone: finalForm.phone,
      //   email: finalForm.email,
      //   bloodGroup: finalForm.bloodGroup,
      //   dob: new Date(finalForm.dob),
      //   height:finalForm.height,
      //   weight:finalForm.weight,
      //   address:finalForm.address,
      //   medicalHistory:finalForm.medicalHistory,
      //   centerId: finalForm.centerId,
      //   fatherName:finalForm.fatherName
      // });
    }
  };

  return (
    <div className="bg-s-gray px-6 pb-7">
      <FormContext.Provider value={formProviderData}>
        <div className="relative grid grid-cols-6 grid-rows-1">
          <Card className="relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4">
            {currentStep === 1 && <AddInjury />}
            {currentStep === 2 && (
              <AddGeneralDetails
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}
          </Card>
        </div>
      </FormContext.Provider>
    </div>
  );
}
