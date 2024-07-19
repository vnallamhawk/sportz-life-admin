import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import { STAFF_DETAILS_CONSTANTS } from "~/constants/staffConstants";
import { STAFF_DETAILS_CONSTANTS_TYPES, STAFF_TYPES } from "~/types/staff";
import { Controller, useForm } from "react-hook-form";
import { FormContext } from "~/pages/staff/AddStaff/AddStaffMultiFormLayout";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import { api } from "~/utils/api";
import TimePicker from "react-time-picker";
import Select from "react-select";

const AddStaff = () => {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<STAFF_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);

  const router = useRouter();
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const { data: payroll } = api.staffPayroll.getAllPayroll.useQuery();
  const { data: designation } =
    api.staffDesignation.getAllDesignation.useQuery();
  const { data: centers } = api.center.getAllCenters.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_DETAILS_CONSTANTS
  );
  useEffect(() => {
    let updatedFormConstantValues=formConstantValues
    if (payroll?.length>0) {
       updatedFormConstantValues = formConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "payroll") {
            // console.log("payroll", payroll);
            return {
              ...formConstant,
              options: payroll.map(
                (payroll, index) => ({
                  label: payroll?.StaffDesignation?.designation,
                  value: payroll.id.toString(),
                })
              ),
            };
          } else {
            return formConstant;
          }
        }
      );
    }
    if (designation?.length>0) {
       updatedFormConstantValues = updatedFormConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "designation") {
            return {
              ...formConstant,
              options: designation.map(
                (desig: { designation: string; id: number }) => ({
                  label: desig.designation,
                  value: desig.id.toString(),
                })
              ),
            };
          } else {
            return formConstant;
          }
        }
      );
    }
       if (centers?.length>0) {
           updatedFormConstantValues = updatedFormConstantValues.map(
            (formConstant) => {
                // Todo staff center
              if (formConstant.id === "center") {
                return {
                  ...formConstant,
                  options: centers?.map(
                    (center: { name: string; id: number }) => ({
                      label: center.name,
                      value: center.id.toString(),
                    })
                  ),
                };
              }
              else {
                return formConstant;
              }
            }
          );
        }
    setFormConstantValues(updatedFormConstantValues);

  }, [formConstantValues, JSON.stringify(payroll),JSON.stringify(designation),JSON.stringify(centers)]);


  // useEffect(() => {
  //   // if (!isEditMode) {
  //   // eslint-disable-next-line no-console
  //   reset({
  //     ...currentFormValues,
  //     ...formData,
  //   });
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData]);

  const getInputElement = (props: STAFF_DETAILS_CONSTANTS_TYPES) => {
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
      default:
        inputElement = (
          <Controller
            control={control}
            name={id}
            render={({ field: { onChange, value } }) => (
              <Textbox
                className="h-12 w-full"
                placeHolder={props.label}
                onChangeHandler={onChange}
                // TODO: FIX THIS TS ERROR
                value={value as string}
              />
            )}
            rules={rules}
            {...(pattern ? { pattern } : {})}
          />
        );
    }

    return inputElement;
  };

  const nextClickHandler = async () => {
    const result = await trigger();
    if (result) {
      const currentFormValues = getValues();
      setFormData && setFormData({ ...formData, ...currentFormValues });
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };
  // console.log("akfhkjdsf", formConstantValues);
  return (
    <>
      <Card className="h-full">
        <header className="mb-3 flex justify-between p-2">
          <CardTitle title="ADD STAFFS" />
        </header>

        <CardTitle title="STAFF DETAILS" />

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
        <div className="mr-10 mt-10 flex justify-end">
          <Button
            className="border-1 mx-3 bg-pink-600 text-white hover:bg-pink-800"
            type="button"
            onClick={() => void nextClickHandler()}
          >
            Next
          </Button>
        </div>

        {/* <Table
          tableHeader={InventoryTableHeader()}
          tableBody={InventoryTableBody([], handleIsLoading)}
        /> */}
        {/* {loading ? <LoadingSpinner /> : ""} */}
      </Card>
    </>
  );
};

export default AddStaff;
