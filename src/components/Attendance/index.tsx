import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Calendar from "react-calendar";
import { BarChart } from "recharts";
import { Tabs } from "flowbite-react";
import { TabsBody, TabsHeader } from "@material-tailwind/react";
import { Tab, TabPanel } from "react-tabs";
import { useState } from "react";
import { centerWiseCountData } from "../../__stubs__/dashboardStubs";

const Attendance=()=>{
    const [selectedTab,setSelectedTab]=useState('attendance_for_month')
    const [calendarValue,setCalendarValue]=useState()

    const onChange=(value)=>{
        setCalendarValue(value)

    }
    return(
        <Card className="h-100 mx-5 mt-5 bg-white  py-7">
        <header className="hidden justify-between md:flex">
          <CardTitle title="Attendance" />
        </header>
        <div className="grid grid-cols-6 gap-4 rounded-[30px] bg-[#FFE5DE] p-6 md:bg-white md:p-0 xl:grid-cols-5">
          <div className="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
            <div
              className={`relative rounded-xl bg-white p-4 pl-10 shadow-md  md:bg-[#404469] md:pl-4 md:text-white md:shadow-none`}
            >
              <div className="line block bg-[#404469] md:hidden"></div>
              <div className="">Total Classes Held</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
            <div
              className={`relative rounded-xl bg-white p-4 pl-10 shadow-md  md:bg-[#00B65A] md:pl-4 md:text-white md:shadow-none`}
            >
              <div className="line block bg-[#00B65A] md:hidden"></div>
              <div className="">Present</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
            <div
              className={`relative rounded-xl bg-white p-4 pl-10 shadow-md  md:bg-[#BE1A0E] md:pl-4 md:text-white  md:shadow-none`}
            >
              <div className="line block bg-[#BE1A0E] md:hidden"></div>
              <div className="">Absent</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
            <div
              className={`relative rounded-lg bg-white p-4 pl-10 shadow-md  md:bg-[#FFA500] md:pl-4  md:text-white md:shadow-none`}
            >
              <div className="line block bg-[#FFA500] md:hidden"></div>
              <div className="">Late</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 xl:col-span-1">
            <div
              className={`relative rounded-xl bg-white p-4 pl-10 shadow-md  md:bg-[#EDEDED] md:pl-4 md:text-white md:shadow-none`}
            >
              <div className="line block bg-[#EDEDED] md:hidden"></div>
              <div className="">Cancelled</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-5">
              <Card
                title="Calendar View"
                className="border border-gray-200 uppercase"
              >
                <Calendar onChange={onChange} value={calendarValue} />
              </Card>
            </div>
            <div className="col-span-12 md:col-span-7">
              <Card title="" className="border border-gray-200 uppercase">
                <Tabs key={selectedTab}>
                  <TabsHeader className="graph-tab">
                    <Tab
                      value={"attn"}
                      key='attendance_for_month'
                      color="red-500"
                      className={`${selectedTab==="attendance_for_month"?"active":""}w-auto font-heading text-xl uppercase shadow-none`}
                      onClick={()=>setSelectedTab("attendance_for_month")}
                    >
                      Attendance Logs for Month
                    </Tab>
                    <Tab
                      value={`graph`}
                      key='garph'
                      color="red"
                      className={`${selectedTab==="graph"?"active":""}w-auto font-heading text-xl uppercase shadow-none`}
                      onClick={()=>setSelectedTab("garph")}

                    >
                      Graph
                    </Tab>
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel value={"attn"}>
                      <div className="scroll mt-5 hidden max-h-[370px] overflow-auto px-0 lg:block">
                        <table className="common-table w-full min-w-max table-auto border-separate  border-spacing-y-3 text-left text-sm">
                          <tbody>
                            <tr>
                              <td className="border-y-2 border-gray-100 p-4">
                                Sunday 01
                              </td>
                              <td className="w-32 border-y-2 border-gray-100 p-4 font-medium">
                                10:30am
                              </td>
                              <td className="border-y-2 border-gray-100 p-4 font-medium">
                                Present
                              </td>
                              <td className="border-y-2 border-gray-100 p-4 font-medium">
                                <span className="rounded-full border border-tertiary-700 bg-tertiary-200 px-3 py-1 text-sm font-normal capitalize text-tertiary-700">
                                  Fee Clear
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-y-2 border-gray-100 p-4">
                                Sunday 01
                              </td>
                              <td className="border-y-2 border-gray-100 p-4 font-medium">
                                10:30am
                              </td>
                              <td className="border-y-2 border-gray-100 p-4 font-medium">
                                Present
                              </td>
                              <td className="border-y-2 border-gray-100 p-4 font-medium">
                                <span className="rounded-full border border-tertiary-700 bg-tertiary-200 px-3 py-1 text-sm font-normal capitalize text-tertiary-700">
                                  Fee Clear
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabPanel>
                    <TabPanel value={`graph`}>
                      <Card title="">
                        <BarChart data={centerWiseCountData} />
                      </Card>
                    </TabPanel>
                  </TabsBody>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>

     
      </Card>

    )
}

export default Attendance