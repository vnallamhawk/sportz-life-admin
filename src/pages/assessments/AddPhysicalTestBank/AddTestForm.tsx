/* eslint-disable */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Card from "~/components/Card";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";
import { useSession } from "next-auth/react";
import { Centers } from "@prisma/client";
import AddTestBank from "~/components/AddTestBank/AddTestBank";

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
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddTestBankForm() {
  const router = useRouter();
  const id = Number(router?.query?.id);
  const { data: sessionData } = useSession();
  const  createdBy= sessionData?.token?sessionData?.token?.id:sessionData?.user?.id
  const  academyId= sessionData?.token?sessionData?.token?.academyId:sessionData?.user?.academyId

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const [center,setCenter]=useState<Centers>()
  const [centerId, setCenterId] = useState<number>();

  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);
  const centerData=  id && api.center.getCenterById.useQuery({ id });

  //   const { data: batches } = api.batches.getAllBatches.useQuery();
  const hasCenterUseEffectRun = useRef(false);


  useEffect(() => {
    if (centerData &&centerData.data ) {

      if (centerData.data && !hasCenterUseEffectRun.current) {
        let obj:any={...centerData.data}
        obj.sports=centerData?.data?.CenterSports?.map((v:any) => ({
          sportId:v.sportId,
          id:v.id
        }));
        obj.inventories=centerData?.data?.CenterInventories?.map((v:any) => ({
          inventoryId:v.inventoryId,
          id:v.id
        }));
        setFormData(obj);
        hasCenterUseEffectRun.current = true;
      }
    }
  }, [centerData]);


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
      const finalCenterSports = formData?.sports?.map((v:any) => ({
        ...v,
        centerId,
        academyId:sessionData?.token?.academyId
      }));

      createMutateCenterSports(finalCenterSports);

      const finalInventories = formData?.inventories?.map((v:any) => ({
        ...v,
        centerId,
      }));
      createMutateInventories(finalInventories);
    }
  }, [centerId, formData]);

  const finalFormSubmissionHandler = async (
    finalForm:any
  ) => {
    if (formData?.isEditMode) {
      editMutate({
        ...finalForm,
        mobile: finalForm?.mobile,
        address: finalForm?.address,
        image: "",
        centerId:id,
        updatedAt:new Date()
      });
    } else {
      // eslint-disable-next-line no-console
      console.log(finalForm);
      // eslint-disable-next-line no-console
      console.log(finalForm, "djbsdbfn");
      const sportsId = finalForm?.selectSports?.map(function (obj: { value: any; }) {
        return Number(obj.value);
      });
      setFormData({
        ...finalForm,
        mobile: finalForm?.mobile,
        address: finalForm?.address,
        image: "",
        sportsId,
      });
      createMutate({
        ...finalForm,
        mobile: finalForm?.mobile,
        address: finalForm?.address,
        image: "",
        createdBy: parseInt(createdBy as string),
        academyId:parseInt(academyId as string),
        createdAt:new Date(),
        updatedAt:new Date()
      });
    }
  };
  return (
    <FormContext.Provider value={formProviderData}>
      <div className="bg-s-gray lg:px-6 lg:pb-7">
        <div className="grid grid-cols-6 grid-rows-1">
          <Card className="relative col-span-12 h-full min-h-[535px] !rounded-r-none rounded-l-xl p-0 pb-0 pt-10 lg:col-span-4 lg:bg-white lg:pb-6 ">
            {currentStep === 1 && <AddTestBank  finalFormSubmissionHandler={finalFormSubmissionHandler} physical={true}/>}
           

            {/* {currentStep === 3 && (
              <AddInventory
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}  */}
          </Card>

        </div>
      </div>
    </FormContext.Provider>
  );
}
