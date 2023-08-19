import classNames from "classnames";
import React from "react";

type Props = React.ComponentProps<"button">;

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className = "", ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "rounded-md px-4 py-2 text-white hover:bg-gray-50 dark:text-white dark:hover:bg-pink-900",
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
