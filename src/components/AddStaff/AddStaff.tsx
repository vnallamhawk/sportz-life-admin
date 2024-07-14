import React, { useContext, useRef, useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Select from "../Select";
import { STAFF_DETAILS_CONSTANTS } from "~/constants/staffConstants";
import { STAFF_DETAILS_CONSTANTS_TYPES, STAFF_TYPES } from "~/types/staff";
import { Controller, useForm } from "react-hook-form";
import { FormContext } from "~/pages/staff/AddStaff/AddStaffMultiFormLayout";
import DatePicker from "../../components/DatePicker/DatePicker";
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
    // const { data: sports } = api.sports.getAllSports.useQuery();
  };
  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_DETAILS_CONSTANTS
  );
  // useEffect(() => {
  //   if (sports?.length && hasExecuted.current) {
  //     const updatedFormConstantValues = formConstantValues.map(
  //       (formConstant) => {
  //         if (formConstant.id === "coachingSports") {
  //           return {
  //             ...formConstant,
  //             options: sports.map((sport: { name: string; id: number }) => ({
  //               label: sport.name,
  //               value: sport.id.toString(),
  //             })),
  //           };
  //         } else {
  //           return formConstant;
  //         }
  //       }
  //     );
  //     hasExecuted.current = false;
  //     setFormConstantValues(updatedFormConstantValues);
  //   }
  // }, [formConstantValues, sports, sports?.length]);

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
                <DatePicker
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
