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

  const handleTaxable=(e)=>{
    const value=e.target.checked
    let obj={...formData}
    obj.taxable=value
    if(value && obj.grossSalary){
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

  const handleChangeFormData=(name,value)=>{
    let obj={...formData}
    obj[name]=value
      setFormData(obj)
    }
  
  //test commit
  const getInputElement = (props) => {
    const { type, rules, id, pattern, placeHolder } = props;
    switch (type) {
      case "select":
        const { options } = props;
        inputElement = (
          <Controller
            control={control}
            name={id}
            rules={rules}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  isMulti={props?.isMulti ?? false}
                  options={options}
                  value={value}
                  placeholder={placeHolder}
                  className="w-full"
                  onChange={(element) => {
                    handleChangeFormData(id,parseInt(element?.value));
                  }}
                />
              );
            }}
          />
        );
        break;
      case "calendar":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Datepicker
                  placeHolder={props.placeHolder}
                  value={new Date(value as string)}
                  className="h-12"
                  onChangeHandler={onChange}
                />
              );
            }}
            name={id}
            rules={rules}
          />
        );
        break;
        case "switch":
          inputElement = (
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Switch
                    value={value}
                    onChange={(value)=>handleTaxable(value)}
                  />
                );
              }}
              name={id}
              rules={rules}
            />
          );
          break;
      default:
        inputElement = (
          <Controller
            control={control}
            name={id}
            render={({ field: { onChange, value } }) => (
              <Textbox
                className="h-12 w-full"
                placeHolder={props.label}
                type={type==="number"?"number":"text"}
                onChangeHandler={(e)=>handleChangeFormData(id,parseInt(e.target.value))}
                // TODO: FIX THIS TS ERROR
                value={value as string|number}
              />
            )}
            rules={rules}
            {...(pattern ? { pattern } : {})}
          />
        );
    }

    return inputElement;
  };

 

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
      <CardTitle title="ADD PAYROLL" />
      <div className="text-lg font-bold">PAYROLL DETAILS</div>
      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-12">
        {formConstantValues.map((props) => (
          <div key={props.id}>
            {getInputElement(props)}

            <span className="text-red-800">
              {errors[props.id]?.type === "required" && (
                <div>This field is required</div>
              )}
              {errors[props.id]?.type === "pattern" && (
                <div> This field is not matching the pattern</div>
              )}
              {errors[props.id]?.type === "maxLength" && (
                <div>{`This field is exceeding the max. character limit`}</div>
              )}
            </span>
          </div>
        ))}
      </div>
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