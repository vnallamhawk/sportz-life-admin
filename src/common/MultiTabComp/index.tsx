import Filter from "~/components/Filter";
import React from "react";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Cross from "../../images/cross.svg";
import Plus from "../../images/plus.svg";
import FilterIcon from "../../images/filter-icon.svg";
import Download from "../../images/download-white.svg";
import DownloadPink from "../../images/download-pink.svg";
import Visa from "../../images/visa.svg";
import { Radio } from "flowbite-react";
import Link from "next/link";
import TableListView from "~/common/TableListView";
// import Checkout from "";
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

interface MultiTabCompProps {
  tab1label?: string;
  tab2label?: string;
  addButtonText?: string;
  addButtonUrl?: string;
  dropdownItems?: any;
  table1show?: boolean;
  table2show?: boolean;
  TABLE1_HEAD: { label: string; id: string }[];
  TABLE1_ROWS: { [key: string]: any; id: number }[];
  TABLE2_HEAD?: { label: string; id: string }[];
  TABLE2_ROWS?: { [key: string]: any; id: number }[];
  setFilterByName?: any;
  filterByName?: string;
  onViewClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  filter?:boolean
}
const MultiTabComp = ({
  tab1label,
  tab2label,
  addButtonText,
  addButtonUrl,
  table1show,
  table2show,
  TABLE1_HEAD,
  TABLE1_ROWS,
  TABLE2_HEAD,
  TABLE2_ROWS,
  setFilterByName,
  filterByName,
  filter=true,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: MultiTabCompProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [modalOpen, setModalOpen] = React.useState(false);
  const modalHandleOpen = () => setModalOpen(!modalOpen);
  const [renewOpen, setRenewOpen] = React.useState(false);
  const renewHandleOpen = () => setRenewOpen(!renewOpen);
  const GiveTabValue = (val: string) => {
    return val
      .split(" ")
      .map((item) => item.toLowerCase())
      .join("_");
  };
  const tab1value = GiveTabValue(tab1label!);
  const tab2value = GiveTabValue(tab2label!);

  return (
    <>
      {/* <Checkout /> */}
      <div className="bg-s-gray px-6 pb-7">
        <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
          <Tabs value={tab1value}>
            <div className="pricing-tabs mb-6 flex items-center justify-between">
              <TabsHeader
                className="pricing-tabs"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                <Tab
                  value={tab1value}
                  activeClassName="active"
                  className="text-nowrap w-auto px-0 font-heading text-2xl font-medium uppercase"
                >
                  {tab1label}
                </Tab>
                <Tab
                  value={tab2value}
                  activeClassName="active"
                  className="text-nowrap ml-5 w-auto px-0 font-heading text-2xl font-medium uppercase"
                >
                  {tab2label}
                </Tab>
              </TabsHeader>
              <div className=" hidden items-center lg:flex ">
                <div className="relative">
                  <Image
                    width={0}
                    height={0}
                    src={SearchIcon}
                    className="absolute right-3 top-2 z-10 h-auto w-auto"
                    alt=""
                  />
                  <input
                    type="search"
                    className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                    placeholder="Search by name"
                    value={filterByName}
                    onChange={(e: any) => setFilterByName(e.target.value)}
                  />
                </div>
                {filter && <Filter />}
                <Link href={addButtonUrl!}>
                  <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                    {addButtonText}
                  </button>
                </Link>
              </div>
            </div>

            <TabsBody>
              {table1show ? (
                <TabPanel value={tab1value}>
                  <TableListView
                    TABLE_HEAD={TABLE1_HEAD}
                    TABLE_ROWS={TABLE1_ROWS}
                    rowSelection={true}
                    showImage={true}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onViewClick={onViewClick}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onEditClick={onEditClick}
                  />
                </TabPanel>
              ) : null}

              <TabPanel value={tab2value} className="px-2">
                {table2show ? (
                  <TableListView
                    TABLE_HEAD={TABLE2_HEAD!}
                    TABLE_ROWS={TABLE2_ROWS!}
                    rowSelection={true}
                    showImage={true}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onViewClick={onViewClick}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onEditClick={onEditClick}
                  />
                ) : (
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
                                        onClick={modalHandleOpen}
                                      >
                                        Add Ons
                                      </button>
                                      <button
                                        className="ml-7 rounded-md border border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                        type="button"
                                        onClick={renewHandleOpen}
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
                                        onClick={modalHandleOpen}
                                      >
                                        Add Ons
                                      </button>
                                      <button
                                        className="ml-7 rounded-md border border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                                        type="button"
                                        onClick={renewHandleOpen}
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
                              <Image
                                width={0}
                                height={0}
                                src={Visa}
                                alt=""
                                className="h-auto w-auto"
                              />
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
                              <Image
                                width={0}
                                height={0}
                                src={Visa}
                                alt=""
                                className="h-auto w-auto"
                              />
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
                    <div className="mt-8 rounded-lg border border-gray-300 p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-heading text-2xl font-medium uppercase">
                          Billing History
                        </div>
                        <button className="mr-5 flex items-center rounded-lg bg-[#F3476D] px-6 py-2 text-white">
                          {" "}
                          <Image
                            width={0}
                            height={0}
                            src={Download}
                            alt=""
                            className="mr-2 h-auto w-auto"
                          />
                          Download
                        </button>
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
                                />
                              </td>
                              <td className="p-4 pb-2 pl-7">
                                Invoice - Jan 2023
                              </td>
                              <td className="p-4 pb-2 pl-7">Basic</td>
                              <td className="p-4 pb-2 pl-7">$19.00</td>
                              <td className="p-4 pb-2 pl-7">$18.00</td>
                              <td className="p-4 pb-2 pl-7">$37.00</td>
                              <td className="p-4 pb-2 pl-7">Jan 01, 2023</td>
                              <td className="p-4 pb-2 pl-7 text-end">
                                <button className="flex items-center rounded-lg border border-[#F3476D] px-6 py-2 text-[#F3476D]">
                                  {" "}
                                  <Image
                                    width={0}
                                    height={0}
                                    src={DownloadPink}
                                    alt=""
                                    className="mr-2 h-auto w-auto"
                                  />
                                  Download
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </TabPanel>
            </TabsBody>
          </Tabs>

          <div className="flex items-center lg:hidden ">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
              <Image
                width={0}
                height={0}
                src={Plus}
                className="h-auto w-auto"
                alt=""
              />
            </button>

            <button
              className="fixed bottom-24 right-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-black p-3 lg:hidden"
              onClick={() => handleOpen}
            >
              <Image
                width={0}
                height={0}
                src={FilterIcon}
                className="filter-icon  h-auto w-auto"
                alt=""
              />
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
        <DialogHeader className="flex items-center justify-between px-6 pb-0">
          <div className="font-heading text-2xl font-medium uppercase">
            Add Ons
          </div>
          <button onClick={modalHandleOpen}>
            <Image
              width={0}
              height={0}
              src={Cross}
              alt=""
              className="h-auto w-auto"
            />
          </button>
        </DialogHeader>
        <DialogBody className="p-0">
          <div className="px-6 py-2">
            <div className="mt-4 flex justify-between">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">
                    App White Labeling:
                  </div>
                  <div className="text-lg text-[#6E7280]">
                    We will white label your customized academy/club app in
                    playstore/app store
                  </div>
                </div>
              </div>

              <div className="font-heading text-2xl font-medium uppercase">
                $9.00/m
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">
                    Cloud Administrator:
                  </div>
                  <div className="text-lg text-[#6E7280]">
                    We will white label your customized academy/club app in
                    playstore/app store
                  </div>
                </div>
              </div>

              <div className="font-heading text-2xl font-medium uppercase">
                $9.00/m
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">
                    Customized Training Drills/Plan:
                  </div>
                  <div className="text-lg text-[#6E7280]">
                    We will white label your customized academy/club app in
                    playstore/app store
                  </div>
                </div>
              </div>

              <div className="font-heading text-2xl font-medium uppercase">
                $9.00/m
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div className="flex">
                <div>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg text-[#FF9678]">
                    Customized Assessment Reports:
                  </div>
                  <div className="text-lg text-[#6E7280]">
                    We will white label your customized academy/club app in
                    playstore/app store
                  </div>
                </div>
              </div>
              <div className="font-heading text-2xl font-medium uppercase">
                $9.00/m
              </div>
            </div>
          </div>
          <div className="mt-8 flex w-full items-center justify-between rounded-b-lg bg-burgundy-dark p-6 px-8 text-white">
            <div className="font-heading text-3xl font-medium">
              Total $18.00
            </div>
            <div className="rounded-lg bg-white px-12 py-2 text-lg text-[#974062]">
              Add Ons
            </div>
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
        className="pt-3 2xl:min-w-[556px] 2xl:max-w-[556px]"
      >
        <DialogHeader className="flex items-center justify-between px-6 pb-0">
          <div className="font-heading text-2xl font-medium uppercase">
            Pricing Plan Structure
          </div>
          <button onClick={renewHandleOpen}>
            <Image
              width={0}
              height={0}
              src={Cross}
              alt=""
              className="h-auto w-auto"
            />
          </button>
        </DialogHeader>
        <DialogBody className="p-0 pb-32">
          <div className="px-6 py-2">
            <div className="relative">
              <div className="px-7 py-3 pt-14 font-bold">Usage Upto :</div>
              <div className="rounded-lg border border-[#D6D7DD]">
                <div className="bg-white px-7 py-3">
                  <div>Athletes</div>
                </div>

                <div className="bg-[#F9F9F9] px-7 py-3">
                  <div>Staffs</div>
                </div>
                <div className="bg-white px-7 py-3">
                  <div>Centers</div>
                </div>
                <div className="min-h-[190px] bg-[#F9F9F9] px-7 py-3">
                  <div>Included Features :</div>
                </div>
                <div className="bg-white px-7 py-3">
                  <div>Suitable for :</div>
                </div>
              </div>

              <div className="absolute right-0 top-0 w-2/4 shadow-lg">
                <div className="rounded-t-lg bg-[#974062] px-7 py-3.5 text-center text-white">
                  <div className="font-heading text-2xl font-medium uppercase text-[#FF9678]">
                    BASIC PLAN
                  </div>
                  <div className="font-heading text-4xl font-medium leading-8">
                    $100<span className="text-lg uppercase">/Monthly</span>
                  </div>
                </div>

                <div className="bg-white px-7 py-3">
                  <div>50 Users 3</div>
                </div>
                <div className="bg-[#F9F9F9] px-7 py-3">
                  <div>5 Users 3</div>
                </div>
                <div className="bg-white px-7 py-3">
                  <div>5</div>
                </div>
                <div className="bg-[#F9F9F9] px-7 py-4">
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
                <div className="bg-white px-7 py-3">
                  <div>Start-Up Academies & Clubs</div>
                </div>
                <div className="bg-white px-7 py-3">
                  <button className="mb-6 w-full rounded-lg bg-[#F3476D] py-2 text-white">
                    Upgrade Plan{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default MultiTabComp;
