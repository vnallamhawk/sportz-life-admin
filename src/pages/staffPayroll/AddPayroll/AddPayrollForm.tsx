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
import AddPayroll from "~/components/AddStaffPayroll/AddStaffPayroll";
import { Button } from "flowbite-react";
import Table from "~/components/Table";
import TaxSlabTableHeader from "~/components/TaxSlab/TaxSlabTableHeader";
import TaxSlabTableBody from "~/components/TaxSlab/TaxSlabTableBody";
import AddTaxSlabModal from "~/components/AddStaffPayroll/AddTaxSlabModal";
import { useSession } from "next-auth/react";
const multiFormData: MULTI_FORM_TYPES = {
  designationId:"",
  grossSalary:0,
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
  const { data: taxslabs } =api.tabSlab.getAllTaxSlab.useQuery();
  const [showTabSlabModal, setShowTabSlabModal] = useState(false);
 const [taxSlab,setTaxSlab]=useState({})
 const { data: sessionData,status } = useSession();

  

  const { mutate: createMutateTaxSlab } = api.tabSlab.createTaxSlab.useMutation({
    onSuccess: (response) => {
      setShowTabSlabModal(!showTabSlabModal)
    },
  });
  // useEffect(() => {
  //   if (id) {
  //     if (center && !hasCenterUseEffectRun.current) {
  //       setFormData(center);
  //       hasCenterUseEffectRun.current = true;
  //     }
  //   }
  // }, [id]);

  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.staffPayroll.createStaffPayroll.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
  
      return response?.id;
    },
  });
  
 

  // const { mutate: editMutate } = api.staffPayroll.editCenter.useMutation({
  //   onSuccess: (response) => {
  //     setOpenToast(true);
  //     void router.push(`/centers/${response?.id ?? ""}`);
  //   },
  // });



  const finalFormSubmissionHandler = async (
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    if (formData.isEditMode) {
      // editMutate({
      //   ...finalForm,
   
      // });
    } else {
      setFormData({
        ...finalForm
      });
      createMutate({
        ...finalForm,
      });
    }
  };


  const submitTaxSlab=(e)=>{
    e.preventDefault()
    createMutateTaxSlab({
          fromAmount:parseInt(taxSlab?.fromAmount),
          toAmount:parseInt(taxSlab?.toAmount),
          percentage:parseInt(taxSlab?.percentage),
          createdBy:sessionData?.token?.id
        });
  }
  return (
    <>
     {showTabSlabModal && (
        <AddTaxSlabModal
          show={showTabSlabModal}
          setShow={setShowTabSlabModal}
          setTaxSlab={setTaxSlab}
          taxSlab={taxSlab}
          submitTaxSlab={submitTaxSlab}
        />
      )}
    <FormContext.Provider value={formProviderData}>
      <div className="grid grid-cols-6 grid-rows-1">
        <Card className="col-span-8 ml-10 h-full p-0 pl-10 pt-10">
          <AddPayroll taxslabs={taxslabs}/>
        </Card>
        <Card className="col-span-8 bg-gray-100">
          <div className="mb-10 font-bold">Taxable Salary Slabs</div>
          <Table
          tableHeader={TaxSlabTableHeader()}
          tableBody={TaxSlabTableBody(
            taxslabs
          )}
        />
         <div>
            <Button
              className="ml-3 bg-pink-700 p-2 text-white"
              onClick={() => setShowTabSlabModal(!showTabSlabModal)}
            >
              Add Slab
            </Button>
          </div>
        </Card>
      </div>
    </FormContext.Provider>
    </>
  );
}
