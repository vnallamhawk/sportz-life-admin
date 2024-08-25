/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Filter from "~/components/Filter";
// import Table from "../../components/CommonTable";
import React, { useState } from "react";
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
import FreezeModal from "~/components/Modal/FreezeModal";
import SendReminderModal from "~/components/Modal/SendReminderModal";
import AttendanceModal from "~/components/Modal/AttendanceModal";
import ChangeCenterModal from "~/components/Modal/ChangeCenterModal";
import ChangeBatchModal from "~/components/Modal/ChangeBatchModal";


interface AllData{
  title:string,
  addButtonText?:string,
  addButtonUrl?:string,
  dropdownItems:{changeBatch?:boolean;delete?:boolean;attendance?:boolean;changeCenter?:boolean;reminder?:boolean;freeze?:boolean},
  TABLE_ROWS:{[key:string]:any,id:number}[],
  TABLE_HEAD: { label: string; id: string }[],
  filter?:boolean,
  filterByName?:string,
  setFilterByName?:any,
  rowSelection :boolean,
  showImage ?:boolean,
  onViewClick?:(id:number)=>void,
  onEditClick?:(id:number)=>void,
  onDeleteClick?:(id:number)=>void,
  filters?:{[key:string]:any}[],
  applyFilters?:(appliedFilters:{[key:string]:any})=>void
}



const dropdownData:{[key:string]:string}={
  changeBatch:"Change Batch",
  delete:"Delete",
  attendance:"Attendance",
  changeCenter:"Change Center",
  reminder:"Send Reminder",
  freeze:"Freeze"
}

const AllData = ({
  title,
  addButtonText,
  addButtonUrl,
  dropdownItems,
  TABLE_ROWS,
  TABLE_HEAD,
  filter = true,
  filterByName,
  setFilterByName,
  rowSelection = true,
  showImage = true,
  onViewClick,
  onEditClick,
  onDeleteClick,
  filters,
  applyFilters
}: AllData) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedComponent,setSelectedComponent]=useState<string>("")

  const handleOpen = () => setOpen(!open);

  

  return (
    <>
    <div className="bg-s-gray px-6 pb-7">
      <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
        <div className="mb-6 flex items-center justify-between ">
          <div className="font-heading text-2xl font-medium uppercase">
          </div>
          <div className="hidden items-center lg:flex ">
            {setFilterByName && filterByName && (
              <>
                {" "}
                <div className="relative">
                  <Image width={0} height={0}
                    src={SearchIcon}
                    className="absolute right-3 top-2 z-10 w-auto h-auto"
                    alt=""
                  />
                  <input
                    type="search"
                    className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                    placeholder="Search by name"
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                    onChange={(e) => setFilterByName(e.target.value)}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    value={filterByName}
                  />
                </div>
              </>
            )}
            {filter &&filters && applyFilters &&  filters.length>0 && <Filter open={open} filters={filters} applyFilters={applyFilters}/>}
            {addButtonUrl && (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <Link href={addButtonUrl}>
                <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                  {addButtonText}
                </button>
              </Link>
            )}
          </div>
          <div className="flex items-center lg:hidden ">
            {addButtonUrl && (
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                <Image width={0} height={0}
                  src={Plus}
                  className="w-auto h-auto"
                  alt=""
                  onClick={() => void router.push(addButtonUrl)}
                />
              </button>
            )}

            {Object.keys(dropdownItems).length > 0 && (
              <div className="dropdown">
                <Dropdown
                  label="Late"
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button className="max-w-10 ml-3 inline-flex h-10 !w-auto w-10 items-center justify-center rounded-full bg-gray-300 p-3 px-2.5">
                      <Image width={0} height={0}
                        src={Dots}
                        className="rotate-90 transform w-auto h-auto"
                        alt=""
                      />
                    </button>
                  )}
                  className="w-50 rounded-lg bg-black p-3 text-white"
                >
                  {Object.keys(dropdownItems).map((item:string,index)=>{
                    return(
                      <Dropdown.Item className="text-white hover:bg-black focus:bg-black" key={index} onClick={()=>setSelectedComponent(item)}>
                      {dropdownData[item]}
                    </Dropdown.Item>
                    )
                  })}
                </Dropdown>
              </div>
            )}
            {filter && (
              <button
                className="fixed bottom-24 right-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-black p-3 lg:hidden"
                onClick={() => handleOpen()}
              >
                <Image width={0} height={0} src={FilterIcon} className="filter-icon w-auto h-auto " alt="" />
              </button>
            )}
          </div>
        </div>

        {Object.keys(dropdownItems).length > 0 && (
          <div className="mb-3 hidden  lg:flex">
           {Object.keys(dropdownItems).map((item:string,index)=>{
                    return(
                      // eslint-disable-next-line react/jsx-key
                      <button className="font-400 rounded bg-gray-500 px-4 py-0.5 text-white mr-3" onClick={()=>setSelectedComponent(item)}>
                {dropdownData[item]}
              </button>
                    
                    )
                  })}
          </div>
        )}
        <TableListView
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          rowSelection={rowSelection}
          showImage={showImage}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
    <FreezeModal selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
    <SendReminderModal selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
<ChangeCenterModal selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
<ChangeBatchModal selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
<AttendanceModal selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent}/>
    </>
  );
};

export default AllData;
