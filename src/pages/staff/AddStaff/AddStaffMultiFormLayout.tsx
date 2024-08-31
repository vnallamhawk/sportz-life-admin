import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import Card from "~/components/Card";
import ImageWithFallback from "~/components/ImageWithFallback";
import { useForm } from "react-hook-form";
// import { type MULTI_FORM_TYPES } from "~/types/coach";
import FileUpload from "~/components/FileUpload";
import AddStaffShift from "~/components/AddStaff/AddStaffShift";
import AddStaff from "~/components/AddStaff/AddStaff";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { ToastContext } from "~/contexts/Contexts";
import { useSession } from "next-auth/react";

const multiFormData = {
  name: "",
  designation: "",
  contactNumber: "",
  email: "",
  dateOfBirth: "",
  gender: "",
  payroll: "",
  center: "",
  isEditMode:false
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
    formData?: any;
    // setFormData?: React.Dispatch<React.SetStateAction<{}>>;
    setFormData?: any;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddStaffMultiFormLayout() {
  const methods = useForm();
  const router = useRouter();
  const id = Number(router?.query?.id);
  const { data: sessionData } = useSession();
  const [currentStep, setCurrentStep] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  const [staffId, setStaffId] = useState<number>();

  const { setOpenToast } = useContext(ToastContext);

  const hasStaffUseEffectRun = useRef(false);
  const staffData =  id && api.staff.getStaffById.useQuery({ id });
  const  createdBy= sessionData?.token?sessionData?.token?.id:sessionData?.user?.id

  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const uploadImage = api.upload.uploadImage.useMutation();
  useEffect(() => {
    if (staffData &&staffData.data ) {

      if (staffData.data && !hasStaffUseEffectRun.current) {
        const obj:any={...staffData.data}

        setFormData(obj);
        hasStaffUseEffectRun.current = true;
      }
    }
  }, [staffData]);
 

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  };

  // create staff api method
  const { mutate: createMutate } = api.staff.createStaff.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      setStaffId(response?.id);
      return response?.id;
    },
  });

  const { mutate: createMutateStaffTimings } =
    api.staffTimings.createStaffTiming.useMutation({
      onSuccess: (response) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        void router.push(`/staff/${staffId}`);
        return response;
      },
    });
  const { mutate: editMutate } = api.staff.editStaff.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      void router.push(`/staffs/${response?.id ?? ""}`);
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
        alert('Please select a valid file');
        return;
      }else  {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
          const base64String = fileReader.result as string;
    

          try {
            const response  = await uploadImage.mutateAsync({
              file: base64String,
              filename: uploadedFile.name,
              mimetype: uploadedFile.type,
            });
            setUploadUrl(response.url);
          } catch (err) {
            console.error("Upload failed:", err);
          }
        };
        fileReader.readAsDataURL(uploadedFile)      
      }
    }
  }, []);


  useEffect(() => {
    if (
      formData &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.keys(formData)?.length > 0 &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      formData?.staffShiftDetails &&
      staffId
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const finalStaffTimings = formData?.staffShiftDetails?.map((v: any) => ({
        ...v,
        staffId: staffId,
      }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      createMutateStaffTimings(finalStaffTimings);
    }
  }, [staffId, formData, createMutateStaffTimings]);

  //final Form

  //Todo APIs
  const finalFormSubmissionHandler =  (
    // finalForm: Required<MULTI_FORM_TYPES>
    finalForm: any
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (formData.isEditMode) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      editMutate({
        ...finalForm,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        designationId: parseInt(finalForm?.designation?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        centerId: parseInt(finalForm?.center?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        payrollId: parseInt(finalForm?.payroll?.value),
        image: uploadUrl,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        gender: finalForm.gender.value.toLowerCase() ,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        dateOfBirth: new Date(finalForm.dateOfBirth),
        updatedAt:new Date(),
        staffId:id
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setFormData(finalForm);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      createMutate({
        ...finalForm,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        designationId: parseInt(finalForm?.designation?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        centerId: parseInt(finalForm?.center?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        payrollId: parseInt(finalForm?.payroll?.value),
        image: uploadUrl,
        createdBy: parseInt(createdBy as string),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        gender: finalForm.gender.value.toLowerCase() ,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        dateOfBirth: new Date(finalForm.dateOfBirth),
        createdAt:new Date(),
        updatedAt:new Date(),
      });
    }
  };

  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
          {currentStep === 1 && <AddStaff />}
          {currentStep === 2 && (
            <AddStaffShift finalFormSubmission={finalFormSubmissionHandler} />
          )}
        </Card>
        <Card className="col-span-2 hidden !rounded-l-none rounded-r-xl bg-stone-100 px-7 lg:block">
          <div className="mb-10 font-heading text-2xl font-medium uppercase">
            Staff Image
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
