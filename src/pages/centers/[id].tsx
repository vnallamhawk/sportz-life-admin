import { useContext, useEffect, useState } from "react";

import type { StaticImageData } from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";
import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type {
  Athletes,
  BatchSchedules,
  Batches,
  CenterInventories,
  CenterSports,
  Centers,
  Coaches,
  Inventories,
  Sports,
} from "@prisma/client";
import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import {
  CENTER_DASH_ATHLETE_TABLE_HEADERS,
  CENTER_DASH_BATCH_TABLE_HEADERS,
  CENTER_DASH_COACH_TABLE_HEADERS,
  CENTER_DASH_INVENTORY_TABLE_HEADERS,
} from "~/constants/centerDashTables";
import type { TabType } from "~/types/common";
import s3 from "../../lib/aws";

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
      // Athletes: true,
      Coaches: true,
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

const tabs: TabType[] = [
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

interface CenterSportsType extends CenterSports {
  Sports?: Sports;
}

interface CenterInventoriesType extends CenterInventories {
  Inventories?: Inventories;
}
interface BatchType extends Batches {
  BatchSchedules?: BatchSchedules;
  Sports?: Sports;
}
interface CenterDetails extends Centers {
  CenterInventories?: CenterInventoriesType[];
  Batches?: BatchType[];
  CenterSports?: CenterSportsType[];
  Athletes?: Athletes[];
  Coaches?: Coaches[];
}

export default function Page({ center }: { center: CenterDetails }) {
  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    tabs[0]?.name
  );
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>();

  const [loading, setLoading] = useState(true);
  const [finalTabs, setFinalTabs] = useState<TabType[]>(tabs);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (center && center.image) {
      void getSignedUrlForImage(center.image);
    }
  }, [center]);

  // eslint-disable-next-line @typescript-eslint/require-await
  const getSignedUrlForImage = async (key: string) => {
    try {
      const s3info = s3.getSignedUrl("getObject", {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Expires: 60,
      });
      setImageUrl(s3info);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (finalTabs && finalTabs.length > 0 && Object.keys(center).length > 0) {
      const arr: TabType[] = [...finalTabs];
      const index = arr.findIndex(
        (item: TabType) => item.name === "inventories"
      );
      if (index > -1 && center?.CenterInventories) {
        const obj: TabType = { ...arr[index] };
        obj.value = center?.CenterInventories
          ? center?.CenterInventories?.length
          : 0;
        arr[index] = obj;
      }
      const coachesIndex = arr.findIndex(
        (item: TabType) => item.name === "coaches"
      );
      if (coachesIndex > -1 && center?.Coaches) {
        const obj: TabType = { ...arr[coachesIndex] };
        obj.value = center?.Coaches ? center?.Coaches?.length : 0;
        arr[coachesIndex] = obj;
      }
      const athletesIndex = arr.findIndex(
        (item: TabType) => item.name === "athletes"
      );
      if (athletesIndex > -1 && center?.Athletes) {
        const obj: TabType = { ...arr[athletesIndex] };
        obj.value = center?.Athletes ? center?.Athletes?.length : 0;
        arr[athletesIndex] = obj;
      }
      const batchIndex = arr.findIndex(
        (item: TabType) => item.name === "batches"
      );
      if (batchIndex > -1 && center?.Batches) {
        const batchObj: TabType = { ...arr[batchIndex] };

        batchObj.value = center?.Batches ? center?.Batches?.length : 0;
        arr[batchIndex] = batchObj;
      }
      if (JSON.stringify(finalTabs) !== JSON.stringify(arr)) {
        setFinalTabs(arr);
      }
    }
  }, [center, finalTabs]);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleClick = (tab: TabType) => {
    let TABLE_HEAD;
    let TABLE_ROWS = [];
    let tableProps;
    if (tab?.name === "batches") {
      TABLE_HEAD = CENTER_DASH_BATCH_TABLE_HEADERS;
      TABLE_ROWS = center?.Batches ? center?.Batches : [];
      tableProps = {
        addButtonText: "Add Batch",
        addButtonUrl: `/centers/Batch/${center?.id}`,
      };
    } else if (tab?.name === "coaches") {
      TABLE_HEAD = CENTER_DASH_COACH_TABLE_HEADERS;
      TABLE_ROWS = center?.Coaches ? center?.Coaches : [];
    } else if (tab?.name === "athletes") {
      TABLE_HEAD = CENTER_DASH_ATHLETE_TABLE_HEADERS;
      TABLE_ROWS = center?.Athletes ? center?.Athletes : [];
    } else {
      TABLE_HEAD = CENTER_DASH_INVENTORY_TABLE_HEADERS;
      TABLE_ROWS = center?.CenterInventories
        ? center?.CenterInventories.map((data) => {
          return {
            ...center,
            name: data?.Inventories?.name,
            // batches: center?.Batches?.length,
          };
        })
        : [];
    }
    const component = (
      <AllData
        title={tab?.allLabel ? tab?.allLabel : ""}
        {...tableProps}
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
        editButtonUrl={`/edit-center-${center?.id}`}
        editText={"Edit Center"}
        tabs={finalTabs}
        handleTabClick={handleClick}
        data={{ ...center, imageUrl }}
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        badgeData={center?.CenterSports ? center?.CenterSports : []}
        details={[
          {
            items: [
              { label: "Contact Number", value: center?.mobile },
              { label: "Email", value: center?.email },
              { label: "Location", value: center?.address },
            ],
          },
        ]}
      />
    </>
  );
}
