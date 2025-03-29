import React, { useState, useCallback, useEffect, useRef } from "react";
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
// import { ToastContext } from "~/contexts/Contexts";
import FileUpload from "~/components/FileUpload";
import { getSportsDictionaryServices } from "~/services/sportServices";
import { type BatchTableData } from "~/types/batch";
import { dateFormat } from "~/helpers/date";
import { type MultiSelectOption } from "~/types/select";
import { useSession } from "next-auth/react";
import { prisma } from "~/server/db";
import { parse } from "date-fns";
import { isEqual } from "lodash";
import AddCoachSuccessToast from "~/components/AddCoach/AddCoachSuccessToast";
import Image from "next/image";

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
  coachId: undefined,
  coachBatches: [],
  centerId: "",
  CoachQualifications: [],
  isEditMode: false,
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
  // const [openToast, setOpenToast] = useState(false);
  // const [isEditMode, setIsEditMode] = useState(false);

  // const { setOpenToast } = useContext(ToastContext);
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
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const uploadImage = api.upload.uploadImage.useMutation();
  const coachData = id ? api.coach.getCoachById.useQuery({ id }) : undefined;
  const data = coachData?.data;
  const image = data?.image;
  const [imageUrl, setImageUrl] = useState(image);
  const [signedS3Url, setSignedS3Url] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (image) {
      setImageUrl(image);
    }
  }, [image]); // Runs whenever image changes

  const getSignedUrlForImage = async (key: string) => {
    try {
      const response = await fetch(
        `/api/aws/getAwsSignedURL?key=${encodeURIComponent(key)}`
      );
      if (!response.ok) throw new Error("Failed to fetch signed URL");

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url } = await response.json();
      setSignedS3Url(url as string);
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };

  console.log(formData);
  useEffect(() => {
    if (formData.isEditMode && coachData?.data) {
      // @ts-expect-error // TODO : FIX THIS TS ERROR
      setFormData((prevData) => ({
        ...prevData,
        ...coachData?.data,
      }));
    }
  }, [coachData?.data, formData.isEditMode]);

  useEffect(() => {
    if (router.isReady) {
      if (router.asPath.includes("edit")) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          isEditMode: true,
        }));
      }
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (imageUrl) {
        await getSignedUrlForImage(imageUrl);
      }
    };

    void fetchSignedUrl();
  }, [imageUrl]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.coach.createCoach.useMutation({
    onSuccess: async (response) => {
      setCoachId(response?.id);
      await router.push("/coach");
      return response;
    },
  });

  const { mutate: editMutate } = api.coach.editCoach.useMutation({
    onSuccess: (response) => {
      // setOpenToast(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      void router
        .push(`/coach/${response?.id ?? ""}`)
        .then(() => window.location.reload());
    },
  });

  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedFile: File | null = acceptedFiles[0]
        ? acceptedFiles[0]
        : null;
      if (!uploadedFile) {
        alert("Please select a valid file");
        return;
      } else {
        setPreviewUrl(URL.createObjectURL(uploadedFile));
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
          let base64String = fileReader.result as string;

          if (base64String.startsWith("data:")) {
            base64String = base64String.split(",")[1] as string; // Get the part after the comma
          }

          try {
            const response = await uploadImage.mutateAsync({
              file: base64String,
              filename: uploadedFile.name,
              mimetype: uploadedFile.type,
              key: "coach",
            });
            setImageUrl(response.url);
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
        return response;
      },
    });

  const { mutate: createMutateCoachBatches } =
    api.coachBatches.createCoachbatches.useMutation({
      onSuccess: (response) => {
        return response;
      },
    });

  // const validDate = (dateString: any) => {
  //   const [day, month, year] = dateString.split("/");
  //   const validDate = new Date(`${year}-${month}-${day}`);
  //   return validDate;
  // };

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

  const finalFormSubmissionHandler = (finalForm: MULTI_FORM_TYPES) => {
    if (createdBy && academyId) {
      if (formData.isEditMode) {
        const hasCertificatedUpdated =
          finalForm.CoachQualifications.length !==
            coachData?.data?.CoachQualifications.length ||
          finalForm.CoachQualifications?.[0]?.certificateType !==
            // @ts-expect-error TODO: FIX THIS ERROR
            coachData.data?.CoachQualifications?.[0].certificateType;

        editMutate({
          name: finalForm.name,
          // @ts-expect-error TODO: FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          phone: finalForm.phone,
          email: finalForm.email,
          designation: finalForm.designation,
          // @ts-expect-error TODO: FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          gender: finalForm.gender.toLowerCase(),
          // @ts-expect-error TODO: FIX THIS ERROR
          dateOfBirth: new Date(finalForm.dateOfBirth),
          // @ts-expect-error TODO: FIX THIS ERROR
          trainingLevel: finalForm.trainingLevel,
          updatedAt: new Date(),
          createdAt: new Date(),
          academyId: Number(academyId),
          image: imageUrl ? imageUrl : undefined,
          coachId: id,
          // @ts-expect-error TODO: FIX THIS ERROR
          coachQualifications: hasCertificatedUpdated
            ? finalForm.CoachQualifications.map(
                // @ts-expect-error FIX THIS ERROR
                (coachQualification: {
                  startDate: string;
                  endDate: string;
                }) => ({
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
              )
            : [],
        });
      } else {
        createMutate({
          name: finalForm.name,
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          phone: finalForm.phone,
          email: finalForm.email,
          designation: finalForm.designation,
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          gender: finalForm.gender,
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          dateOfBirth: new Date(finalForm.dateOfBirth),
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          trainingLevel: finalForm.trainingLevel,
          createdBy: parseInt(createdBy as string),
          createdAt: new Date(),
          updatedAt: new Date(),
          academyId: Number(academyId),
          image: uploadUrl,
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          experience: finalForm.experience,
          about: "",
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          experienceLevel: finalForm.experienceLevel,
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          centerId: finalForm.centerId,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          sports: finalForm.coachingSports?.map((sport: any) => Number(sport)),
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          coachQualifications: finalForm.CoachQualifications.map(
            // @ts-expect-error FIX THIS ERROR
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          // @ts-expect-error FIX THIS ERROR
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          batches: finalForm.batches,
        });
        // setOpenToast(true);
      }
    }
  };
  // const methods = useForm({ defaultValues: multiFormData });

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={formProviderData}>
        {/* <AddCoachSuccessToast open={openToast} /> */}
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
              {previewUrl || signedS3Url ? (
                <div className="previewImage mb-5 flex justify-center rounded-full">
                  <img
                    className="mx-auto mb-6 rounded-full"
                    src={previewUrl || signedS3Url}
                    alt="preview"
                    height={205}
                    width={205}
                  />
                </div>
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
                <FileUpload onDropCallback={onDropCallback} multiple={false} />
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
