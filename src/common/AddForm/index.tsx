import React, { useEffect, useContext, useState, useRef } from "react";

import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Textbox from "~/components/Textbox";
import Timepicker from "~/components/TimePicker/TimePickerWrapper";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import Plus from "../../images/plus.svg";

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "~/components/Button";

const AddForm = ({
  cardTitle,
  cardSubTitle,
  formConstantValues,
  imageTitle,
  tableTitle,
  tableDescription,
  mobileAddButtonText,
  TableHeadings,
  tableData,
  addTableData,
  tablekey,
  buttonItems,
  setFormData,
  formData,
  setCurrentStep,
  currentStep,
  finalFormSubmissionHandler
}) => {
  let inputElement;
  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<any>({ mode: "onSubmit" });

  const [currentTableData,setCurrentTableData]=useState({})

  const nextClickHandler = async () => {
    const result = await trigger();
    if (result) {
      const currentFormValues = getValues();
      setFormData && setFormData({ ...formData, ...currentFormValues });
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const handleChangeCurrentData=(name,value)=>{
    let obj={...currentTableData}
    obj[name]=value
    setCurrentTableData(obj)
  }

  const submitCallback = () => {
    const finalFormData = {
      ...formData,
    };
    if(tablekey){
        finalFormData[tablekey]=tableData
    }
   finalFormSubmissionHandler(finalFormData);
  };

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
                  className="border-1 c-select w-full border-gray-300"
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
      case "time":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Timepicker
                  placeHolder={props.placeHolder}
                  value={
                    currentBatchDetail[id] ? currentBatchDetail[id] : "10:00"
                  }
                  className="h-12"
                  onChangeHandler={(value) => handleChangeBatch(value, id)}
                />
              );
            }}
            name={id}
            rules={rules}
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

  return (
    <>
      <CardTitle title={cardTitle} />
      <div className=" text-center font-heading text-3xl font-medium uppercase lg:text-left">
    {cardSubTitle}
      </div>
      <div className="grid-col-1 mt-8 grid gap-x-8 gap-y-4 lg:grid-cols-2 lg:gap-y-8 ">
        {formConstantValues.map((formValues) => (
          <div key={formValues.id}>
            {getInputElement(formValues)}

            <span className="text-red-800">
              {errors[formValues.id]?.type === "required" && (
                <div>This field is required</div>
              )}
              {errors[formValues.id]?.type === "pattern" && (
                <div> This field is not matching the pattern</div>
              )}
              {errors[formValues.id]?.type === "maxLength" && (
                <div>{`This field is exceeding the max. character limit`}</div>
              )}
            </span>
          </div>
        ))}
      </div>
      <label className="col-span-2 mt-5 flex h-48 flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 bg-stone-100 text-center lg:hidden">
        <div className="mb-3 flex items-center justify-center">
          <input type="file" className="hidden" />
          <div className="text-base font-medium text-gray-500">
            {imageTitle}
          </div>
        </div>
        <div className="text-sm text-gray-300">
          The file size not more than 10 MB.
        </div>
        <div className="text-sm text-gray-300">JPEG, PNG, Video</div>
      </label>

     {tableData &&  TableHeadings && <div className="mt-10">
        <div className="mb-2 text-center font-heading text-2xl font-medium uppercase lg:text-left">
          {tableTitle}
        </div>
        <div className="text-center text-gray-400 lg:text-left">
          {tableDescription}
        </div>
        <div className="mt-4 flex flex-col items-start lg:flex-row">
          <textarea
            placeholder="Medical Pre-History 1"
            className="border-1 h-40 w-full grow rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0 lg:h-20"
            value={currentTableData?.medicalHistory}
            onChange={(e)=>{
                handleChangeCurrentData("medicalHistory",e.target.value)
            }}
          />
          <Button
            className="border-1 mx-3 hidden rounded-md border-blush-light px-8 py-3 font-medium text-blush-light hover:border-blush-dark hover:text-blush-dark lg:block"
            type="button"
            onClick={()=>{
                addTableData(currentTableData)
                setCurrentTableData({})
            }}
          >
            Add
          </Button>
          <button className="mt-5 flex items-center lg:hidden">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black p-3">
              <Image src={Plus} className="" alt="" />
            </div>
            <div className="ml-3">{mobileAddButtonText}</div>
          </button>
        </div>
        <div className="scroll mt-5 hidden max-h-[370px] overflow-auto px-0 lg:block">
          <table className="common-table w-full min-w-max table-auto  border-separate border-spacing-y-3 text-left">
            <thead>
              <tr>
                {TableHeadings?.map((head, index) => {
                  return (
                    <th
                      className="w-20 pl-7 font-medium text-gray-400"
                      key={index}
                    >
                      {head.label}
                    </th>
                  );
                })}

              </tr>
            </thead>
            <tbody>
              {tableData?.map((data, dataIndex) => {
                return (
                  <tr key={dataIndex}>
                    {TableHeadings?.map((head, headIndex) => {
                      return (
                        <td key={headIndex}>
                          {head?.id !== "action" ? (
                            <span className="border-y-2 border-gray-100 p-4">
                              {data[head?.id]}
                            </span>
                          ) : (
                            <span className="border-y-2 border-gray-100 p-4 font-medium text-gray-400">
                              Remove
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>}
      {buttonItems?.next && (
        <div className="bottom-8 right-0 mr-10 mt-10 flex justify-end lg:absolute">
          <button
            className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            type="button"
            onClick={nextClickHandler}
          >
            Next
          </button>
        </div>
      )}

      {buttonItems?.prev && buttonItems?.finish && (
        <div className="bottom-8 right-0 mr-10 mt-10 flex justify-end lg:absolute">
          <Button
            type="button"
            className="mx-3 bg-pink-600 hover:bg-pink-800"
            onClick={prevClickHandler}
          >
            Prev
          </Button>
          <Button
            type="button"
            className="mx-3 bg-pink-600 hover:bg-pink-800"
            onClick={submitCallback}
          >
            Finish
          </Button>
        </div>
      )}
    </>
  );
};

export default AddForm;
