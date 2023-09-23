import { createContext } from 'react';

export const ToastContext = createContext({
    openToast: false,
    setOpenToast: (set: boolean) : void => {/* do nothing */}
});
