import { useContext, useEffect, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import staffCalendar from "../../images/Staff_calendar.png";
import staffCenter from "../../images/Staff_center.png";
import staffPayroll from "../../images/Staff_payroll.png";
import staffShift from "../../images/Staff_shift.png";
import type {
  Batches,
  Centers,
  CoachCentersBatches,
  CoachQualifications,
  CoachSportsMaps,
  Coaches,
  StaffPayroll,
} from "@prisma/client";
import { type Sports } from "@prisma/client";
import type { TabType, TableHead } from "~/types/common";
import Attendance from "~/components/Attendance";
import AllData from "~/common/AllData";
import DetailPage from "~/common/DetailPage";

import // DATE_TIME_FORMAT,
// NO_DATA,
"~/globals/globals";
// import {
//   type CoachWithRelations,
//   ExperienceLevelEnum,
//   TrainingLevelEnum,
// } from "~/types/coach";
import AddCoachSuccessToast from "~/components/AddCoach/AddCoachSuccessToast";
import { ToastContext } from "~/contexts/Contexts";
// import { dateFormat } from "~/helpers/date";
// import CoachBatch from "~/components/Coach/Batch/CoachBatch";
// import CoachAttendance from "~/components/Coach/Attendance/CoachAttendance";
import router from "next/router";
import s3 from "../../lib/aws";
import moment from "moment-timezone";
import { calculateAge } from "~/utils/common";
import { COACH_DASH_BATCH_TABLE_HEADERS } from "~/constants/centerDashTables";
import { STAFF_DASH_PAYROLL_TABLE_HEADERS } from "~/constants/staffConstants";
import { COACH_CERTIFICATE_TABLE_HEADERS } from "~/constants/coachConstants";


interface CoachCentersBatchesType extends CoachCentersBatches{
  Batches?:Batches
}

interface CoachSportsMapsType extends CoachSportsMaps{
  Sports?:Sports
}

type Coach = Coaches & {
  CoachSportsMaps: CoachSportsMapsType[];
  CoachQualifications:CoachQualifications[]
  CoachCentersBatches:CoachCentersBatchesType[]
  StaffPayroll:StaffPayroll
};


export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  // const sports = await prisma.sports.findMany();
  const coach = await prisma.coaches.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      CoachCentersBatches:{
        include:{
          Batches:true
        }
      },
       CoachSportsMaps: {
        include: {
          Sports: true,
        },
       },
       StaffPayroll:true,
      Centers: true,
      CoachQualifications:true
      // Batches: true,
      // Batches: true,
    },
  });
  
  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      coach: JSON.parse(JSON.stringify(coach)), // <== here is a solution
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
    label: "Batches",
    name: "batches",
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
    label: "Certificates",
    name: "certificates",
    value: "03",
    image: staffShift,
    allLabel: "DUTY SHIFT",
  },
];


export default function Page({
  coach,
  sports,
}: {
  coach: Coach;
  sports: Sports[];
}) {
  const sportsDictionary = sports?.reduce(
    (accumulator: Record<number, string>, current) => {
      accumulator[current.id] = current.name;
      return accumulator;
    },
    {}
  );

  const [displayCertificate, setDisplayCertificate] = useState(false);
  const [displayBatch, setDisplayBatch] = useState(false);
  const [displayAttendance, setDisplayAttendance] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);

  const handleCertificateClick = () =>
    setDisplayCertificate(!displayCertificate);
  const handleBatchClick = () => setDisplayBatch(!displayBatch);
  const handleAttendanceClick = () => setDisplayAttendance(!displayAttendance);
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>();

  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    tabs[0]?.name
  );

  const [imageUrl, setImageUrl] = useState<string | null>(null);


  useEffect(()=>{

    if(coach && coach.image){
      void getSignedUrlForImage(coach.image)
    }


  },[coach])

  // eslint-disable-next-line @typescript-eslint/require-await
  const getSignedUrlForImage = async (key:string) => {
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
  let TABLE_HEAD:TableHead=[];
  let TABLE_ROWS: {[key:string]:any,id:number}[] =[];
  if (tab?.name === "attendance") {
    component = <Attendance />;
  } else {
    if (tab?.name === "batches") {
      TABLE_HEAD = COACH_DASH_BATCH_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      TABLE_ROWS = coach?.CoachCentersBatches ? coach?.CoachCentersBatches : [];
    } else if (tab?.name === "payroll") {
      TABLE_HEAD = STAFF_DASH_PAYROLL_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      TABLE_ROWS = coach?.StaffPayroll ? [coach?.StaffPayroll] : [];
    } else if (tab?.name === "certificates") {
      TABLE_HEAD = COACH_CERTIFICATE_TABLE_HEADERS;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      TABLE_ROWS = coach?.CoachQualifications ? coach?.CoachQualifications : [];
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
        cardTitle="Coach DETAILS"
        editButtonClick={() => void router.push(`/edit-coach-${coach?.id}`)}
        editText={"Edit Coach"}
        tabs={tabs}
        handleTabClick={handleClick}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data={{ ...coach,imageUrl }}
        name={`${coach?.name}(${coach.designation})`}
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        badgeData={coach?.CoachSportsMaps||[]}
        details={[
          {
            items: [
              {
                label: "Contact Number",
                value: coach?.phone || "",
              },
              { label: "Email", value: coach?.email || "" },

              {
                label: "Age",
                value: calculateAge(coach?.dateOfBirth),
              },
            
              { label: "Gender", value: coach?.gender || "" },
              {
                label: "Training Level",
                value: coach?.trainingLevel || "",
              },
            ],
          },
        ]}
      />
    </>
  );
}
