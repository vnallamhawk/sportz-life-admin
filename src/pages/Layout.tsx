import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { ToastContext } from "~/contexts/Contexts";
import {usePathname} from 'next/navigation';
import { useRouter } from "next/router";


export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = useSession();
  const [openToast, setOpenToast] = useState(false);
  const toastValue = { openToast, setOpenToast };
  const pathname = usePathname();
  const router=useRouter()

  // useEffect(()=>{
  //   if(!sessionData){
  //     router.push("/")
  //   }
  // },[sessionData,router])
  return (
    <>
    {/* <Header /> */}
    <div className="flex">
      {/* {sessionData && ( */}
        <SideNav className="min-h-screen flex-none bg-gray-950 h-full" />
      {/* )} */}
      {/* bg-s-gray */}
      <main className="w-full flex-auto min-h-screen ">
        <ToastContext.Provider value={toastValue}>
          {children}
        </ToastContext.Provider>
      </main>
    </div>
    {/* <Footer /> */}
    </>
  );
}
