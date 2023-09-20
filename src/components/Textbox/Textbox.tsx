import classNames from "classnames";

interface Textbox {
  className?: string;
  onChangeHandler?: () => void;
  onClick?: (e: React.FormEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  value: string;
  setValue: (value: string) => void;
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
      className={classNames("rounded-lg border-2 border-solid pl-3", {
        [`${className}`]: className !== "",
      })}
      placeholder={placeHolder}
      value={value}
      type="text"
      onClick={onClick}
      onChange={ e => {
        e.target.value == value ? value : setValue(e.target.value);
      }}
    />
  );
}
