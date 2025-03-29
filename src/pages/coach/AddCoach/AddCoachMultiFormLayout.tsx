import React, { useState, useCallback, useEffect } from "react";
import Card from "~/components/Card";
import ImageWithFallback from "~/components/ImageWithFallback";
import { FormProvider, useForm } from "react-hook-form";
import AddCoach from "../../../components/AddCoach/AddCoach";
import AddCoachCertificates from "~/components/AddCoach/AddCoachCertificates";
import AssignBatches from "~/components/AddCoach/AssignBatches";
import { type MULTI_FORM_TYPES } from "~/types/coach";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FileUpload from "~/components/FileUpload";
import { useSession } from "next-auth/react";
import { parse } from "date-fns";

const multiFormData: MULTI_FORM_TYPES = {
  contactNumber: "",
  name: "",
  designation: "",
  email: "",
  about: "",
  dateOfBirth: "",
  payroll: "",
  coachingSports: [],
  certificates: [],
  batchIds: [],
  centerIds: [],
  coachId: undefined,
  coachBatches: [],
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
  phone: "",
  image: "",
  batches: [],
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
  const [coachId, setCoachId] = useState<number>();
  const { data: batches } = api.batches.getAllBatches.useQuery();
  const { data: sessionData } = useSession();
  const createdBy = sessionData?.token
    ? sessionData?.token?.id
    : sessionData?.user?.id;
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId;
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

      const data = (await response.json()) as { url: string }; // Type assertion here
      setSignedS3Url(data.url);
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };

  useEffect(() => {
    if (formData.isEditMode && coachData?.data) {
      setFormData((prevData) => ({
        ...prevData,
        ...coachData?.data,
        centerId: coachData?.data?.centerId ?? undefined,
        phone: coachData?.data?.phone ?? undefined,
        email: coachData?.data?.email ?? undefined,
        image: coachData?.data?.image ?? undefined,
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
    const {
      gender,
      trainingLevel,
      experience,
      experienceLevel,
      centerId,
      phone,
      email,
    } = finalForm;
    if (
      createdBy &&
      academyId &&
      gender &&
      trainingLevel &&
      experienceLevel &&
      phone &&
      email
    ) {
      if (formData.isEditMode) {
        const hasCertificatedUpdated =
          finalForm.CoachQualifications.length !==
            coachData?.data?.CoachQualifications.length ||
          finalForm.CoachQualifications?.[0]?.certificateType !==
            coachData.data?.CoachQualifications?.[0]?.certificateType;

        editMutate({
          name: finalForm.name,
          phone: phone,
          email: email,
          designation: finalForm.designation,
          gender,
          dateOfBirth: new Date(finalForm.dateOfBirth),
          experienceLevel,
          trainingLevel,
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
                  fileName: null,
                })
              )
            : [],
        });
      } else {
        if (centerId && experience) {
          createMutate({
            name: finalForm.name,
            phone: phone,
            email: email,
            experience,
            designation: finalForm.designation,
            gender,
            dateOfBirth: new Date(finalForm.dateOfBirth),
            trainingLevel,
            createdBy: parseInt(createdBy as string),
            createdAt: new Date(),
            updatedAt: new Date(),
            academyId: Number(academyId),
            image: finalForm.image,
            about: "",
            experienceLevel,
            centerId,
            sports: finalForm.coachingSports?.map((sport) => Number(sport)),
            coachQualifications: finalForm.CoachQualifications.map(
              (coachQualification) => ({
                ...coachQualification,
                startDate: parse(
                  coachQualification.startDate.toISOString(),
                  "dd/MM/yyyy",
                  new Date()
                ),
                endDate: parse(
                  coachQualification.endDate.toISOString(),
                  "dd/MM/yyyy",
                  new Date()
                ),
                fileUrl: "",
                fileType: "link",
                fileName: null,
              })
            ),
            batches: finalForm.batches,
          });
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContext.Provider value={formProviderData}>
        <div className="grid grid-cols-6 grid-rows-1">
          <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
            {currentStep === 1 && <AddCoach />}
            {currentStep === 2 && <AddCoachCertificates />}
            {currentStep === 3 && (
              <AssignBatches
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
