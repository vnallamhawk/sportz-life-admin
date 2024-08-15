import React from "react";
import { CgCalendarDates } from "react-icons/cg";
import Button from "~/components/Button";
import Card from "~/components/Card";
import Textbox from "~/components/Textbox";

export default function TotalRevenue() {
    const [startDate, setStartDate] = React.useState(new Date());
    return (
        <div className="bg-s-gray px-6 pb-7">
            <Card className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-medium font-heading ">Total Revenue</div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-end">
                            <div className="text-sm text-[#5A5A5A] font-bold mr-3">Date Range</div>
                            <div className="flex items-center w-3/6">
                                <div>
                                    <Textbox
                                        placeHolder="From"
                                        className="w-full border-r-0 rounded-r-none"
                                    ></Textbox>
                                    <CgCalendarDates className="date-picker-icon"></CgCalendarDates>
                                </div>
                                <div>
                                    <Textbox
                                        placeHolder="To"
                                        className="w-full rounded-l-none rounded-r-none"
                                    ></Textbox>
                                    <CgCalendarDates className="date-picker-icon"></CgCalendarDates>
                                </div>
                                <button className="bg-[#F3476D] py-2 leading-relaxed focus:outline-none focus:ring focus:ring-0 py-2 px-5 rounded-r-lg text-white">Search</button>
                            </div>

                        </div>

                        <button className="bg-[#404469] text-white ml-3 px-5 py-2 rounded-lg">Export Statement</button>
                    </div>

                </div>
                <table className="common-table w-full min-w-max table-auto  border-separate border-spacing-y-3 text-left">
                    <thead>
                        <tr>
                            <th className="w-20 font-medium text-gray-400">ID</th>
                            <th className="w-20 font-medium text-gray-400">Center Name</th>
                            <th className="w-20 font-medium text-gray-400">Batch Name</th>
                            <th className="w-20 font-medium text-gray-400">Batch Fee</th>
                            <th className="w-20 font-medium text-gray-400">Payment Date</th>
                            <th className="w-20 font-medium text-gray-400">Mode of Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >#10020</td>
                            <td >Indoor Stadium</td>
                            <td >Soccer Advanced Team</td>
                            <td >$99.00</td>
                            <td >Mar 01, 2023</td>
                            <td >Net Banking</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>
    )
}