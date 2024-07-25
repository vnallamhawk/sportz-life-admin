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
      <div className="bg-s-gray px-6 pb-7">
        <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
          <Tabs value="free_plan">
            <div className="pricing-tabs mb-6 flex items-center justify-between">
              <TabsHeader
                className="pricing-tabs"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                <Tab
                  value="free_plan"
                  activeClassName="active"
                  className="text-nowrap w-20 px-0 font-heading text-2xl font-medium uppercase"
                >
                  Free Plan
                </Tab>
                <Tab
                  value="pricing"
                  activeClassName="active"
                  className="text-nowrap ml-5 w-20 px-0 font-heading text-2xl font-medium uppercase"
                >
                  Pricing
                </Tab>
              </TabsHeader>
              <div className=" hidden items-center lg:flex ">
                <div className="relative">
                  <Image
                    src={SearchIcon}
                    className="absolute right-3 top-2 z-10"
                    alt=""
                  />
                  <input
                    type="search"
                    className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                    placeholder="Search by name"
                  />
                </div>
                <Filter />
                <Link href="/pricing/AddPlans">
                  <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                    Add Fee Plan
                  </button>
                </Link>
              </div>
            </div>

            <TabsBody>
              <TabPanel value="free_plan">
                <TableListView
                  TABLE_HEAD={TABLE_HEAD}
                  TABLE_ROWS={TABLE_ROWS}
                  rowSelection={true}
                  showImage={true}
                  onViewClick={() => {}}
                  onEditClick={() => {}}
                />
              </TabPanel>
              <TabPanel value="pricing" className="px-2">
                <div className="">
                  <div className="mb-5 font-heading text-3xl font-medium uppercase">
                    Academy Pricing
                  </div>
                  <div className="grid w-full grid-cols-12  grid-rows-1 gap-4">
                    <div className="col-span-8">
                      <div className="scroll shadow-inner-[0px -35px 23px -12px #CCC] box-shadow max-h-[410px] overflow-auto">
                        <div className="mb-5 rounded-lg border border-gray-300 p-4">
                          <div className="flex">
                            <div className="flex grow">
                              <Radio
                                className="radio-btn mt-0.5 h-6 w-6 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                defaultChecked
                              />
                              <div className="ml-3 grow">
                                <div className="font-heading text-2xl font-medium uppercase">
                                  Basic Plan
                                </div>
                                <p>Includes up to 49 users + Academy </p>
                                <p>Owner (Admin)</p>
                                <div>
                                  <div className="my-4 ">
                                    <button
                                      className="rounded-md border border-none bg-[#FF9678] px-11 py-2.5 text-base text-white hover:bg-blush-dark focus:ring-0"
                                      type="button"
                                    >
                                      Add Ons
                                    </button>
                                    <button
                                      className="ml-7 rounded-md border border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                      type="button"
                                    >
                                      Renew
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="switch mb-7">
                                <Switch color="green" defaultChecked />
                                <span className="ml-5 text-sm">Add Ons</span>
                              </div>
                              <div className="text-right">
                                <div className="font-heading text-4xl font-medium">
                                  $19
                                  <span className="text-lg uppercase">
                                    /Monthly
                                  </span>
                                </div>
                                <div className="text-base">
                                  23 days plan to renew
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-10">
                            <div className="font-bold">Add Ons added:</div>
                            <ul className="inline-flex list-disc text-base">
                              <li className="ml-4">Cloud Administrator</li>
                              <li className="ml-8">
                                Customized Training Drills/Plan
                              </li>
                            </ul>
                          </div>
                          <div></div>
                        </div>
                        <div className="rounded-lg border border-gray-300 p-4">
                          <div className="flex">
                            <div className="flex grow">
                              <Radio className="radio-btn mt-0.5 h-6 w-6 border-[#FF9678] text-[#FF9678] focus:ring-0" />
                              <div className="ml-3 grow">
                                <div className="font-heading text-2xl font-medium uppercase">
                                  Premium Plan
                                </div>
                                <p>Includes up to 49 users + Academy </p>
                                <p>Owner (Admin)</p>
                                <div>
                                  <div className="my-4 ">
                                    <button
                                      className="rounded-md border border-none bg-[#FF9678] px-11 py-2.5 text-base text-white hover:bg-blush-dark focus:ring-0"
                                      type="button"
                                    >
                                      Add Ons
                                    </button>
                                    <button
                                      className="ml-7 rounded-md border border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                      type="button"
                                    >
                                      Renew
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="switch mb-7">
                                <Switch color="green" />
                                <span className="ml-5 text-sm">Add Ons</span>
                              </div>
                              <div className="text-right">
                                <div className="font-heading text-4xl font-medium">
                                  $19
                                  <span className="text-lg uppercase">
                                    /Monthly
                                  </span>
                                </div>
                                <div className="text-base">
                                  23 days plan to renew
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-10">
                            <div className="font-bold">Add Ons added:</div>
                            <ul className="inline-flex list-disc text-base">
                              <li className="ml-4">Cloud Administrator</li>
                              <li className="ml-8">
                                Customized Training Drills/Plan
                              </li>
                            </ul>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="rounded-lg border border-gray-300 p-4 ">
                        <div className="mb-5 font-heading text-2xl font-medium uppercase">
                          Payment Methods
                        </div>
                        <div className="scroll max-h-[225px] overflow-auto">
                          <div className="mb-3 flex items-center rounded-lg bg-[#F9F9FB] px-5 py-3">
                            <Image src={Visa} alt="" />
                            <div className="ml-3">
                              <div className="text-base text-lg">
                                Visa ending in **4567
                              </div>
                              <div className="text-base text-lg text-[#6E7280]">
                                Expiry 06/2024
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 flex items-center rounded-lg bg-[#F9F9FB] px-5 py-3">
                            <Image src={Visa} alt="" />
                            <div className="ml-3">
                              <div className="text-base text-lg">
                                Visa ending in **4567
                              </div>
                              <div className="text-base text-lg text-[#6E7280]">
                                Expiry 06/2024
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="mt-4 w-full rounded-lg bg-[#974062] py-2 text-white">
                          Edit{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>

          <div className="flex items-center lg:hidden ">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
              <Image src={Plus} className="" alt="" />
            </button>

            <button
              className="fixed bottom-24 right-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-black p-3 lg:hidden"
              onClick={() => handleOpen}
            >
              <Image src={FilterIcon} className="filter-icon  " alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
