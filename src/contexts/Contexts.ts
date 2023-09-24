import { createContext } from "react";

export const ToastContext = createContext({
  openToast: false,
  setOpenToast: (a: boolean): void => {
    console.log(a);
    /* do nothing */
  },
});
