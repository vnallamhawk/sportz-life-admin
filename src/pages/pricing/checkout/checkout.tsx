import Image from "next/image";
import BasicPlan from "../../../images//basic-plan.svg";
import CardInfo from "../../../images/card-info.svg";

export default function Checkout() {
    return (
        <div className="bg-s-gray px-6 pb-7">
            <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
                <div className="px-0 font-heading text-3xl font-medium uppercase mb-5">check out</div>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-8">
                        <div className="mb-5 rounded-lg border border-gray-300 p-6 h-full">
                            <div className="font-heading text-2xl font-medium mb-5">Payment Details</div>
                            <div className="grid grid-cols-12 gap-7">
                                <div className="col-span-12">
                                    <input type="text" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Card Holder Name" />
                                </div>
                                <div className="col-span-12">
                                    <input type="text" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Credit Card Number" />
                                </div>
                                <div className="col-span-6">
                                    <input type="text" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Credit Card Number" />
                                </div>
                                <div className="col-span-6">
                                    <input type="text" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="CVV" />
                                </div>
                                <div className="col-span-12">
                                    <button
                                        className="!border-0 px-5 py-2 lg:rounded-lg rounded-full   focus:ring-0 outline-0 bg-mandy-dark hover:bg-mandy-dark focus:outline-none focus:ring text-white w-full"
                                        type="button"
                                    >
                                        Make Payment
                                    </button>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex justify-center">
                                        <Image width={0} height={0} src={CardInfo} alt="" className="text-center w-auto h-auto" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="renew-plan-bg text-center rounded-t-xl py-16 px-10">
                            <div className="font-heading text-2xl font-medium uppercase text-white ">Renew Plan Summary</div>
                            <div className="text-3xl font-heading font-medium text-[#F3476D]">$118.00/monthly</div>
                        </div>
                        <div className="bg-[#F7F7FB] rounded-b-xl relative">
                            <div className="flex items-center bg-white shadow mx-6 p-4 rounded-lg transform  -translate-y-8">
                                <div>
                                    <Image width={0} height={0} src={BasicPlan} alt="" className="w-14 h-14 rounded-xl" />
                                </div>
                                <div className="pl-4">
                                    <div className=" text-lg">Basic Plan</div>
                                    <div className="text-base text-[#6E7280]">$100 / Month</div>
                                </div>
                            </div>
                            <div className="px-2">
                                <div className="px-4 font-heading text-2xl font-medium">Add Ons</div>
                                <div className="max-h-[274px] overflow-auto scroll px-4 pb-3">
                                    <div className="mt-4 flex justify-between">
                                        <div className="flex">
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-base text-[#FF9678]">
                                                    App White Labeling:
                                                </div>
                                                <div className="text-base text-[#6E7280]">
                                                    We will white label your customized academy/club app in
                                                    playstore/app store
                                                </div>
                                            </div>
                                        </div>

                                        <div className="font-heading text-xl font-medium uppercase">
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
                                                <div className="text-base text-[#FF9678]">
                                                    Cloud Administrator:
                                                </div>
                                                <div className="text-base text-[#6E7280]">
                                                    We will white label your customized academy/club app in
                                                    playstore/app store
                                                </div>
                                            </div>
                                        </div>

                                        <div className="font-heading text-xl font-medium uppercase">
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
                                                <div className="text-base text-[#FF9678]">
                                                    Cloud Administrator:
                                                </div>
                                                <div className="text-base text-[#6E7280]">
                                                    We will white label your customized academy/club app in
                                                    playstore/app store
                                                </div>
                                            </div>
                                        </div>

                                        <div className="font-heading text-xl font-medium uppercase">
                                            $9.00/m
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}