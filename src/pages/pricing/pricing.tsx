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
// import List from "~/components/CommonList/list";
import { Dropdown } from "flowbite-react";
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
} from "@material-tailwind/react";

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
              <TabPanel value="pricing">
                fsdaSDFbgh
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
