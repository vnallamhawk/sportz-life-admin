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
import AddBatch from "~/components/AddBatch/AddBatch";
import AddBatchTiming from "~/components/AddBatch/AddBatchTiming";
import { GetServerSidePropsContext } from "next";
import { prisma } from "~/server/db";
import type { Centers } from "@prisma/client";


const multiFormData: MULTI_FORM_BATCH_TYPES = {
  name: "",
  selectSports: {},
  selectCoaches: [],
  maxCapacity: 0,
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


export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  // const sports = await prisma.sports.findMany();
  const center = await prisma.centers.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      CenterSports: {
        include: {
          Sports: true,
        },
      },
      CenterInventories: {
        include: {
          Inventories: true,
        },
      },
    },
  });

  return {
    props: {
      center: JSON.parse(JSON.stringify(center)), // <== here is a solution
    },
  };
};

export default function AddCoachMultiFormLayout({ center }: { center: Centers }) {
  const router = useRouter();
  const id = Number(router?.query?.id);

  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MULTI_FORM_BATCH_TYPES>(
    defaultValues.multiFormData.formData
  );
  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);
  const [batchId, setBatchId] = useState<number>();

 

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };

  const { mutate: createMutateBatchTimings } =
    api.batchTimings.createBatchTiming.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        return response;
      },
    });
    const { mutate: createMutateBatch } =
    api.batches.createBatch.useMutation({
      onSuccess: (response) => {
        console.log("response data is ", response);
        setBatchId(response?.id)
        return response;
      },
    });
  useEffect(() => {
    if (
      formData &&
      Object.keys(formData)?.length > 0 &&
      formData?.batchTimings &&
      batchId
    ) {
      const finalBatchTimings = formData?.batchTimings?.map((v) => ({
        ... v,
        batchId,
        centerId:center?.id
      }));

      createMutateBatchTimings(finalBatchTimings);
    }
  }, [batchId, formData]);

  const finalFormSubmissionHandler = async (
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    debugger
    const sportId = finalForm?.selectSports?.value
    // if (formData.isEditMode) {
    //   editMutate({
    //     ...finalForm
    //   });
    // } else {
    //   setFormData({
    //     ...finalForm,
    //     centerId:center?.id,
    //   });
    //   createMutateBatch({
    //     ...finalForm,
    //     sportId
    //     centerId:center?.id,
    //   });
    // }
  };
  console.log(formData,"dnsfsmdfnmds")

  return (
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-4 ml-10 h-full p-0 pl-10 pt-10">
          {currentStep === 1 && <AddBatch />}
          {currentStep === 2 && <AddBatchTiming finalFormSubmissionHandler={finalFormSubmissionHandler}/>}
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
              <h3 className="text-xl text-white">{center?.name}</h3>
            </div>
          </div>
          {/* <p className="my-5 text-white">
            Created By <span className="text-orange-500">D.Alvensare</span> on{" "}
            <span className="text-orange-500">26-06-2023</span>
          </p> */}
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
              <h1 className="text-2xl font-bold text-white">{center?.CenterInventories?.length}</h1>
            </div>
          </div>
        </Card>
      </div>
    </FormContext.Provider>
  );
}
