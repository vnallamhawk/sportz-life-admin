import Card from "~/components/Card";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import Filter from "~/components/Filter";
import User from "../../images/user.png";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import Cross from "../../images/cross.svg";
import SettingsIcon from "~/components/Icons/SettingsIcon";
import { Dropdown } from "flowbite-react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import BarChart from "~/components/BarChart";
import { centerWiseCountData } from "~/__stubs__/dashboardStubs";
import DatePicker from "react-datepicker";


export default function Reports() {
    const [activeTab, setActiveTab] = React.useState("html");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        <>
            <div className="bg-s-gray px-6 pb-7">
                <Card className="rounded-2xl shadow-sm lg:bg-white lg:p-6">

                    <div className="pricing-tabs">
                        <Tabs value="1">
                            <TabsHeader className="pricing-tabs"
                                indicatorProps={{
                                    className:
                                        "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                }}>
                                <Tab key="1" value="1" className="active bg-[#EAEAEA] lg:bg-transparent text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl lg:font-medium lg:uppercase">
                                    Athlete
                                </Tab>
                                <Tab key="2" value="2" className="bg-[#EAEAEA] ml-5 lg:bg-transparent text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl lg:font-medium lg:uppercase">
                                    Coaches/Staffs
                                </Tab>
                                <Tab key="3" value="3" className="bg-[#EAEAEA] ml-5 lg:bg-transparent text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl lg:font-medium lg:uppercase">
                                    Academy Owner
                                </Tab>
                            </TabsHeader>
                            <TabsBody>
                                <TabPanel key="1" value="1" className="px-0">
                                    <div className="flex items-center mt-4 mb-10">
                                        <button className="bg-[#F3476D] text-white px-6 py-2 rounded-full">Athlete Details</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Attendance</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Frozen</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Deleted</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Ranking</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Fee</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Assessment</button>
                                    </div>

                                    {/* Athlete------------------------------------------- */}
                                    <div>
                                        <div className="mb-4 flex items-center justify-between ">
                                            <div className="font-heading text-2xl font-medium uppercase">
                                                Athletes
                                            </div>
                                            <div className="hidden items-center lg:flex ">
                                                <div className="relative">
                                                    <Image width={0} height={0}
                                                        src={SearchIcon}
                                                        className="absolute right-3 top-2 z-10 w-auto h-auto"
                                                        alt=""
                                                    />
                                                    <input
                                                        type="search"
                                                        className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                                                        placeholder="Search by student, center, batch name"
                                                    />
                                                </div>
                                                <Filter />
                                                <button className="px-5 py-3 rounded-lg bg-[#404469] text-white text-sm ml-3">Export Report</button>
                                                <Dropdown label="Dropdown button"
                                                    renderTrigger={() => (
                                                        <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">1-20 of 156 <ChevronDownIcon className="ml-2" /></div>
                                                    )} dismissOnClick={false} className="ml-3">
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                            <div className="flex items-center lg:hidden ">
                                                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                                                    <Image width={0} height={0}
                                                        src={Plus}
                                                        className="w-auto h-auto"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>


                                        </div>
                                        <div className="overflow-auto px-0">
                                            <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
                                                <thead>
                                                    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Athlete Name
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Training Level
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Sport
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Gender
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Center
                                                            </Typography>
                                                        </th>

                                                        <th className="px-6 py-3 text-left">
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>


                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <Image width={0} height={0}
                                                                    src={User}
                                                                    alt=""
                                                                    className="h-6 w-6 rounded md:h-8 md:w-8"
                                                                />
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-bold"
                                                                >
                                                                    John H. Martin
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            Intermediate
                                                        </td>
                                                        <td>
                                                            Volleyball
                                                        </td>
                                                        <td>
                                                            Male
                                                        </td>
                                                        <td>
                                                            Biswa Bharati Stadium
                                                        </td>
                                                        <td>
                                                            <button className="text-[#BE1A0E] bg-[#F6EAEF] border border-[#BE1A0E] px-4 py-1 rounded-full">View Profile</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Athlete------------------------------------------- */}
                                    {/* Attenmdancee------------------------------------------- */}
                                    {/* <div>
                                    <div className="mb-4 flex items-center justify-between ">
                                        <div className="font-heading text-2xl font-medium uppercase">
                                            Attendance
                                        </div>
                                        <div className="hidden items-center lg:flex ">
                                            <Dropdown label="Dropdown button"
                                                renderTrigger={() => (
                                                    <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">Month <ChevronDownIcon className="ml-2" /></div>
                                                )} dismissOnClick={false} className="ml-3">
                                                <Dropdown.Item>Jan</Dropdown.Item>
                                                <Dropdown.Item>Feb</Dropdown.Item>
                                                <Dropdown.Item>March</Dropdown.Item>
                                            </Dropdown>
                                            <Dropdown label="Dropdown button"
                                                renderTrigger={() => (
                                                    <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">Jul 2023 <ChevronDownIcon className="ml-2" /></div>
                                                )} dismissOnClick={false} className="ml-3">
                                                <Dropdown.Item>Jul 2023</Dropdown.Item>
                                                <Dropdown.Item>Jul 2023</Dropdown.Item>
                                            </Dropdown>
                                            <button className="px-5 py-3 rounded-lg bg-[#404469] text-white text-sm ml-3">Export Report</button>
                                            <Dropdown label="Dropdown button"
                                                renderTrigger={() => (
                                                    <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">1-20 of 156 <ChevronDownIcon className="ml-2" /></div>
                                                )} dismissOnClick={false} className="ml-3">
                                                <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                            </Dropdown>
                                        </div>
                                        <div className="flex items-center lg:hidden ">
                                            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                                                <Image width={0} height={0}
                                                    src={Plus}
                                                    className="w-auto h-auto"
                                                    alt=""
                                                />
                                            </button>
                                        </div>


                                    </div>
                                    <div className="overflow-auto px-0">
                                        <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
                                            <thead>
                                                <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                                                    <th className="px-6 py-3 text-left">
                                                        <Typography
                                                            variant="small"
                                                            className="font-bold leading-none "
                                                        >
                                                            Athlete Name
                                                        </Typography>
                                                    </th>
                                                    <th className="px-6 py-3 text-left">
                                                        <Typography
                                                            variant="small"
                                                            className="font-bold leading-none "
                                                        >
                                                            Allotted Classes
                                                        </Typography>
                                                    </th>
                                                    <th className="px-6 py-3 text-left">
                                                        <Typography
                                                            variant="small"
                                                            className="font-bold leading-none "
                                                        >
                                                            Present
                                                        </Typography>
                                                    </th>
                                                    <th className="px-6 py-3 text-left">
                                                        <Typography
                                                            variant="small"
                                                            className="font-bold leading-none "
                                                        >
                                                            Absent
                                                        </Typography>
                                                    </th>
                                                    <th className="px-6 py-3 text-left">
                                                        <Typography
                                                            variant="small"
                                                            className="font-bold leading-none "
                                                        >
                                                            Late Mark
                                                        </Typography>
                                                    </th>

                                                    <th className="px-6 py-3 text-left">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>


                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <Image width={0} height={0}
                                                                src={User}
                                                                alt=""
                                                                className="h-6 w-6 rounded md:h-8 md:w-8"
                                                            />
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold"
                                                            >
                                                                John H. Martin
                                                            </Typography>
                                                        </div>
                                                    </td>
                                                    <td>12</td>
                                                    <td>12</td>
                                                    <td>12</td>
                                                    <td>12</td>
                                                    <td>
                                                        <button onClick={handleOpen} className="text-[#BE1A0E] bg-[#F6EAEF] border border-[#BE1A0E] px-4 py-1 rounded-full">View Graph</button>
                                                        <button className="text-[#404469] bg-[#D0D2E2] border border-[#404469] px-4 py-1 rounded-full ml-3">Report</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
                                    {/* Attenmdancee------------------------------------------- */}

                                </TabPanel>
                                <TabPanel key="2" value="2" className="px-0">
                                    <div className="flex items-center mt-4 mb-10">
                                        <button className="bg-[#F3476D] text-white px-6 py-2 rounded-full">Coach/Staff Details</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Attendance</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Payroll</button>
                                    </div>

                                    {/* Coach/Staff------------------------------------------- */}
                                    <div>
                                        <div className="mb-4 flex items-center justify-between ">
                                            <div className="font-heading text-2xl font-medium uppercase">
                                                Coach/Staff
                                            </div>
                                            <div className="hidden items-center lg:flex ">
                                                <div className="relative">
                                                    <Image width={0} height={0}
                                                        src={SearchIcon}
                                                        className="absolute right-3 top-2 z-10 w-auto h-auto"
                                                        alt=""
                                                    />
                                                    <input
                                                        type="search"
                                                        className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                                                        placeholder="Search by student, center, batch name"
                                                    />
                                                </div>
                                                <Filter />
                                                <button className="px-5 py-3 rounded-lg bg-[#404469] text-white text-sm ml-3">Export Report</button>
                                                <Dropdown label="Dropdown button"
                                                    renderTrigger={() => (
                                                        <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">1-20 of 156 <ChevronDownIcon className="ml-2" /></div>
                                                    )} dismissOnClick={false} className="ml-3">
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                            <div className="flex items-center lg:hidden ">
                                                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                                                    <Image width={0} height={0}
                                                        src={Plus}
                                                        className="w-auto h-auto"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>


                                        </div>
                                        <div className="overflow-auto px-0">
                                            <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
                                                <thead>
                                                    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Athlete Name
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Employee Type
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Gender
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Sport
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Center
                                                            </Typography>
                                                        </th>

                                                        <th className="px-6 py-3 text-left">
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>


                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <Image width={0} height={0}
                                                                    src={User}
                                                                    alt=""
                                                                    className="h-6 w-6 rounded md:h-8 md:w-8"
                                                                />
                                                                <Typography
                                                                    variant="small"
                                                                    className="font-bold"
                                                                >
                                                                    John H. Martin
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            Coach
                                                        </td>
                                                        <td>
                                                            Male
                                                        </td>
                                                        <td>
                                                            Basketball, Volleyball
                                                        </td>
                                                        <td>
                                                            Biswa Bharati Stadium
                                                        </td>
                                                        <td>
                                                            <button className="text-[#BE1A0E] bg-[#F6EAEF] border border-[#BE1A0E] px-4 py-1 rounded-full">View Profile</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Coach/Staff------------------------------------------- */}

                                </TabPanel>
                                <TabPanel key="3" value="3" className="px-0">
                                    <div className="flex items-center mt-4 mb-10">
                                        <button className="bg-[#F3476D] text-white px-6 py-2 rounded-full">Tickets</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Financial</button>
                                        <button className="ml-3 bg-[#FEEFF2] text-[#F3476D] px-6 py-2 rounded-full">Inventory</button>
                                    </div>

                                    {/* Tickets------------------------------------------- */}
                                    {/* <div>
                                        <div className="mb-4 flex items-center justify-between ">
                                            <div className="font-heading text-2xl font-medium uppercase">
                                                Tickets
                                            </div>
                                            <div className="hidden items-center lg:flex ">
                                                <div className="relative">
                                                    <Image width={0} height={0}
                                                        src={SearchIcon}
                                                        className="absolute right-3 top-2 z-10 w-auto h-auto"
                                                        alt=""
                                                    />
                                                    <input
                                                        type="search"
                                                        className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                                                        placeholder="Search by student, center, batch name"
                                                    />
                                                </div>
                                                <Filter />
                                                <button className="px-5 py-3 rounded-lg bg-[#404469] text-white text-sm ml-3">Export Report</button>
                                                <Dropdown label="Dropdown button"
                                                    renderTrigger={() => (
                                                        <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">1-20 of 156 <ChevronDownIcon className="ml-2" /></div>
                                                    )} dismissOnClick={false} className="ml-3">
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                            <div className="flex items-center lg:hidden ">
                                                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                                                    <Image width={0} height={0}
                                                        src={Plus}
                                                        className="w-auto h-auto"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>


                                        </div>
                                        <div className="overflow-auto px-0">
                                            <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
                                                <thead>
                                                    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                ID
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Ticket Generator
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Title
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Category
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Raised on
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Status
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Respond
                                                            </Typography>
                                                        </th>

                                                        <th className="px-6 py-3 text-left">
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>#02</td>
                                                        <td>Academy Owner(You)
                                                        </td>
                                                        <td>
                                                        Need to change gloves
                                                        </td>
                                                        <td>
                                                        Equipment Issue
                                                        </td>
                                                        <td>
                                                        05 Aug, 23
                                                        </td>
                                                        <td>
                                                        Open
                                                        </td>
                                                        <td>
                                                        Not Yet
                                                        </td>
                                                        <td>
                                                        <button className="text-[#404469] bg-[#D0D2E2] border border-[#404469] px-4 py-1 rounded-full ml-3">Report</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                    {/* Tickets------------------------------------------- */}
                                    {/* Financial------------------------------------------- */}
                                    <div>
                                        <div className="mb-4 flex items-center justify-between ">
                                            <div className="font-heading text-2xl font-medium uppercase">
                                                Financial
                                            </div>
                                            <div className="hidden items-center lg:flex ">
                                                <Dropdown label="Dropdown button"
                                                    renderTrigger={() => (
                                                        <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">Revenue <ChevronDownIcon className="ml-2" /></div>
                                                    )} dismissOnClick={false} className="ml-3">
                                                    <Dropdown.Item>Expenditure</Dropdown.Item>
                                                </Dropdown>
                                                <div className="flex ml-3">
                                                <DatePicker
                                                    // showIcon
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    className="c-date  rounded-lg border-gray-400 text-lg focus:ring-0 pl-3"
                                                    placeholderText="date"
                                                />
                                                   <DatePicker
                                                    // showIcon
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    className="c-date  rounded-lg border-gray-400 text-lg focus:ring-0 ml-3"
                                                    placeholderText="date"
                                                />
                                                </div>
                                                <button className="px-5 py-3 rounded-lg bg-[#404469] text-white text-sm ml-3">Export Report</button>
                                                <Dropdown label="Dropdown button"
                                                    renderTrigger={() => (
                                                        <div className="border border-[#E2E2E2] ml-3 py-2 px-5 rounded-lg curser-pointer inline-flex items-center">1-20 of 156 <ChevronDownIcon className="ml-2" /></div>
                                                    )} dismissOnClick={false} className="ml-3">
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                    <Dropdown.Item>1-20 of 156</Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                            <div className="flex items-center lg:hidden ">
                                                <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                                                    <Image width={0} height={0}
                                                        src={Plus}
                                                        className="w-auto h-auto"
                                                        alt=""
                                                    />
                                                </button>
                                            </div>


                                        </div>
                                        <div className="overflow-auto px-0">
                                            <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
                                                <thead>
                                                    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                ID
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Ticket Generator
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Title
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Category
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Raised on
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Status
                                                            </Typography>
                                                        </th>
                                                        <th className="px-6 py-3 text-left">
                                                            <Typography
                                                                variant="small"
                                                                className="font-bold leading-none "
                                                            >
                                                                Respond
                                                            </Typography>
                                                        </th>

                                                        <th className="px-6 py-3 text-left">
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>#02</td>
                                                        <td>Academy Owner(You)
                                                        </td>
                                                        <td>
                                                            Need to change gloves
                                                        </td>
                                                        <td>
                                                            Equipment Issue
                                                        </td>
                                                        <td>
                                                            05 Aug, 23
                                                        </td>
                                                        <td>
                                                            Open
                                                        </td>
                                                        <td>
                                                            Not Yet
                                                        </td>
                                                        <td>
                                                            <button className="text-[#404469] bg-[#D0D2E2] border border-[#404469] px-4 py-1 rounded-full ml-3">Report</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* Financial------------------------------------------- */}
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </div>
                </Card>

            </div>
            <Dialog open={open} handler={handleOpen} className="px-6 py-3 2xl:min-w-[30%] 2xl:max-w-[30%]">
                <DialogHeader className="flex justify-between items-center pb-0 px-0">
                    <div className="text-2xl font-medium font-heading uppercase">Graph</div>
                    <button onClick={handleOpen}><Image width={0} height={0} className="w-auto h-auto" src={Cross} alt="" /></button>
                </DialogHeader>
                <DialogBody className="px-0">
                    <BarChart data={centerWiseCountData} />
                </DialogBody>
            </Dialog>
        </>
    )
}