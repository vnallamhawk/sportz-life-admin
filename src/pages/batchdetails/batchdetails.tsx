import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import User from "../../images/user.png";
import CoachImg from "../../images/CoachesImg.png";
import AtheleteImg from "../../images/AthelteImg.png";
import BatchImg from "../../images/BatchesImg.png";
import Edit from "../../images/ic_fluent_edit_16_filled.svg";
import Search from "../../images/search.png";
import Filter from "../../images/filter-icon.svg";
import Clock from "../../images/clock.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

// export default function addBatch() {
    return (
        <div className="grid grid-cols-12 gap-4 mx-6">
            <div className="col-span-4">
                <Card className="h-100 md:bg-white md:bg-none bg-gradient-to-r from-[#2D323D] to-[#141720]">
                    <header className="lg:flex justify-between items-start mb-0 hidden ">
                        <CardTitle title="ALL BATCHES" />
                        <div>
                            <button><Image src={Filter} className="mr-2" alt="" /></button>
                            <button><Image src={Search} className="mr-2" alt="" /></button>
                        </div>
                    </header>
                </Card>
                <div className="mt-4">
                    <Card className="h-100 md:bg-white md:bg-none bg-gradient-to-r from-[#2D323D] to-[#141720] mt-2">
                        <div className="lg:flex justify-between items-start mb-0 hidden ">
                            <div>
                                <div className="font-bold text-[#5A5A5A]">Tennis Beginner Batch</div>
                                <div className="text-[#A1A1A1]">Tennis</div>
                            </div>

                            <div className="text-center">
                                <div className="text-2xl text-[#F3476D] font-bold leading-5">28</div>
                                <div className="font-sm text-[#B8BBC5]">Athletes</div>
                            </div>
                        </div>
                    </Card>
                    <Card className="h-100 md:bg-white md:bg-none bg-gradient-to-r from-[#2D323D] to-[#141720] mt-2">
                        <div className="lg:flex justify-between items-start mb-0 hidden ">
                            <div>
                                <div className="font-bold text-[#5A5A5A]">Tennis Beginner Batch</div>
                                <div className="text-[#A1A1A1]">Tennis</div>
                            </div>

                            <div className="text-center">
                                <div className="text-2xl text-[#F3476D] font-bold leading-5">28</div>
                                <div className="font-sm text-[#B8BBC5]">Athletes</div>
                            </div>
                        </div>
                    </Card>
                </div>

            </div>
            <div className="col-span-8">
                <Card className="h-100 md:bg-white md:bg-none bg-gradient-to-r from-[#2D323D] to-[#141720]">
                    <header className="lg:flex justify-between items-start mb-2 hidden ">
                        <CardTitle title="BATCH DETAILS" />
                        <Button>
                            <Image src={Edit} className="mr-2" alt="" />Edit Batch
                        </Button>
                    </header>
                    <div className="">
                        {/* <div>
                            <Image
                                className="h-[150px] w-[150px] rounded-full object-cover"
                                src={"/images/rugby.jpg"}
                                alt=""
                                width="200"
                                height="150"
                            />
                            <div className="mt-8 border border-dashed p-2 border-tertiary-700 lg:block hidden">
                                <div className="flex items-center bg-tertiary-200 p-2 border border-tertiary-400 justify-center">
                                    <div className="text-4xl font-heading mr-3 text-tertiary-700">#15</div>
                                    <div className="leading-4  text-tertiary-700 w-16 text-base">Player Ranking</div>
                                </div>
                            </div>
                        </div> */}

                        <div className="mt-3 lg:mt-0 w-full">
                            <div className="text-3xl font-medium font-heading uppercase text-center lg:text-start text-[#974062]">Volleyball Advance Level</div>
                            <div className="text-center lg:text-start">
                                <div className="mt-4 lg:mt-8 border border-dashed p-2 border-orange-light lg:hidden inline-block mx-auto">
                                    <div className="flex items-center bg-[#FFD2C5] px-2 py-1 border border-[#FFF9F8] justify-center">
                                        <div className="text-4xl font-heading mr-3 text-black">#15</div>
                                        <div className="leading-4  text-black w-16 text-base">Player Ranking</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 md:gap-4">
                                <div className="md:col-span-6 col-span-12">
                                    <div className="contact mt-4">
                                        <div className="line bg-[#974062] md:hidden block "></div>
                                        <div>
                                            <div className="text-sm text-gray-400 mb-2">Coach</div>
                                            <div className="flex items-center">
                                                <Image src={User} className="mr-2 w-9 h-9 rounded-full" alt="" />
                                                <div>
                                                    <div className="font-bold text-gray-600">Andrew Martin (Ass. C)</div>
                                                    <div className="text-[#FF9678] text-sm">Volley, Tennis, Basket</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div className="contact mt-4">
                                        <div className="line bg-[#5CADFF] md:hidden block "></div>
                                        <div>
                                            <div className="text-sm text-gray-400 mb-2">Sport</div>
                                            <div className="font-bold text-gray-600">Volleyball</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="md:col-span-3 col-span-12">
                                    <div className="contact mt-4">
                                        <div className="line bg-[#7F00FF] md:hidden block "></div>
                                        <div>
                                            <div className="text-sm text-gray-400 mb-2"> Max Batch capacity</div>
                                            <div className="font-bold text-gray-600">70</div>
                                        </div>

                                    </div>
                                </div>



                            </div>

                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="grid grid-cols-12 gap-4 mt-10 flex items-end">
                        <div className="col-span-4 grow">
                            <div className="text-[#A0A0A0] text-sm mb-2">Fee Plan</div>
                            <div className="flex items-center bg-[#F3476D] p-3 text-white rounded-lg">
                                <div className="min-w-12 w-12 h-12 rounded-lg bg-[#F78AA2] flex justify-center items-center">
                                    $
                                </div>
                                <div className="ml-2">
                                    <div className="text-sm">Recuring plan name here</div>
                                    <div className="text-2xl font-heading">
                                        $99  <span className="text-sm">/monly</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 grow">
                            <div className="text-[#A0A0A0] text-sm mb-2">Batch Times</div>
                            <div className="flex items-center bg-white p-3 text-black rounded-lg border border-[#F6EAEF]">
                                <div className="w-12 h-12 rounded-lg bg-[#F9F9FB] flex justify-center items-center">
                                    <Image src={Clock} alt="" />
                                </div>
                                <div className="ml-2">
                                    <div className="text-sm text-[#A7AAC9]">Mondey</div>
                                    <div className="text-2xl font-heading">
                                        <span>10:30 <span className="text-sm">Am</span></span>
                                        <span className="ml-2">01:30 <span className="text-sm">Am</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 grow">
                            <div className="flex items-center mb-2 justify-end">
                                <div className="w-6 h-6 rounded-full bg-[#E2BCCB] text-white inline-flex justify-center items-center"><ChevronLeftIcon /></div>
                                <div className="w-6 h-6 rounded-full bg-[#CF8DA7] text-white inline-flex justify-center items-center ml-2"><ChevronRightIcon /></div>
                            </div>
                            <div className="flex items-center bg-white p-3 text-black rounded-lg border border-[#F6EAEF]">
                                <div className="w-12 h-12 rounded-lg bg-[#F9F9FB] flex justify-center items-center">
                                    <Image src={Clock} alt="" />
                                </div>
                                <div className="ml-2">
                                    <div className="text-sm text-[#A7AAC9]">Mondey</div>
                                    <div className="text-2xl font-heading">
                                        <span>10:30 <span className="text-sm">Am</span></span>
                                        <span className="ml-2">01:30 <span className="text-sm">Am</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className="mt-8 tab-slider">
          <Slider {...settings} className="md:block hidden">
            {tabs?.map((tab, index) => {
              return (
                <div
                  className={`rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px] `}
                  onClick={() => {
                    handleClick(tab);
                  }}
                  key={index}

                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="h-[56px] w-[56px] rounded-lg"
                        src={tab?.image}
                        alt={`${tab?.name}_img`}
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="pl-3">
                      <p className={`text-burgundy-light text-base`}>{tab?.label}</p>
                      <div className="font-heading text-5xl leading-10">{tab?.value}</div>
                    </div>
                  </div>
                </div>

              );
            })}
          </Slider>

        </div> */}

                </Card>
            </div>
        </div>



    );
}