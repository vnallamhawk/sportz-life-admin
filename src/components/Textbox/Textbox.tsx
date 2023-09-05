import classNames from "classnames";

interface Textbox {
  className?: string;
  onChangeHandler?: () => void;
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  value?: string;
}

export default function Textbox({
  className = "",
  placeHolder,
  onChangeHandler,
  onClick,
  value,
  ...rest
}: Textbox) {
  return (
    <input
      {...rest}
      className={classNames("rounded-lg border-2 border-solid pl-3", {
        [`${className}`]: className !== "",
      })}
      placeholder={placeHolder}
      value={value}
      type="text"
      onClick={onClick}
      onChange={onChangeHandler}
    />
  );
}
