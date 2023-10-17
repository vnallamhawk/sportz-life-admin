import classNames from "classnames";
import { type ChangeEvent, type BaseSyntheticEvent } from "react";

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
      className={classNames(
        "rounded-lg border-2 border-zinc-200 pl-3 outline-none focus:border-zinc-500",
        {
          [`${className}`]: className !== "",
        }
      )}
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
