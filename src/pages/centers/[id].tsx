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
import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import {
  CENTER_DASH_ATHLETE_TABLE_HEADERS,
  CENTER_DASH_BATCH_TABLE_HEADERS,
  CENTER_DASH_COACH_TABLE_HEADERS,
  CENTER_DASH_INVENTORY_TABLE_HEADERS,
} from "~/constants/centerDashTables";

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
      Athletes:true,
      // Coaches:true,
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
  const [selectedTab, setSelectedTab] = useState<string>(tabs[1]?.name);
  const [selectedComponent, setSelectedComponent] = useState();

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

  const handleClick = (tab: TabsType) => {
    let TABLE_HEAD;
    let TABLE_ROWS = [];
    if (tab?.name === "batches") {
      TABLE_HEAD = CENTER_DASH_BATCH_TABLE_HEADERS;
      TABLE_ROWS=center?.Batches
    } else if (tab?.name === "coaches") {
      TABLE_HEAD = CENTER_DASH_COACH_TABLE_HEADERS;
      TABLE_ROWS=center?.Coaches

    } else if (tab?.name === "athletes") {
      TABLE_HEAD = CENTER_DASH_ATHLETE_TABLE_HEADERS;
      TABLE_ROWS=center?.Athletes

    } else {
      TABLE_HEAD = CENTER_DASH_INVENTORY_TABLE_HEADERS;
      TABLE_ROWS=center?.CenterInventories.map((center) => {
        return {
          ...center,name:center?.Inventories?.name
           // batches: center?.Batches?.length,
        };
      });
    }
    const component = (
      <AllData
        title={tab?.allLabel}
        dropdownItems={{}}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={TABLE_ROWS}
        rowSelection={false}
        showImage={false}
      />
    );

    setSelectedComponent(component);
    setSelectedTab(tab?.name);
  };

  return (
    <>
      <DetailPage
        cardTitle="CENTER DETAILS"
        editButtonClick={() => router.push(`/edit-center-${center?.id}`)}
        editText={"Edit Center"}
        tabs={tabs}
        handleTabClick={handleClick}
        data={center}
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        badgeData={center?.CenterSports}
        details={[
          {
              items: [
                { label: "Contact Number", value: center?.mobile },
                { label: "Email", value: center?.email },
                { lable: "Location", value: center?.address },
              ],
            },
        ]}
      />
    </>
  );
}
