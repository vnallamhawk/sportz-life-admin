import classNames from "classnames";
import { type ChangeEvent } from "react";

interface Textbox {
  className?: string;
  onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.FormEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  value?: string | number;
  // setValue?: (value: string | number) => void;
  setValue?: (value: any) => void;
  type?: string;
}

export default function Textbox({
  className = "",
  placeHolder,
  onChangeHandler,
  onClick,
  value,
  setValue,
  type = "text",
  ...rest
}: Textbox) {
  return (
    <input
      {...rest}
      className={classNames(
        "border-1 rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0",
        {
          [`${className}`]: className !== "",
        }
      )}
      placeholder={placeHolder}
      value={value}
      type={type}
      onClick={onClick}
      onChange={(e) => {
        if (setValue == undefined) {
          if (onChangeHandler != undefined) onChangeHandler(e);
          return;
        }
        e.target.value == value
          ? value
          : setValue(
              type === "number" ? parseInt(e.target.value) : e.target.value
            );
      }}
    />
  );
}
