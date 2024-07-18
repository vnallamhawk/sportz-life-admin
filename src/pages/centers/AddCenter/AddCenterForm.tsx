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
import Addcenter from "../../../components/Addcenter/Addcenter";
import AddcenterCertificates from "~/components/Addcenter/AddcenterCertificates";
import AssignBatches from "~/components/Addcenter/AssignBatches";
// import {
//   type TRAINING_LEVEL,
//   type GENDER_VALUES,
//   type MULTI_FORM_TYPES,
//   type EXPERIENCE_LEVEL,
//   type centerWithRelationsEditForm,
// } from "~/types/center";
import { type MULTI_FORM_TYPES } from "~/types/center";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";
import FileUpload from "~/components/FileUpload";
import { getSportsDictionaryServices } from "~/services/sportServices";
import { dateFormat } from "~/helpers/date";
import AddCenter from "~/components/AddCenter/AddCenter";
import AddInventory from "~/components/AddInventory/AddInventory";
import AddStaff from "~/components/AddStaff/AddStaff";
import AddSports from "~/components/AddSports/AddSports";
import { useSession } from "next-auth/react";
const multiFormData: MULTI_FORM_TYPES = {
  name: "",
  image: "",
  phoneNumber: "",
  email: "",
  address: "",
  selectSports: [],
  isEditMode: false,
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

export default function AddCenterForm() {
  const router = useRouter();
  const id = Number(router?.query?.id);
  const { data: sessionData } = useSession();

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MULTI_FORM_TYPES>(
    defaultValues.multiFormData.formData
  );
  const [centerId, setCenterId] = useState<number>();

  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);

  //   const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCenterUseEffectRun = useRef(false);
  const { data: center } = id && api.center.getCenterById.useQuery({ id });

  useEffect(() => {
    if (id) {
      if (center && !hasCenterUseEffectRun.current) {
        setFormData(center);
        hasCenterUseEffectRun.current = true;
      }
    }
  }, [id]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.center.createCenter.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setOpenToast(true);
      setCenterId(response?.id);
      return response?.id;
    },
  });
  const { mutate: createMutateInventories } =
    api.centerInventory.createCenterInventory.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        router.push(`/centers/${centerId ?? ""}`);

        return response;
      },
    });
  const { mutate: createMutateCenterSports } =
    api.centerSports.createCenterSports.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        return response;
      },
    });

  const { mutate: editMutate } = api.center.editCenter.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      void router.push(`/centers/${response?.id ?? ""}`);
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
      formData?.sports &&
      formData?.inventories &&
      centerId
    ) {
      const finalCenterSports = formData?.sports?.map((v) => ({
        ... v,
        centerId,
      }));

      createMutateCenterSports(finalCenterSports);

      const finalInventories = formData?.inventories?.map((v) => ({
        ...v,
        centerId,

      }));
      createMutateInventories(finalInventories);
    }
  }, [centerId, formData]);

  const finalFormSubmissionHandler = async (
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    if (formData.isEditMode) {
      editMutate({
        ...finalForm,
        mobile: finalForm?.phoneNumber,
        address: finalForm?.location,
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(finalForm);
      // eslint-disable-next-line no-console
      console.log(finalForm, "djbsdbfn");
      const sportsId = finalForm?.selectSports.map(function (obj) {
        return Number(obj.value);
      });
      setFormData({
        ...finalForm,
        mobile: finalForm?.phoneNumber,
        address: finalForm?.address,
        image: "",
        sportsId,
      });
      createMutate({
        ...finalForm,
        mobile: finalForm?.phoneNumber,
        address: finalForm?.address,
        image: "",
        createdBy:sessionData?.token?.id
      });
    }
  };
  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
          {currentStep === 1 && <AddCenter />}
          {currentStep === 2 && <AddSports />}
          {currentStep === 3 && (
            <AddInventory
              finalFormSubmissionHandler={finalFormSubmissionHandler}
            />
          )}
        </Card>
        <Card className="col-span-2 bg-gray-100">
          <div className="mb-10 font-bold">Center Image</div>

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
