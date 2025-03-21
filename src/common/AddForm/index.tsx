import React, { useEffect, useState, useCallback } from "react";

import Datepicker from "~/components/DatePicker/DatePickerWrapper";
import Textbox from "~/components/Textbox";
import Timepicker from "~/components/TimePicker/TimePickerWrapper";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import Plus from "../../images/plus.svg";
import Remove from "../../images/remove.svg";
import { Switch } from "@material-tailwind/react";
import AddFile from "../../images/add-file.svg";
import { Controller, useForm } from "react-hook-form";
// import type { ActionMeta, MultiValue, SingleValue } from "react-select";
import Select from "react-select";
import Button from "~/components/Button";
import { Dropdown, Textarea } from "flowbite-react";
import type { FormValues, TableFields } from "~/types/common";

interface AddForm {
  cardTitle?: string;
  cardSubTitle?: string;
  formConstantValues?: FormValues[];
  imageTitle?: string;
  tableTitle?: string;
  tableDescription?: string;
  mobileAddButtonText?: string;
  TableHeadings?: { label: string; id: string }[];
  addTableData?: any;
  tableData?: { [key: string]: any }[];
  tablekey?: string;
  buttonItems?: {
    prevNext?: boolean;
    prevFinish?: boolean;
    next?: boolean;
    finish?: boolean;
  };
  setFormData: any;
  formData: any;
  setCurrentStep: any;
  currentStep: number;
  finalFormSubmissionHandler?: any;
  tableFields?: TableFields[];
  addTableButtonText?: string;
  addTableButton?: any;
  onRemoveTableButton?: any;
  isFormTable?: boolean;
  prevButtonText?: string;
  finishButtonText?: string;
  prevButtonClick?: any;
  dependentKey?: string;
  setDependentKey?: any;
  dependentKey1?: string;
  setDependentKey1?: any;
  onDropCallback?: (files: Array<File>) => void;
  uploadUrl?: string;
}
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
  // dependentKey,
  // setDependentKey,
  // dependentKey1,
  // setDependentKey1,
  onDropCallback,
  uploadUrl,
}: AddForm) => {
  let inputElement;
  const {
    control,
    getValues,
    trigger,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  } = useForm<any>({ mode: "onSubmit", values: formData });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [currentTableData, setCurrentTableData] = useState<{
    [key: string]: any;
  }>({});
  const [selectedPlaceholders, setSelectedPlaceholders] = useState<{
    [key: string]: string;
  }>({});

  const nextClickHandler = useCallback(async () => {
    const result = await trigger();
    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const currentFormValues = getValues();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const obj: any = { ...formData, ...currentFormValues };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((buttonItems?.prevNext || buttonItems?.next) && tablekey) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        tablekey && (obj[tablekey] = tableData);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setFormData && setFormData(obj);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setCurrentStep && setCurrentStep(currentStep + 1);
    }
  }, [
    buttonItems?.next,
    buttonItems?.prevNext,
    currentStep,
    formData,
    getValues,
    setCurrentStep,
    setFormData,
    tableData,
    tablekey,
    trigger,
  ]);

  useEffect(() => {
    if (buttonItems && Object.keys(buttonItems).length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const currentFormValues = getValues();
      const obj: unknown = { ...formData, ...currentFormValues };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setFormData && setFormData(obj);
    }
  }, [buttonItems, formData, getValues, nextClickHandler, setFormData]);

  const prevClickHandler = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const handleChangeCurrentData = (
    name: string,
    data: { label: string; value: string } | null,
    value: string | number,
    placeholder: string // Accept placeholder as a parameter
  ) => {
    const obj: { [key: string]: string | number } = { ...currentTableData };

    if (data && data?.label && data?.value) {
      obj["value"] = data.value;
      obj["name"] = data.label;

      // Update the placeholder dynamically
      setSelectedPlaceholders((prev) => ({
        ...prev,
        [name]: data.label,
      }));
    } else {
      obj[name] = value;

      // Reset placeholder using the passed placeholder value
      setSelectedPlaceholders((prev) => ({
        ...prev,
        [name]: placeholder,
      }));
    }

    setCurrentTableData(obj);
  };

  const submitCallback = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentFormValues = getValues();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const finalFormData = {
      ...formData,
      ...currentFormValues,
    };
    if (tablekey) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      finalFormData[tablekey] = tableData;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    finalFormSubmissionHandler(finalFormData);
  };

  const handleChangeTime = (
    value: string | boolean | unknown,
    name: string
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj: { [key: string]: string | boolean | unknown } = { ...formData };
    obj[name] = value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setFormData(obj);
  };

  const getInputElement = (props: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      rules,
      id,
      pattern,
      placeHolder,
      dropdownKey,
      dropdownLabel,
      options,
    } = props;

    switch (type) {
      case "select":
        inputElement = (
          <Controller
            control={control}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  isMulti={props?.isMulti ?? false}
                  // @ts-expect-error TODO ; fix this error
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  isDisabled={props.isDisabled}
                  options={options}
                  value={options?.filter((option) =>
                    Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value
                  )}
                  placeholder={placeHolder}
                  className="border-1 c-select w-full border-gray-300"
                  classNamePrefix="react-select"
                  onChange={(newValue) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const value = Array.isArray(newValue)
                      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
                        newValue.map((option) => option.value)
                      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        newValue?.value;
                    onChange(value);
                    if (id === "centerId") {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
                      setFormData((prevFormData: any) => ({
                        ...prevFormData,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        [id]: value,
                      }));
                    }
                  }}
                />
              );
            }}
          />
        );
        break;

      case "inputDropdown":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div className="relative">
                  <Textbox
                    className="h-12 w-full"
                    placeHolder={placeHolder}
                    onChangeHandler={onChange}
                    // TODO: FIX THIS TS ERROR
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
                    value={(formData[id] as string) || value}
                  />
                  <div className="dropdown absolute right-0.5 top-2/4 inline-flex h-12 -translate-y-2/4 items-center justify-center border-l p-3">
                    <Dropdown
                      label={dropdownLabel}
                      inline={true}
                      dismissOnClick={false}
                      className="text-black"
                    >
                      {dropdownKey &&
                        options?.map((item) => {
                          // eslint-disable-next-line react/jsx-key
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <Dropdown.Item
                              onClick={() =>
                                handleChangeTime(item.value, dropdownKey)
                              }
                            >
                              {item.label}
                            </Dropdown.Item>
                          );
                        })}
                    </Dropdown>
                  </div>
                </div>
              );
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
          />
        );
        break;
      case "switch":
        inputElement = (
          <Controller
            control={control}
            render={({ field: { value } }) => {
              return (
                <Switch
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  value={formData["taxable"] || value}
                  onChange={(e) =>
                    handleChangeTime(e.target.checked, "taxable")
                  }
                />
              );
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
          />
        );
        break;
      case "time":
        inputElement = (
          <Controller
            control={control}
            render={() => {
              return (
                <Timepicker
                  placeHolder={props.placeHolder}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  value={formData[id] ? formData[id] : "10:00"}
                  className="h-12 "
                  onChangeHandler={(value) => handleChangeTime(value, id)}
                />
              );
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  value={
                    value
                      ? new Date(value as string)
                      : // eslint-disable-next-line
                        new Date(formData[id] as string)
                  }
                  className="h-12"
                  onChangeHandler={onChange}
                />
              );
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                className="h-20 w-full"
                placeholder={placeHolder}
                onChange={onChange}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                value={value || formData[id]}
              />
            )}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
                placeHolder={placeHolder}
                onChangeHandler={onChange}
                // TODO: FIX THIS TS ERROR
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                value={value || formData[id]}
              />
            )}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        <div
          className={`grid-col-1 mt-8 grid gap-x-8 gap-y-4 lg:grid-cols-2
          lg:gap-y-8 `}
        >
          {formConstantValues?.map((formValues: FormValues) => (
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
            <input
              type="file"
              className="hidden"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (imageTitle && onDropCallback && e.target.files) {
                  const uploadedFile: File | null | undefined =
                    e.target.files.length > 0 ? e.target.files[0] : null;
                  if (uploadedFile) {
                    onDropCallback([uploadedFile]);
                  }
                }
              }}
            />
            <Image
              width={0}
              height={0}
              src={uploadUrl ? uploadUrl : AddFile}
              className="mr-2 h-auto w-auto"
              alt=""
            />
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
          <div className="hidden text-lg font-medium text-gray-400 lg:block">
            {tableDescription}
          </div>
          <div className="mb-10 flex items-center justify-between">
            <div className="text-center font-heading text-3xl font-medium uppercase lg:text-left">
              {tableTitle}
            </div>

            {addTableButtonText && (
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-[#F3476D] px-4 py-2 text-center text-white"
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                onClick={addTableButton}
              >
                {addTableButtonText}
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-col items-start lg:flex-row">
            {tableFields &&
              tableFields.length > 0 &&
              tableFields?.map((item: TableFields) => {
                return (
                  <>
                    {item?.type === "textarea" ? (
                      <textarea
                        placeholder={item?.placeholder}
                        className="border-1 h-12 w-full grow rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0 lg:h-20"
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        value={currentTableData[item?.name]}
                        onChange={(e) => {
                          handleChangeCurrentData(
                            item?.name,
                            { label: "", value: "" },
                            e.target.value,
                            item?.placeholder ?? "" // Pass placeholder as the fourth argument
                          );
                        }}
                      />
                    ) : item?.type === "select" ? (
                      <Select
                        isMulti={item?.isMulti ?? false}
                        options={item?.options}
                        // eslint-disable-next-line
                        value={currentTableData[item?.name]}
                        placeholder={
                          selectedPlaceholders[item?.name] || item?.placeholder
                        }
                        className="border-1 c-select h-12 w-full border-gray-300"
                        classNamePrefix="react-select"
                        onChange={(element) =>
                          handleChangeCurrentData(
                            item?.name,
                            // eslint-disable-next-line
                            element,
                            "",
                            item?.placeholder ?? ""
                          )
                        }
                      />
                    ) : (
                      <div className="relative mt-3 lg:mt-0">
                        <input
                          className="w-34 h-12 rounded-lg border border-gray-300 p-2 pr-9 text-center focus:border-gray-600 focus:outline-none focus:ring-0 lg:ml-7 lg:w-20"
                          // eslint-disable-next-line
                          value={currentTableData[item?.name]}
                          onChange={(e) => {
                            handleChangeCurrentData(
                              item?.name,
                              { label: "", value: "" },
                              item?.type === "number"
                                ? parseInt(e.target.value)
                                : e.target.value,
                              item?.placeholder ?? "" // Pass placeholder as the fourth argument
                            );
                          }}
                        />
                        <span className="absolute right-3 top-3.5 text-sm text-gray-400">
                          Qty
                        </span>
                      </div>
                    )}
                  </>
                );
              })}
            <Button
              className="border-1 ml-7 hidden rounded-md border-blush-light px-8 py-3 text-lg font-bold text-[#FF9678] hover:border-blush-dark hover:text-blush-dark lg:block"
              type="button"
              onClick={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                addTableData(
                  tableFields ? currentTableData : isFormTable ? getValues() : e
                );
                setCurrentTableData({});
              }}
            >
              Add
            </Button>

            <button className="mt-5 flex items-center lg:hidden">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black p-3">
                <Image
                  width={0}
                  height={0}
                  src={Plus}
                  className="h-auto w-auto"
                  alt=""
                />
              </div>
              <div className="ml-3">{mobileAddButtonText}</div>
            </button>
          </div>
          <div className="scroll mt-5 hidden max-h-[370px] overflow-auto px-0 lg:block">
            <table className="common-table w-full table-fixed border-separate border-spacing-y-2 text-left">
              <thead>
                <tr>
                  {TableHeadings?.map((head, index) => (
                    <th
                      key={index}
                      className="pl-7 font-medium text-gray-400"
                      style={{ minWidth: "150px", wordBreak: "break-word" }} // Prevents text overflow
                    >
                      {head.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData?.length > 0 &&
                  tableData.map((data, dataIndex) => (
                    <tr key={dataIndex} className="border-b border-gray-100">
                      {TableHeadings.map((head, headIndex) => (
                        <td
                          key={headIndex}
                          className="border-gray-100 p-4"
                          style={{ minWidth: "150px", wordBreak: "break-word" }} // Ensures text wraps properly
                        >
                          {head.id !== "action" ? (
                            <span>{data[head.id]}</span>
                          ) : (
                            <span
                              className="cursor-pointer font-medium text-gray-400 hover:text-red-500"
                              // eslint-disable-next-line
                              onClick={() => onRemoveTableButton(dataIndex)}
                            >
                              Remove
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* mobile view ------------------*/}
          <div className="invent-mobile relative mt-10 rounded-t-[40px] bg-[#FFE5DE] px-5 py-10 lg:hidden">
            <CardTitle title="INVENTORIES" />
            <div className="max-h-[345px] overflow-auto">
              <div className="mb-3 flex justify-between rounded-lg bg-white p-3">
                <div>
                  <div className="text-base font-bold">Wristle</div>
                  <div className="text-base">10 Pieces</div>
                </div>
                <button>
                  <Image
                    width={0}
                    height={0}
                    src={Remove}
                    className="h-auto w-auto"
                    alt=""
                  />
                </button>
              </div>
              <div className="mb-3 flex justify-between rounded-lg bg-white p-3">
                <div>
                  <div className="text-base font-bold">Wristle</div>
                  <div className="text-base">10 Pieces</div>
                </div>
                <button>
                  <Image
                    width={0}
                    height={0}
                    src={Remove}
                    className="h-auto w-auto"
                    alt=""
                  />
                </button>
              </div>
              <div className="mb-3 flex justify-between rounded-lg bg-white p-3">
                <div>
                  <div className="text-base font-bold">Wristle</div>
                  <div className="text-base">10 Pieces</div>
                </div>
                <button>
                  <Image
                    width={0}
                    height={0}
                    src={Remove}
                    className="h-auto w-auto"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {buttonItems?.next && (
        <div className="bottom-8 right-0 mb-10 mt-10 flex justify-end lg:absolute lg:mb-0 lg:mr-10">
          <button
            className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={nextClickHandler}
          >
            Next
          </button>
        </div>
      )}
      {buttonItems?.prevNext && (
        <div className="absolute bottom-8 left-0 right-0 mx-10 mt-10 flex justify-end">
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
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={nextClickHandler}
          >
            Next
          </Button>
        </div>
      )}

      {buttonItems?.prevFinish && (
        <div className="absolute bottom-8 left-0 right-0 mx-10 mt-10 flex justify-end">
          <Button
            type="button"
            className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      {buttonItems?.finish && (
        <div className="absolute bottom-8 left-0 right-0 mx-10 mt-10 flex justify-end">
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
