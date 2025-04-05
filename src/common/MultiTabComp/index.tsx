import Filter from "~/components/Filter";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import FilterIcon from "../../images/filter-icon.svg";
import Link from "next/link";
import TableListView from "~/common/TableListView";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface MultiTabCompProps {
  tab1label?: string;
  tab2label?: string;
  tab3label?: string;
  addButtonText?: string;
  addButtonUrl?: string;
  dropdownItems?: any;
  table1show?: boolean;
  table2show?: boolean;
  table3show?: boolean;
  table2Component?: any;
  table3Component?: any;
  TABLE1_HEAD: { label: string; id: string }[];
  TABLE1_ROWS: { [key: string]: any; id: number }[];
  TABLE2_HEAD?: { label: string; id: string }[];
  TABLE2_ROWS?: { [key: string]: any; id: number }[];
  TABLE3_HEAD?: { label: string; id: string }[];
  TABLE3_ROWS?: { [key: string]: any; id: number }[];
  setFilterByName?: any;
  filterByName?: string;
  onViewClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  filters?: { [key: string]: any }[];
  applyFilters?: (appliedFilters: { [key: string]: any }) => void;
  activeKey: string;
  setActiveKey: any;
  filter?: boolean;
  totalPages?: number;
  currentPage?: number;
  onHandlePageChange?: (page: number) => void;
}

const MultiTabComp = ({
  tab1label,
  tab2label,
  tab3label,
  addButtonText,
  addButtonUrl,
  table1show,
  table2show,
  table3show,
  TABLE1_HEAD,
  filters,
  applyFilters,
  TABLE1_ROWS,
  TABLE2_HEAD,
  TABLE2_ROWS,
  TABLE3_HEAD,
  TABLE3_ROWS,
  setFilterByName,
  filterByName,
  filter = true,
  onViewClick,
  onEditClick,
  onDeleteClick,
  activeKey,
  setActiveKey,
  table2Component,
  table3Component,
  totalPages,
  currentPage,
  onHandlePageChange,
  dropdownItems
}: MultiTabCompProps) => {
  const router = useRouter();

  const GiveTabValue = (val?: string) => {
    return val ? val.split(" ").map((item) => item.toLowerCase()).join("_") : "";
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const tab1value = GiveTabValue(tab1label!);
  const tab2value = GiveTabValue(tab2label!);
  const tab3value = GiveTabValue(tab3label!);


  return (
    <>
      {/* <Checkout /> */}
      <div className="bg-s-gray px-6 pb-7">
        <div className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
          <Tabs value={tab1value} activeKey={activeKey}>
            <div className="pricing-tabs mb-6 flex items-center justify-center lg:justify-between">
              <TabsHeader
                className="pricing-tabs justify-center lg:justify-start"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                }}
              >
                <Tab
                  value={tab1value}
                  className={`${activeKey === "0" ? "active" : ""
                    } text-nowrap w-1/2 bg-[#EAEAEA] px-0 font-heading text-2xl lg:w-auto lg:bg-transparent lg:font-medium lg:uppercase`}
                  key={"0"}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                  onClick={() => setActiveKey("0")}
                >
                  {tab1label}
                </Tab>
                <Tab
                  value={tab2value}
                  className={`${activeKey === "1" ? "active" : ""
                    } text-nowrap ml-4 w-1/2 bg-[#EAEAEA] px-0 font-heading text-2xl lg:w-auto lg:bg-transparent lg:font-medium lg:uppercase`}
                  key={"1"}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                  onClick={() => setActiveKey("1")}
                >
                  {tab2label}
                </Tab>

                <Tab
                  value={tab3value}
                  className={`${activeKey === "2" ? "active" : ""
                    } text-nowrap ml-4 w-1/2 bg-[#EAEAEA] px-0 font-heading text-2xl lg:w-auto lg:bg-transparent lg:font-medium lg:uppercase`}
                  key={"1"}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                  onClick={() => setActiveKey("2")}
                >
                  {tab3label}
                </Tab>
              </TabsHeader>

              <div className=" hidden items-center lg:flex ">
                {filterByName && setFilterByName && (
                  <div className="relative">
                    <Image
                      width={0}
                      height={0}
                      src={SearchIcon}
                      className="absolute right-3 top-2 z-10 h-auto w-auto"
                      alt=""
                    />
                    <input
                      type="search"
                      className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                      placeholder="Search by name"
                      value={filterByName}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                      onChange={(e: any) => setFilterByName(e.target.value)}
                    />
                  </div>
                )}
                {filter && filters && applyFilters && filters.length > 0 && (
                  <Filter
                    open={open}
                    filters={filters}
                    applyFilters={applyFilters}
                  />
                )}
                {addButtonText && <Link
                  href={{
                    pathname: addButtonUrl,
                    query: {
                      search: activeKey === "0" ? tab1label : tab2label,
                    },
                  }}
                >
                  <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                    {addButtonText}
                  </button>
                </Link>}
              </div>
            </div>

            <TabsBody>
              {table1show ? (
                <TabPanel value={tab1value}>
                  <TableListView
                    TABLE_HEAD={TABLE1_HEAD}
                    TABLE_ROWS={TABLE1_ROWS}
                    rowSelection={true}
                    showImage={true}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onViewClick={onViewClick}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onHandlePageChange={onHandlePageChange}
                  />
                </TabPanel>
              ) : null}

              <TabPanel value={tab2value} className="px-2">
                {table2show ? (
                  <TableListView
                    TABLE_HEAD={TABLE2_HEAD!}
                    TABLE_ROWS={TABLE2_ROWS!}
                    rowSelection={true}
                    showImage={true}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onViewClick={onViewClick}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onEditClick={onEditClick}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onHandlePageChange={onHandlePageChange}
                  />
                ) : (
                  table2Component
                )}
              </TabPanel>

              <TabPanel value={tab3value} className="px-2">
                {table3show ? (
                  <TableListView
                    TABLE_HEAD={TABLE3_HEAD!}
                    TABLE_ROWS={TABLE3_ROWS!}
                    rowSelection={true}
                    showImage={true}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onViewClick={onViewClick}
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onEditClick={onEditClick}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onHandlePageChange={onHandlePageChange}
                  />
                ) : (
                  table3Component
                )}
              </TabPanel>

            </TabsBody>
          </Tabs>

          <div className="flex items-center lg:hidden ">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
              <Image
                width={0}
                height={0}
                src={Plus}
                className="h-auto w-auto"
                alt=""
              />
            </button>

            <button
              className="fixed bottom-24 right-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-black p-3 lg:hidden"
              onClick={() => handleOpen}
            >
              <Image
                width={0}
                height={0}
                src={FilterIcon}
                className="filter-icon  h-auto w-auto"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiTabComp;
