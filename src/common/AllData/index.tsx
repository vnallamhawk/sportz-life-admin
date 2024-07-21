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
  onDeleteClick
}:any) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="bg-s-gray px-6 pb-7">
      <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
        <div className="mb-6 flex items-center justify-between ">
          <div className="font-heading text-2xl font-medium uppercase">
            {title}
          </div>
          <div className=" hidden items-center lg:flex ">
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
                onChange={(e) => setFilterByName(e.target.value)}
                value={filterByName}
              />
            </div>
            {filter && <Filter />}
            <Link href={addButtonUrl}>
              <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                {addButtonText}
              </button>
            </Link>
          </div>
          <div className="flex items-center lg:hidden ">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
              <Image
                src={Plus}
                className=""
                alt=""
                onClick={() => router.push(addButtonUrl)}
              />
            </button>

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
                  {dropdownItems?.attendance && (
                    <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                      Attendance
                    </Dropdown.Item>
                  )}
                  {dropdownItems?.reminder && (
                    <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                      Send Reminder
                    </Dropdown.Item>
                  )}
                  {dropdownItems?.freeze && (
                    <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                      Freeze
                    </Dropdown.Item>
                  )}
                  {dropdownItems?.changeCenter && (
                    <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                      Change Center
                    </Dropdown.Item>
                  )}
                  {dropdownItems?.changeBatch && (
                    <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                      Change Batch
                    </Dropdown.Item>
                  )}
                  {dropdownItems?.delete && (
                    <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                      Delete
                    </Dropdown.Item>
                  )}
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
                Change Batch
              </button>
            )}
            {dropdownItems?.delete && (
              <button className="font-400 ml-2 rounded border border-gray-300 bg-white px-4 py-0.5 text-black">
                Delete
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
