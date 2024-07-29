import React, { useContext,  useState } from "react";

import type { StaticImageData } from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";

import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";

import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type { Athletes } from "@prisma/client";

import { ToastContext } from "~/contexts/Contexts";
import { useRouter } from "next/router";

import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import { PAYMENT_HISTORY_TABLE_HEADERS } from "~/constants/payment";
import { ASSESSMENT_TABLE_HEADERS } from "~/constants/assessment";
import { ATHLETE_BATCH_TABLE_HEADERS, ATHLETE_MEDICAL_TABLE_HEADERS } from "~/constants/athleteConstants";
import Attendance from "~/components/Attendance";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const athlete = await prisma.athletes.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
  });

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      athlete: JSON.parse(JSON.stringify(athlete)), // <== here is a solution
    },
  };
};

const tabs = [
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

type TabsType = {
  label: string;
  name: string;
  value: string;
  image: StaticImageData;
  allLabel: string;
};
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Page({ athlete }: { athlete: Athletes }) {
  const router = useRouter();
  const [displayCertificate, setDisplayCertificate] = useState(false);
  const [displayBatch, setDisplayBatch] = useState(false);
  const [displayAttendance, setDisplayAttendance] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);
  const [value, onChange] = useState<Value>(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [selectedComponent,setSelectedComponent]=useState<any>()

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
  const [selectedTab, setSelectedTab] = useState<string|undefined>(tabs[1]?.name);
  // const [selectedHeader, setSelectedHeader] = useState(
  //   CenterDashBatchTableHeader()
  // );
  // const [selectedBody, setSelectedBody] = useState(
  //   CenterDashBatchTableBody(athlete?.Batches, center)
  // );

  const handleClick = (tab: TabsType) => {
    let component
    let TABLE_HEAD
    const TABLE_ROWS: never[]=[]
    if (tab?.name === "attendance") {
      component=<Attendance/>
      
    } else{
      if (tab?.name === "batches") {
        TABLE_HEAD = ATHLETE_BATCH_TABLE_HEADERS
  
      } else if (tab?.name === "payment_history") {
        TABLE_HEAD = PAYMENT_HISTORY_TABLE_HEADERS
      } else if (tab?.name === "assessment_report") {
        TABLE_HEAD = ASSESSMENT_TABLE_HEADERS
      } 
      else if (tab?.name === "medical_history") {
        TABLE_HEAD = ATHLETE_MEDICAL_TABLE_HEADERS
      } 
      component= <AllData
        title={tab?.allLabel}
        dropdownItems={{}}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={TABLE_ROWS}
        rowSelection={false}
        showImage={false}
      />
    }
   setSelectedComponent(component)
   setSelectedTab(tab?.name);

  };

  return (
    <>
      <DetailPage
        cardTitle="ATHLETE DETAILS"
        editButtonClick={() => router.push(`/edit-athlete-${athlete?.id}`)}
        editText={"Edit Athlete"}
        tabs={tabs}
        handleTabClick={handleClick}
        data={athlete}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
      />
    </>
  );
}
