import { useContext, useEffect, useRef, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image, { StaticImageData } from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";
import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type { Centers } from "@prisma/client";
import { api } from "~/utils/api";

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
import CenterDashCoachTableHeader from "~/components/CenterDashboardTables/Coach/CenterDashCoachTableHeader";
import CenterDashBatchTableHeader from "~/components/CenterDashboardTables/Batch/CenterDashBatchTableHeader";
import CenterDashAthleteTableHeader from "~/components/CenterDashboardTables/Athlete/CenterDashAthleteTableHeader";
import CenterDashInventoryTableHeader from "~/components/CenterDashboardTables/Inventory/CenterDashInventoryTableHeader";
import CenterDashBatchTableBody from "~/components/CenterDashboardTables/Batch/CenterDashBatchTableBody";
import CenterDashCoachTableBody from "~/components/CenterDashboardTables/Coach/CenterDashCoachTableBody";
import CenterDashAthleteTableBody from "~/components/CenterDashboardTables/Athlete/CenterDashAthleteTableBody";
import CenterDashInventoryTableBody from "~/components/CenterDashboardTables/Inventory/CenterDashInventoryTableBody";
import { useRouter } from "next/router";

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

  useEffect(() => {
    if (finalTabs && finalTabs.length > 0 && Object.keys(center).length > 0) {
      const arr = [...finalTabs];
      const index = arr?.findIndex((item) => item?.name === "inventories");
      if (index > -1 && center?.CenterInventories) {
        arr[index].value = center?.CenterInventories?.length;
      }
      const batchIndex = arr?.findIndex((item) => item?.name === "batches");
      if (batchIndex > -1 && center?.Batches) {
        arr[batchIndex].value = center?.Batches?.length;
      }
      setFinalTabs(arr);
    }
  }, [center, finalTabs]);

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

  return (
    <>
      <Card className="h-100 mx-5">
        <header className="flex justify-between">
          <CardTitle title="CENTER DETAILS" />
          <Button onClick={() => router.push(`/edit-center-${center?.id}`)}>
            Edit Center
          </Button>
        </header>
        <div className="flex">
          <Image
            className=" mt-5 h-[150px] w-[150px] rounded-xl"
            src={"/images/rugby.jpg"}
            alt=""
            width="200"
            height="150"
          />
          <div className="w-10/12 px-10">
            <div className="mb-2 mt-5  text-lg font-bold">
              <span>{center?.name}</span>
            </div>
            <div className="flex justify-start">
              {/* {coach?.CoachSportsMaps?.map(
                ({ sportId }) => sportsDictionary?.[sportId]
              ).join(" ,")} */}
              {center?.CenterSports.map((ele: any, index: number) => (
                <div
                  className="mr-4 rounded-full bg-[#FEEFF2] px-3 py-2 text-sm"
                  key={index}
                >
                  <p className="text-pink-500">{ele?.Sports?.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-4">
              <div className="Contact mr-3">
                <div className="text-sm text-gray-400"> Contact Number </div>
                <div className="font-bold text-gray-600">{center?.mobile}</div>
              </div>

              <div className="Email mr-3">
                <div className=" text-sm text-gray-400"> Email</div>
                <div className="font-bold text-gray-600">{center?.email}</div>
              </div>

              <div className="Location mr-3">
                <div className=" text-sm text-gray-400">Location</div>
                <div className="font-bold text-gray-600">{center?.address}</div>
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
          <div className="flex justify-center align-middle">
            <Search pos="right" />

            {/* filter ka div */}
            {/* <Filter /> */}

            {/* Button */}
            {selectedTab?.name === "batches" && (
              <Button
                className="ml-3 bg-[#F3476D] p-2 text-white"
                onClick={() => router.push(`/centers/Batch/${center?.id}`)}
              >
                Add New Batch
              </Button>
            )}
          </div>
        </header>

        <Table tableHeader={selectedHeader} tableBody={selectedBody} />
      </Card>
    </>
  );
}
