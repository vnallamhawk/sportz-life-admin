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
// import Addcenter from "../../../components/Addcenter/Addcenter";
// import AddcenterCertificates from "~/components/Addcenter/AddcenterCertificates";
// import AssignBatches from "~/components/Addcenter/AssignBatches";
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
import { Centers } from "@prisma/client";
const multiFormData = {
  name: "",
  image: "",
  phoneNumber: "",
  email: "",
  address: "",
  sports: [],
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
    formData: any;
    setFormData?: React.Dispatch<React.SetStateAction<any>>;
  };
}

interface Inventory {
  value: number;
  name: string;
  quantity: number;
  inventoryId: number;
  centerId: number;
}

export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddCenterForm() {
  const router = useRouter();
  const id = Number(router?.query?.id);
  const { data: sessionData } = useSession();
  const createdBy = sessionData?.token
    ? sessionData?.token?.id
    : sessionData?.user?.id;
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId;

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const [center, setCenter] = useState<Centers>();
  const [centerId, setCenterId] = useState<number>();

  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);
  const centerData = id && api.center.getCenterById.useQuery({ id });

  //   const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCenterUseEffectRun = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const uploadImage = api.upload.uploadImage.useMutation();

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };


  useEffect(() => {
    if (centerData && centerData.data && !hasCenterUseEffectRun.current) {
      let obj: any = { ...centerData.data };

      obj.sports = centerData?.data?.CenterSports?.map((v: any) => ({
        sportId: v.sportId,
        id: v.id,
      }));

      obj.inventories = centerData?.data?.CenterInventories?.map((v: any) => ({
        inventoryId: v.inventoryId,
        id: v.id,
      }));

      obj.isEditMode = true;
      setFormData(obj);
      hasCenterUseEffectRun.current = true;
    }
  }, [centerData]);



  const { mutate: createMutate } = api.center.createCenter.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      setOpenToast(true);
      setCenterId(response?.id);
      router.push("/centers").then(() => window.location.reload());
      return response?.id;
    },
  });
  const { mutate: createMutateInventories } =
    api.centerInventory.createCenterInventory.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        // router.push(`/centers/${centerId ?? ""}`);

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
      void router.push(`/centers`).then(() => window.location.reload());
    },
  });

  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      console.log({ acceptedFiles })

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

      console.log({ uploadedFile })
      setFile(uploadedFile);
      if (!uploadedFile) {
        alert('Please select a valid file');
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
      Object.keys(formData)?.length > 0 &&
      formData?.sports &&
      formData?.inventories &&
      centerId
    ) {
      const finalCenterSports = formData?.sports?.map((v: any) => ({
        ...v,
        centerId,
        academyId: sessionData?.user?.academyId ? +sessionData.user.academyId : undefined
      }));

      createMutateCenterSports(finalCenterSports);

      const finalInventories: Inventory[] = formData?.inventories?.map((v: any) => ({
        ...v,
        centerId,
      }));

      const finalInventoriesData = finalInventories.map(({ value, ...rest }) => ({
        id: value,
        ...rest
      }));

      createMutateInventories(finalInventoriesData);
    }
  }, [centerId, formData]);

  const finalFormSubmissionHandler = async (finalForm: any) => {
    if (formData?.isEditMode) {
      editMutate({
        ...finalForm,
        mobile: finalForm?.mobile,
        address: finalForm?.address,
        image: uploadUrl,
        updatedAt: new Date(),
        centerId: finalForm?.id
      });
    } else {
      console.log(finalForm, "djbsdbfn");
      const sportsId = finalForm?.selectSports?.map(function (obj: {
        value: any;
      }) {
        return Number(obj.value);
      });
      setFormData({
        ...finalForm,
        mobile: finalForm?.mobile,
        address: finalForm?.address,
        image: uploadUrl,
        sportsId,
      });
      createMutate({
        ...finalForm,
        mobile: finalForm?.mobile,
        address: finalForm?.address,
        image: uploadUrl,
        createdBy: parseInt(createdBy as string),
        academyId: parseInt(academyId as string),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  };
  return (
    <FormContext.Provider value={formProviderData}>
      <div className="bg-s-gray lg:px-6 lg:pb-7">
        <div className="grid grid-cols-6 grid-rows-1">
          <Card className="relative col-span-12 h-full min-h-[535px] !rounded-r-none rounded-l-xl p-0 pb-0 pt-10 lg:col-span-4 lg:bg-white lg:pb-6 ">
            {currentStep === 1 && <AddCenter />}
            {currentStep === 2 && <AddSports />}
            {currentStep === 3 && (
              <AddInventory
                formData={formData}
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}
          </Card>

          <Card className="col-span-2 hidden !rounded-l-none rounded-r-xl bg-stone-100 px-7 lg:block">
            <div className="mb-10 font-heading text-2xl font-medium uppercase">
              Center Image
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
                    src={uploadUrl ? uploadUrl : ""}
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
      </div>
    </FormContext.Provider>
  );
}
