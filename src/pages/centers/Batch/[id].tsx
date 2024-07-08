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
import { MULTI_FORM_BATCH_TYPES } from "~/types/center";
import Image from "next/image";
import NetajiIndoorImg from "../../../images/NetajiIndoor.png";
import CoachImg from "../../../images/CoachesImg.png";
import AtheleteImg from "../../../images/AthelteImg.png";
import InventoryImg from "../../../images/InventoryImg.png";

const multiFormData: MULTI_FORM_BATCH_TYPES = {
  batchName: "",
  selectSports: [],
  selectCoaches: [],
  MaxCapacity: 100,
  selectBatchFee: [],
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
    formData: MULTI_FORM_BATCH_TYPES;
    setFormData?: React.Dispatch<React.SetStateAction<MULTI_FORM_BATCH_TYPES>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddCoachMultiFormLayout() {
  const router = useRouter();
  const id = Number(router?.query?.id);

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MULTI_FORM_BATCH_TYPES>(
    defaultValues.multiFormData.formData
  );
  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  //   const { data: sports } = api.sports.getAllSports.useQuery();
  //   if (id) {
  //     const { data: coach } = api.coach.getCoachById.useQuery({ id });
  //   }

  //   const sportsDictionary = getSportsDictionaryServices(sports);
  // const { data: centers } = api.center.getAllCenters.useQuery();
  //   const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCoachUseEffectRun = useRef(false);

  // useEffect(() => {
  //   if (coach && !hasCoachUseEffectRun.current) {
  //     setFormData({
  //       ...coach,
  //       dateOfBirth: coach?.dateOfBirth
  //         ? coach?.dateOfBirth?.toISOString()
  //         : "",
  //       gender: { label: coach.gender, value: coach.gender },
  //       coachingSports: coach?.sports?.reduce(
  //         (accumulator: MultiSelectOption[], sport) => {
  //           const label = sportsDictionary?.[sport.sportId]?.name;
  //           const value = sportsDictionary?.[sport.sportId]?.id;
  //           if (label && value) {
  //             accumulator.push({
  //               label: label,
  //               value: value,
  //             });
  //           }
  //           return accumulator;
  //         },
  //         []
  //       ),
  //       trainingLevel: {
  //         label: coach.trainingLevel,
  //         value: coach.trainingLevel,
  //       },
  //       experienceLevel: {
  //         label: coach.experienceLevel,
  //         value: coach.experienceLevel,
  //       },
  //       certificates: coach?.certificates?.map((cert) => ({
  //         ...cert,
  //         startDate: cert.startDate ? dateFormat(cert.startDate) : "",
  //         endDate: cert.endDate ? dateFormat(cert.endDate) : "",
  //       })),
  //       batchTableData:
  //         coach?.batches?.reduce(
  //           (accumulator: BatchTableData[], coachBatch) => {
  //             const batch = batches?.find(
  //               (batch: { id: number }) => batch.id == coachBatch.batchId
  //             );
  //             const center = centers?.find(
  //               (center) =>
  //                 center.id ==
  //                 batches?.find((batch) => batch.id == coachBatch.batchId)
  //                   ?.centerId
  //             );
  //             if (batch && center) {
  //               accumulator.push({
  //                 centerId: center?.id,
  //                 batchIds: [batch?.id],
  //                 centerName: center?.name,
  //                 batchName: batch?.name,
  //               });
  //             }
  //             return accumulator;
  //           },
  //           []
  //         ) ?? undefined,
  //       batchIds: [],
  //       centerIds: [],
  //       isEditMode: true,
  //       coachId: coach.id,
  //     });
  //     hasCoachUseEffectRun.current = true;
  //   }
  // }, [id, sportsDictionary, batches]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  //   const { mutate: createMutate } = api.coach.createCoach.useMutation({
  //     onSuccess: (response) => {
  //       console.log("response data is ", response);
  //       setOpenToast(true);
  //       void router.push(`/coach/${response?.id ?? ""}`);
  //     },
  //   });

  //   const { mutate: editMutate } = api.coach.editCoach.useMutation({
  //     onSuccess: (response) => {
  //       setOpenToast(true);
  //       void router.push(`/coach/${response?.id ?? ""}`);
  //     },
  //   });

  //   const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
  //     setPreview(
  //       acceptedFiles.map((upFile) =>
  //         Object.assign(upFile, {
  //           preview: URL.createObjectURL(upFile),
  //         })
  //       )
  //     );
  //   }, []);

  //   const finalFormSubmissionHandler = (
  //     finalForm: Required<MULTI_FORM_TYPES>
  //   ) => {
  //     if (formData.isEditMode) {
  //       editMutate({
  //         name: finalForm.name,
  //         about: finalForm.about,
  //         contactNumber: finalForm.contactNumber,
  //         email: finalForm.email,
  //         designation: finalForm.designation,
  //         gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
  //         certificates: finalForm.certificates.map((certificate) => ({
  //           ...certificate,
  //           startDate: new Date(certificate.startDate),
  //           endDate: new Date(certificate.endDate),
  //         })),
  //         dateOfBirth: new Date(finalForm.dateOfBirth),
  //         sports: finalForm.coachingSports,
  //         trainingLevel: finalForm.trainingLevel
  //           .value as (typeof TRAINING_LEVEL)[number],
  //         experienceLevel: finalForm.experienceLevel
  //           .value as (typeof EXPERIENCE_LEVEL)[number],
  //         batchIds: finalForm.batchIds,
  //         centerIds: finalForm.centerIds,
  //         coachId: finalForm.coachId,
  //       });
  //     } else {
  //       // eslint-disable-next-line no-console
  //       console.log(finalForm);
  //       // eslint-disable-next-line no-console
  //       console.log(finalForm, "djbsdbfn");
  //       createMutate({
  //         name: finalForm.name,
  //         about: finalForm.about,
  //         contactNumber: finalForm.contactNumber,
  //         email: finalForm.email,
  //         designation: finalForm.designation,
  //         gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
  //         certificates: finalForm.certificates.map((certificate) => ({
  //           ...certificate,
  //           startDate: new Date(certificate.startDate),
  //           endDate: new Date(certificate.endDate),
  //         })),
  //         dateOfBirth: new Date(finalForm.dateOfBirth),
  //         sports: finalForm.coachingSports,
  //         trainingLevel: finalForm.trainingLevel
  //           .value as (typeof TRAINING_LEVEL)[number],
  //         experienceLevel: finalForm.experienceLevel
  //           .value as (typeof EXPERIENCE_LEVEL)[number],
  //         batchIds: finalForm.batchIds,
  //         centerIds: finalForm.centerIds,
  //       });
  //     }
  //   };

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
        <Card className="col-span-2 bg-black">
          <div className="flex gap-4">
            <Image
              src={NetajiIndoorImg}
              alt="preview"
              height={100}
              width={100}
            />

            <div className="mb-5 flex justify-center">
              <h3 className="text-xl text-white">NETAJI INDOOR STADIUM</h3>
            </div>
          </div>
          <p className="my-5 text-white">
            Created By <span className="text-orange-500">D.Alvensare</span> on{" "}
            <span className="text-orange-500">26-06-2023</span>
          </p>
          <div className="my-3 flex gap-4 rounded-lg bg-[#2D323D] p-4">
            <Image
              className="h-[56px] w-[56px] rounded-lg"
              src={CoachImg}
              alt="Coache Img"
              width={56}
              height={56}
            />
            <div>
              <p className="text-[#CF8DA7]">Coaches</p>
              <h1 className="text-2xl font-bold text-white">05</h1>
            </div>
          </div>
          <div className="my-3 flex gap-4 rounded-lg bg-[#2D323D] p-4">
            <Image
              className="h-[56px] w-[56px] rounded-lg"
              src={AtheleteImg}
              alt="Coache Img"
              width={56}
              height={56}
            />
            <div>
              <p className="text-[#FFBEAB]">Athlete</p>
              <h1 className="text-2xl font-bold text-white">06</h1>
            </div>
          </div>
          <div className="my-3 flex gap-4 rounded-lg bg-[#2D323D] p-4">
            <Image
              className="h-[56px] w-[56px] rounded-lg"
              src={InventoryImg}
              alt="Coache Img"
              width={56}
              height={56}
            />
            <div>
              <p className="text-[#A7AAC9]">Inventory</p>
              <h1 className="text-2xl font-bold text-white">08</h1>
            </div>
          </div>
        </Card>
      </div>
    </FormContext.Provider>
  );
}
