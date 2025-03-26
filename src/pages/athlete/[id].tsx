/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext, useEffect, useState } from "react";

import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";

import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";

import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type { AthleteBatchesMaps, AthleteSportsMaps, Athletes, Batches, Centers, Coaches, FeePlans, FeePlans_recurringType, Sports } from "@prisma/client";
import s3 from "../../lib/aws";

import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import { PAYMENT_HISTORY_TABLE_HEADERS } from "~/constants/payment";
import { ASSESSMENT_TABLE_HEADERS } from "~/constants/assessment";
import { ATHLETE_BATCH_TABLE_HEADERS, ATHLETE_MEDICAL_TABLE_HEADERS } from "~/constants/athleteConstants";
import Attendance from "~/components/Attendance";
import type { TabType, TableHead } from "~/types/common";
import { calculateAge } from "~/utils/common";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const athlete = await prisma.athletes.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      AthleteSportsMaps: {
        include: {
          Sports: true
        }
      },
      AthleteBatchesMaps: {
        include: {
          Batches: {
            include: {
              Coaches: true,
              FeePlans: true
            }
          },
          Sports: true
        }
      },
    },
  });

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      athlete: JSON.parse(JSON.stringify(athlete)), // <== here is a solution
    },
  };
};

const tabs: TabType[] = [
  {
    label: "Attendance",
    name: "attendance",
    value: "60%",
    image: CoachImg,
    allLabel: "ATTENDANCE",

  },
  {
    label: "Batches",
    name: "batches",
    value: "04",
    image: BatchImg,
    allLabel: "BATCHES",
  },
  {
    label: "Payemnt",
    name: "payment_history",
    value: "History",
    image: AtheleteImg,
    allLabel: "PAYMENT HISTORY",
  },
  {
    label: "Assessment",
    name: "assessment_report",
    value: "Report",
    image: InventoryImg,
    allLabel: "ASSESSMENT",
  },
  {
    label: "Medical",
    name: "medical_history",
    value: "History",
    image: InventoryImg,
    allLabel: "MEDICAL HISTORY",
  },
];


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BatchesType extends Batches {
  Coaches: Coaches,
  FeePlans: FeePlans,
  Sports: Sports,
  Centers: Centers
}

interface AthleteBatchesMapsType extends AthleteBatchesMaps {
  Batches?: BatchesType,
  Sports?: Sports
}

interface AthleteSportsMapsType extends AthleteSportsMaps {
  Sports?: Sports
}


type Athlete = Athletes & {
  AthleteSportsMaps: AthleteSportsMapsType[];
  AthleteBatchesMaps: AthleteBatchesMapsType[]
};


export default function Page({ athlete }: { athlete: Athlete }) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [selectedComponent, setSelectedComponent] = useState<any>()
  const [selectedTab, setSelectedTab] = useState<string | undefined>(tabs[0]?.name);

  const [loading, setLoading] = useState(true);
  const [finalTabs, setFinalTabs] = useState<TabType[]>(tabs);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [batchesData, setBatchesData] = useState<AthleteBatchesMapsType[] | null>(null);

  useEffect(() => {

    if (athlete && athlete.image) {
      void getSignedUrlForImage(athlete.image)
    }


  }, [athlete])

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
    if (finalTabs && finalTabs.length > 0 && Object.keys(athlete).length > 0) {
      const arr: TabType[] = [...finalTabs];
      const medical_historyIndex = arr.findIndex((item: TabType) => item.name === "medical_history");
      if (medical_historyIndex > -1 && athlete?.medicalHistory) {
        const obj: TabType = { ...arr[medical_historyIndex] }
        obj.value = 0;
        arr[medical_historyIndex] = obj
      }
      const batchIndex = arr.findIndex((item: TabType) => item.name === "batches");
      if (batchIndex > -1 && athlete?.AthleteBatchesMaps) {
        const batchObj: TabType = { ...arr[batchIndex] }

        batchObj.value = athlete?.AthleteBatchesMaps ? athlete?.AthleteBatchesMaps?.length : 0;
        arr[batchIndex] = batchObj

      }
      if (JSON.stringify(finalTabs) !== JSON.stringify(arr)) {
        setFinalTabs(arr);

      }
    }
  }, [athlete, finalTabs]);


  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };



  const handleClick = (tab: TabType) => {
    let component
    let TABLE_HEAD: TableHead = []
    let TABLE_ROWS: AthleteBatchesMapsType[] = []
    if (tab?.name === "attendance") {
      component = <Attendance />

    } else {
      if (tab?.name === "batches") {
        TABLE_HEAD = ATHLETE_BATCH_TABLE_HEADERS


        if (athlete && athlete?.AthleteBatchesMaps && athlete?.AthleteBatchesMaps?.length > 0) {
          const batches = athlete?.AthleteBatchesMaps.map((batch) => {
            return {
              ...batch,
              batchName: batch.Batches?.name ?? "N/A",  // Handle undefined
              sport: batch.Sports?.name ?? "N/A",
              coach: batch.Batches?.Coaches?.name ?? "N/A",
              students: batch.Batches?.occupiedSeat ?? 0,
              batchFee: `${batch.Batches?.FeePlans?.amount ?? 0}/${batch.Batches?.FeePlans?.recurringType ?? "N/A"
                }`,
            };
          });

          TABLE_ROWS = batches

          setBatchesData(TABLE_ROWS)
        }

      } else if (tab?.name === "payment_history") {
        TABLE_HEAD = PAYMENT_HISTORY_TABLE_HEADERS
      } else if (tab?.name === "assessment_report") {
        TABLE_HEAD = ASSESSMENT_TABLE_HEADERS
      }
      else if (tab?.name === "medical_history") {
        TABLE_HEAD = ATHLETE_MEDICAL_TABLE_HEADERS
      }
      component = <AllData
        title={tab?.allLabel ? tab?.allLabel : ""}
        dropdownItems={{}}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={TABLE_ROWS}
        rowSelection={false} />
    }
    setSelectedComponent(component)
    setSelectedTab(tab?.name);

  };

  return (
    <>
      <DetailPage
        cardTitle="ATHLETE DETAILS"
        editButtonUrl={`/edit-athlete-${athlete?.id}`}

        editText={"Edit Athlete"}
        tabs={finalTabs}
        handleTabClick={handleClick}
        data={{ ...athlete, imageUrl }}
        badgeData={athlete?.AthleteSportsMaps || []}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        gridColumns={3}
        details={[
          {
            items: [
              {
                label: "Blood Group",
                value: athlete?.bloodGroup || "",
              },
              { label: "Height", value: athlete?.height || "" },
              { label: "Weight", value: athlete?.weight || "" },
              { label: "Contact Number", value: athlete?.phone || "" },
              { label: "Email", value: athlete?.email || "" },
              { label: "Age", value: calculateAge(athlete?.dob) || "" },
              { label: "Father's Name", value: athlete?.fatherName || "" },
              { label: "Residential Address", value: athlete?.address || "" },
              { label: "Gender", value: athlete?.gender || "" }
            ],
          },
        ]}
      />
    </>
  );
}
