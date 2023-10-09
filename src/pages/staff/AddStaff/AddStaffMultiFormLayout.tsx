import React, { useState, useCallback } from "react";
import Card from "~/components/Card";
import ImageWithFallback from "~/components/ImageWithFallback";
import { useForm } from "react-hook-form";
import AddStaff from "../../../components/AddStaff/AddStaff";
import FileUpload from "~/components/FileUpload";
import { type STAFF_MULTI_FORM_TYPES } from "~/types/staff";

const multiFormData: STAFF_MULTI_FORM_TYPES = {
  contactNumber: "",
  staffName: "",
  designation: "",
  email: "",
  dateOfBirth: undefined,
  center: [],
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
    formData: STAFF_MULTI_FORM_TYPES;
    setFormData?: React.Dispatch<React.SetStateAction<STAFF_MULTI_FORM_TYPES>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddStaffMultiFormLayout() {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<STAFF_MULTI_FORM_TYPES>(
    defaultValues.multiFormData.formData
  );
  //   const { setOpenToast } = useContext(ToastContext);
  //   const router = useRouter();
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  //   const { mutate } = api.staff.createStaff.useMutation({
  //     onSuccess: (response) => {
  //       setOpenToast(true);
  //       void router.push(`/staff/${response?.id ?? ""}`);
  //     },
  //   });

  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    setPreview(
      acceptedFiles.map((upFile) =>
        Object.assign(upFile, {
          preview: URL.createObjectURL(upFile),
        })
      )
    );
  }, []);

  //   const finalFormSubmissionHandler = (
  //     finalForm: Required<MULTI_FORM_TYPES>
  //   ) => {
  //     mutate({
  //       name: finalForm.staffName,
  //       contactNumber: finalForm.contactNumber,
  //       email: finalForm.email,
  //       designation: finalForm.designation,
  //       gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
  //       certificates: finalForm.certificates,
  //       dateOfBirth: new Date(finalForm.dateOfBirth),
  //       centers: finalForm.centers,
  //     });
  //   };

  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
          {currentStep === 1 && <AddStaff />}
        </Card>
        <Card className="col-span-2 bg-gray-100">
          <div className="mb-10 font-bold">Staff Image</div>
          <div>
            {preview.length ? (
              preview.map((upFile, index) => {
                return (
                  <div
                    className="previewImage mb-5 flex justify-center rounded-full"
                    key={index}
                  >
                    <ImageWithFallback
                      className="rounded-2xl"
                      src={upFile.preview}
                      alt="preview"
                      height={205}
                      width={205}
                      fallbackSrc="/images/fallback.png"
                    />
                  </div>
                );
              })
            ) : (
              <div className="previewImage">
                <ImageWithFallback
                  src={""}
                  alt="preview"
                  height={500}
                  width={500}
                  fallbackSrc="/images/fallback.png"
                />
              </div>
            )}
            <div className="mb-5 flex justify-center">
              <FileUpload onDropCallback={onDropCallback} />{" "}
            </div>
          </div>
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
    </FormContext.Provider>
  );
}
