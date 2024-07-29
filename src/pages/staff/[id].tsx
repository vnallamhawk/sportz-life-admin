import { useContext, useState } from "react";

import type { StaticImageData } from "next/image";


import staffCalendar from "../../images/Staff_calendar.png";
import staffCenter from "../../images/Staff_center.png";
import staffPayroll from "../../images/Staff_payroll.png";
import staffShift from "../../images/Staff_shift.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type {  Staffs } from "@prisma/client";

import { ToastContext } from "~/contexts/Contexts";
import { useRouter } from "next/router";
import StaffDashCenterTableHeader from "~/components/StaffDashboardTables/Centers/StaffDashCenterTableHeader";
import StaffDashCenterTableBody from "~/components/StaffDashboardTables/Centers/StaffDashCenterTableBody";

import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import { STAFF_DASH_CENTER_TABLE_HEADERS, STAFF_DASH_DUTY_TABLE_HEADERS, STAFF_DASH_PAYROLL_TABLE_HEADERS } from "~/constants/staffConstants";
import Attendance from "~/components/Attendance";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  // const sports = await prisma.sports.findMany();
  const staff = await prisma.staffs.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include:{
      StaffDesignation:true,
      Centers:true,
      StaffPayroll:true,
      StaffShifts:true
  }
  });

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      staff: JSON.parse(JSON.stringify(staff)), // <== here is a solution
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

export default function Page({ staff }: { staff: Staffs }) {
  const router = useRouter();
  const [selectedComponent,setSelectedComponent]=useState()

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

 
  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  const handleClick = (tab: TabsType) => {
    let component
    let TABLE_HEAD
    let TABLE_ROWS=[]
    if (tab?.name === "attendance") {
      component=<Attendance/>
      
    } else{
      if (tab?.name === "centers") {
        TABLE_HEAD = STAFF_DASH_CENTER_TABLE_HEADERS
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        TABLE_ROWS=staff?.Centers
      } else if (tab?.name === "payroll") {
        TABLE_HEAD = STAFF_DASH_PAYROLL_TABLE_HEADERS
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        TABLE_ROWS=staff?.StaffPayroll

      } else if (tab?.name === "dutyShift") {
        TABLE_HEAD = STAFF_DASH_DUTY_TABLE_HEADERS
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        TABLE_ROWS=staff?.StaffShifts

      } 
      
      component= <AllData
        title={tab?.allLabel}
        dropdownItems={{}}
        TABLE_HEAD={TABLE_HEAD}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        cardTitle="STAFF DETAILS"
        editButtonClick={() => router.push(`/edit-staff-${staff?.id}`)}
        editText={"Edit Staff"}
        tabs={tabs}
        handleTabClick={handleClick}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data={{...staff,description:staff?.StaffDesignation?.designation}}
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        details={[
          {
              items: [
                { label: "Contact Number", value: staff?.phone },
                { label: "Email", value: staff?.email },
                { lable: "DOB", value: staff?.dateOfBirth },
                { lable: "Gender", value: staff?.gender },

              ],
            },
        ]}
      />
    </>
  
    
  );
}
