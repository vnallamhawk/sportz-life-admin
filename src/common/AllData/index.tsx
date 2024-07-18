import Filter from "~/components/Filter";
// import Table from "../../components/CommonTable";
import Modal from "../../components/Modal";
import React from "react";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import FilterIcon from "../../images/filter-icon.svg";
import Dots from "../../images/dots.svg";
// import List from "~/components/CommonList/list";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import TableListView from "~/common/TableListView";
import { useRouter } from "next/router";



const AllData=({title,addButtonText,addButtonUrl,dropdownItems,TABLE_ROWS,TABLE_HEAD,filter=true,filterByName,setFilterByName,rowSelection=true,showImage=true,onViewClick,onEditClick})=>{
    const router=useRouter()
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    
    return (
        <div className="px-6 bg-s-gray pb-7">
        <div className="lg:p-6 shadow-sm rounded-2xl lg:bg-white">
            <div className="flex items-center mb-6 justify-between ">
                <div className="text-2xl font-medium font-heading uppercase">
                    {title}
                </div>
                <div className=" items-center lg:flex hidden ">
                    <div className="relative">
                        <Image src={SearchIcon} className="absolute right-3 top-2 z-10" alt="" />
                        <input type="search" className="2xl:min-w-[450px] border-gray-200 focus:border-gray-400 focus:ring-0 relative w-full text-gray-700 bg-transparent pl-4 pr-12 py-2 border-2 placeholder-gray-300 focus:outline-none rounded-lg text-base" placeholder="Search by name" onChange={(e)=>setFilterByName(e.target.value)} value={filterByName}/>
                    </div>
                   { filter && <Filter />}
                    <Link href={addButtonUrl}>
                        <button className="bg-mandy-dark text-white py-2.5 px-6 rounded-lg ml-3">{addButtonText}</button>
                    </Link>
                </div>
                <div className="flex items-center lg:hidden ">
                    <button className="bg-mandy-dark rounded-full p-3 w-10 h-10 inline-flex justify-center items-center">
                        <Image src={Plus} className="" alt="" onClick={()=>router.push(addButtonUrl)}/>
                    </button>

                  
                    <div className="dropdown">
                        <Dropdown label="Late" dismissOnClick={false} 
                        renderTrigger={() => (
                            <button className="!w-auto px-2.5 bg-gray-300 rounded-full p-3 ml-3 w-10 h-10 max-w-10 inline-flex justify-center items-center">
                            <Image src={Dots} className="transform rotate-90" alt="" />
                        </button>
                          )}
                          className="text-white w-50 bg-black rounded-lg p-3">
                            {dropdownItems?.attendance && <Dropdown.Item className="text-white hover:bg-black focus:bg-black">Attendance</Dropdown.Item>}
                            {dropdownItems?.reminder && <Dropdown.Item className="text-white hover:bg-black focus:bg-black">Send Reminder</Dropdown.Item>}
                            {dropdownItems?.freeze && <Dropdown.Item className="text-white hover:bg-black focus:bg-black">Freeze</Dropdown.Item>}
                           { dropdownItems?.changeCenter && <Dropdown.Item className="text-white hover:bg-black focus:bg-black">Change Center</Dropdown.Item>}
                            {dropdownItems?.changeBatch && <Dropdown.Item className="text-white hover:bg-black focus:bg-black">Change Batch</Dropdown.Item>}
                            {dropdownItems?.delete &&<Dropdown.Item className="text-white hover:bg-black focus:bg-black">Delete</Dropdown.Item>}
                        </Dropdown>
                    </div>
                    <button className="lg:hidden bg-black fixed bottom-24 right-10 rounded-full p-3 w-20 h-20 inline-flex justify-center items-center" onClick={()=>handleOpen}>
                        <Image src={FilterIcon} className="filter-icon  " alt="" />
                    </button>
                </div>
            </div>

            <div className="lg:flex mb-3  hidden">
                { dropdownItems?.attendance &&<button className="bg-gray-500 text-white py-0.5 px-4 rounded font-400"  >Attendance</button>}
                {dropdownItems?.reminder &&<button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Reminder</button>}
                {dropdownItems?.freeze &&<button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Freeze</button>}
                {dropdownItems?.changeCenter &&<button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Change Center</button>}
                {dropdownItems?.changeBatch &&<button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Change Batch</button>}
                {dropdownItems?.delete &&<button className="bg-white text-black border border-gray-300 py-0.5 px-4 rounded font-400 ml-2">Delete</button>}

            </div>
            <TableListView TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} rowSelection={rowSelection} showImage={showImage} onViewClick={onViewClick} onEditClick={onEditClick}/>
            
        </div>
    </div>
    )
}

export default AllData