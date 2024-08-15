import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

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
  buttonItems?: { prevNext?: boolean; prevFinish?: boolean; next?: boolean };
  setFormData: any;
  formData: any;
  setCurrentStep: any;
  currentStep: number;
  finalFormSubmissionHandler?: any;
  // tableFields?: any;
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
  dependentKey,
  setDependentKey,
  dependentKey1,
  setDependentKey1,
}: AddForm) => {
  let inputElement;
  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<any>({ mode: "onSubmit" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [currentTableData, setCurrentTableData] = useState<{
    [key: string]: any;
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
    data: { label: string; value: string },
    value: string | number
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj: { [key: string]: string | number } = { ...currentTableData };
    if (data && Object.keys(data).length > 0 && data?.label && data?.value) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      obj[name] = data?.value;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      obj["name"] = data?.label;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      obj[name] = value;
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
                  options={options}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value={value}
                  placeholder={placeHolder}
                  className="border-1 c-select w-full border-gray-300"
                  classNamePrefix="react-select"
                  onChange={(element: {
                    value: string | { label: string; value: string | number };
                  }) => {
                    onChange(element);
                    if (dependentKey && dependentKey === id) {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                      setDependentKey(element?.value);
                    }
                    if (dependentKey1 && dependentKey1 === id) {
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                      setDependentKey1(element?.value);
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
                    value={value as string}
                  />
                  <div className="dropdown absolute right-0.5 top-2/4 -translate-y-2/4 p-3 h-12 border-l inline-flex justify-center items-center">
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
            render={({ field: { onChange, value } }) => {
              return (
                <Switch
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value={value}
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
            render={({ field: { onChange, value } }) => {
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
                  value={new Date(value as string)}
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
                value={value as string}
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
                value={value as string}
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
            <input type="file" className="hidden" />
            <Image
              width={0}
              height={0}
              src={AddFile}
              className="h-auto w-auto mr-2"
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
                            e.target.value
                          );
                        }}
                      />
                    ) : item?.type === "select" ? (
                      <Select
                        isMulti={item?.isMulti ?? false}
                        options={item?.options}
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        value={currentTableData[item?.name]}
                        placeholder={item?.placeholder}
                        className="border-1 c-select h-12 w-full border-gray-300"
                        classNamePrefix="react-select"
                        onChange={(element) =>
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          handleChangeCurrentData(item?.name, element, "")
                        }
                      />
                    ) : (
                      <div className="relative mt-3 lg:mt-0">
                        <input
                          className="w-34  h-12 rounded-lg border border-gray-300 p-2 pr-9 text-center focus:border-gray-600 focus:outline-none focus:ring-0 lg:ml-7 lg:w-20"
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                          value={currentTableData[item?.name]}
                          onChange={(e) => {
                            handleChangeCurrentData(
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                              item?.name,
                              { label: "", value: "" },
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                              item?.type === "number"
                                ? parseInt(e.target.value)
                                : e.target.value
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
            <table className="common-table w-full min-w-max table-auto  border-separate border-spacing-y-3 text-left">
              <thead>
                <tr>
                  {TableHeadings?.map(
                    (head: { label: string; id: string }, index: number) => {
                      return (
                        <th
                          className="w-20 pl-7 font-medium text-gray-400"
                          key={index}
                        >
                          {head.label}
                        </th>
                      );
                    }
                  )}
                </tr>
              </thead>
              <tbody>
                {tableData &&
                  tableData.length > 0 &&
                  tableData?.map(
                    (data: { [key: string]: any }, dataIndex: number) => {
                      return (
                        <tr key={dataIndex}>
                          {TableHeadings?.map(
                            (
                              head: { label: string; id: string },
                              headIndex: number
                            ) => {
                              return (
                                <td key={headIndex}>
                                  {head?.id !== "action" ? (
                                    <span className="border-y-2 border-gray-100 p-4">
                                      {data[head?.id]}
                                    </span>
                                  ) : (
                                    <span
                                      className="border-y-2 border-gray-100 p-4 font-medium text-gray-400"
                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                                      onClick={() =>
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                                        onRemoveTableButton(dataIndex)
                                      }
                                    >
                                      Remove
                                    </span>
                                  )}
                                </td>
                              );
                            }
                          )}
                        </tr>
                      );
                    }
                  )}
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
    </>
  );
};

export default AddForm;
