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
import { FormProvider, useForm } from "react-hook-form";
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
import { prisma } from "~/server/db";
import { parse } from "date-fns";

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
  coachBatches: [],
  centerId: "",
  CoachQualifications: [],
  Batches: {
    id: 0,
    name: "",
    capacity: 0,
    remainingSeat: 0,
    occupiedSeat: 0,
    academyId: 0,
    sportId: 0,
    coachId: null,
    centerId: 0,
    status: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    feePlanId: 0,
    trainingLevel: "beginner",
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
    setFormData?: React.Dispatch<React.SetStateAction<any>>;
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
  const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCoachUseEffectRun = useRef(false);
  const { data: sessionData } = useSession();
  const createdBy = sessionData?.token
    ? sessionData?.token?.id
    : sessionData?.user?.id;
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId;
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const uploadImage = api.upload.uploadImage.useMutation();
  const coachData = id && api.coach.getCoachById.useQuery({ id });

  useEffect(() => {
    if (coachData && coachData.data && !hasCoachUseEffectRun.current) {
      let obj: any = { ...coachData.data };

      obj.isEditMode = true;

      setFormData(obj);
      hasCoachUseEffectRun.current = true;
    }
  }, [coachData]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.coach.createCoach.useMutation({
    onSuccess: (response) => {
      setCoachId(response?.id);
      setOpenToast(true);
      router.push("/coach");
      return response;
    },
  });

  const { mutate: editMutate } = api.coach.editCoach.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      router
        .push(`/coach/${response?.id ?? ""}`)
        .then(() => window.location.reload());
    },
  });

  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setPreview(
        acceptedFiles.map((upFile: File) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
      const uploadedFile: File | null = acceptedFiles[0]
        ? acceptedFiles[0]
        : null;
      setFile(uploadedFile);
      if (!uploadedFile) {
        alert("Please select a valid file");
        return;
      } else {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
          const base64String = fileReader.result as string;

          try {
            const response = await uploadImage.mutateAsync({
              file: base64String,
              filename: uploadedFile.name,
              mimetype: uploadedFile.type,
            });
            // setFormData((previousFormData) => ({
            //   ...previousFormData,
            //   image: response.url,
            // }));
            setUploadUrl(response.url);
          } catch (err) {
            console.error("Upload failed:", err);
          }
        };
        fileReader.readAsDataURL(uploadedFile);
      }
    }
  }, []);

  const { mutate: createMutateCoachSports } =
    api.coachSports.createCoachSports.useMutation({
      onSuccess: (response) => {
        // console.log("response data is ", response);

        return response;
      },
    });
  const { mutate: createMutateCoachCertificates } =
    api.coachCertificate.createCoachCertificates.useMutation({
      onSuccess: (response) => {
        // console.log("response data is ", response);
        return response;
      },
    });

  const { mutate: createMutateCoachBatches } =
    api.coachBatches.createCoachbatches.useMutation({
      onSuccess: (response) => {
        // console.log("response data is ", response);
        // router.push(`/coach/${coachId ?? ""}`);

        return response;
      },
    });

  const validDate = (dateString: any) => {
    const [day, month, year] = dateString.split("/");
    const validDate = new Date(`${year}-${month}-${day}`);
    return validDate;
  };

  // useEffect(() => {
  //   if (
  //     formData &&
  //     Object.keys(formData)?.length > 0 &&
  //     formData?.coachingSports &&
  //     formData?.certificates &&
  //     formData?.coachBatches &&
  //     coachId
  //   ) {
  //     const finalCoachSports = formData?.coachingSports?.map((v: any) => ({
  //       sportId: parseInt(v.value),
  //       ...v,
  //       coachId,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     }));

  //     createMutateCoachSports(finalCoachSports);

  //     const finalCertificates = formData?.certificates?.map((v: any) => ({
  //       ...v,
  //       startDate: validDate(v.startDate),
  //       endDate: validDate(v.endDate),
  //       coachId,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       fileType: "link",
  //       fileName: "",
  //       fileUrl: "",
  //     }));

  //     createMutateCoachCertificates(finalCertificates);

  //     // @ts-expect-error
  //     const batchesData = formData?.batches;

  //     const finalCenterBatches = batchesData?.map((v: any) => ({
  //       // @ts-expect-error
  //       centerId: formData.centerId?.value,
  //       coachId,
  //       batchId: v.value,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     }));

  //     console.log({ finalCenterBatches });

  //     createMutateCoachBatches(finalCenterBatches);
  //   }
  // }, [coachId, formData]);

  const finalFormSubmissionHandler = (finalForm: any) => {
    if (createdBy && academyId) {
      const isEditMode = router.asPath.includes("edit");
      if (isEditMode) {
        editMutate({
          name: finalForm.name,
          phone: finalForm.phone,
          email: finalForm.email,
          designation: finalForm.designation?.value,
          gender: finalForm.gender.value.toLowerCase(),
          dateOfBirth: new Date(finalForm.dateOfBirth),
          trainingLevel: finalForm.trainingLevel
            .value as (typeof TRAINING_LEVEL)[number],
          updatedAt: new Date(),
          academyId: Number(academyId),
          image: uploadUrl,
          coachId: id,
        });
      } else {
        console.log(finalForm);
        createMutate({
          name: finalForm.name,
          phone: finalForm.phone,
          email: finalForm.email,
          designation: finalForm.designation,
          gender: finalForm.gender,
          dateOfBirth: new Date(finalForm.dateOfBirth),
          trainingLevel: finalForm.trainingLevel,
          createdBy: parseInt(createdBy as string),
          createdAt: new Date(),
          updatedAt: new Date(),
          academyId: Number(academyId),
          image: uploadUrl,
          experience: finalForm.experience,
          about: "",
          experienceLevel: finalForm.experienceLevel,
          centerId: finalForm.centerId,
          sports: finalForm.coachingSports.map((sport: any) => Number(sport)),
          coachQualifications: finalForm.CoachQualifications.map(
            (coachQualification: { startDate: string; endDate: string }) => ({
              ...coachQualification,
              startDate: parse(
                coachQualification.startDate,
                "dd/MM/yyyy",
                new Date()
              ),
              endDate: parse(
                coachQualification.endDate,
                "dd/MM/yyyy",
                new Date()
              ),
              fileUrl: "",
              fileType: "link",
            })
          ),
          batches: finalForm.batches,
        });
      }
    }
  };
  // const methods = useForm({ defaultValues: multiFormData });

  return (
    <FormProvider {...methods}>
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
                <FileUpload onDropCallback={onDropCallback} />
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
    </FormProvider>
  );
}
