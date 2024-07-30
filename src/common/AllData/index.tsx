/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  drills?:boolean,
  setCoachingDrill?:any,
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
  drills,
  setCoachingDrill,
}: AllData) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="bg-s-gray px-6 pb-7">
      <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
        <div className="mb-6 flex items-center justify-between ">
          <div className="font-heading text-2xl font-medium uppercase">
            {!drills ? (
              title
            ) : (
              <div className="flex gap-2">
                <p
                  className="cursor-pointer text-[1.6rem] font-bold text-[#F3476D] hover:border-b-4 hover:border-[#F3476D]"
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                  onClick={() => setCoachingDrill(false)}
                >
                  FITNESS DRILL
                </p>
                <p
                  className=" cursor-pointer text-[1.6rem] font-bold hover:border-b-4 hover:border-[#F3476D] hover:text-[#F3476D]"
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                  onClick={() => setCoachingDrill(true)}
                >
                  COACHING DRILL
                </p>
              </div>
            )}
          </div>
          <div className="hidden items-center lg:flex ">
            {setFilterByName && filterByName && (
              <>
                {" "}
                <div className="relative">
                  <Image
                    src={SearchIcon}
                    className="absolute right-3 top-2 z-10"
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
            {filter && <Filter />}
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
                <Image
                  src={Plus}
                  className=""
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
                      <Image
                        src={Dots}
                        className="rotate-90 transform"
                        alt=""
                      />
                    </button>
                  )}
                  className="w-50 rounded-lg bg-black p-3 text-white"
                >
                  {Object.keys(dropdownItems).map((item:string,index)=>{
                    return(
                      <Dropdown.Item className="text-white hover:bg-black focus:bg-black" key={index}>
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
                onClick={() => handleOpen}
              >
                <Image src={FilterIcon} className="filter-icon  " alt="" />
              </button>
            )}
          </div>
        </div>

        {Object.keys(dropdownItems).length > 0 && (
          <div className="mb-3 hidden  lg:flex">
            {dropdownItems?.attendance && (
              <button className="font-400 rounded bg-gray-500 px-4 py-0.5 text-white">
                Attendance
              </button>
            )}
            {dropdownItems?.reminder && (
              <button className="font-400 ml-2 rounded border border-gray-300 bg-white px-4 py-0.5 text-black">
                Reminder
              </button>
            )}
            {dropdownItems?.freeze && (
              <button className="font-400 ml-2 rounded border border-gray-300 bg-white px-4 py-0.5 text-black">
                Freeze
              </button>
            )}
            {dropdownItems?.changeCenter && (
              <button className="font-400 ml-2 rounded border border-gray-300 bg-white px-4 py-0.5 text-black">
                Change Center
              </button>
            )}
            {dropdownItems?.changeBatch && (
              <button className="font-400 ml-2 rounded border border-gray-300 bg-white px-4 py-0.5 text-black">
                
              </button>
            )}
            {dropdownItems?.delete && (
              <button className="font-400 ml-2 rounded border border-gray-300 bg-white px-4 py-0.5 text-black">
                
              </button>
            )}
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
  );
};

export default AllData;
