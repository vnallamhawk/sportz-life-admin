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

export default function AddPayroll() {
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

  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_DETAILS_CONSTANT
  );

  const { mutate: createMutate } = api.staffDesignation.createStaffDesignation.useMutation({
    onSuccess: (response) => {
      setShowDesignationModal(!showDesignationModal)
    },
  });
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
                    onChange(element);
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
                    onChange={onChange}
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
                onChangeHandler={onChange}
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

  const finalFormSubmissionHandler = async (
    finalForm: Required<MULTI_FORM_TYPES>
  ) => {
    // if (formData.isEditMode) {
    //   editMutate({
    //     ...finalForm,
    //   });
    // } else {
  
    //   setFormData({
    //     ...finalForm
    //   });
    //   createMutate({
    //     ...finalForm,
    //     createdBy:sessionData?.token?.id
    //   });
    // }
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
          onClick={finalFormSubmissionHandler}
        >
          Add Payroll
        </Button>
      </div>
    </>
  );
}
