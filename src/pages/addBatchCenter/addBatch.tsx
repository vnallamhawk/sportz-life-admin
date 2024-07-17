import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import User from "../../images/user.png";
import CoachImg from "../../images/CoachesImg.png";
import AtheleteImg from "../../images/AthelteImg.png"

export default function addBatch() {
    return (
        <div className="px-6 bg-s-gray pb-7">
            <div className="grid grid-cols-6 grid-rows-1 relative">
                <Card className="col-span-12 lg:col-span-4 h-full p-0 pt-10 bg-white rounded-l-xl !rounded-r-none relative">
                    <CardTitle title="Add Batch" />
                    <div className="flex justify-between flex-col max-h-[calc(100%-55px)] h-full">
                        <div>
                            <div className=" font-medium uppercase text-3xl font-heading text-center lg:text-left" >Batch Details</div>
                            <div className="mt-8 grid lg:grid-cols-2 grid-col-1 gap-x-8 lg:gap-y-8 gap-y-4 ">
                                <div>
                                    <input className="rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600 h-12 w-full" placeholder="Athlete Name" type="text" value="" />
                                </div>
                                <div>
                                    <input className="rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600 h-12 w-full" placeholder="Athlete Name" type="text" value="" />
                                </div>
                                <div>
                                    <input className="rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600 h-12 w-full" placeholder="Athlete Name" type="text" value="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <button className="bg-[#F3476D] text-white px-4 py-1.5 rounded-lg">Next </button>
                        </div>
                    </div>
                </Card>
                <Card className="col-span-2 bg-[#1D2028] rounded-r-xl !rounded-l-none px-7 lg:block hidden ">
                    <div className="flex items-center mt-3">
                        <Image
                            className="h-[90px] w-[90px] object-cover rounded-lg"
                            src={"/images/rugby.jpg"}
                            alt=""
                            width="200"
                            height="150"
                        />
                        <div className="font-heading text-white text-2xl pl-5">Netaji Indoor Stadium</div>
                    </div>
                    <div className="mt-4 pb-4 text-[#A0A0A0] text-sm">Created by <span className="text-[#FF9678]">D. Alveraze</span> on <span className="text-[#FF9678]">26-06-2023</span></div>
                    <div className="rounded-xl p-3 bg-[#2D323D] mt-4">
                        <div className="flex items-center">
                            <div>
                                <Image
                                    className="h-[56px] w-[56px] rounded-lg"
                                    src={CoachImg}
                                    alt={``}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className="pl-3">
                                <p className={`text-burgundy-light text-base`}>Coaches</p>
                                <div className="font-heading text-5xl leading-10 text-white">05</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl p-3 bg-[#2D323D] mt-4">
                        <div className="flex items-center">
                            <div>
                                <Image
                                    className="h-[56px] w-[56px] rounded-lg"
                                    src={AtheleteImg}
                                    alt={``}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className="pl-3">
                                <p className={`text-[#FFBEAB] text-base`}>Athletes</p>
                                <div className="font-heading text-5xl leading-10 text-white">05</div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl p-3 bg-[#2D323D] mt-4">
                        <div className="flex items-center">
                            <div>
                                <Image
                                    className="h-[56px] w-[56px] rounded-lg"
                                    src={CoachImg}
                                    alt={``}
                                    width={56}
                                    height={56}
                                />
                            </div>
                            <div className="pl-3">
                                <p className={`text-burgundy-light text-base`}>Coaches</p>
                                <div className="font-heading text-5xl leading-10 text-white">05</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>

    );
}