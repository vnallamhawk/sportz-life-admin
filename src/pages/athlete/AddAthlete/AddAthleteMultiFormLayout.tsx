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
import { useSession } from "next-auth/react";

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

export default function AddAthleteMultiFormLayout() {
  const router = useRouter();
  const id = Number(router?.query?.id);

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const { data: sessionData } = useSession();
  const [athleteId, setAthleteId] = useState<number>();

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
      setAthleteId(response?.id)
      return response
    },
  });

  const { mutate: createMutateAthleteSports } =
    api.athleteSports.createAthleteSports.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);

        return response;
      },
    });
    const { mutate: createMutateAthleteBatches } =
    api.athleteBatches.createAthletebatches.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        router.push(`/athlete/${athleteId ?? ""}`);

        return response;
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


  useEffect(() => {
    if (
      formData &&
      Object.keys(formData)?.length > 0 &&
      formData?.sportId &&
      formData?.batch &&
      athleteId
    ) {

      const finalCoachSports = formData?.batch?.map((v:any) => ({
        sportId: parseInt(v.sportId),
        batchId:v.id,
        athleteId,
        centerId: parseInt(formData.center?.value),
        createdAt:new Date(),
        updatedAt:new Date(),
      }));

      createMutateAthleteSports(finalCoachSports);

      createMutateAthleteBatches(finalCoachSports);
    }
  }, [athleteId, formData]);
  
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
      createMutate({
        name: finalForm.name,
        phone: finalForm.phone,
        email: finalForm.email,
        bloodGroup: finalForm.bloodGroup.value,
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        dob: new Date(finalForm.dob),
        height:parseInt(finalForm.height),
        weight:parseInt(finalForm.weight),
        address:finalForm.address,
        medicalHistory:finalForm.medicalHistory,
        centerId: parseInt(finalForm.centerId.value),
        fatherName:finalForm.fatherName,
        heightUnit:"cm",
        weightUnit:"kg",
        createdAt:new Date(),
        updatedAt:new Date(),
        academyCode: sessionData?.token?.academyId,

      });
    }
  };

  return (
    <div className="bg-s-gray px-6 pb-7">
      <FormContext.Provider value={formProviderData}>
        <div className="relative grid grid-cols-6 grid-rows-1">
          <Card className="relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4">
            {currentStep === 1 && <AddAthlete />}
            {currentStep === 2 && (
              <AddGeneralDetails
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}
          </Card>
          <Card className="col-span-2 hidden !rounded-l-none rounded-r-xl bg-stone-100 px-7 lg:block">
            <div className="mb-10 font-heading text-2xl font-medium uppercase">
              Athlete Image
            </div>

            <div>
              {preview.length ? (
                preview.map((upFile, index) => {
                  return (
                    <div
                      className="previewImage mb-5 flex justify-center rounded-full"
                      key={index}
                    >
                      <ImageWithFallback
                        className="mx-auto mb-6 rounded-full"
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
                    className="mx-auto mb-6 rounded-full"
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
