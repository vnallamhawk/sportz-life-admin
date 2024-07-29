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
import AddCoach from "../../../components/AddCoach/AddCoach";
import AddCoachCertificates from "~/components/AddCoach/AddCoachCertificates";
import AssignBatches from "~/components/AddCoach/AssignBatches";
import {
  type TRAINING_LEVEL,
  type GENDER_VALUES,
  type MULTI_FORM_TYPES,
  type EXPERIENCE_LEVEL,
  type CoachWithRelationsEditForm,
} from "~/types/coach";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";
import FileUpload from "~/components/FileUpload";
import { getSportsDictionaryServices } from "~/services/sportServices";
import { type BatchTableData } from "~/types/batch";
import { dateFormat } from "~/helpers/date";
import { type MultiSelectOption } from "~/types/select";
import { useSession } from "next-auth/react";

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
  coachBatches:[]
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
  const router = useRouter();
  const id = Number(router?.query?.id);

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MULTI_FORM_TYPES>(
    defaultValues.multiFormData.formData
  );
  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  const [coachId, setCoachId] = useState<number>();

  const { data: coach } = id && api.coach.getCoachById.useQuery({ id });

  const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCoachUseEffectRun = useRef(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (coach && !hasCoachUseEffectRun.current) {
      setFormData(coach);
      hasCoachUseEffectRun.current = true;
    }
  }, [id, batches]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.coach.createCoach.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setCoachId(response?.id);
      setOpenToast(true);
      return response
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

  const { mutate: createMutateCoachSports } =
    api.coachSports.createCoachSports.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);

        return response;
      },
    });
  const { mutate: createMutateCoachCertificates } =
    api.coachCertificate.createCoachCertificates.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        return response;
      },
    });

  const { mutate: createMutateCoachBatches } =
    api.coachBatches.createCoachbatches.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        router.push(`/coach/${coachId ?? ""}`);

        return response;
      },
    });

  useEffect(() => {
    if (
      formData &&
      Object.keys(formData)?.length > 0 &&
      formData?.coachingSports &&
      formData?.certificates &&
      formData?.coachBatches &&
      coachId
    ) {
      const finalCoachSports = formData?.coachingSports?.map((v) => ({
        sportId: parseInt(v.value),
        ...v,
        coachId,
        createdAt:new Date(),
        updatedAt:new Date(),
      }));

      createMutateCoachSports(finalCoachSports);

      const finalCertificates = formData?.certificates?.map((v) => ({
        ...v,
        startDate: new Date(v.startDate),
        endDate: new Date(v.endDate),
        coachId,
        createdAt:new Date(),
        updatedAt:new Date(),
      }));
      createMutateCoachCertificates(finalCertificates);

      const finalCenterBatches = formData?.coachBatches?.map((v) => ({
        ...v,
        centerId: v.center?.value,
        coachId,
        createdAt:new Date(),
        updatedAt:new Date(),
      }));
      createMutateCoachBatches(finalCenterBatches);
    }
  }, [coachId, formData]);

  const finalFormSubmissionHandler = (
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    if (formData.isEditMode) {
      editMutate({
        name: finalForm.name,
        phone: finalForm.phone,
        email: finalForm.email,
        designation: finalForm.designation?.value,
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        dateOfBirth: new Date(finalForm.dateOfBirth),
        trainingLevel: finalForm.trainingLevel
          .value as (typeof TRAINING_LEVEL)[number],
        coachId: finalForm.coachId,
      });
    } else {
      setFormData({...finalForm})

      createMutate({
        name: finalForm.name,
        phone: finalForm.phone,
        email: finalForm.email,
        designation: finalForm.designation?.value,
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        dateOfBirth: new Date(finalForm.dateOfBirth),
        trainingLevel: finalForm.trainingLevel
          .value as (typeof TRAINING_LEVEL)[number],
        createdBy: sessionData?.token?.id,
        createdAt:new Date(),
        updatedAt:new Date(),
        academyId: sessionData?.token?.academyId,

      });
    }
  };

  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
          {currentStep === 1&& <AddCoach />}
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
        <Card className="col-span-2 hidden !rounded-l-none rounded-r-xl bg-stone-100 px-7 lg:block">
          <div className="mb-10 font-heading text-2xl font-medium uppercase">
            Coach Image
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
  );
}
