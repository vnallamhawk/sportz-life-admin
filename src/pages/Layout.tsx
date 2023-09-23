import { useState } from 'react';
import SideNav from "../components/SideNav";
import { useSession } from "next-auth/react";
import { ToastContext } from "~/contexts/Contexts";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = useSession();
  const [ openToast, setOpenToast ] = useState(false);
  const toastValue = { openToast, setOpenToast }
  
  return (
    <div className="flex">
      {sessionData && <SideNav className="h-screen w-60 bg-gray-950" />}
      <main className="w-full">
        <ToastContext.Provider value={ toastValue }>
          {children}
        </ToastContext.Provider>
      </main>
    </div>
  );
}
