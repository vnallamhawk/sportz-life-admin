import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Select from "react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Dropdown } from "flowbite-react";
import { Switch } from "@material-tailwind/react";


export default function AddPlans() {
    const options = [
        { value: 'Fee Type: One Time', label: 'Fee Type: One Time' },
        { value: 'Fee Type: Recurring', label: 'Fee Type: Recurring' },
        { value: 'Fee Type: One Time', label: 'Fee Type: One Time' }
    ]
    return (
        <div className="px-6 bg-s-gray pb-7">
            <Card className="col-span-12 lg:col-span-4 h-full p-0 pt-10 bg-white rounded-l-xl !rounded-r-none relative">
                <CardTitle title="ADD FEE PLAN" />
                <div className=" font-medium uppercase text-3xl font-heading text-center lg:text-left" >Fee Plan Details</div>
                <div className="mt-8 grid lg:grid-cols-2 grid-col-1 gap-x-8 lg:gap-y-8 gap-y-4 ">
                    <div >
                        <input type="text" placeholder="Fee Plan Name" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" />
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Fee Plan Name" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" />
                        <div className="dropdown absolute top-0 right-0 h-12 px-3 border-l border-[#d1d5db]">
                            <Dropdown label="" dismissOnClick={false}
                                renderTrigger={() => (
                                    <button className="inline-flex items-center h-full"><span className="grow mr-2">US Dollar</span><ChevronDownIcon width="20px" height="20px" />
                                    </button>
                                )}
                                className="rounded-lg">
                                <Dropdown.Item className="text-start">US Doller</Dropdown.Item>
                                <Dropdown.Item className="text-start">Indian Rupees</Dropdown.Item>
                                <Dropdown.Item className="text-start">Uk doller</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div>
                        <Select
                            options={options}
                            placeholder="Fee Type: One Time"
                            className="w-full border-1 border-gray-300 c-select"
                            classNamePrefix="react-select"
                        />
                    </div>
                    <div>
                        <label>Prorata (Per Class)</label>
                        <div className="switch mt-1">
                            <Switch color="green" defaultChecked />
                            <span className="text-sm ml-5">On</span>
                        </div>
                    </div>

                </div>
                <div className="text-end mt-10">
                    <button
                        className="!border-0 px-5 py-3 lg:py-1.5 lg:rounded rounded-full   focus:ring-0 outline-0 bg-mandy-dark hover:bg-mandy-dark focus:outline-none focus:ring text-white w-full lg:w-auto"
                        type="button"
                    >
                        Add Fee
                    </button>
                </div>
            </Card>
        </div>
    )

}