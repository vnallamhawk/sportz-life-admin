import { useContext, useEffect, useRef, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image, { StaticImageData } from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";
import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";

import staffCalendar from "../../images/Staff_calendar.png";
import staffCenter from "../../images/Staff_center.png";
import staffPayroll from "../../images/Staff_payroll.png";
import staffShift from "../../images/Staff_shift.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type { Centers } from "@prisma/client";
import { api } from "~/utils/api";
import StaffProfilePic from "../../images/Staff_dash_profil_pic.png";
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
import Table from "~/components/Table";
import CoachTableHeader from "~/components/AllCoaches/CoachTableHeader";
import CoachTableBody from "~/components/AllCoaches/CoachTableBody";
import Search from "~/components/Search";
import Filter from "~/components/Filter/Filter";
import { useRouter } from "next/router";
import StaffDashCenterTableHeader from "~/components/StaffDashboardTables/Centers/StaffDashCenterTableHeader";
import StaffDashCenterTableBody from "~/components/StaffDashboardTables/Centers/StaffDashCenterTableBody";
import StaffDashAttend from "~/components/StaffDashboardTables/Attendance/StaffDashAttend";
import StaffDashPayrollTableHeader from "~/components/StaffDashboardTables/Payroll/StaffDashPayrollTableHeader";
import StaffDashPayrollTableBody from "~/components/StaffDashboardTables/Payroll/StaffDashPayrollTableBody";
import StaffDashDutyShiftTableHeader from "~/components/StaffDashboardTables/DutyShift/StaffDashDutyTableHeader";
import StaffDashDutyTableBody from "~/components/StaffDashboardTables/DutyShift/StaffDashDutyTableBody";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  // const sports = await prisma.sports.findMany();
  const center = await prisma.centers.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      CenterSports: {
        include: {
          Sports: true,
        },
      },
      CenterInventories: {
        include: {
          Inventories: true,
        },
      },
      Batches: {
        include: {
          BatchSchedules: true,
          Sports: true,
        },
      },
    },
  });

  return {
    props: {
      center: JSON.parse(JSON.stringify(center)), // <== here is a solution
    },
  };
};

const tabs = [
  {
    label: "Attendance",
    name: "attendance",
    value: "60%",
    image: staffCalendar,
    allLabel: "ATTENDANCE",
  },
  {
    label: "Centers",
    name: "centers",
    value: "02",
    image: staffCenter,
    allLabel: "CENTERS",
  },
  {
    label: "Payroll",
    name: "payroll",
    value: "$400",
    image: staffPayroll,
    allLabel: "PAYROLL",
  },
  {
    label: "Duty Shift",
    name: "dutyShift",
    value: "BOTH",
    image: staffShift,
    allLabel: "DUTY SHIFT",
  },
];

type TabsType = {
  label: string;
  name: string;
  value: string;
  image: StaticImageData;
  allLabel: string;
};

export default function Page({ center }: { center: Centers }) {
  const router = useRouter();
  const [displayCertificate, setDisplayCertificate] = useState(false);
  const [displayBatch, setDisplayBatch] = useState(false);
  const [displayAttendance, setDisplayAttendance] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);

  const handleCertificateClick = () =>
    setDisplayCertificate(!displayCertificate);
  const handleBatchClick = () => setDisplayBatch(!displayBatch);
  const handleAttendanceClick = () => setDisplayAttendance(!displayAttendance);
  const sportsArr: string[] = ["Rugby", "Baseball", "Tennis", "BasketBall"];
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const [finalTabs, setFinalTabs] = useState(tabs);

  // useEffect(() => {
  //   if (finalTabs && finalTabs.length > 0 && Object.keys(center).length > 0) {
  //     const arr = [...finalTabs];
  //     const index = arr?.findIndex((item) => item?.name === "inventories");
  //     if (index > -1 && center?.CenterInventories) {
  //       arr[index].value = center?.CenterInventories?.length;
  //     }
  //     const batchIndex = arr?.findIndex((item) => item?.name === "batches");
  //     if (batchIndex > -1 && center?.Batches) {
  //       arr[batchIndex].value = center?.Batches?.length;
  //     }
  //     setFinalTabs(arr);
  //   }
  // }, [center, finalTabs]);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const [selectedTab, setSelectedTab] = useState(tabs[1]);
  const [selectedHeader, setSelectedHeader] = useState(
    StaffDashCenterTableHeader()
  );
  const [selectedBody, setSelectedBody] = useState(
    // CenterDashBatchTableBody(center?.Batches, center)
    StaffDashCenterTableBody()
    // { name: filterByName },
    // handleIsLoading
  );

  const handleClick = (tab: TabsType) => {
    let header, body;
    setSelectedTab(tab);
    if (tab?.name === "attendance") {
      return (
        <>
          <StaffDashAttend />
        </>
      );
    } else if (tab?.name === "centers") {
      header = StaffDashCenterTableHeader();

      // body = CenterDashBatchTableBody(center?.Batches, center);
      body = StaffDashCenterTableBody();
    } else if (tab?.name === "payroll") {
      header = StaffDashPayrollTableHeader();
      body = StaffDashPayrollTableBody();
    } else {
      header = StaffDashDutyShiftTableHeader();
      // body = CenterDashInventoryTableBody(center?.CenterInventories);
      body = StaffDashDutyTableBody();
    }
    setSelectedHeader(header);
    setSelectedBody(body);
  };

  return (
    <>
      <Card className="h-100 mx-5">
        <header className="flex justify-between">
          <CardTitle title="STAFF DETAILS" />
          <Button
            // onClick={() => router.push(`/edit-center-${center?.id}`)}>
            onClick={() => {}}
          >
            Edit Staff
          </Button>
        </header>
        <div className="flex">
          <Image
            className=" mt-5 h-[150px] w-[150px] rounded-full"
            src={StaffProfilePic}
            alt=""
            width="200"
            height="150"
          />
          <div className="w-10/12 px-10">
            <div className="mb-2 mt-5  text-lg font-bold">
              {/* <span>{center?.name}</span> */}
              <span>ATTLIED GATIE</span>
            </div>
            <div className="flex justify-start">
              {/* {coach?.CoachSportsMaps?.map(
                ({ sportId }) => sportsDictionary?.[sportId]
              ).join(" ,")} */}
              {/* {center?.CenterSports.map((ele, index) => (
                <div
                  className="mr-4 rounded-full bg-[#FEEFF2] px-3 py-2 text-sm"
                  key={index}
                >
                  <p className="text-pink-500">{ele?.Sports?.name}</p>
                </div>
              ))} */}
              <div>
                <p className="text-pink-500">Floor Manger</p>
              </div>
            </div>
            <div className="mt-5 flex gap-4">
              <div className="Contact mr-3">
                <div className="text-sm text-gray-400"> Contact Number </div>
                {/* <div className="font-bold text-gray-600">{center?.mobile}</div> */}
                <div className="font-bold text-gray-600">+243153543543</div>
              </div>

              <div className="Email mr-3">
                <div className=" text-sm text-gray-400"> Email</div>
                {/* <div className="font-bold text-gray-600">{center?.email}</div> */}
                <div className="font-bold text-gray-600">test@test.com</div>
              </div>
              <div className="Email mr-3">
                <div className=" text-sm text-gray-400"> DOB</div>
                {/* <div className="font-bold text-gray-600">{center?.email}</div> */}
                <div className="font-bold text-gray-600">28-11-1988</div>
              </div>
              <div className="Email mr-3">
                <div className=" text-sm text-gray-400"> Gender</div>
                {/* <div className="font-bold text-gray-600">{center?.email}</div> */}
                <div className="font-bold text-gray-600">Male</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex w-10/12 justify-between">
          {tabs?.map((tab, index) => {
            return (
              <div
                className="flex gap-3 rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px] hover:border-pink-500"
                onClick={() => {
                  handleClick(tab);
                }}
                key={index}
              >
                <div>
                  <Image
                    className="h-[56px] w-[56px] rounded-lg"
                    src={tab?.image}
                    alt={`${tab?.name}_img`}
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <p className="text-[#CF8DA7]">{tab?.label}</p>
                  <h1>{tab?.value}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <AddCenterSuccessToast
          open={openToast}
          setOpen={setOpenToast}
        ></AddCenterSuccessToast>
      </Card>
      {/* <CoachCertificate coach={coach} displayCertificate={displayCertificate} />
      <CoachBatch coach={coach} displayBatch={displayBatch} />
      <CoachAttendance coach={coach} displayAttendance={displayAttendance} /> */}

      {/* Table dikhate hai */}
      <Card className="h-100 mx-5 mt-5">
        {/* Header */}
        <header className="flex justify-between">
          <CardTitle title={selectedTab?.allLabel!} />
        </header>

        <Table tableHeader={selectedHeader} tableBody={selectedBody} />
      </Card>
    </>
  );
}
