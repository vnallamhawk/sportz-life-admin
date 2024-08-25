import Image from "next/image";
import FilterIcon from "../../images/filter-icon.svg";
import Cross from "../../images/cross.svg";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Slider,
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function Filter({ open,filters ,applyFilters}: { open: boolean ,filters:{[key:string]:any}[],  applyFilters?:(appliedFilters:{[key:string]:any})=>void}) {
  const [filter, setFilter] = useState<boolean>(false);
  const [appliedFilters, setAppliedFilters] = useState<{[key:string]:any}>({});

  useEffect(() => {
    setFilter(open);
  }, [open]);

  const [openAcc, setOpenAcc] = useState<number[]>([]);


  const handleOpenAcc1 = (data:number) =>{
    const arr:number[]=[...openAcc]
        const index=arr.findIndex((item)=>item===data)
        if(index>-1){
            arr.splice(index,1)
        }else{
            arr.push(data)
        }
        setOpenAcc(arr)
  }


  useEffect(()=>{
    if(filters && filters.length>0){
        const arr:number[]=[...openAcc]
        filters.forEach(item => {
            const index = filters.indexOf(item);
            if (index !== -1) {
                arr.push(index);
            }
          });
          setOpenAcc(arr)
    }

  },[filters, openAcc])

  const handleCheck=(id:number,label:string)=>{
    let obj:{[key:string]:any}={...appliedFilters}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const arr:number[]=appliedFilters[label]?[...appliedFilters[label]]:[]
    if(arr.includes(id)){
        const index=arr.findIndex((item)=>item===id)
        arr.splice(index,1)

    }else{
        arr.push(id)
    }
    obj={...obj,[label]:id}
    setAppliedFilters(obj)
  }


  return (
    <>
      <div>
        <button
          className="relative ml-3 hidden rounded-lg border-2 border-gray-200 bg-white py-2.5 pl-4 pr-20 text-sm text-gray-700  focus:outline-none focus:ring-0 lg:block"
          onClick={() => setFilter(!filter)}
        >
          Filter{" "}
          <Image
            width={0}
            height={0}
            src={FilterIcon}
            alt=""
            className="absolute right-2 top-1.5 h-auto w-auto"
          />
        </button>
        <div
          className={`relative bottom-0 left-0 right-0 top-0 z-20 min-h-screen w-full transition-all duration-300 ease-in lg:fixed ${
            filter ? "filter-visible" : "hidden"
          }`}
        >
          <div className="f-overlay hidden h-full w-full bg-black bg-opacity-30"></div>
          <div className="scroll f-screen fixed -right-[355px] bottom-0 top-0 min-h-screen min-w-[355px] max-w-[355px] overflow-auto bg-white p-6 pr-7 transition-all duration-300 ease-in">
            <div className="mb-5 flex items-center justify-between">
              <div className="font-heading text-2xl font-medium">Filter</div>
              <button onClick={() => setFilter(false)}>
                <Image
                  width={0}
                  height={0}
                  src={Cross}
                  alt=""
                  className="h-auto w-auto"
                />
              </button>
            </div>
            {filters && filters.map((filterItem,index)=>{
                return (
                    <Accordion open={openAcc.includes(index)} key={index}>
                    <AccordionHeader
                      className="accordion flex justify-between border-0 pb-0 text-base"
                      onClick={()=>handleOpenAcc1(index)}
                    >
                      <div className="">{filterItem.label}</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`${
                            openAcc.includes(index) ? "" : "rotate-180"
                        } h-4 w-4 transition-transform`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </AccordionHeader>
                    <AccordionBody>
                      <div>
                        
                        {filterItem.type==="multiSelect"?filterItem.data &&
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                          filterItem.data.map((item:{id:number,name:string}) => {
                            return (
                              <div className="mb-3" key={item.id}>
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                                  onChange={()=>handleCheck(item.id,filterItem.id as string)}
                                />
                                <span className="ml-2">{item?.name}</span>
                              </div>
                            );
                          }):
                          <Slider
                            defaultValue={50}
                            className="text-none bg-red-700"
                            barClassName="rounded-none bg-[#F3476D]"
                            thumbClassName=" -mt-1 [&::-webkit-slider-thumb]:appearance-none"
                            // thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                            trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#FEEFF2]"
                          />
                        }
                        {/* <button className="font-medium text-mandy-dark">More</button> */}
                      </div>
                    </AccordionBody>
                  </Accordion>
                )

            })}
            <div className="flex justify-center">
              <button className="mx-2 rounded-lg bg-mandy-dark px-5 py-2 text-white" onClick={()=>{
                if( applyFilters && appliedFilters && Object.keys(appliedFilters).length>0){
                    applyFilters(appliedFilters)
                }

              }
                }>
                Apply Filter
              </button>
              <button className="mx-2 rounded-lg bg-gray-500 px-5 py-2 text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* mobile responsive */}
        <div
          className={`relative bottom-0 left-0 right-0 top-0 z-20 min-h-screen w-full transition-all duration-300 ease-in lg:fixed ${
            filter ? "filter-visible" : "hidden"
          }`}
        >
          <div className="f-overlay hidden h-full w-full bg-black bg-opacity-30"></div>
          <div className="scroll f-screen fixed -right-[355px] bottom-0 top-0 min-h-screen w-full overflow-auto bg-white p-6 pe-7 ps-0 transition-all duration-300 ease-in">
            <div className="flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between ps-6">
                <div className="font-heading text-2xl font-medium">Filter</div>
                <button onClick={() => setFilter(false)}>
                  <Image
                    width={0}
                    height={0}
                    src={Cross}
                    alt=""
                    className="h-auto w-auto"
                  />
                </button>
              </div>
              <div className="mb-5 flex items-center justify-between ps-6">
                <div className="font-heading text-2xl font-medium">Filter</div>
                <div className="text-base font-medium text-gray-600">
                  Clear Filters
                </div>
              </div>
              <div className="min-h filters-mobile grow">
                <Tabs value="Sports" orientation="vertical" className="h-full">
                  <TabsHeader className="w-44 px-0 text-left">
                    <Tab value="Sports">Sports</Tab>
                    <Tab value="centers">Centers</Tab>
                    <Tab value="Batches">Batches</Tab>
                    <Tab value="Age"> Age</Tab>
                    <Tab value="Payment Status">Payment Status</Tab>
                    <Tab value="Gender">Gender</Tab>
                  </TabsHeader>
                  <TabsBody className="pl-4">
                    <TabPanel value="Sports" className="py-0 pl-4">
                      <div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Tennis</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Rugby</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Rugby</span>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="centers" className="py-0 pl-4">
                      <div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Netaji Indoor Stadium</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Netaji Indoor Stadium</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Netaji Indoor Stadium</span>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="Batches" className="py-0 pl-4">
                      <div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">
                            Volley Ball champions Team
                          </span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Rocket Shot Tennis Team</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">
                            Top Class Basketball Batch
                          </span>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="Age" className="py-0 pl-4">
                      <div className="w-96">
                        <Slider
                          defaultValue={50}
                          className="text-none bg-red-700"
                          barClassName="rounded-none bg-[#F3476D]"
                          thumbClassName=" -mt-1 [&::-webkit-slider-thumb]:appearance-none"
                          // thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
                          trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#FEEFF2]"
                        />
                      </div>
                    </TabPanel>

                    <TabPanel value="Payment Status" className="py-0 pl-4">
                      <div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Payment Dues</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Paid</span>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="Gender" className="py-0 pl-4">
                      <div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Male</span>
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                          />
                          <span className="ml-2">Female</span>
                        </div>
                      </div>
                    </TabPanel>
                  </TabsBody>
                </Tabs>
              </div>
              <div className="flex grid grid-cols-2 justify-center py-2 ps-6">
                <div className="col-span-1">
                  <div className="font-heading text-2xl font-medium">146</div>
                  <div className="text-gray-500">Athletes found</div>
                </div>
                <button className="col-span-1 mx-2 rounded-full bg-mandy-dark px-5 py-2 text-white">
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
