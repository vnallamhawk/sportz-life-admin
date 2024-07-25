import DashboardHeader from "~/components/DashboardHeader";
import Filter from "~/components/Filter";
// import Table from "../../components/CommonTable";
import Modal from "../../components/Modal";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Cross from "../../images/cross.svg";
import Plus from "../../images/plus.svg";
import FilterIcon from "../../images/filter-icon.svg";
import Download from "../../images/download-white.svg";
import DownloadPink from "../../images/download-pink.svg";
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
  DialogHeader,
  Dialog,
  DialogBody,
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
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalHandleOpen = () => setModalOpen(!modalOpen);
  const [renewOpen, setRenewOpen] = React.useState(false);
  const renewHandleOpen = () => setRenewOpen(!modalOpen);

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
                                      type="button" onClick={modalHandleOpen}>
                                      Add Ons
                                    </button>
                                    <button
                                      className="border ml-7 rounded-md border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                      type="button" onClick={renewHandleOpen}>
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
                                      type="button" onClick={modalHandleOpen}>
                                      Add Ons
                                    </button>
                                    <button
                                      className="border ml-7 rounded-md border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                      type="button" onClick={renewHandleOpen}>
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
                  <div className="border rounded-lg border-gray-300 p-4 mt-8">
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-medium font-heading uppercase">Billing History</div>
                      <button className="px-6 py-2 bg-[#F3476D] text-white rounded-lg flex items-center mr-5"> <Image src={Download} alt="" className="mr-2" />Download</button>
                    </div>
                    <div className="overflow-auto px-0">
                      <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
                        <thead>
                          <tr>
                            <th className="p-4 pb-2 pl-7">
                              <input
                                type="checkbox"
                                className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                              />
                            </th>
                            <th className="p-4 pb-2 pl-7">Invoice</th>
                            <th className="p-4 pb-2 pl-7">Plan</th>
                            <th className="p-4 pb-2 pl-7">Plan Amt.</th>
                            <th className="p-4 pb-2 pl-7">Add Ons Amt.</th>
                            <th className="p-4 pb-2 pl-7">Billing Amt.</th>
                            <th className="p-4 pb-2 pl-7">Billing Date</th>
                            <th className="p-4 pb-2 pl-7"></th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-light text-gray-600">
                          <tr>
                            <td className="p-4 pb-2 pl-7">
                              <input
                                type="checkbox"
                                className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                              /></td>
                            <td className="p-4 pb-2 pl-7">Invoice - Jan 2023</td>
                            <td className="p-4 pb-2 pl-7">Basic</td>
                            <td className="p-4 pb-2 pl-7">$19.00</td>
                            <td className="p-4 pb-2 pl-7">$18.00</td>
                            <td className="p-4 pb-2 pl-7">$37.00</td>
                            <td className="p-4 pb-2 pl-7">Jan 01, 2023</td>
                            <td className="text-end p-4 pb-2 pl-7" ><button className="px-6 py-2 border border-[#F3476D] text-[#F3476D] rounded-lg flex items-center"> <Image src={DownloadPink} alt="" className="mr-2" />Download</button></td>
                          </tr>
                        </tbody>

                      </table>
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
      <Dialog
        open={modalOpen}
        handler={modalHandleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="pt-3 2xl:min-w-[847px] 2xl:max-w-[847px]"
      >
        <DialogHeader className="flex justify-between items-center pb-0 px-6">
          <div className="text-2xl font-medium font-heading uppercase">Add Ons</div>
          <button onClick={modalHandleOpen}><Image src={Cross} alt="" /></button>
        </DialogHeader>
        <DialogBody className="p-0">
          <div className="px-6 py-2">
            <div className="flex justify-between mt-4">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">App White Labeling:</div>
                  <div className="text-lg text-[#6E7280]">We will white label your customized academy/club app in playstore/app store</div>
                </div>
              </div>

              <div className="text-2xl font-medium font-heading uppercase">$9.00/m</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">Cloud Administrator:</div>
                  <div className="text-lg text-[#6E7280]">We will white label your customized academy/club app in playstore/app store</div>
                </div>
              </div>

              <div className="text-2xl font-medium font-heading uppercase">$9.00/m</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">Customized Training Drills/Plan:</div>
                  <div className="text-lg text-[#6E7280]">We will white label your customized academy/club app in playstore/app store</div>
                </div>
              </div>

              <div className="text-2xl font-medium font-heading uppercase">$9.00/m</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">Customized Assessment Reports:</div>
                  <div className="text-lg text-[#6E7280]">We will white label your customized academy/club app in playstore/app store</div>
                </div>
              </div>
              <div className="text-2xl font-medium font-heading uppercase">$9.00/m</div>
            </div>
          </div>
          <div className="p-6 px-8 w-full bg-burgundy-dark text-white mt-8 rounded-b-lg flex justify-between items-center">
            <div className="text-3xl font-heading font-medium">Total $18.00</div>
            <div className="text-lg px-12 py-2 rounded-lg text-[#974062] bg-white" >Add Ons</div>
          </div>
        </DialogBody>
      </Dialog>
      <Dialog
        open={renewOpen}
        handler={renewHandleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="pt-3 2xl:min-w-[847px] 2xl:max-w-[847px]"
      >
        <DialogHeader className="flex justify-between items-center pb-0 px-6">
          <div className="text-2xl font-medium font-heading uppercase">Pricing Plan Structure</div>
          <button onClick={renewHandleOpen}><Image src={Cross} alt="" /></button>
        </DialogHeader>
        <DialogBody className="p-0 pb-32">
          <div className="px-6 py-2">
            <div className="relative">
              <div className="py-3 px-7 font-bold pt-14">Usage Upto :</div>
              <div className="border border-[#D6D7DD] rounded-lg">
                <div className="py-3 px-7 bg-white">
                  <div>Athletes</div>
                </div>

                <div className="py-3 px-7 bg-[#F9F9F9]">
                  <div>Staffs</div>
                </div>
                <div className="py-3 px-7 bg-white">
                  <div>Centers</div>
                </div>
                <div className="py-3 px-7 min-h-[190px] bg-[#F9F9F9]">
                  <div>Included Features :</div>
                </div>
                <div className="py-3 px-7 bg-white">
                  <div>Suitable for :</div>
                </div>
              </div>


              <div className="shadow-lg absolute top-0 right-0">
                <div className="bg-[#974062] rounded-t-lg text-white py-3.5 px-7 text-center">
                  <div className="text-2xl font-medium font-heading uppercase text-[#FF9678]">BASIC PLAN</div>
                  <div className="text-4xl font-heading font-medium leading-8">$100<span className="text-lg uppercase">/Monthly</span></div>
                </div>

                <div className="py-3 px-7 bg-white">
                  <div>50 Users 3</div>
                </div>
                <div className="py-3 px-7 bg-[#F9F9F9]">
                  <div>5 Users 3</div>
                </div>
                <div className="py-3 px-7 bg-white">
                  <div>5</div>
                </div>
                <div className="py-4 px-7 bg-[#F9F9F9]">
                  <ul className="list-disc text-sm">
                    <li>Virtual Athlete Registration</li>
                    <li>Manage Centers database</li>
                    <li>Automated Fee Reminders</li>
                    <li>Accept Digital Payments</li>
                    <li>Customized Training Plans</li>
                    <li>Performance Reports</li>
                    <li>Customer Support</li>
                    <li>Overall Financial analytics</li>
                  </ul>
                </div>
                <div className="py-3 px-7 bg-white">
                  <div>Start-Up Academies & Clubs</div>
                </div>
                <div className="py-3 px-7 bg-white">
                <button className="bg-[#F3476D] rounded-lg py-2 w-full text-white mb-6">Upgrade Plan </button>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
