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
  data,
  details,
  tabs,
  handleTabClick,
  selectedComponent
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
            {data?.ranking && (
              <div className="mt-8 hidden border border-dashed border-tertiary-700 p-2 lg:block">
                <div className="flex items-center justify-center border border-tertiary-400 bg-tertiary-200 p-2">
                  <div className="mr-3 font-heading text-4xl text-tertiary-700">
                    #{data?.ranking}
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
              {data?.name}
            </div>
            <div className="text-center text-base text-white md:text-blush-dark lg:text-start">
              {data?.description}
            </div>
            {data?.ranking && (
              <div className="text-center lg:text-start">
                <div className="mx-auto mt-4 inline-block border border-dashed border-orange-light p-2 lg:mt-8 lg:hidden">
                  <div className="flex items-center justify-center border border-[#FFF9F8] bg-[#FFD2C5] px-2 py-1">
                    <div className="mr-3 font-heading text-4xl text-black">
                      #{data?.ranking}
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
                handleTabClick(tab);
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
      {selectedComponent}
      {/* <CoachCertificate coach={coach} displayCertificate={displayCertificate} />
      <CoachBatch coach={coach} displayBatch={displayBatch} />
      <CoachAttendance coach={coach} displayAttendance={displayAttendance} /> */}

    


    </>
  );
};

export default DetailPage;
