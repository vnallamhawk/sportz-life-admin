import classNames from "classnames";
import React from "react";

type Props = React.ComponentProps<"button">;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className = "", ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
        "bg-white text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900",
        "hover:bg-gray-50",
        "rounded",
        "border-2 border-solid",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        // Register all radix states
        "group",
        "radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900",
        "radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900",
        "radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50",

        { [`${className}`]: className !== "" }
      )}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
