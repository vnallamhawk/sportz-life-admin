import Image from "next/image";
import Download from "../../../images/download-white.svg";
import DownloadPink from "../../../images/download-pink.svg";


export default function BillingHistory() {

    return (
        <>
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
        </>
    );
}