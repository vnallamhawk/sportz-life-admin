import classNames from "classnames";
import { type ChangeEvent } from "react";

interface Textbox {
  className?: string;
  onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e?: React.FormEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  value?: string;
  setValue?: (value: string) => void;
}

export default function Textbox({
  className = "",
  placeHolder,
  onChangeHandler,
  onClick,
  value,
  setValue,
  ...rest
}: Textbox) {
  return (
    <input
      {...rest}
      className={classNames("rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600", {
        [`${className}`]: className !== "",
      })}
      placeholder={placeHolder}
      value={value}
      type="text"
      onClick={onClick}
      onChange={(e) => {
        if (setValue == undefined) {
          if (onChangeHandler != undefined) onChangeHandler(e);
          return;
        }
        e.target.value == value ? value : setValue(e.target.value);
      }}
    />
  );
}
