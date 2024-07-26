import React, { useContext, useEffect, useRef, useState } from "react";

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
import type { Athletes, Centers } from "@prisma/client";
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

import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import { CENTER_DASH_BATCH_TABLE_HEADERS } from "~/constants/centerDashTables";
import { PAYMENT_HISTORY_TABLE_HEADERS } from "~/constants/payment";
import { ASSESSMENT_TABLE_HEADERS } from "~/constants/assessment";
import { ATHLETE_MEDICAL_TABLE_HEADERS } from "~/constants/athleteConstants";
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
  const [selectedComponent,setSelectedComponent]=useState()

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
  const [selectedTab, setSelectedTab] = useState<string>(tabs[1]?.name);
  // const [selectedHeader, setSelectedHeader] = useState(
  //   CenterDashBatchTableHeader()
  // );
  // const [selectedBody, setSelectedBody] = useState(
  //   CenterDashBatchTableBody(athlete?.Batches, center)
  // );

  const handleClick = (tab: TabsType) => {
    let component
    let TABLE_HEAD
    let TABLE_ROWS=[]
    if (tab?.name === "attendance") {
      component=<Attendance/>
      
    } else{
      if (tab?.name === "batches") {
        TABLE_HEAD = CENTER_DASH_BATCH_TABLE_HEADERS
  
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
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
      />
    </>
  );
}
