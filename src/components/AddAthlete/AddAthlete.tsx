import React, { useEffect, useContext, useState, useRef } from "react";
import CardTitle from "~/components/Card/CardTitle";
import { COACH_DETAILS_CONSTANTS } from "~/constants/coachConstants";
import Textbox from "~/components/Textbox";
import {
  type COACH_TYPES,
  type COACH_DETAILS_CONSTANTS_TYPES,
} from "~/types/coach";
import { FormContext } from "~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import { api } from "~/utils/api";
import Select from "react-select";

export default function AddCoach() {
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
  } = useForm<COACH_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: sports } = api.sports.getAllSports.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    COACH_DETAILS_CONSTANTS
  );

  useEffect(() => {
    if (sports?.length && hasExecuted.current) {
      const updatedFormConstantValues = formConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "coachingSports") {
            return {
              ...formConstant,
              options: sports.map((sport: { name: string; id: number }) => ({
                label: sport.name,
                value: sport.id.toString(),
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
  }, [formConstantValues, sports, sports?.length]);

  useEffect(() => {
    // if (!isEditMode) {
    // eslint-disable-next-line no-console
    reset({
      ...currentFormValues,
      ...formData,
    });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  //test commit
  const getInputElement = (props: COACH_DETAILS_CONSTANTS_TYPES) => {
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
                  className="w-full border-1 border-gray-300 c-select"
                  classNamePrefix="react-select"
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

  return (
    <>

      <CardTitle title="ADD ATHLETE" />
      <div className=" font-medium uppercase text-3xl font-heading" >Athlete Personal Details</div>
      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8">
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
      <div className="mt-10">
        <div className="text-2xl mb-2 font-medium font-heading uppercase">Medical History</div>
        <div className="text-gray-400">Kindly list down if your child has any allergies, major injuries, chronic diseases, physical disabilities &
          Children with special needs (CWSN)</div>
        <div className="flex mt-4 items-start">
          <input type="text" className="grow h-20 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" />
          <Button
            className="border-1 mx-3 px-8 py-3 font-medium border-blush-light hover:border-blush-dark rounded-md text-blush-light hover:text-blush-dark"
            type="button"
          >
            Add
          </Button>
        </div>
        <div className="mt-5 max-h-[370px] overflow-auto px-0 scroll">
          <table className="table-fixed common-table w-full min-w-max  text-left border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="pl-7 w-20 text-gray-400 font-medium" >#</th>
                <th className="text-justify text-gray-400 font-medium">Medical History </th>
                <th className="w-32 text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-y-2 border-gray-100 w-20" >01</td>
                <td className="p-4 border-y-2 border-gray-100  text-justify">
                  <div>
                    Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.AAA
                  </div>
                </td>
                <td className="p-4 border-y-2 border-gray-100 w-32 text-gray-400 font-medium">
                Remove
                </td>
              </tr>
              <tr>
                <td className="p-4 border-y-2 border-gray-100 w-20" >01</td>
                <td className="p-4 border-y-2 border-gray-100  text-justify">
                  <div>
                    Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.AAA
                  </div>
                </td>
                <td className="p-4 border-y-2 border-gray-100 w-32 text-gray-400 font-medium">
                Remove
                </td>
              </tr>
              <tr>
                <td className="p-4 border-y-2 border-gray-100 w-20" >01</td>
                <td className="p-4 border-y-2 border-gray-100  text-justify">
                  <div>
                    Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.AAA
                  </div>
                </td>
                <td className="p-4 border-y-2 border-gray-100 w-32 text-gray-400 font-medium">
                Remove
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div className="mr-10 mt-10 flex justify-end absolute bottom-8 right-0">
          <Button
            className="!border-0 px-5 focus:ring-0 outline-0 bg-mandy-dark hover:bg-mandy-dark focus:outline-none focus:ring text-white"
            type="button"
            onClick={() => void nextClickHandler()}
          >
            Next
          </Button>
        </div>

      </>
      );
}
