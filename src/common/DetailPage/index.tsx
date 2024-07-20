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
import { centerWiseCountData } from "../../__stubs__/dashboardStubs";
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

const DetailPage = ({
  cardTitle,
  editButtonClick,
  editText,
  ranking,
  name,
  description,
  details,
  tabs
}) => {
  const router = useRouter();
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
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
          initialSlide: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
          initialSlide: 1,
          infinite: false,
        },
      },
    ],
  };

  return (
    <>
      {/* <AddBatchCenter /> */}
      {/* <BatchDetails /> */}
      <Card className="h-100 mx-5 bg-gradient-to-r from-[#2D323D] to-[#141720] md:bg-white md:bg-none">
        <header className="mb-5 hidden items-start  justify-between lg:flex ">
          <CardTitle title={cardTitle} />
          <Button onClick={editButtonClick}>
            <Image src={Edit} className="mr-2" alt="" />
            {editText}
          </Button>
        </header>
        <div className="flex flex-col items-center lg:flex-row lg:items-start">
          <div>
            <Image
              className="h-[150px] w-[150px] rounded-full object-cover"
              src={"/images/rugby.jpg"}
              alt=""
              width="200"
              height="150"
            />
            {ranking && (
              <div className="mt-8 hidden border border-dashed border-tertiary-700 p-2 lg:block">
                <div className="flex items-center justify-center border border-tertiary-400 bg-tertiary-200 p-2">
                  <div className="mr-3 font-heading text-4xl text-tertiary-700">
                    #{ranking}
                  </div>
                  <div className="w-16  text-base leading-4 text-tertiary-700">
                    Player Ranking
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 w-full lg:mt-0 lg:w-10/12 lg:pl-10">
            <div className="text-center font-heading text-3xl font-medium uppercase text-white md:text-black lg:text-start">
              {name}
            </div>
            <div className="text-center text-base text-white md:text-blush-dark lg:text-start">
              {description}
            </div>
            {ranking && (
              <div className="text-center lg:text-start">
                <div className="mx-auto mt-4 inline-block border border-dashed border-orange-light p-2 lg:mt-8 lg:hidden">
                  <div className="flex items-center justify-center border border-[#FFF9F8] bg-[#FFD2C5] px-2 py-1">
                    <div className="mr-3 font-heading text-4xl text-black">
                      #{ranking}
                    </div>
                    <div className="w-16  text-base leading-4 text-black">
                      Player Ranking
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 grid grid-cols-3 md:gap-4">
              {details?.map((row, rowIndex) => {
                return (
                  <div className="col-span-12 md:col-span-1" key={rowIndex}>
                    {row?.items?.map((item, index) => {
                      return (
                        <div className="contact mt-4" key={index}>
                          <div className="line block bg-[#974062] md:hidden "></div>
                          <div>
                            <div className="mb-1 text-sm text-gray-400">
                              {item?.label}{" "}
                            </div>
                            <div className="font-bold text-gray-600">
                              {item?.value}{" "}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="tab-slider mt-8">
          <Slider {...settings} className="hidden md:block">
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
                      <p className={`text-base text-burgundy-light`}>
                        {tab?.label}
                      </p>
                      <div className="font-heading text-5xl leading-10">
                        {tab?.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </Card>
      <Slider {...settings} className="tab-slider mt-10 block pl-6 md:hidden">
        {tabs?.map((tab, index) => {
          return (
            <div
              className={`rounded-xl bg-[#EAEAEA] `}
              onClick={() => {
                handleClick(tab);
              }}
              key={index}
            >
              <div className="flex items-center justify-center px-3 py-3">
                <div className="pl-3">
                  <p className={`font-heading text-xl text-black`}>
                    {tab?.label}
                    <span className="ml-1">({tab?.value})</span>
                  </p>
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
        <header className="hidden justify-between md:flex">
          <CardTitle title="Attendance" />
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
            />
          </div>
        </header>
        {/* Attendance view --------------------------------------------------------- */}
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
                <Calendar onChange={onChange} value={value} />
              </Card>
            </div>
            <div className="col-span-12 md:col-span-7">
              <Card title="" className="border border-gray-200 uppercase">
                <Tabs value="attn">
                  <TabsHeader className="graph-tab">
                    <Tab
                      value={"attn"}
                      color="red-500"
                      activeClassName="active"
                      className="mr-3 w-auto font-heading text-xl uppercase shadow-none"
                    >
                      Attendance Logs for JUne
                    </Tab>
                    <Tab
                      value={`graph`}
                      color="red"
                      activeClassName="active"
                      className="w-auto font-heading text-xl uppercase shadow-none"
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
        {/* Attendance view --------------------------------------------------------- */}

        {/* Batches view --------------------------------------------------------- */}
        <div className="mb-2 text-center font-heading text-2xl font-medium uppercase lg:text-left">
          Batches
        </div>
        {/* <TableListView /> */}
        {/* Batches view --------------------------------------------------------- */}

        {/* Payment History --------------------------------------------------------- */}
        <div className="mb-2 text-center font-heading text-2xl font-medium uppercase lg:text-left">
          Payment History
        </div>
        <div className="hidden md:block">{/* <TableListView /> */}</div>

        <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-300 p-4 md:hidden">
          <div className="flex items-center">
            <div>
              <div className=" font-heading text-2xl font-medium">$99.00</div>
              <div className="text-sm text-gray-400">Batch Name Goes Here</div>
            </div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-sm text-gray-400">Mar 01, 2023</div>
            <div className="rounded-full border border-[#974062] bg-[#FFF8FB] px-3 py-1 text-sm font-normal capitalize text-[#974062]">
              More Detail
            </div>
          </div>
        </div>
        <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-300 p-4 md:hidden">
          <div className="flex items-center">
            <div>
              <div className=" font-heading text-2xl font-medium">$99.00</div>
              <div className="text-sm text-gray-400">Batch Name Goes Here</div>
            </div>
          </div>
          <div className="text-center">
            <div className="mb-1 text-sm text-gray-400">Mar 01, 2023</div>
            <div className="rounded-full border border-[#974062] bg-[#FFF8FB] px-3 py-1 text-sm font-normal capitalize text-[#974062]">
              More Detail
            </div>
          </div>
        </div>

        {/* Payment History --------------------------------------------------------- */}

        {/* Assessment --------------------------------------------------------- */}
        <div className="mb-2 text-center font-heading text-2xl font-medium uppercase lg:text-left">
          Assessment
        </div>
        <div className="hidden md:block">{/* <TableListView /> */}</div>
        <div className="block md:hidden">
          <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-300 p-4 md:hidden">
            <div className="flex items-center">
              <div>
                <div className="text-[#FFA500]">Upcoming</div>
                <div className=" font-heading text-2xl font-medium">
                  Assessment name here
                </div>
                <div className="text-sm text-gray-400">One Time</div>
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAEAEA] text-center">
              <Image className="h-[9px] w-[16px]" src={ChevronDown} alt={``} />
            </div>
          </div>
          <div className="mb-3 rounded-xl border border-gray-300 p-4 md:hidden">
            <div className="flex items-center justify-between ">
              <div className="flex items-center">
                <div>
                  <div className="text-[#FFA500]">Upcoming</div>
                  <div className=" font-heading text-2xl font-medium">
                    Assessment name here
                  </div>
                  <div className="text-sm text-gray-400">One Time</div>
                </div>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAEAEA] text-center">
                <Image
                  className="h-[9px] w-[16px]"
                  src={ChevronDown}
                  alt={``}
                />
              </div>
            </div>
            <div>
              <div className="mt-8 flex items-center justify-between">
                <div className="font-bold text-gray-500">Test Date</div>
                <div className="font-bold text-gray-700">Aug 04, 2023</div>
              </div>
              <hr className="my-5" />
              <div className="mb-8 flex items-center justify-between">
                <div className="font-bold text-gray-500">Overall Score</div>
                <div className="font-bold text-gray-700">88/100</div>
              </div>
            </div>
          </div>
        </div>
        {/* Assessment --------------------------------------------------------- */}

        {/* Medical History --------------------------------------------------------- */}

        <div className="mt-10 ">
          <div className="mb-2 text-center font-heading text-2xl font-medium uppercase lg:text-left">
            Medical History
          </div>

          <div className="scroll mt-5 hidden max-h-[370px] overflow-auto px-0 lg:block">
            <table className="common-table w-full min-w-max table-fixed  border-separate border-spacing-y-3 text-left">
              <thead>
                <tr>
                  <th className="w-20 pl-7 font-medium text-gray-400">#</th>
                  <th className="text-justify font-medium text-gray-400">
                    Medical History{" "}
                  </th>
                  <th className="w-32 font-medium text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-20 border-y-2 border-gray-100 p-4">01</td>
                  <td className="border-y-2 border-gray-100 p-4  text-justify">
                    <div>
                      Injuries: quo possimus dolores nam autem ipsa. Est soluta
                      quia et blanditiis sunt qui asperiores tempore eos
                      similique veniam aut maxime veniam aut possimus possimus
                      qui voluptatem maiores.AAA
                    </div>
                  </td>
                  <td className="w-32 border-y-2 border-gray-100 p-4 font-medium text-gray-400">
                    Remove
                  </td>
                </tr>
                <tr>
                  <td className="w-20 border-y-2 border-gray-100 p-4">01</td>
                  <td className="border-y-2 border-gray-100 p-4  text-justify">
                    <div>
                      Injuries: quo possimus dolores nam autem ipsa. Est soluta
                      quia et blanditiis sunt qui asperiores tempore eos
                      similique veniam aut maxime veniam aut possimus possimus
                      qui voluptatem maiores.AAA
                    </div>
                  </td>
                  <td className="w-32 border-y-2 border-gray-100 p-4 font-medium text-gray-400">
                    Remove
                  </td>
                </tr>
                <tr>
                  <td className="w-20 border-y-2 border-gray-100 p-4">01</td>
                  <td className="border-y-2 border-gray-100 p-4  text-justify">
                    <div>
                      Injuries: quo possimus dolores nam autem ipsa. Est soluta
                      quia et blanditiis sunt qui asperiores tempore eos
                      similique veniam aut maxime veniam aut possimus possimus
                      qui voluptatem maiores.AAA
                    </div>
                  </td>
                  <td className="w-32 border-y-2 border-gray-100 p-4 font-medium text-gray-400">
                    Remove
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-3 block rounded-xl border border-gray-300 p-4 md:hidden">
          <div>
            <div className=" mb-2 text-xl font-medium">#01 History</div>
            <div className="text-sm text-gray-400">
              Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et
              blanditiis sunt qui asperiores tempore eos similique veniam aut
              maxime veniam aut possimus possimus qui voluptatem maiores.
            </div>
          </div>
        </div>
        <div className="mb-3 block rounded-xl border border-gray-300 p-4 md:hidden">
          <div>
            <div className=" mb-2 text-xl font-medium">#02 History</div>
            <div className="text-sm text-gray-400">
              Injuries: quo possimus dolores nam autem ipsa. Est soluta quia et
              blanditiis sunt qui asperiores tempore eos similique veniam aut
              maxime veniam aut possimus possimus qui voluptatem maiores.
            </div>
          </div>
        </div>

        {/* Medical History --------------------------------------------------------- */}
      </Card>
    </>
  );
};

export default DetailPage;
