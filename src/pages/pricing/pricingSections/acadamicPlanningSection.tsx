import { useState } from "react";
import {
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { Radio } from "flowbite-react";
import Image from "next/image";
import Cross from "../../../images/cross.svg";

export default function AcadameicPlanningSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [renewOpen, setRenewOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(1);
  // const [selectedAddOns, setSelectedAddOns] = useState<
  //   { id: number; name: string; price: string }[]
  // >([]);
  const [selectedAddOnsByPlan, setSelectedAddOnsByPlan] = useState<{
    [key: number]: { id: number; name: string; price: string }[];
  }>({});
  const [showAddOns, setShowAddOns] = useState<boolean>(true);

  const addOns = [
    { id: 1, name: "App White Labeling", price: "9", plan_id: 1 },
    { id: 2, name: "Cloud Administrator", price: "9", plan_id: 1 },
    { id: 3, name: "Customized Training Drills/Plan", price: "9", plan_id: 1 },
    { id: 4, name: "Customized Assessment Reports", price: "9", plan_id: 1 },
    { id: 5, name: "Labeling", price: "9", plan_id: 2 },
    { id: 6, name: "Administrator", price: "9", plan_id: 2 },
    { id: 7, name: "Drills/Plan", price: "9", plan_id: 2 },
    { id: 8, name: "Reports", price: "9", plan_id: 2 },
  ];

  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      price: 100,
      users: 50,
      staffs: 5,
      centers: 5,
      features: [
        "Virtual Athlete Registration",
        "Manage Centers database",
        "Automated Fee Reminders",
        "Accept Digital Payments",
        "Customized Training Plans",
        "Performance Reports",
        "Customer Support",
        "Overall Financial analytics",
      ],
      suitableFor: "Start-Up Academies & Clubs",
    },
    {
      id: 2,
      name: "Premium Plan",
      price: 200,
      users: 100,
      staffs: 10,
      centers: 10,
      features: [
        "Advanced Athlete Performance Tracking",
        "Unlimited Centers",
        "Priority Customer Support",
        "Exclusive Training Modules",
        "Financial & Revenue Analytics",
      ],
      suitableFor: "Established Sports Academies",
    },
  ];

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
  const filteredAddOns = addOns.filter(
    (addOn) => addOn.plan_id === selectedPlan
  );

  // Handle modal opening for add-ons and reset selections when switching plans
  const modalHandleOpen = (planId?: number) => {
    if (planId) {
      setSelectedPlan(planId);
      // setSelectedAddOns([]); // Reset add-ons when switching plans
    }
    setModalOpen(!modalOpen);
  };

  // Handle modal opening for renew and reset add-ons when switching plans
  const renewHandleOpen = (planId?: number) => {
    if (planId) {
      setSelectedPlan(planId);
    }
    setRenewOpen((prev) => !prev);
  };

  // Toggle add-ons visibility
  const handleToggleAddOns = () => {
    setShowAddOns((prev) => !prev);
  };

  // Calculate total add-ons price
  const selectedAddOnsTotal = (selectedAddOnsByPlan[selectedPlan] || []).reduce(
    (acc, addOn) => acc + parseFloat(addOn.price),
    0
  );

  const handleAddOnChange = (addOn: {
    id: number;
    name: string;
    price: string;
  }) => {
    setSelectedAddOnsByPlan((prev) => {
      const currentAddOns = prev[selectedPlan] || [];
      const exists = currentAddOns.some((item) => item.id === addOn.id);
      const updatedAddOns = exists
        ? currentAddOns.filter((item) => item.id !== addOn.id) // Remove if exists
        : [...currentAddOns, addOn]; // Add if not exists

      return { ...prev, [selectedPlan]: updatedAddOns };
    });
  };

  return (
    <div className="scroll shadow-inner-[0px -35px 23px -12px #CCC] box-shadow max-h-[410px] overflow-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="mb-5 rounded-lg border border-gray-300 p-4"
        >
          <div className="flex">
            <div className="flex grow">
              <Radio
                className="radio-btn mt-0.5 h-6 w-6 border-[#FF9678] text-[#FF9678] focus:ring-0"
                checked={selectedPlan === plan.id}
                onChange={() => setSelectedPlan(plan.id)}
              />
              <div className="ml-3 grow">
                <div className="font-heading text-2xl font-medium uppercase">
                  {plan.name}
                </div>
                <p>Includes up to {plan.users} users + Academy </p>
                <p>Owner (Admin)</p>
                <div>
                  <div className="my-4">
                    <button
                      className="rounded-md border border-none bg-[#FF9678] px-11 py-2.5 text-base text-white hover:bg-blush-dark focus:ring-0"
                      type="button"
                      onClick={() => modalHandleOpen(plan.id)} // Pass plan.id when opening
                    >
                      Add Ons
                    </button>
                    <button
                      className="ml-7 rounded-md border border-[#FF9678] px-11 py-2.5 text-base text-[#FF9678] hover:border-blush-dark hover:text-blush-dark"
                      type="button"
                      onClick={() => renewHandleOpen(plan.id)}
                    >
                      Renew
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="switch mb-7">
                <Switch
                  color="green"
                  checked={showAddOns}
                  onChange={handleToggleAddOns}
                />
                <span className="ml-5 text-sm">Add Ons</span>
              </div>
              <div className="text-right">
                <div className="font-heading text-4xl font-medium">
                  ${plan.price + selectedAddOnsTotal}.00
                  <span className="text-lg uppercase"> /Monthly </span>
                </div>
              </div>
            </div>
          </div>
          {/* Display Selected Add-Ons */}
          {showAddOns && (
            <div className="ml-10">
              <div className="font-bold">Add-Ons Added:</div>
              {(selectedAddOnsByPlan[plan.id] ?? []).length > 0 ? (
                <ul className="flex list-disc flex-wrap gap-x-4 text-base">
                  {(selectedAddOnsByPlan[plan.id] ?? []).map((addOn, index) => (
                    <li key={index} className="ml-4">
                      {addOn.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No add-ons selected</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add Ons Dialog */}
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
          <button
          // onClick={modalHandleOpen}
          >
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
            {filteredAddOns.map((addOn) => (
              <div key={addOn.id} className="mt-4 flex justify-between">
                <div className="flex">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                    checked={(selectedAddOnsByPlan[selectedPlan] ?? []).some(
                      (item) => item.id === addOn.id
                    )}
                    onChange={() => handleAddOnChange(addOn)}
                  />

                  <div className="ml-4">
                    <div className="text-lg text-[#FF9678]">{addOn.name}:</div>
                    <div className="text-lg text-[#6E7280]">
                      This add-on enhances your academy&apos;s capabilities.
                    </div>
                  </div>
                </div>
                <div className="font-heading text-2xl font-medium uppercase">
                  {addOn.price}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex w-full items-center justify-between rounded-b-lg bg-burgundy-dark p-6 px-8 text-white">
            <div className="font-heading text-3xl font-medium">
              Total: ${selectedAddOnsTotal}.00
            </div>
            <button
              className="rounded-lg bg-white px-12 py-2 text-lg text-[#974062]"
              // onClick={modalHandleOpen}
            >
              Done
            </button>
          </div>
        </DialogBody>
      </Dialog>

      {/* Renew Plan Dialog */}
      <Dialog
        open={renewOpen}
        handler={renewHandleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="pt-3 2xl:min-w-[556px] 2xl:max-w-[556px]"
      >
        <DialogHeader className="flex justify-between">
          <div className="font-heading text-2xl font-medium uppercase">
            Pricing Plan Structure
          </div>
          <button
          // onClick={renewHandleOpen}
          >
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
          {selectedPlanData && (
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
                  <div className="min-h-[150px] bg-[#F9F9F9] px-7 py-3">
                    <div>Included Features :</div>
                  </div>
                  <div className="bg-white px-7 py-3">
                    <div>Suitable for :</div>
                  </div>
                </div>

                <div className="absolute right-0 top-0 max-h-[556px] w-2/4 overflow-auto shadow-lg">
                  <div className="rounded-t-lg bg-[#974062] px-7 py-3.5 text-center text-white">
                    <div className="font-heading text-2xl font-medium uppercase text-[#FF9678]">
                      {selectedPlanData.name}
                    </div>
                    <div className="font-heading text-4xl font-medium leading-8">
                      ${selectedPlanData.price}{" "}
                      <span className="text-lg uppercase">/Monthly</span>
                    </div>
                  </div>

                  <div className="bg-white px-7 py-3">
                    <div>{selectedPlanData.users}</div>
                  </div>
                  <div className="bg-[#F9F9F9] px-7 py-3">
                    <div>{selectedPlanData.staffs}</div>
                  </div>
                  <div className="bg-white px-7 py-3">
                    <div>{selectedPlanData.centers}</div>
                  </div>
                  <div className="max-h-[150px] overflow-auto bg-[#F9F9F9] px-7 py-4">
                    <ul className="ml-6 list-disc">
                      {selectedPlanData.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white px-7 py-3">
                    <div>{selectedPlanData.suitableFor}</div>
                  </div>
                  <div className="bg-white px-7 py-3">
                    <button className="mb-6 w-full rounded-lg bg-[#F3476D] py-2 text-white">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
}
