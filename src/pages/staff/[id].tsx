import { useEffect, useState } from "react";
import staffCalendar from "../../images/Staff_calendar.png";
import staffCenter from "../../images/Staff_center.png";
import staffPayroll from "../../images/Staff_payroll.png";
import staffShift from "../../images/Staff_shift.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type {
  Centers,
  StaffDesignation,
  StaffPayroll,
  StaffShifts,
  Staffs,
} from "@prisma/client";
import s3 from '../../lib/aws';

import { useRouter } from "next/router";

import DetailPage from "~/common/DetailPage";
import AllData from "~/common/AllData";
import {
  STAFF_DASH_CENTER_TABLE_HEADERS,
  STAFF_DASH_DUTY_TABLE_HEADERS,
  STAFF_DASH_PAYROLL_TABLE_HEADERS,
} from "~/constants/staffConstants";
import Attendance from "~/components/Attendance";
import type { TabType, TableHead } from "~/types/common";
import moment from "moment-timezone";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const staff = await prisma.staffs.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      // StaffDesignation: true,
      // Centers: true,
      // StaffPayroll: true,
      StaffShifts: true,
    },
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

interface StaffDetails extends Staffs {
  gender: any;
  dateOfBirth: any;
  StaffDesignation?: StaffDesignation;
  Centers?: Centers[];
  StaffPayroll?: StaffPayroll;
  StaffShifts?: StaffShifts[];
}

export default function Page({ staff }: { staff: StaffDetails }) {
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>();

  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    tabs[0]?.name
  );
  const [finalTabs, setFinalTabs] = useState<TabType[]>(tabs);

  const [imageUrl, setImageUrl] = useState<string | null>(null);


  useEffect(() => {
    if (staff && staff.image) {
      void getSignedUrlForImage(staff.image)
    }
  }, [staff])

  useEffect(() => {
    if (finalTabs && finalTabs.length > 0 && Object.keys(staff).length > 0) {
      const arr: TabType[] = [...finalTabs];
      const centersIndex = arr.findIndex((item: TabType) => item.name === "centers");
      if (centersIndex > -1 && staff?.Centers) {
        const obj: TabType = { ...arr[centersIndex] }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        obj.value = staff?.Centers ? staff?.Centers?.length : 0;
        arr[centersIndex] = obj
      }
      const batchIndex = arr.findIndex((item: TabType) => item.name === "batches");
      if (batchIndex > -1 && staff?.StaffShifts) {
        const batchObj: TabType = { ...arr[batchIndex] }

        batchObj.value = staff.StaffShifts ? staff?.StaffShifts?.length : 0;
        arr[batchIndex] = batchObj

      }
      if (JSON.stringify(finalTabs) !== JSON.stringify(arr)) {
        setFinalTabs(arr);

      }
    }
  }, [staff, finalTabs]);

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

  const handleClick = (tab: TabType) => {
    let component;
    let TABLE_HEAD: TableHead = [];
    let TABLE_ROWS: { [key: string]: any, id: number }[] = [];
    if (tab?.name === "attendance") {
      component = <Attendance />;
    } else {
      if (tab?.name === "centers") {
        TABLE_HEAD = STAFF_DASH_CENTER_TABLE_HEADERS;
        TABLE_ROWS = staff?.Centers ? [...staff?.Centers] : [];
      } else if (tab?.name === "payroll") {
        TABLE_HEAD = STAFF_DASH_PAYROLL_TABLE_HEADERS;
        TABLE_ROWS = staff?.StaffPayroll ? [staff?.StaffPayroll] : [];
      } else if (tab?.name === "dutyShift") {
        TABLE_HEAD = STAFF_DASH_DUTY_TABLE_HEADERS;
        TABLE_ROWS = staff?.StaffShifts ? staff?.StaffShifts : [];
      }

      component = (
        <AllData
          title={tab?.allLabel ? tab?.allLabel : ""}
          dropdownItems={{}}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          rowSelection={false}
          showImage={false}
        />
      );
    }
    setSelectedComponent(component);
    setSelectedTab(tab?.name);
  };

  return (
    <>
      <DetailPage
        cardTitle="STAFF DETAILS"
        editButtonUrl={`/edit-staff-${staff?.id}`}
        editText={"Edit Staff"}
        tabs={finalTabs}
        handleTabClick={handleClick}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data={{ ...staff, description: staff?.StaffDesignation?.designation, imageUrl }}
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        details={[
          {
            items: [
              {
                label: "Contact Number",
                value: staff?.phone ? staff?.phone : "",
              },
              { label: "Email", value: staff?.email ? staff?.email : "" },
              {
                label: "DOB",
                value: staff?.dateOfBirth ? moment(staff?.dateOfBirth).format("DD-MM-YYYY") : "",
              },
              { label: "Gender", value: staff?.gender ? staff?.gender : "" },
            ],
          },
        ]}
      />
    </>
  );
}
