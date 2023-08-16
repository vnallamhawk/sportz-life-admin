import classNames from "classnames";

interface Textbox {
  className?: string;
  onChangeHandler?: () => void;
  onClick?: () => void;
  placeHolder?: string;
  value: string | number;
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
      className={classNames("rounded border-2 border-solid", {
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
