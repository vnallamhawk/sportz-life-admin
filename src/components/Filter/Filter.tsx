import Image from "next/image";
import SearchIcon from "../../images/search.png";
import FilterIcon from "../../images/filter-icon.svg";
import Cross from "../../images/cross.svg";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
export default function Filter() {
    const [open, setOpen] = React.useState(1);
 
    const handleOpen = (value: any) => setOpen(open === value ? 0 : value);
    return (
        <>
            <div className="flex items-center mb-6 justify-between ">
                <div className="text-2xl font-medium font-heading uppercase">
                    All Athletes
                </div>
                <div className="flex items-center">
                    <div className="relative">
                        <Image src={SearchIcon} className="absolute right-3 top-2 z-10" alt="" />
                        <input type="search" className="2xl:min-w-[450px] border-gray-200 focus:border-gray-400 focus:ring-0 relative w-full text-gray-700 bg-transparent pl-4 pr-12 py-2 border-2 placeholder-gray-300 focus:outline-none rounded-lg text-base" placeholder="Search by name" />
                    </div>
                    <div className="">
                        <button className="ml-3 border-gray-200 focus:ring-0 relative text-gray-700 bg-white pl-4 pr-20 py-2.5 border-2  focus:outline-none rounded-lg text-sm">Filter <Image src={FilterIcon} alt="" className="absolute right-2 top-1.5" /></button>
                        <div className="fixed left-0 right-0 top-0 bottom-0 h-screen w-full z-20 transition-all ease-in duration-300 ">
                            <div className="f-overlay bg-black bg-opacity-30 w-full h-full hidden"></div>
                            <div className="bg-white min-w-[355px] max-w-[355px] h-screen fixed top-0 bottom-0 f-screen -right-[355px] p-6  transition-all ease-in duration-300">
                                <div className="flex justify-between items-center">
                                    <div className="font-heading font-medium text-2xl">Filter</div>
                                    <button><Image src={Cross} alt="" /></button>
                                </div>

                              
                                <Accordion open={open === 1}>
                                    <AccordionHeader onClick={() => handleOpen(1)}>Filter by Sports</AccordionHeader>
                                    <AccordionBody>
                                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                        ourselves and actualize our dreams.
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)}>
                                    Filter by Center
                                    </AccordionHeader>
                                    <AccordionBody>
                                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                        ourselves and actualize our dreams.
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 3}>
                                    <AccordionHeader onClick={() => handleOpen(3)}>
                                    Filter by Batch
                                    </AccordionHeader>
                                    <AccordionBody>
                                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                                        ourselves and actualize our dreams.
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <button className="bg-mandy-dark text-white py-2.5 px-6 rounded-lg ml-3">Add New Athlete</button>
                </div>
            </div>

            <div className="flex mb-8 ">
                <button className="bg-gray-500 text-white py-0.5 px-4 rounded font-400">Attendance</button>
                <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Reminder</button>
                <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Freeze</button>
                <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Delete</button>
                <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Change Center</button>
                <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Change Batch</button>

            </div>

        </>
    )
}
