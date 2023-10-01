import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="m-auto flex h-full w-full items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}
