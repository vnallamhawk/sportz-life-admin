import Card from "~/components/Card";
import Link from "next/link";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import Filter from "~/components/Filter";
import User from "../../images/user.png";
import Cross from "../../images/cross.svg";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography,
    Switch,
} from "@material-tailwind/react";
import React from "react";
import SettingsIcon from "~/components/Icons/SettingsIcon";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";


export default function Settings() {
    const [activeTab, setActiveTab] = React.useState("html");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            <div className="bg-s-gray px-6 pb-7">
                <Card className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
                    <div className="mb-14 flex items-center justify-between ">
                        <div className="font-heading text-2xl font-medium uppercase">
                            Roles and Permission
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
                                    Coach
                                </Tab>
                                <Tab key="3" value="3" className="bg-[#EAEAEA] ml-5 lg:bg-transparent text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl lg:font-medium lg:uppercase">
                                    Staff
                                </Tab>
                            </TabsHeader>
                            <TabsBody>
                                <TabPanel key="1" value="1">
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
                                                            Center
                                                        </Typography>
                                                    </th>
                                                    <th className="px-6 py-3 text-left">
                                                        <Typography
                                                            variant="small"
                                                            className="font-bold leading-none "
                                                        >
                                                            Batch
                                                        </Typography>
                                                    </th>
                                                    <th className="px-6 py-3 text-left">
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
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
                                                    Biswa Bharati Stadium
                                                </td>
                                                <td>
                                                    Rugby 03 Batch
                                                </td>
                                                <td>
                                                    <button onClick={handleOpen}><SettingsIcon /></button>
                                                </td>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                                <TabPanel key="2" value="2">
                                    sdgsfvs
                                </TabPanel>
                                <TabPanel key="3" value="3">
                                    sfd
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </div>
                </Card>

            </div>
            <Dialog open={open} handler={handleOpen} className="px-6 py-3 2xl:min-w-[40%] 2xl:max-w-[40%]">
                <DialogHeader className="flex justify-between items-center pb-0 px-0">
                    <div className="text-2xl font-medium font-heading uppercase">Settings</div>
                    <button onClick={handleOpen}><Image width={0} height={0} className="w-auto h-auto" src={Cross} alt="" /></button>
                </DialogHeader>
                <DialogBody className="px-0">
                    <div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">Edit own profile</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View student attendance</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">Add self attendance</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Fee Plans</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Payment Information</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Calendar</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>

                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Coach’s profile</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Rate staff features</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>  
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Training Drills/Training Plans</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View own performance assessment</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Posts</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">View Notifications/Reminders</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">Allow to freeze or delete student profile</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">Allow to change sport or batches</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>  
                        <div className="flex lg:justify-between items-center mb-4">
                            <div className="lg:order-1 order-2 lg:ml-0 lg:mt-0 ml-8 mt-1">Allow to chat with the Coach</div>
                            <div className="switch lg:order-2 order-1">
                                <Switch color="green" defaultChecked />
                            </div>
                        </div>
                    </div>
                </DialogBody>

            </Dialog>
        </>
    )
}