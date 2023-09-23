import { createContext, useState, Dispatch } from 'react';

export const openCoachCreatedToast = createContext({
    openToast: false,
    setOpenToast: (set: boolean) : void => {/* do nothing */}
});
