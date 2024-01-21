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
        "inline-flex h-[47px] w-[396px] items-center justify-end gap-[234px] rounded-lg border-2 border-zinc-100 bg-white pb-4 pl-[18px] pr-3.5 pt-[15px]",
        {
          [`${className}`]: className !== "",
        }
      )} //Changed the global searchbox design (for Card component) according to the figma design
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
