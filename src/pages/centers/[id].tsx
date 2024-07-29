import { useContext, useEffect, useState } from "react";

import type { StaticImageData } from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";
import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type { Centers } from "@prisma/client";
import { ToastContext } from "~/contexts/Contexts";
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
  const [selectedTab, setSelectedTab] = useState<string|undefined>(tabs[1]?.name);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [selectedComponent, setSelectedComponent] = useState<any>();

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        arr[index].value = center?.CenterInventories?.length;
      }
      const batchIndex = arr?.findIndex((item) => item?.name === "batches");
      if (batchIndex > -1 && center?.Batches) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
    let tableProps
    if (tab?.name === "batches") {
      TABLE_HEAD = CENTER_DASH_BATCH_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      TABLE_ROWS=center?.Batches
      tableProps={ addButtonText:"Add Batch",
      addButtonUrl:`/centers/Batch/${center?.id}`}
    } else if (tab?.name === "coaches") {
      TABLE_HEAD = CENTER_DASH_COACH_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      TABLE_ROWS=center?.Coaches

    } else if (tab?.name === "athletes") {
      TABLE_HEAD = CENTER_DASH_ATHLETE_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      TABLE_ROWS=center?.Athletes

    } else {
      TABLE_HEAD = CENTER_DASH_INVENTORY_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      TABLE_ROWS=center?.CenterInventories.map((center: { Inventories: { name: unknown; }; }) => {
        return {
          ...center,name:center?.Inventories?.name
           // batches: center?.Batches?.length,
        };
      });
    }
    const component = (
      <AllData
        title={tab?.allLabel}
       {...tableProps}
        dropdownItems={{}}
        TABLE_HEAD={TABLE_HEAD}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
