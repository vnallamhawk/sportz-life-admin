import SideNav from "../components/SideNav";
import { useSession } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: sessionData } = useSession();

  return (
    <div className="flex max-w-screen-xl">
      {sessionData && <SideNav className="h-full w-60" />}
      <main className="w-full">{children}</main>
    </div>
  );
}
