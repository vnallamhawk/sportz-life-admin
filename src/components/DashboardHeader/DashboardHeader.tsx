import Image from "next/image";
import Toggle from "../../images/toggle.svg";
import Bell from "../../images/bell.svg";
import Theme from "../../images/theme.png";
import User from "../../images/user.png";
import { Dropdown } from "flowbite-react";
import Search from "../../components/Search";
import ThemeButton from "../ThemeButton";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
  return (
    <div className="px-6 py-7 dark:bg-black dark:text-white">
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="mr-3 block lg:hidden">
            <Image src={Toggle} className="" alt="" />
          </div>
          <h2 className="font-heading text-xl font-medium md:text-3xl">
            DASHBOARD
          </h2>
        </div>
        <div className="flex items-center">
          <div className=" hidden rounded-lg bg-white text-black  focus:outline-none lg:block">
            <Search />
          </div>
          <button className="relative ml-4 hidden rounded-lg px-3 py-2 md:block">
            <ThemeButton />
          </button>
          <button className="relative ml-4 hidden rounded-lg bg-white px-3 py-2 md:block">
            <Image src={Bell} alt="" className="relative" />
            <div className="absolute right-3 top-2.5 h-2 w-2 rounded border border-white bg-red-500 "></div>
          </button>
          <button className="ml-2 rounded-lg bg-white px-1 py-1 md:ml-4 md:px-3 md:py-2">
            <Image src={Theme} alt="" width="20" className="w-4 md:w-full" />
          </button>
          <Dropdown
            label="Dropdown button"
            dismissOnClick={false}
            renderTrigger={() => (
              <button className="ml-2 flex items-center md:ml-8">
                <div className="flex items-center">
                  <Image
                    src={User}
                    alt=""
                    className="h-6 w-6 rounded md:h-10 md:w-10"
                  />
                  <div className="ml-2">
                    <div className="text-xs text-gray-700 md:text-sm">
                      D. Alveraze
                    </div>
                    <div className="text-xs text-gray-400 md:text-sm">
                      Academy admin
                    </div>
                  </div>
                </div>
                <svg
                  className="ms-3 h-2.5 w-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            )}
          >
            <Dropdown.Item
              className="rounded-lg py-3 shadow-xl shadow-slate-100"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className=" mt-3 block rounded-lg border bg-gray-100 text-black focus:outline-none lg:hidden">
        <Search />
      </div>
    </div>
  );
}
