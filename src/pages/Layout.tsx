import SideNav from "../components/SideNav";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = useSession();

  return (
    <div className="flex">
      {sessionData && <SideNav className="h-screen w-60 bg-gray-950" />}
      <main className="w-full">{children}</main>
    </div>
  );
}
