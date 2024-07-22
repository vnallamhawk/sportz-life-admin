import DashboardHeader from "~/components/DashboardHeader";
import Filter from "~/components/Filter";
// import Table from "../../components/CommonTable";
import Modal from "../../components/Modal";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import FilterIcon from "../../images/filter-icon.svg";
import Dots from "../../images/dots.svg";
import Visa from "../../images/visa.svg";
// import List from "~/components/CommonList/list";
import { Dropdown, Radio, Textarea } from "flowbite-react";
import Link from "next/link";
import TableListView from "~/common/TableListView";
import AllData from "~/common/AllData";
import User from "../../images/user.png";
import { useRouter } from "next/router";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Switch,
} from "@material-tailwind/react";
import Button from "~/components/Button";

const TABLE_HEAD = [
  { label: "Fee Plan Name", id: "name" },
  { label: "Fee Type", id: "fee_type" },
  { label: "Fee Amt.", id: "fee_amt" },
  { label: "on", id: "status" },
  { label: "Action", id: "action" },
];

const TABLE_ROWS = [
  {
    // img: User,
    name: "Advanced Level Cricket Batch Fee",
    fee_type: "One Time",
    fee_amt: "$199.00",
    status: "On",
  },
  {
    // img: User,
    name: "Advanced Level Cricket Batch Fee",
    fee_type: "One Time",
    fee_amt: "$199.00",
    status: "On",
  },
  {
    // img: User,
    name: "Advanced Level Cricket Batch Fee",
    fee_type: "One Time",
    fee_amt: "$199.00",
    status: "On",
  },
  {
    // img: User,
    name: "Advanced Level Cricket Batch Fee",
    fee_type: "One Time",
    fee_amt: "$199.00",
    status: "On",
  },
];
export default function Pricing() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="px-6 bg-s-gray pb-7">
        <div className="lg:p-6 shadow-sm rounded-2xl lg:bg-white">
          <Tabs value="free_plan">
            <div className="flex items-center mb-6 justify-between pricing-tabs">
              <TabsHeader
                className="pricing-tabs"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                <Tab value="free_plan" activeClassName="active" className="px-0 w-20 text-2xl font-medium font-heading uppercase text-nowrap">Free Plan</Tab>
                <Tab value="pricing" activeClassName="active" className="px-0 w-20 ml-5 text-2xl font-medium font-heading uppercase text-nowrap">Pricing</Tab>
              </TabsHeader>
              <div className=" items-center lg:flex hidden ">
                <div className="relative">
                  <Image src={SearchIcon} className="absolute right-3 top-2 z-10" alt="" />
                  <input type="search" className="2xl:min-w-[450px] border-gray-200 focus:border-gray-400 focus:ring-0 relative w-full text-gray-700 bg-transparent pl-4 pr-12 py-2 border-2 placeholder-gray-300 focus:outline-none rounded-lg text-base" placeholder="Search by name" />
                </div>
                <Filter />
                <Link href="/pricing/AddPlans">
                  <button className="bg-mandy-dark text-white py-2.5 px-6 rounded-lg ml-3">Add Fee Plan</button>
                </Link>
              </div>
            </div>

            <TabsBody>
              <TabPanel value="free_plan">
                <TableListView TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} rowSelection={true} showImage={true} onViewClick="" onEditClick="" />

              </TabPanel>
              <TabPanel value="pricing" className="px-2">
                <div className="">
                  <div className="font-heading text-3xl font-medium uppercase mb-5">Academy Pricing</div>
                  <div className="grid grid-cols-12 grid-rows-1  gap-4 w-full">
                    <div className="col-span-8">
                      <div className="max-h-[410px] overflow-auto scroll shadow-inner-[0px -35px 23px -12px #CCC] box-shadow">
                        <div className="border rounded-lg border-gray-300 p-4 mb-5">
                          <div className="flex">
                            <div className="flex grow">
                              <Radio className="radio-btn border-[#FF9678] w-6 h-6 focus:ring-0 text-[#FF9678] mt-0.5" defaultChecked />
                              <div className="ml-3 grow">
                                <div className="text-2xl font-medium font-heading uppercase">Basic Plan</div>
                                <p>Includes up to 49 users + Academy </p>
                                <p>Owner (Admin)</p>
                                <div>
                                  <div className="my-4 ">
                                    <button
                                      className="border rounded-md bg-[#FF9678] hover:bg-blush-dark border-none focus:ring-0 px-11 py-2.5 text-base text-white"
                                      type="button" >
                                      Add Ons
                                    </button>
                                    <button
                                      className="border ml-7 rounded-md border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                      type="button" >
                                      Renew
                                    </button>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="mb-7 switch">
                                <Switch color="green" defaultChecked />
                                <span className="text-sm ml-5">Add Ons</span>
                              </div>
                              <div className="text-right">
                                <div className="text-4xl font-heading font-medium">$19<span className="text-lg uppercase">/Monthly</span></div>
                                <div className="text-base">23 days plan to renew</div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-10">
                            <div className="font-bold">Add Ons added:</div>
                            <ul className="inline-flex list-disc text-base">
                              <li className="ml-4">Cloud Administrator</li>
                              <li className="ml-8">Customized Training Drills/Plan</li>
                            </ul>
                          </div>
                          <div>
                          </div>

                        </div>
                        <div className="border rounded-lg border-gray-300 p-4">
                          <div className="flex">
                            <div className="flex grow">
                              <Radio className="radio-btn border-[#FF9678] w-6 h-6 focus:ring-0 text-[#FF9678] mt-0.5" />
                              <div className="ml-3 grow">
                                <div className="text-2xl font-medium font-heading uppercase">Premium Plan</div>
                                <p>Includes up to 49 users + Academy </p>
                                <p>Owner (Admin)</p>
                                <div>
                                  <div className="my-4 ">
                                    <button
                                      className="border rounded-md bg-[#FF9678] hover:bg-blush-dark border-none focus:ring-0 px-11 py-2.5 text-base text-white"
                                      type="button" >
                                      Add Ons
                                    </button>
                                    <button
                                      className="border ml-7 rounded-md border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                      type="button" >
                                      Renew
                                    </button>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="mb-7 switch">
                                <Switch color="green" />
                                <span className="text-sm ml-5">Add Ons</span>
                              </div>
                              <div className="text-right">
                                <div className="text-4xl font-heading font-medium">$19<span className="text-lg uppercase">/Monthly</span></div>
                                <div className="text-base">23 days plan to renew</div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-10">
                            <div className="font-bold">Add Ons added:</div>
                            <ul className="inline-flex list-disc text-base">
                              <li className="ml-4">Cloud Administrator</li>
                              <li className="ml-8">Customized Training Drills/Plan</li>
                            </ul>
                          </div>
                          <div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="border rounded-lg border-gray-300 p-4 ">
                        <div className="font-heading font-medium text-2xl uppercase mb-5">Payment Methods</div>
                        <div className="max-h-[225px] overflow-auto scroll">
                          <div className="flex items-center bg-[#F9F9FB] py-3 px-5 rounded-lg mb-3">
                            <Image src={Visa} alt="" />
                            <div className="ml-3">
                              <div className="text-lg text-base">Visa ending in **4567</div>
                              <div className="text-lg text-[#6E7280] text-base">Expiry 06/2024</div>
                            </div>
                          </div>
                          <div className="flex items-center bg-[#F9F9FB] py-3 px-5 rounded-lg mb-3">
                            <Image src={Visa} alt="" />
                            <div className="ml-3">
                              <div className="text-lg text-base">Visa ending in **4567</div>
                              <div className="text-lg text-[#6E7280] text-base">Expiry 06/2024</div>
                            </div>
                          </div>
                        </div>

                        <button className="bg-[#974062] rounded-lg py-2 w-full text-white mt-4">Edit </button>
                      </div>
                    </div>

                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>


          <div className="flex items-center lg:hidden ">
            <button className="bg-mandy-dark rounded-full p-3 w-10 h-10 inline-flex justify-center items-center">
              <Image src={Plus} className="" alt="" />
            </button>



            <button className="lg:hidden bg-black fixed bottom-24 right-10 rounded-full p-3 w-20 h-20 inline-flex justify-center items-center" onClick={() => handleOpen}>
              <Image src={FilterIcon} className="filter-icon  " alt="" />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
