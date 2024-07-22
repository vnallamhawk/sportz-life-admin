import React, { useEffect, useContext, useState, useRef } from "react";

import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Textbox from "~/components/Textbox";
import Timepicker from "~/components/TimePicker/TimePickerWrapper";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import Plus from "../../images/plus.svg";
import Remove from "../../images/remove.svg"
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
  isFormTable = false,
  prevButtonText = "Prev",
  finishButtonText = "Finish",
  prevButtonClick,
  dependentKey,
  setDependentKey
}: any) => {
  let inputElement;
  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<any>({ mode: "onSubmit" });

  const [currentTableData, setCurrentTableData] = useState<any>({});

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

  const handleChangeCurrentData = (name: string, data: { label: string, value: string }, value: string | number) => {
    const obj: any = { ...currentTableData };
    if (data && Object.keys(data).length > 0 && data?.label && data?.value) {
      obj[name] = data?.value;
      obj['name'] = data?.label;
    } else {
      obj[name] = value

    }

    setCurrentTableData(obj);
  };

  const submitCallback = () => {
    const currentFormValues = getValues();

    const finalFormData = {
      ...formData,
      ...currentFormValues
    };
    if (tablekey) {
      finalFormData[tablekey] = tableData;
    }
    finalFormSubmissionHandler(finalFormData);
  };

  const handleChangeTime = (value: string | boolean, name: string) => {
    let obj: any = { ...formData };
    obj[name] = value;
    setFormData(obj);
  };

  const getInputElement = (props: any) => {
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
                    if (dependentKey && dependentKey === id) {
                      setDependentKey(element?.value)
                    }
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
                  onChange={(e) =>
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
          {formConstantValues?.map((formValues: any) => (
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
        <div className="">
          <div className="text-lg text-gray-400 lg:block hidden font-medium">
            {tableDescription}
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="text-center font-heading text-3xl font-medium uppercase lg:text-left">
              {tableTitle}
            </div>

            {addTableButtonText && (
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-[#F3476D] py-2 px-4 text-center text-white"
                onClick={addTableButton}
              >
                {addTableButtonText}
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-col items-start lg:flex-row">
            {tableFields?.map((item: any) => {
              return (
                <>
                  {item?.type === "textarea" ? (
                    <textarea
                      placeholder={item?.placeholder}
                      className="border-1 h-12 w-full grow rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0 lg:h-20"
                      value={currentTableData[item?.name]}
                      onChange={(e) => {
                        handleChangeCurrentData(item?.name, { label: "", value: "" }, e.target.value);
                      }}
                    />
                  ) : item?.type === "select" ? (
                    <Select
                      isMulti={item?.isMulti ?? false}
                      options={item?.options}
                      value={currentTableData[item?.name]}
                      placeholder={item?.placeholder}
                      className="border-1 c-select w-full border-gray-300 h-12"
                      classNamePrefix="react-select"
                      onChange={(element) =>
                        handleChangeCurrentData(item?.name, element, "")
                      }
                    />
                  ) : (
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        className="border  lg:ml-7 text-center h-12 pr-9 p-2 w-34 lg:w-20 rounded-lg border-gray-300 focus:border-gray-600 focus:outline-none focus:ring-0"
                        value={currentTableData[item?.name]}
                        onChange={(e) => {
                          handleChangeCurrentData(item?.name, { label: "", value: "" }, item?.type === "number" ? parseInt(e.target.value) : e.target.value);
                        }}
                      />
                      <span className="text-gray-400 absolute top-3.5 right-3 text-sm">Qty</span>
                    </div>

                  )}
                </>
              );
            })}
            <Button
              className="border-1 ml-7 hidden rounded-md border-blush-light px-8 py-3 font-bold text-lg text-[#FF9678] hover:border-blush-dark hover:text-blush-dark lg:block"
              type="button"
              onClick={(e) => {
                addTableData(tableFields ? currentTableData : isFormTable ? getValues() : e);
                setCurrentTableData({});
              }}
            >
              Add
            </Button>

            <button className="mt-5 flex items-center lg:hidden" >
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
                  {TableHeadings?.map((head: { label: string, id: string }, index: number) => {
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
                {tableData?.map((data: any, dataIndex: number) => {
                  return (
                    <tr key={dataIndex}>
                      {TableHeadings?.map((head: { label: string, id: string }, headIndex: number) => {
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
   {/* mobile view ------------------*/}
   <div className="bg-[#FFE5DE] rounded-t-[40px] py-10 px-5 lg:hidden mt-10 relative invent-mobile">
              <CardTitle title="INVENTORIES" />
              <div className="max-h-[345px] overflow-auto">
                <div className="flex justify-between bg-white rounded-lg p-3 mb-3">
                  <div>
                    <div className="text-base font-bold">Wristle</div>
                    <div className="text-base">10 Pieces</div>
                  </div>
                  <button><Image src={Remove} className="" alt="" /></button>
                </div>
                <div className="flex justify-between bg-white rounded-lg p-3 mb-3">
                  <div>
                    <div className="text-base font-bold">Wristle</div>
                    <div className="text-base">10 Pieces</div>
                  </div>
                  <button><Image src={Remove} className="" alt="" /></button>
                </div>
                <div className="flex justify-between bg-white rounded-lg p-3 mb-3">
                  <div>
                    <div className="text-base font-bold">Wristle</div>
                    <div className="text-base">10 Pieces</div>
                  </div>
                  <button><Image src={Remove} className="" alt="" /></button>
                </div>
              </div>
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
        <div className="bottom-8 left-0 right-0 mx-10 mt-10 flex justify-end absolute">
          <Button
            type="button"
            className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            onClick={prevClickHandler}
          >
            Prev
          </Button>
          <Button
            type="button"
            className="ml-3 w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            onClick={nextClickHandler}
          >
            Next
          </Button>
        </div>
      )}

      {buttonItems?.prevFinish && (
        <div className="bottom-8 left-0 right-0 mx-10 mt-10 flex justify-end absolute">
          <Button
            type="button"
            className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            onClick={prevButtonClick ? prevButtonClick : prevClickHandler}
          >
            {prevButtonText}
          </Button>
          <Button
            type="button"
            className="ml-3 w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            onClick={submitCallback}
          >
            {finishButtonText}
          </Button>
        </div>
      )}
    </>
  );
};

export default AddForm;
