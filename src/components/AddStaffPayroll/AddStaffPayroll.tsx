import React, { useEffect, useContext, useState, useRef } from "react";
import CardTitle from "~/components/Card/CardTitle";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox";
import {
  type COACH_TYPES,
  type COACH_DETAILS_CONSTANTS_TYPES,
  CENTER_TYPES,
} from "~/types/coach";
import { FormContext } from "~/pages/staffPayroll/AddPayroll/AddPayrollForm";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import { api } from "~/utils/api";
import Select from "react-select";
import { STAFF_DETAILS_CONSTANT } from "~/constants/staffPayrollConstants";
import { useRouter } from "next/router";
import { Switch } from "@material-tailwind/react";
import AddDesignationModal from "./AddDesignationModal";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";

export default function AddPayroll(props) {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  const router=useRouter()

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CENTER_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const [showDesignationModal, setShowDesignationModal] = useState(false);
 const [designation,setDesignation]=useState({})
 const { data: sessionData,status } = useSession();
 const { data: staffDesignation } =api.staffDesignation.getAllDesignation.useQuery();
 const [designations,setDesignations]=useState([])

  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_DETAILS_CONSTANT
  );

  const { mutate: createMutate } = api.staffDesignation.createStaffDesignation.useMutation({
    onSuccess: (response) => {
      setShowDesignationModal(!showDesignationModal)
    },
  });

  useEffect(()=>{
    if(staffDesignation && staffDesignation.length>0){
      setDesignations(staffDesignation)
    }

  },[staffDesignation])
  
  useEffect(() => {
    if (designations?.length && hasExecuted.current) {
      const updatedFormConstantValues = formConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "designationId") {
            return {
              ...formConstant,
              options: designations.map((designation: { designation: string; id: number }) => ({
                label: designation.designation,
                value: designation.id.toString(),
              })),
            };
          } else {
            return formConstant;
          }
        }
      );
      hasExecuted.current = false;
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, designations, designations?.length]);

  useEffect(()=>{
    if(formData && formData?.taxable){
      let obj={...formData}
      obj.taxable=formData?.taxable
      if(formData?.taxable && obj.grossSalary){
        const tax=props?.taxslabs?.find((item)=>obj.grossSalary>=item?.fromAmount && obj.grossSalary<=item?.toAmount)
        if(tax){
          obj.tax_percent=tax.percentage
          obj.tax=(tax.percentage*obj.grossSalary)/100
          obj.netSalary=obj.grossSalary-obj.tax
          obj.slabId=tax.id
        }
        setFormData(obj)
      }
    }

  },[formData])


  const submitDesignation=(e)=>{
    e.preventDefault()
    createMutate({
          ...designation,
          createdBy:sessionData?.token?.id
        });
  }

  return (
    <>
      {showDesignationModal && (
        <AddDesignationModal
          show={showDesignationModal}
          setShow={setShowDesignationModal}
          setDesignation={setDesignation}
          submitDesignation={submitDesignation}
          designation={designation}
        />
      )}
       <AddForm
        cardTitle="ADD PAYROLL"
        cardSubTitle="PAYROLL DETAILS"
        formConstantValues={formConstantValues}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          className="mx-3 bg-pink-600 hover:bg-pink-800"
          onClick={()=>setShowDesignationModal(!showDesignationModal)}
        >
          Add New Designation
        </Button>
        <Button
          type="button"
          className="mx-3 bg-pink-600 hover:bg-pink-800"
          onClick={(e)=>props?.finalFormSubmissionHandler(formData)}
        >
          Add Payroll
        </Button>
      </div>
    </>
  );
}
