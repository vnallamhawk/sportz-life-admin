import { createContext } from "react";

export const ToastContext = createContext({
  openToast: false,
  // fix this TS error by setting up eslintrc properly
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOpenToast: (a: boolean): void => {
    return;
    /* do nothing */
  },
});
