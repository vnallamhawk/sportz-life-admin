import Image from "next/image";
import Toggle from "../../images/toggle.svg";
import Bell from "../../images/bell.svg";
import Theme from "../../images/theme.png";
import User from "../../images/user.png";
import { Dropdown } from "flowbite-react";
import Search from "../../components/Search";

export default function DashboardHeader() {
    return (
        <div className="py-7 ">
            <div className="flex justify-between items-center" >
                <div className="flex">
                    <div className="block lg:hidden mr-3">
                        <Image src={Toggle} className="" alt="" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-heading font-medium">DASHBOARD</h2>
                </div>
                <div className="flex items-center">
                    <div className=" lg:block hidden bg-white text-black  rounded-lg focus:outline-none">
                        <Search />
                    </div>
                    <button className="ml-4 bg-white rounded-lg px-3 py-2 relative md:block hidden">
                        <Image src={Bell} alt="" className="relative" />
                        <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 border border-white rounded "></div>
                    </button>
                    <button className="ml-2 md:ml-4 bg-white rounded-lg md:px-3 md:py-2 px-1 py-1">
                        <Image src={Theme} alt="" width="20" className="md:w-full w-4" />
                    </button>
                    <Dropdown label="Dropdown button" dismissOnClick={false} renderTrigger={() =>
                        <button className="flex items-center ml-2 md:ml-8">
                            <div className="flex items-center">
                                <Image src={User} alt="" className="w-6 h-6 md:w-10 md:h-10 rounded" />
                                <div className="ml-2">
                                    <div className="text-gray-700 text-xs md:text-sm">D. Alveraze</div>
                                    <div className="text-gray-400 text-xs md:text-sm">Academy admin</div>
                                </div>

                            </div>
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>}>
                        <Dropdown.Item className="py-3 rounded-lg shadow-xl shadow-slate-100">Logout</Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <div className=" lg:hidden block mt-3 bg-gray-100 text-black border rounded-lg focus:outline-none">
                <Search />
            </div>
        </div>
    )
}