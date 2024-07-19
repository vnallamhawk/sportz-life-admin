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
    formData;
    setFormData?: React.Dispatch<React.SetStateAction<{}>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddStaffMultiFormLayout() {
  const methods = useForm();
  const router = useRouter();
  const id = Number(router?.query?.id);
  const { data: sessionData } = useSession();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState(
    defaultValues.multiFormData.formData
  );
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  const [staffId, setStaffId] = useState<number>();

  const { setOpenToast } = useContext(ToastContext);

  const hasStaffUseEffectRun = useRef(false);
  const { data: staff } = id && api.staff.getStaffById.useQuery({ id });

  useEffect(() => {
    if (id) {
      if (staff && !hasStaffUseEffectRun.current) {
        setFormData(staff);
        hasStaffUseEffectRun.current = true;
      }
    }
  }, [id]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };

  // create staff api method
  const { mutate: createMutate } = api.staff.createStaff.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setOpenToast(true);
      setStaffId(response?.id);
      return response?.id;
    },
  });

  const { mutate: createMutateStaffPayroll } =
    api.staffPayroll.createStaffPayroll.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        router.push(`/staffs/${staffId ?? ""}`);

        return response;
      },
    });
  // doubt

  // const { mutate: createMutateStaffCenters } =
  //   api.cen.useMutation({
  //     onSuccess: (response) => {
  //       console.log("response data is ", response);
  //       return response;
  //     },
  //   });
  const { mutate: createMutateStaffTimings } =
    api.staffTimings.createStaffTiming.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        router.push(`/staff/${staffId}`)
        return response;
      },
    });
  const { mutate: editMutate } = api.staff.editStaff.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      router.push(`/staffs/${response?.id ?? ""}`);
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
      formData?.staffShiftDetails &&
      staffId
    ) {
      const finalStaffTimings = formData?.staffShiftDetails?.map((v) => ({
        ... v,
        staffId:staffId
      }));

      createMutateStaffTimings(finalStaffTimings);
    }
  }, [staffId, formData]);


  //final Form

  //Todo APIs
  const finalFormSubmissionHandler = async (
    // finalForm: Required<MULTI_FORM_TYPES>
    finalForm
  ) => {
    console.log(finalForm, "sdkjnfksdjf");
    if (formData.isEditMode) {
      editMutate({
        ...finalForm,
        designationId:parseInt(finalForm?.designation?.value),
        centerId:parseInt(finalForm?.center?.value),
        payrollId:parseInt(finalForm?.payroll?.value),
        image: "",
      });
    } else {
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-console
      // const sportsId = finalForm?.selectSports.map(function (obj) {
      //   return Number(obj.value);
      // });
      setFormData({
        ...finalForm,
        mobile: finalForm?.phoneNumber,
        address: finalForm?.address,
        image: "",
        // sportsId,
      });
      createMutate({
        ...finalForm,
        designationId:parseInt(finalForm?.designation?.value),
        centerId:parseInt(finalForm?.center?.value),
        payrollId:parseInt(finalForm?.payroll?.value),
        image: "",
        createdBy: sessionData?.token?.id,
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
