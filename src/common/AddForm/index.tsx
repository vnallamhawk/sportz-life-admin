import React, { useEffect, useContext, useState, useRef } from "react";

import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Textbox from "~/components/Textbox";
import Timepicker from "~/components/TimePicker/TimePickerWrapper";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import Plus from "../../images/plus.svg";
import { Switch } from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Button from "~/components/Button";
import { Textarea } from "flowbite-react";

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
  finalFormSubmissionHandler,
  tableFields,
  addTableButtonText,
  addTableButton,
  onRemoveTableButton,
  isFormTable=false
}) => {
  let inputElement;
  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<any>({ mode: "onSubmit" });

  const [currentTableData, setCurrentTableData] = useState({});

  const nextClickHandler = async () => {
    const result = await trigger();
    if (result) {
      const currentFormValues = getValues();
      let obj = { ...formData, ...currentFormValues };
      if (buttonItems?.prevNext) {
        obj[tablekey] = tableData;
      }
      setFormData && setFormData(obj);
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  };

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const handleChangeCurrentData = (name, data,value) => {
    let obj = { ...currentTableData };
    if(data && Object.keys(data).length>0){
      obj[name] = data?.value;
      obj['name'] = data?.label;
    }else{
      obj[name]=value

    }
   
    setCurrentTableData(obj);
  };

  const submitCallback = () => {
    const finalFormData = {
      ...formData,
    };
    if (tablekey) {
      finalFormData[tablekey] = tableData;
    }
    finalFormSubmissionHandler(finalFormData);
  };

  const handleChangeTime = (value, name) => {
    let obj = { ...formData };
    obj[name] = value;
    setFormData(obj);
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
      case "switch":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Switch
                  value={value}
                  onChange={(value) =>
                    handleChangeTime(e.target.checked, "taxable")
                  }
                />
              );
            }}
            name={id}
            rules={rules}
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
                  value={formData[id] ? formData[id] : "10:00"}
                  className="h-12"
                  onChangeHandler={(value) => handleChangeTime(value, id)}
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
      case "textarea":
        inputElement = (
          <Controller
            control={control}
            name={id}
            render={({ field: { onChange, value } }) => (
              <Textarea
                className="h-12 w-full"
                placeholder={props.label}
                onChange={onChange}
                value={value as string}
              />
            )}
            rules={rules}
            {...(pattern ? { pattern } : {})}
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
      {cardTitle && <CardTitle title={cardTitle} />}
      {cardSubTitle && (
        <div className=" text-center font-heading text-3xl font-medium uppercase lg:text-left">
          {cardSubTitle}
        </div>
      )}
      {formConstantValues && formConstantValues.length > 0 && (
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
      )}
      {imageTitle && (
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
      )}

      {tableData && TableHeadings && (
        <div className="mt-10">
          <div className="mb-2 text-center font-heading text-2xl font-medium uppercase lg:text-left">
            {tableTitle}
          </div>
          <div className="text-center text-gray-400 lg:text-left">
            {tableDescription}
          </div>
          {addTableButtonText && (
            <Button
              type="button"
              className="mx-3 bg-pink-600 hover:bg-pink-800"
              onClick={addTableButton}
            >
              {addTableButtonText}
            </Button>
          )}
          <div className="mt-4 flex flex-col items-start lg:flex-row">
            {tableFields?.map((item) => {
              return (
                <>
                  {item?.type === "textarea" ? (
                    <textarea
                      placeholder={item?.placeholder}
                      className="border-1 h-40 w-full grow rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0 lg:h-20"
                      value={currentTableData[item?.name]}
                      onChange={(e) => {
                        handleChangeCurrentData(item?.name,{}, e.target.value);
                      }}
                    />
                  ) : item?.type === "select" ? (
                    <Select
                      isMulti={item?.isMulti ?? false}
                      options={item?.options}
                      value={currentTableData[item?.name]}
                      placeholder={item?.placeholder}
                      className="w-full"
                      onChange={(element) =>
                        handleChangeCurrentData(item?.name, element,"")
                      }
                    />
                  ) : (
                    <input
                      className="w-10 text-gray-400"
                      value={currentTableData[item?.name]}
                      type={item?.type}
                      onChange={(e) => {
                        handleChangeCurrentData(item?.name,{},item?.type==="number"?parseInt(e.target.value):e.target.value);
                      }}
                    />
                  )}
                </>
              );
            })}
            <Button
              className="border-1 mx-3 hidden rounded-md border-blush-light px-8 py-3 font-medium text-blush-light hover:border-blush-dark hover:text-blush-dark lg:block"
              type="button"
              onClick={(e) => {
                addTableData(tableFields ? currentTableData:isFormTable?getValues(): e);
                setCurrentTableData({});
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
                              <span
                                className="border-y-2 border-gray-100 p-4 font-medium text-gray-400"
                                onClick={() => onRemoveTableButton(dataIndex)}
                              >
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
        </div>
      )}
      {buttonItems?.next && (
        <div className="bottom-8 right-0 lg:mr-10 mt-10 flex justify-end lg:absolute mb-10 lg:mb-0">
          <button
            className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            type="button"
            onClick={nextClickHandler}
          >
            Next
          </button>
        </div>
      )}
      {buttonItems?.prevNext && (
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
            onClick={nextClickHandler}
          >
            Next
          </Button>
        </div>
      )}

      {buttonItems?.prevFinish && (
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
