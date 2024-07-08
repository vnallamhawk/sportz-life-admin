import { useState } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { ToastContext } from "~/contexts/Contexts";
import {usePathname} from 'next/navigation';


export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = useSession();
  const [openToast, setOpenToast] = useState(false);
  const toastValue = { openToast, setOpenToast };
  const pathname = usePathname();

  return (
    <>
    {/* <Header /> */}
    <div className="flex">
      {/* {sessionData && ( */}
        <SideNav className="min-h-screen flex-none bg-gray-950" />
      {/* )} */}
      {/* bg-s-gray */}
      <main className="w-full flex-auto ">
        <ToastContext.Provider value={toastValue}>
          {children}
        </ToastContext.Provider>
      </main>
    </div>
    {/* <Footer /> */}
    </>
  );
}
