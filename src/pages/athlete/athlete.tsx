import DashboardHeader from "~/components/DashboardHeader";
import Filter from "~/components/Filter";
import Table from "../../components/CommonTable";
import Modal from "../../components/Modal";
import React from "react";

export default function athlete() {
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    return (
        <>
        <div className="px-6 bg-s-gray pb-7 h-full">
            <DashboardHeader />
            <div className="p-6 shadow-sm rounded-2xl bg-white">
                <Filter />
                <div className="flex mb-3 ">
                    <button className="bg-gray-500 text-white py-0.5 px-4 rounded font-400" onClick={handleOpen} >Attendance</button>
                    <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Reminder</button>
                    <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Freeze</button>
                    <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Delete</button>
                    <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Change Center</button>
                    <button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Change Batch</button>
                </div>
                
                <Table />
            </div>
        </div>
        <Modal  />
        </>
    )


}