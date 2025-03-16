import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiTabComp from "~/common/MultiTabComp";
import {
  // PLANNING_FEE_TYPE,
  PRICING_TABLE_HEADER,
} from "~/constants/pricingConstant";
// import Download from "../../images/download-white.svg";
// import DownloadPink from "../../images/download-pink.svg";
// import Visa from "../../images/visa.svg";
// import { Radio } from "flowbite-react";
import {
  // Switch,
  DialogHeader,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import Image from "next/image";
import Cross from "../../images/cross.svg";
import { api } from "~/utils/api";
import PricingTable from "./pricingSections/PricingTable";

export default function Pricing() {
  const [filterByName, setFilterByName] = useState("");
  const [activeKey, setActiveKey] = useState("0");
  // const [filters, setFilters] = useState<{ [key: string]: any }>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const modalHandleOpen = () => setModalOpen(!modalOpen);
  const [renewOpen, setRenewOpen] = useState(false);
  const renewHandleOpen = () => setRenewOpen(!renewOpen);

  // const handleFilters = (appliedFilters: { [key: string]: any }) => {
  //   setFilters(appliedFilters);
  // };

  const { data: feePlansData } = api.feePlan.getAllFeePlans.useQuery({});

  const { mutate: deleteFeePlanMutate } = api.feePlan.deleteFeePlan.useMutation(
    {
      onSuccess: () => {
        router.push("/pricing"); // Redirect after deletion or refetch data
      },
      onError: (error) => {
        console.error("Error deleting fee plan:", error);
      },
    }
  );

  const deleteFeePlan = (feePlanId: number) => {
    deleteFeePlanMutate({ feePlanId }); // Call the mutation with the correct input
  };

  // filterByName == ""
  //   ? api.center.getAllCenters.useQuery()
  //   : api.center.getCentersByName.useQuery({ name: filterByName });

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
        table2Component={<PricingTable />}
        TABLE1_HEAD={PRICING_TABLE_HEADER}
        TABLE1_ROWS={feePlansData?.data || []}
        TABLE2_HEAD={[]}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filters={[]}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applyFilters={(appliedFilters: { [key: string]: any }) => {
          // handleFilters(appliedFilters);
        }}
        filterByName={filterByName}
        activeKey={activeKey}
        setActiveKey={(value: string) => setActiveKey(value)}
        onEditClick={(id: number) => router.push(`/edit-plan-${id}`)}
        onDeleteClick={(id: number) => deleteFeePlan(id)}
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
