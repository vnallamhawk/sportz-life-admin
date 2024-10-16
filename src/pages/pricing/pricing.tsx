import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiTabComp from "~/common/MultiTabComp";
import { PRICING_TABLE_HEADER } from "~/constants/pricingConstant";
import Download from "../../images/download-white.svg";
import DownloadPink from "../../images/download-pink.svg";
import Visa from "../../images/visa.svg";
import { Radio } from "flowbite-react";
import {
  Switch,
  DialogHeader,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import Image from "next/image";
import Cross from "../../images/cross.svg";


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
  const [filterByName, setFilterByName] = useState("");
  const [activeKey,setActiveKey]=useState("0")
  const [filters, setFilters] = useState<{ [key: string]: any }>([]);
 
  const [modalOpen, setModalOpen] = useState(false);
  const modalHandleOpen = () => setModalOpen(!modalOpen);
  const [renewOpen, setRenewOpen] = useState(false);
  const renewHandleOpen = () => setRenewOpen(!renewOpen);


  const handleFilters = (appliedFilters: { [key: string]: any }) => {
    setFilters(appliedFilters);
  };


  const router = useRouter();
  return (
    <>
      {/* <Checkout /> */}
      <MultiTabComp
        tab1label="Fee Plan"
        tab2label="Pricing"
        addButtonText="Add Fee Plan"
        addButtonUrl="/pricing/AddPlans"
        dropdownItems={{}}
        table1show={true}
        table2show={false}
        table2Component={
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
        }
        TABLE1_HEAD={PRICING_TABLE_HEADER}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={[]}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filters={[]}
        applyFilters={(appliedFilters: { [key: string]: any }) =>
          handleFilters(appliedFilters)
        }
        filterByName={filterByName} 
        activeKey={activeKey} 
        setActiveKey={(value:string)=>setActiveKey(value)}        // onViewClick={(id: number) => {}}
        // onEditClick={(id: number) => {}}
        // onDeleteClick={(id: number) => {}}
      />

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
}
