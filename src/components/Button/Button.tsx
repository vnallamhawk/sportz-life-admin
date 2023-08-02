import React from "react";

export default function Button({
  className,
  text,
  ...props
}: {
  className: string;
  text: string;
}) {
  return (
    <button className={className} {...props}>
      <span className="text-white">{text}</span>
    </button>
  );
}
