import Image from "next/image";
import FilterIcon from "../../images/filter-icon.svg";
import Cross from "../../images/cross.svg";
import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Slider,
} from "@material-tailwind/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

export default function Filter() {

    const [openAcc1, setOpenAcc1] = React.useState(true);
    const [openAcc2, setOpenAcc2] = React.useState(true);
    const [openAcc3, setOpenAcc3] = React.useState(true);
    const [openAcc4, setOpenAcc4] = React.useState(true);
    const [openAcc5, setOpenAcc5] = React.useState(true);
    const [openAcc6, setOpenAcc6] = React.useState(true);

    const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
    const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
    const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);
    const handleOpenAcc4 = () => setOpenAcc4((cur) => !cur);
    const handleOpenAcc5 = () => setOpenAcc5((cur) => !cur);
    const handleOpenAcc6 = () => setOpenAcc6((cur) => !cur);
    return (
        <>
            <div >
                <button className="lg:block hidden ml-3 border-gray-200 focus:ring-0 relative text-gray-700 bg-white pl-4 pr-20 py-2.5 border-2  focus:outline-none rounded-lg text-sm">Filter <Image src={FilterIcon} alt="" className="absolute right-2 top-1.5" /></button>
                <div className="relative lg:fixed left-0 right-0 top-0 bottom-0 min-h-screen w-full z-20 transition-all ease-in duration-300 hidden">
                            <div className="f-overlay bg-black bg-opacity-30 w-full h-full hidden"></div>
                            <div className="bg-white min-w-[355px] max-w-[355px] min-h-screen overflow-auto scroll fixed top-0 bottom-0 f-screen -right-[355px] p-6 pr-7 transition-all ease-in duration-300">
                                <div className="flex justify-between items-center mb-5">
                                    <div className="font-heading font-medium text-2xl">Filter</div>
                                    <button><Image src={Cross} alt="" /></button>
                                </div>
                                <Accordion open={openAcc1}>
                                    <AccordionHeader className="accordion text-base border-0 pb-0 flex justify-between" onClick={handleOpenAcc1}>
                                        <div className="">Filter by Sports</div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`${openAcc1 === true ? "" : "rotate-180"} h-4 w-4 transition-transform`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Tennis</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Rugby</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Rugby</span>
                                            </div>
                                            <button className="text-mandy-dark font-medium">More</button>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={openAcc2}>
                                    <AccordionHeader className="accordion text-base border-0 pb-0 flex justify-between" onClick={handleOpenAcc2}>
                                        <div className="">Filter by Center</div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`${openAcc2 === true ? "" : "rotate-180"} h-4 w-4 transition-transform`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Biswa Bharati Stadium</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Netaji Indoor Stadium</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Bijoygorh Sports Ground</span>
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={openAcc3} >
                                    <AccordionHeader onClick={handleOpenAcc3} className="accordion text-base border-0 pb-0 flex justify-between">
                                        <div className="">Filter by Batch</div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`${openAcc3 === true ? "" : "rotate-180"} h-4 w-4 transition-transform`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>

                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Volley Ball champions Team</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Rocket Shot Tennis Team</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Top Class Basketball Batch</span>
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={openAcc4} >
                                    <AccordionHeader onClick={handleOpenAcc4} className="accordion text-base border-0 pb-0 flex justify-between">
                                        <div className="">Filter by Age</div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`${openAcc3 === true ? "" : "rotate-180"} h-4 w-4 transition-transform`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>

                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div className="w-96">
                                            <Slider
                                                defaultValue={50}
                                                className="text-none bg-red-700"
                                                barClassName="rounded-none bg-[#F3476D]"
                                                thumbClassName=" -mt-1 [&::-webkit-slider-thumb]:appearance-none"
                                                // thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                                                trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#FEEFF2]"
                                            />
        
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={openAcc5} >
                                    <AccordionHeader onClick={handleOpenAcc5} className="accordion text-base border-0 pb-0 flex justify-between">
                                        <div className="">Filter by Fee Payment Status</div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`${openAcc3 === true ? "" : "rotate-180"} h-4 w-4 transition-transform`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>

                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Payment Dues</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Paid</span>
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={openAcc6} >
                                    <AccordionHeader onClick={handleOpenAcc6} className="accordion text-base border-0 pb-0 flex justify-between">
                                        <div className="">Filter by Gender</div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className={`${openAcc3 === true ? "" : "rotate-180"} h-4 w-4 transition-transform`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>

                                    </AccordionHeader>
                                    <AccordionBody>
                                        <div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Male</span>
                                            </div>
                                            <div className="mb-3">
                                                <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                <span className="ml-2">Female</span>
                                            </div>
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                             <div className="flex justify-center">
                                <button className="bg-mandy-dark rounded-lg px-5 py-2 text-white mx-2">Apply Filter</button>
                                <button className="bg-gray-500 rounded-lg px-5 py-2 text-white mx-2">Cancel</button>
                             </div>
                            </div>
                        </div>


                {/* mobile responsive */}
                {/* <div className="relative lg:fixed left-0 right-0 top-0 bottom-0 min-h-screen w-full z-20 transition-all ease-in duration-300  filter-visible">
                    <div className="f-overlay bg-black bg-opacity-30 w-full h-full hidden"></div>
                    <div className="bg-white w-full min-h-screen overflow-auto scroll fixed top-0 bottom-0 f-screen -right-[355px] p-6 pe-7 ps-0 transition-all ease-in duration-300">
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center mb-5 ps-6">
                                <div className="font-heading font-medium text-2xl">Filter</div>
                                <button><Image src={Cross} alt="" /></button>
                            </div>
                            <div className="flex justify-between items-center mb-5 ps-6">
                                <div className="font-heading font-medium text-2xl">Filter</div>
                                <div className="text-gray-600 font-medium text-base">Clear Filters</div>
                            </div>
                            <div className="min-h grow filters-mobile">
                                <Tabs value="Sports" orientation="vertical" className="h-full">
                                    <TabsHeader className="w-44 text-left px-0">
                                        <Tab value="Sports">Sports</Tab>
                                        <Tab value="centers">Centers</Tab>
                                        <Tab value="Batches">Batches</Tab>
                                        <Tab value="Age"> Age</Tab>
                                        <Tab value="Payment Status">Payment Status</Tab>
                                        <Tab value="Gender">Gender</Tab>

                                    </TabsHeader>
                                    <TabsBody className="pl-4">
                                        <TabPanel value="Sports" className="py-0 pl-4">
                                            <div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Tennis</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Rugby</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Rugby</span>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="centers" className="py-0 pl-4">
                                            <div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Netaji Indoor Stadium</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Netaji Indoor Stadium</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Netaji Indoor Stadium</span>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="Batches" className="py-0 pl-4">
                                            <div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Volley Ball champions Team</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Rocket Shot Tennis Team</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Top Class Basketball Batch</span>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="Age" className="py-0 pl-4">
                                            <div className="w-96">
                                                <Slider
                                                    defaultValue={50}
                                                    className="text-none bg-red-700"
                                                    barClassName="rounded-none bg-[#F3476D]"
                                                    thumbClassName=" -mt-1 [&::-webkit-slider-thumb]:appearance-none"
                                                    // thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                                                    trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#FEEFF2]"
                                                />

                                            </div>
                                        </TabPanel>

                                        <TabPanel value="Payment Status" className="py-0 pl-4">
                                            <div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Payment Dues</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Paid</span>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="Gender" className="py-0 pl-4">
                                            <div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Male</span>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                                    <span className="ml-2">Female</span>
                                                </div>
                                            </div>
                                        </TabPanel>

                                    </TabsBody>
                                </Tabs>
                            </div>
                            <div className="flex justify-center grid grid-cols-2 py-2 ps-6">
                                <div className="col-span-1">
                                    <div className="font-heading font-medium text-2xl">146</div>
                                    <div className="text-gray-500">Athletes found</div>
                                </div>
                                <button className="col-span-1 bg-mandy-dark rounded-full px-5 py-2 text-white mx-2">Apply Filter</button>

                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

        </>
    )
}
