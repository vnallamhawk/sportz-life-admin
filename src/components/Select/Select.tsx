import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";
import Button from "../Button/Button";
import classNames from "classnames";

interface Options {
  label: string;
  value?: string | number;
  id: string | number;
}

const Select = ({
  className = "",
  options,
  placeholder,
  defaultValue,
  value,
  onChangeHandler,
  ...rest
}: {
  value?: string;
  className?: string;
  options: Options[];
  placeholder?: string;
  defaultValue?: string;
  onChangeHandler?: (value: string) => void;
}) => {
  console.log(placeholder);
  // const onChangeHandler1 = (label) => {
  //   if (Array.isArray(options)) {
  //     const value = options?.find(
  //       (option) => option.label.toLowerCase() === label.toLowerCase()
  //     ).value;
  //     onChangeHandler && onChangeHandler(value);
  //   }
  // };
  return (
    <SelectPrimitive.Root
      value={
        value === "" || value === undefined || value === null
          ? undefined
          : value
      }
      defaultValue={defaultValue}
      onValueChange={onChangeHandler}
      {...rest}
    >
      <SelectPrimitive.Trigger asChild>
        <Button
          className={classNames("", {
            [`${className}`]: className !== "",
          })}
        >
          <div className="flex w-full justify-start">
            <SelectPrimitive.Value
              className="flex-start flex"
              placeholder={placeholder}
            />
          </div>
          <SelectPrimitive.Icon className="ml-2">
            <div>
              <ChevronDownIcon />
            </div>
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-700">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="w-200 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-100">
          <SelectPrimitive.Group>
            {options?.map(({ label, value }, index) => (
              <SelectPrimitive.Item
                key={`${label}-${index}`}
                value={value ? value.toString() : ""}
                className="w-200 radix-disabled:opacity-50 relative flex rounded-md px-8 py-2 text-sm font-medium text-gray-700 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:focus:bg-gray-900"
              >
                <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Select;
