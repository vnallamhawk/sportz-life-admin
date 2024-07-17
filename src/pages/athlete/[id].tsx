import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import TableListView from "~/common/TableListView";
import CardTitle from "~/components/Card/CardTitle";
import Image, { StaticImageData } from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import Plus from "../../images/plus.svg";
import BatchImg from "../../images/BatchesImg.png";
import Edit from "../../images/ic_fluent_edit_16_filled.svg";
import SearchIcon from "../../images/search.png";
import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";
import ChevronDown from "../../images/chevron-down.svg";
import AddBatchCenter from "../addBatchCenter";
import BatchDetails from "../batchdetails";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type { Centers } from "@prisma/client";
import {
  centerWiseCountData,
} from "../../__stubs__/dashboardStubs";
import { api } from "~/utils/api";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

// import { type Sports } from "@prisma/client";

// import {
//   type CoachWithRelations,
//   ExperienceLevelEnum,
//   TrainingLevelEnum,
// } from "~/types/coach";
import AddCenterSuccessToast from "~/components/AddCenter/AddCenterSuccessToast";
import { ToastContext } from "~/contexts/Contexts";
// import CoachCertificate from "~/components/Coach/Certificate/CoachCertificates";
// import { dateFormat } from "~/helpers/date";
// import CoachBatch from "~/components/Coach/Batch/CoachBatch";
// import CoachAttendance from "~/components/Coach/Attendance/CoachAttendance";
import CoachTableHeader from "~/components/AllCoaches/CoachTableHeader";
import CoachTableBody from "~/components/AllCoaches/CoachTableBody";
import Search from "~/components/Search";
import Filter from "~/components/Filter/Filter";
import CenterDashCoachTableHeader from "~/components/CenterDashboardTables/Coach/CenterDashCoachTableHeader";
import CenterDashBatchTableHeader from "~/components/CenterDashboardTables/Batch/CenterDashBatchTableHeader";
import CenterDashAthleteTableHeader from "~/components/CenterDashboardTables/Athlete/CenterDashAthleteTableHeader";
import CenterDashInventoryTableHeader from "~/components/CenterDashboardTables/Inventory/CenterDashInventoryTableHeader";
import CenterDashBatchTableBody from "~/components/CenterDashboardTables/Batch/CenterDashBatchTableBody";
import CenterDashCoachTableBody from "~/components/CenterDashboardTables/Coach/CenterDashCoachTableBody";
import CenterDashAthleteTableBody from "~/components/CenterDashboardTables/Athlete/CenterDashAthleteTableBody";
import CenterDashInventoryTableBody from "~/components/CenterDashboardTables/Inventory/CenterDashInventoryTableBody";
import { useRouter } from "next/router";
import Slider from "react-slick";
import Calendar from "react-calendar";
import { BarChart } from "recharts";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context?.params?.id;
//   // const sports = await prisma.sports.findMany();
//   const center = await prisma.centers.findUnique({
//     where: {
//       id: id ? Number(id) : undefined,
//     },
//     include: {
//       CenterSports: {
//         include: {
//           Sports: true,
//         },
//       },
//       CenterInventories: {
//         include: {
//           Inventories: true,
//         },
//       },
//       Batches:{
//         include:{
//           BatchSchedules:true,
//           Sports:true
//         }
//       }
//     },
//   });

//   return {
//     props: {
//       center: JSON.parse(JSON.stringify(center)), // <== here is a solution
//     },
//   };
// };

const tabs = [
  {
    label: "Coaches",
    name: "coaches",
    value: "05",
    image: CoachImg,
    allLabel: "All Coaches",
  },
  {
    label: "Batches",
    name: "batches",
    value: "04",
    image: BatchImg,
    allLabel: "All Batches",
  },
  {
    label: "Atheletes",
    name: "athletes",
    value: "66",
    image: AtheleteImg,
    allLabel: "All Athelte",
  },
  {
    label: "Inventories",
    name: "inventories",
    value: "15",
    image: InventoryImg,
    allLabel: "All Inventory",
  },
];

type TabsType = {
  label: string;
  name: string;
  value: string;
  image: StaticImageData;
  allLabel: string;
};
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Page({ center }: { center: Centers }) {
  const router = useRouter()
  const [displayCertificate, setDisplayCertificate] = useState(false);
  const [displayBatch, setDisplayBatch] = useState(false);
  const [displayAttendance, setDisplayAttendance] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);
  const [value, onChange] = useState<Value>(new Date());

  const handleCertificateClick = () =>
    setDisplayCertificate(!displayCertificate);
  const handleBatchClick = () => setDisplayBatch(!displayBatch);
  const handleAttendanceClick = () => setDisplayAttendance(!displayAttendance);
  const sportsArr: string[] = ["Rugby", "Baseball", "Tennis", "BasketBall"];
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const [finalTabs, setFinalTabs] = useState(tabs);


  // useEffect(()=>{
  //   if(finalTabs && finalTabs.length>0 && Object.keys(center).length>0 ){
  //     const arr=[...finalTabs]
  //     const index=arr?.findIndex((item)=>item?.name==="inventories")
  //     if(index>-1 && center?.CenterInventories){
  //       arr[index].value=center?.CenterInventories?.length
  //     }
  //     const batchIndex=arr?.findIndex((item)=>item?.name==="batches")
  //     if(batchIndex>-1 && center?.Batches){
  //       arr[batchIndex].value=center?.Batches?.length
  //     }
  //     setFinalTabs(arr)
  //   }

  // },[center,finalTabs])


  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const [selectedTab, setSelectedTab] = useState(tabs[1]);
  const [selectedHeader, setSelectedHeader] = useState(
    CenterDashBatchTableHeader()
  );
  const [selectedBody, setSelectedBody] = useState(
    CenterDashBatchTableBody(center?.Batches, center)
    // { name: filterByName },
    // handleIsLoading
  );

  const handleClick = (tab: TabsType) => {
    let header, body;
    setSelectedTab(tab);
    if (tab?.name === "coaches") {
      header = CenterDashCoachTableHeader();
      body = CenterDashCoachTableBody();
    } else if (tab?.name === "batches") {
      header = CenterDashBatchTableHeader();

      body = CenterDashBatchTableBody(center?.Batches, center);
    } else if (tab?.name === "athletes") {
      header = CenterDashAthleteTableHeader();
      body = CenterDashAthleteTableBody();
    } else {
      header = CenterDashInventoryTableHeader();
      body = CenterDashInventoryTableBody(center?.CenterInventories);
    }
    setSelectedHeader(header);
    setSelectedBody(body);
  };
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          initialSlide: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          initialSlide: 1,
          infinite: false,
        }
      }
    ]
  };


  return (
    <>
    {/* <AddBatchCenter /> */}
    {/* <BatchDetails /> */}
      <Card className="h-100 mx-5 md:bg-white md:bg-none bg-gradient-to-r from-[#2D323D] to-[#141720]">
        <header className="lg:flex justify-between items-start  mb-5 hidden ">
          <CardTitle title="ATHLETE DETAILS" />
          <Button onClick={() => router.push(`/edit-center-${center?.id}`)} >
            <Image src={Edit} className="mr-2" alt="" />Edit Athlete
          </Button>
        </header>
        <div className="flex lg:flex-row flex-col items-center lg:items-start">
          <div>
            <Image
              className="h-[150px] w-[150px] rounded-full object-cover"
              src={"/images/rugby.jpg"}
              alt=""
              width="200"
              height="150"
            />
            <div className="mt-8 border border-dashed p-2 border-tertiary-700 lg:block hidden">
              <div className="flex items-center bg-tertiary-200 p-2 border border-tertiary-400 justify-center">
                <div className="text-4xl font-heading mr-3 text-tertiary-700">#15</div>
                <div className="leading-4  text-tertiary-700 w-16 text-base">Player Ranking</div>
              </div>
            </div>
          </div>

          <div className="lg:w-10/12 lg:pl-10 mt-3 lg:mt-0 w-full">
            <div className="text-3xl font-medium font-heading uppercase text-center lg:text-start md:text-black text-white">John H. Martin</div>
            <div className="md:text-blush-dark text-base text-center lg:text-start text-white">Rugby</div>
            <div className="text-center lg:text-start">
              <div className="mt-4 lg:mt-8 border border-dashed p-2 border-orange-light lg:hidden inline-block mx-auto">
                <div className="flex items-center bg-[#FFD2C5] px-2 py-1 border border-[#FFF9F8] justify-center">
                  <div className="text-4xl font-heading mr-3 text-black">#15</div>
                  <div className="leading-4  text-black w-16 text-base">Player Ranking</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 md:gap-4 mt-5">
              <div className="md:col-span-1 col-span-12">
                <div className="contact mt-4">
                  <div className="line bg-[#974062] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Blood Group </div>
                    <div className="font-bold text-gray-600">B Positive </div>
                  </div>
                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#5CADFF] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> contact Number</div>
                    <div className="font-bold text-gray-600">+5 123 456 7890</div>
                  </div>

                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#7F00FF] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Father’s Name</div>
                    <div className="font-bold text-gray-600">Alexander G. Martin </div>
                  </div>

                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#AD5CFF] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Center</div>
                    <div className="font-bold text-gray-600">Indoor Stadium</div>
                  </div>

                </div>
              </div>
              <div className="md:col-span-1 col-span-12">
                <div className="contact mt-4">
                  <div className="line bg-[#F3476D] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Height</div>
                    <div className="font-bold text-gray-600">2.6 CM</div>
                  </div>

                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#007FFF] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Email</div>
                    <div className="font-bold text-gray-600 leading-none">example@email.com</div>
                  </div>

                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#404469] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Residential Address</div>
                    <div className="font-bold text-gray-600">57/3 Kadamtala Bazar,Street 25, Howrah,
                      WB - 7111102</div>
                  </div>

                </div>
              </div>
              <div className="md:col-span-1 col-span-12">
                <div className="contact mt-4">
                  <div className="line bg-[#FF9678] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Weight</div>
                    <div className="font-bold text-gray-600">56 KG</div>
                  </div>
                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#FFA500] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Age</div>
                    <div className="font-bold text-gray-600">16 Years Old</div>
                  </div>

                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#00B65A] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Gender</div>
                    <div className="font-bold text-gray-600">Male</div>
                  </div>

                </div>
                <div className="contact mt-4">
                  <div className="line bg-[#73EDAF] md:hidden block "></div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1"> Training Level</div>
                    <div className="font-bold text-gray-600">Advanced</div>
                  </div>

                </div>
              </div>


            </div>

          </div>
        </div>
        <div className="mt-8 tab-slider">
          <Slider {...settings} className="md:block hidden">
            {tabs?.map((tab, index) => {
              return (
                <div
                  className={`rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px] `}
                  onClick={() => {
                    handleClick(tab);
                  }}
                  key={index}

                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="h-[56px] w-[56px] rounded-lg"
                        src={tab?.image}
                        alt={`${tab?.name}_img`}
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="pl-3">
                      <p className={`text-burgundy-light text-base`}>{tab?.label}</p>
                      <div className="font-heading text-5xl leading-10">{tab?.value}</div>
                    </div>
                  </div>
                </div>

              );
            })}
          </Slider>

        </div>

      </Card>
      <Slider {...settings} className="md:hidden block mt-10 pl-6 tab-slider">
        {tabs?.map((tab, index) => {
          return (
            <div
              className={`rounded-xl bg-[#EAEAEA] `}
              onClick={() => {
                handleClick(tab);
              }}
              key={index}

            >
              <div className="flex items-center py-3 justify-center px-3">
                <div className="pl-3">
                  <p className={`text-black text-xl font-heading`}>{tab?.label}<span className="ml-1">({tab?.value})</span></p>
                </div>
              </div>
            </div>

          );
        })}
      </Slider>
      {/* <CoachCertificate coach={coach} displayCertificate={displayCertificate} />
      <CoachBatch coach={coach} displayBatch={displayBatch} />
      <CoachAttendance coach={coach} displayAttendance={displayAttendance} /> */}

      <Card className="h-100 mx-5 mt-5 bg-white  py-7">
        <header className="md:flex justify-between hidden">
          <CardTitle title="Attendance" />
          <div className="relative">
            <Image src={SearchIcon} className="absolute right-3 top-2 z-10" alt="" />
            <input type="search" className="2xl:min-w-[450px] border-gray-200 focus:border-gray-400 focus:ring-0 relative w-full text-gray-700 bg-transparent pl-4 pr-12 py-2 border-2 placeholder-gray-300 focus:outline-none rounded-lg text-base" placeholder="Search by name" />
          </div>
        </header>
        {/* Attendance view --------------------------------------------------------- */}
        <div className="grid xl:grid-cols-5 grid-cols-6 gap-4 bg-[#FFE5DE] md:bg-white p-6 md:p-0 rounded-[30px]">
          <div className="xl:col-span-1 md:col-span-2 sm:col-span-3 col-span-6">
            <div className={`rounded-xl md:bg-[#404469] md:text-white p-4 pl-10 md:pl-4  bg-white relative shadow-md md:shadow-none`}>
              <div className="line bg-[#404469] md:hidden block"></div>
              <div className="">Total Classes Held</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="xl:col-span-1 md:col-span-2 sm:col-span-3 col-span-6">
            <div className={`rounded-xl md:bg-[#00B65A] md:text-white p-4 pl-10 md:pl-4  bg-white relative shadow-md md:shadow-none`}>
              <div className="line bg-[#00B65A] md:hidden block"></div>
              <div className="">Present</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="xl:col-span-1 md:col-span-2 sm:col-span-3 col-span-6">
            <div className={`rounded-xl md:bg-[#BE1A0E] md:text-white p-4 pl-10 md:pl-4  bg-white relative shadow-md  md:shadow-none`}>
              <div className="line bg-[#BE1A0E] md:hidden block"></div>
              <div className="">Absent</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="xl:col-span-1 md:col-span-2 sm:col-span-3 col-span-6">
            <div className={`rounded-lg md:bg-[#FFA500] md:text-white p-4 pl-10 md:pl-4  bg-white relative  shadow-md md:shadow-none`}>
              <div className="line bg-[#FFA500] md:hidden block"></div>
              <div className="">Late</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
          <div className="xl:col-span-1 md:col-span-2 sm:col-span-3 col-span-6">
            <div className={`rounded-xl md:bg-[#EDEDED] md:text-white p-4 pl-10 md:pl-4  bg-white relative shadow-md md:shadow-none`}>
              <div className="line bg-[#EDEDED] md:hidden block"></div>
              <div className="">Cancelled</div>
              <div className="font-heading text-2xl md:text-5xl">16</div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-5 col-span-12">
              <Card
                title="Calendar View"
                className="border border-gray-200 uppercase"
              >
                <Calendar onChange={onChange} value={value} />
              </Card>
            </div>
            <div className="md:col-span-7 col-span-12">
              <Card
                title=""
                className="border border-gray-200 uppercase"
              >
                <Tabs value="attn">
                  <TabsHeader className="graph-tab">
                    <Tab value={'attn'} color="red-500" activeClassName="active" className="font-heading text-xl shadow-none w-auto uppercase mr-3">
                      Attendance Logs for JUne
                    </Tab>
                    <Tab value={`graph`} color="red" activeClassName="active" className="font-heading text-xl shadow-none w-auto uppercase">
                      Graph
                    </Tab>
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel value={'attn'}>
                      <div className="mt-5 max-h-[370px] overflow-auto px-0 scroll lg:block hidden">
                        <table className="table-auto common-table text-sm w-full min-w-max  text-left border-separate border-spacing-y-3">
                          <tbody>
                            <tr>
                              <td className="p-4 border-y-2 border-gray-100">
                                Sunday 01
                              </td>
                              <td className="p-4 border-y-2 border-gray-100 w-32 font-medium">
                                10:30am
                              </td>
                              <td className="p-4 border-y-2 border-gray-100 font-medium">
                                Present
                              </td>
                              <td className="p-4 border-y-2 border-gray-100 font-medium">
                                <span className="text-sm py-1 border-tertiary-700 bg-tertiary-200 text-tertiary-700 font-normal border px-3 rounded-full capitalize">Fee Clear</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-4 border-y-2 border-gray-100">
                                Sunday 01
                              </td>
                              <td className="p-4 border-y-2 border-gray-100 font-medium">
                                10:30am
                              </td>
                              <td className="p-4 border-y-2 border-gray-100 font-medium">
                                Present
                              </td>
                              <td className="p-4 border-y-2 border-gray-100 font-medium">
                                <span className="text-sm py-1 border-tertiary-700 bg-tertiary-200 text-tertiary-700 font-normal border px-3 rounded-full capitalize">Fee Clear</span>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>

                    </TabPanel>
                    <TabPanel value={`graph`}>
                      <Card
                        title=""
                      >
                        <BarChart data={centerWiseCountData} />
                      </Card>
                    </TabPanel>
                  </TabsBody>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
        {/* Attendance view --------------------------------------------------------- */}

        {/* Batches view --------------------------------------------------------- */}
        <div className="text-2xl mb-2 font-medium font-heading uppercase text-center lg:text-left">Batches</div>
        {/* <TableListView /> */}
        {/* Batches view --------------------------------------------------------- */}


        {/* Payment History --------------------------------------------------------- */}
        <div className="text-2xl mb-2 font-medium font-heading uppercase text-center lg:text-left">Payment History</div>
        <div className="md:block hidden">
          {/* <TableListView /> */}
        </div>

        <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 mb-3 md:hidden">
          <div className="flex items-center">
            <div>
              <div className=" text-2xl font-heading font-medium">$99.00</div>
              <div className="text-sm text-gray-400">Batch Name Goes Here</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Mar 01, 2023</div>
            <div className="text-sm py-1 border-[#974062] bg-[#FFF8FB] text-[#974062] font-normal border px-3 rounded-full capitalize">More Detail</div>
          </div>

        </div>
        <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 mb-3 md:hidden">
          <div className="flex items-center">
            <div>
              <div className=" text-2xl font-heading font-medium">$99.00</div>
              <div className="text-sm text-gray-400">Batch Name Goes Here</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Mar 01, 2023</div>
            <div className="text-sm py-1 border-[#974062] bg-[#FFF8FB] text-[#974062] font-normal border px-3 rounded-full capitalize">More Detail</div>
          </div>

        </div>


        {/* Payment History --------------------------------------------------------- */}

        {/* Assessment --------------------------------------------------------- */}
        <div className="text-2xl mb-2 font-medium font-heading uppercase text-center lg:text-left">Assessment</div>
        <div className="md:block hidden">
          {/* <TableListView /> */}
        </div>
        <div className="md:hidden block">
          <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 mb-3 md:hidden">
            <div className="flex items-center">
              <div>
                <div className="text-[#FFA500]">Upcoming</div>
                <div className=" text-2xl font-heading font-medium">Assessment name here</div>
                <div className="text-sm text-gray-400">One Time</div>
              </div>
            </div>
            <div className="text-center bg-[#EAEAEA] w-11 h-11 rounded-full flex items-center justify-center">
              <Image
                className="w-[16px] h-[9px]"
                src={ChevronDown}
                alt={``}
              />
            </div>
          </div>
          <div className="border border-gray-300 rounded-xl p-4 mb-3 md:hidden">
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <div>
                  <div className="text-[#FFA500]">Upcoming</div>
                  <div className=" text-2xl font-heading font-medium">Assessment name here</div>
                  <div className="text-sm text-gray-400">One Time</div>
                </div>
              </div>
              <div className="text-center bg-[#EAEAEA] w-11 h-11 rounded-full flex items-center justify-center">
                <Image
                  className="w-[16px] h-[9px]"
                  src={ChevronDown}
                  alt={``}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mt-8">
                <div className="text-gray-500 font-bold">Test Date</div>
                <div className="text-gray-700 font-bold">Aug 04, 2023</div>
              </div>
              <hr className="my-5" />
              <div className="flex justify-between items-center mb-8">
                <div className="text-gray-500 font-bold">Overall Score</div>
                <div className="text-gray-700 font-bold">88/100</div>
              </div>
            </div>
          </div>
        </div>
        {/* Assessment --------------------------------------------------------- */}

        {/* Medical History --------------------------------------------------------- */}

        <div className="mt-10 ">
          <div className="text-2xl mb-2 font-medium font-heading uppercase text-center lg:text-left">Medical History</div>

          <div className="mt-5 max-h-[370px] overflow-auto px-0 scroll lg:block hidden">
            <table className="table-fixed common-table w-full min-w-max  text-left border-separate border-spacing-y-3">
              <thead>
                <tr>
                  <th className="pl-7 w-20 text-gray-400 font-medium" >#</th>
                  <th className="text-justify text-gray-400 font-medium">Medical History </th>
                  <th className="w-32 text-gray-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-y-2 border-gray-100 w-20" >01</td>
                  <td className="p-4 border-y-2 border-gray-100  text-justify">
                    <div>
                      Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.AAA
                    </div>
                  </td>
                  <td className="p-4 border-y-2 border-gray-100 w-32 text-gray-400 font-medium">
                    Remove
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-y-2 border-gray-100 w-20" >01</td>
                  <td className="p-4 border-y-2 border-gray-100  text-justify">
                    <div>
                      Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.AAA
                    </div>
                  </td>
                  <td className="p-4 border-y-2 border-gray-100 w-32 text-gray-400 font-medium">
                    Remove
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-y-2 border-gray-100 w-20" >01</td>
                  <td className="p-4 border-y-2 border-gray-100  text-justify">
                    <div>
                      Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.AAA
                    </div>
                  </td>
                  <td className="p-4 border-y-2 border-gray-100 w-32 text-gray-400 font-medium">
                    Remove
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl p-4 mb-3 md:hidden block">
          <div>
            <div className=" text-xl font-medium mb-2">#01 History</div>
            <div className="text-sm text-gray-400">Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.</div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-xl p-4 mb-3 md:hidden block">
          <div>
            <div className=" text-xl font-medium mb-2">#02 History</div>
            <div className="text-sm text-gray-400">Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et blanditiis sunt qui asperiores tempore eos similique veniam aut maxime veniam aut possimus possimus qui voluptatem maiores.</div>
          </div>
        </div>

        {/* Medical History --------------------------------------------------------- */}
      </Card >
    </>
  );
}
