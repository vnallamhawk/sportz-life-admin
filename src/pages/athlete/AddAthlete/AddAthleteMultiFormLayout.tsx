/* eslint-disable */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Card from "~/components/Card";
import ImageWithFallback from "~/components/ImageWithFallback";
import { useForm } from "react-hook-form";
import {
  type TRAINING_LEVEL,
  type GENDER_VALUES,
  type MULTI_FORM_TYPES,
  type EXPERIENCE_LEVEL,
} from "~/types/coach";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";
import FileUpload from "~/components/FileUpload";
import { getSportsDictionaryServices } from "~/services/sportServices";

import AddAthlete from "../../../components/AddAthlete/AddAthlete";
import DashboardHeader from "~/components/DashboardHeader";
import AddGeneralDetails from "~/components/AddAthlete/AddGeneralDetails";


const multiFormData: MULTI_FORM_TYPES = {
  contactNumber: "",
  name: "",
  designation: "",
  email: "",
  about: "",
  dateOfBirth: undefined,
  payroll: "",
  coachingSports: [],
  certificates: [],
  batchIds: [],
  centerIds: [],
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
    formData: MULTI_FORM_TYPES;
    setFormData?: React.Dispatch<React.SetStateAction<MULTI_FORM_TYPES>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddAthleteMultiFormLayout() {
  const router = useRouter();
  const id = Number(router?.query?.id);

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MULTI_FORM_TYPES>(
    defaultValues.multiFormData.formData
  );
  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);
  const { data: sports } = api.sports.getAllSports.useQuery();
  const { data: coach } = id && api.coach.getCoachById.useQuery({ id });

  const sportsDictionary = getSportsDictionaryServices(sports);
  // const { data: centers } = api.center.getAllCenters.useQuery();
  const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCoachUseEffectRun = useRef(false);

  useEffect(() => {
    if (coach && !hasCoachUseEffectRun.current) {
      setFormData(coach);
      hasCoachUseEffectRun.current = true;
    }
  }, [id, sportsDictionary, batches]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.coach.createCoach.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setOpenToast(true);
      void router.push(`/coach/${response?.id ?? ""}`);
    },
  });

  const { mutate: editMutate } = api.coach.editCoach.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      void router.push(`/coach/${response?.id ?? ""}`);
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
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    if (formData.isEditMode) {
      editMutate({
        name: finalForm.name,
        about: finalForm.about,
        contactNumber: finalForm.contactNumber,
        email: finalForm.email,
        designation: finalForm.designation,
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        certificates: finalForm.certificates.map((certificate) => ({
          ...certificate,
          startDate: new Date(certificate.startDate),
          endDate: new Date(certificate.endDate),
        })),
        dateOfBirth: new Date(finalForm.dateOfBirth),
        sports: finalForm.coachingSports,
        trainingLevel: finalForm.trainingLevel
          .value as (typeof TRAINING_LEVEL)[number],
        experienceLevel: finalForm.experienceLevel
          .value as (typeof EXPERIENCE_LEVEL)[number],
        batchIds: finalForm.batchIds,
        centerIds: finalForm.centerIds,
        coachId: finalForm.coachId,
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(finalForm);
      // eslint-disable-next-line no-console
      console.log(finalForm, "djbsdbfn");
      createMutate({
        name: finalForm.name,
        about: finalForm.about,
        contactNumber: finalForm.contactNumber,
        email: finalForm.email,
        designation: finalForm.designation,
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        certificates: finalForm.certificates.map((certificate) => ({
          ...certificate,
          startDate: new Date(certificate.startDate),
          endDate: new Date(certificate.endDate),
        })),
        dateOfBirth: new Date(finalForm.dateOfBirth),
        sports: finalForm.coachingSports,
        trainingLevel: finalForm.trainingLevel
          .value as (typeof TRAINING_LEVEL)[number],
        experienceLevel: finalForm.experienceLevel
          .value as (typeof EXPERIENCE_LEVEL)[number],
        batchIds: finalForm.batchIds,
        centerIds: finalForm.centerIds,
      });
    }
  };

  return (
    <div className="px-6 bg-s-gray pb-7">
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1 relative">
        <Card className="col-span-12 lg:col-span-4 h-full p-0 pt-10 bg-white rounded-l-xl !rounded-r-none relative">
          {currentStep === 1 && <AddAthlete />}
           {/* {currentStep === 1 && <AddGeneralDetails />} */}
          {/* {currentStep === 3 && (
            <AssignBatches
              // TODO: fix this TS error
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Unreachable code error
              finalFormSubmissionHandler={finalFormSubmissionHandler}
            />
          )}  */}
        </Card>
        <Card className="col-span-2 bg-stone-100 rounded-r-xl !rounded-l-none px-7 lg:block hidden">
          <div className="font-medium uppercase text-2xl font-heading mb-10">Athlete Image</div>

          <div>
            {preview.length ? (
              preview.map((upFile, index) => {
                return (
                  <div
                    className="previewImage mb-5 flex justify-center rounded-full"
                    key={index}
                  >
                    <ImageWithFallback
                      className="rounded-full mx-auto mb-6"
                      src={upFile.preview}
                      alt="preview"
                      height={205}
                      width={205}
                      fallbackSrc="/images/fallback-1.png"
                    />
                  </div>
                );
              })
            ) : (
              <div className="previewImage">
                <ImageWithFallback
                  src={""}
                  alt="preview"
                  height={205}
                  width={205}
                  className="rounded-full mx-auto mb-6"
                  fallbackSrc="/images/fallback-1.png"
                />
              </div>
            )}
            <div className="mb-14 flex justify-center">
              <FileUpload onDropCallback={onDropCallback} />{" "}
            </div>
          </div>
          <div>
            <div className="mb-5 font-bold">Note</div>
            <ul className="list-disc pl-5 text-gray-500">
              <li>Please upload jpg, png, .tiff file formats only</li>
              <li>Maximum Size 100 MB</li>
              <li>Minimum dimension 500px width by 500px height</li>
            </ul>
          </div>
        </Card>
      </div>
    </FormContext.Provider>
    </div>
  );
}
