import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Select from "react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Dropdown } from "flowbite-react";
import { Switch } from "@material-tailwind/react";


export default function AddPost() {
  const options = [
    { value: 'Fee Type: One Time', label: 'Fee Type: One Time' },
    { value: 'Fee Type: Recurring', label: 'Fee Type: Recurring' },
    { value: 'Fee Type: One Time', label: 'Fee Type: One Time' }
  ]
  return (
    <div className="px-6 bg-s-gray pb-7">
      <Card className="col-span-12 lg:col-span-4 h-full p-0 pt-10 bg-white rounded-l-xl !rounded-r-none relative">
        <CardTitle title="Add Post" />
        <div className=" font-medium uppercase text-3xl font-heading text-center lg:text-left" >Post Details</div>
        <div className="mt-8 grid lg:grid-cols-2 grid-col-1 gap-x-8 lg:gap-y-8 gap-y-4 ">
          <div >
            <input type="text" placeholder="Post Title" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" />
          </div>
          <div className="relative">
            <input type="text" placeholder="Upload Invoice: Add Image/File" className="w-full h-12 rounded-lg border-1 border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600" />
            <label className="absolute top-2.5 right-0 h-12 px-3">
              <input type="file" className="hidden" />
              <div className="border-[#FF9678] border text-[#FF9678] px-3.5 rounded-md cursor-pointer">Add</div>
            </label>
          </div>
        </div>
        <div className="mt-8">
          <textarea
            className="min-h-[246px] w-full resize-y rounded-lg border border-solid border-gray-300 px-5 py-2 focus:ring-0"
            placeholder="Post Details"
          ></textarea>
        </div>

        <div className="mt-6">
          <div className="switch mt-1">
            <Switch color="green" defaultChecked />
            <span className="text-sm ml-5">Show Post</span>
          </div>
        </div>
        <div className="text-end mt-10">
          <button
            className="!border-0 px-5 py-3 lg:py-1.5 lg:rounded rounded-full   focus:ring-0 outline-0 bg-mandy-dark hover:bg-mandy-dark focus:outline-none focus:ring text-white w-full lg:w-auto"
            type="button"
          >
            Add Post
          </button>
        </div>
      </Card>
    </div>
  )

}