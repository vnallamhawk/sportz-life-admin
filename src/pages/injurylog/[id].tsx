  {/* Injured details-------------------------------------------------------------------------------------- */}
//   <Card className="relative col-span-12 h-full !rounded-r-none rounded-l-xl md:bg-white bg-[#FFE5DE] p-0 pt-10">
//   <div>
//     <div className="text-2xl mb-7 font-medium font-heading uppercase">Injury Details</div>
//     <div className="grid grid-cols-12 gap-6">
//       <div className="lg:col-span-6 col-span-12">
//         <div className="flex flex-col items-center lg:flex-row ">
//           <div>
//             <Image
//               className="h-[73px] w-[73px] rounded-full object-cover"
//               src={"/images/rugby.jpg"}
//               alt=""
//               width="200"
//               height="150"
//             />
//           </div>

//           <div className="mt-3 w-full lg:mt-0 lg:w-10/12 lg:pl-10">
//             <div className="text-center font-heading text-3xl font-medium uppercase text-black lg:text-start">
//               David Duos
//             </div>
//             <div className="text-center text-base text-black md:text-blush-dark lg:text-start">
//               Rugby
//             </div>
//           </div>
//         </div>
      
//         <div className="mt-5 grid grid-cols-12 md:gap-4">
//           <div className="col-span-12 md:col-span-6">
//             <div className="contact mt-4">
//               <div className="line block bg-[#974062] md:hidden "></div>
//               <div>
//                 <div className="mb-1 text-sm text-gray-400">
//                   Injury Occurred During
//                 </div>
//                 <div className="font-bold text-gray-600">
//                   Training
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <div className="contact mt-4">
//               <div className="line block bg-[#F3476D] md:hidden "></div>
//               <div>
//                 <div className="mb-1 text-sm text-gray-400">
//                   Injury Name
//                 </div>
//                 <div className="font-bold text-gray-600">
//                   ACL Tear
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <div className="contact mt-4">
//               <div className="line block bg-[#FF9678] md:hidden "></div>
//               <div>
//                 <div className="mb-1 text-sm text-gray-400">
//                   Injury Type
//                 </div>
//                 <div className="font-bold text-gray-600">
//                   Ligament Tear
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12 md:col-span-6">
//             <div className="contact mt-4">
//               <div className="line block bg-[#FFA500] md:hidden "></div>
//               <div>
//                 <div className="mb-1 text-sm text-gray-400">
//                   First Aid Given
//                 </div>
//                 <div className="font-bold text-gray-600">
//                   Yes
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12">
//             <div className="contact mt-4">
//               <div className="line block bg-[#00B65A] md:hidden "></div>
//               <div>
//                 <div className="mb-1 text-sm text-gray-400">
//                   Injury Description
//                 </div>
//                 <div className="font-bold text-gray-600">
//                   Injury description content goes here lorem ipsum dolor sit, sed do eiummod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-span-12">
//             <div className="contact mt-4">
//               <div className="line block bg-[#974062] md:hidden "></div>
//               <div>
//                 <div className="mb-1 text-sm text-gray-400">
//                   Injury Images
//                 </div>
//                 <div className="font-bold text-gray-600 flex mt-3">
//                   <Image width={200} height={200} src={Dummy} alt="" className="mr-6" />
//                   <Image width={200} height={200} src={Dummy} alt="" className="mr-6" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="lg:col-span-6 col-span-12">
//         <div className="border border-solid border-gray-300 pl-5 pr-3 py-3 rounded-lg injured-tabs injured-details">
//           <div className="text-lg text-[#5A5A5A] font-medium lg:text-left text-center lg:mt-3 mt-5">Body Part Injured</div>
//           <div className="mt-4 relative min-h-[500px]">
//             <Tabs value="1">
//               <div className="grid grid-cols-12">
//                 <div className="lg:col-span-4 col-span-12">
//                   <TabsHeader className="pricing-tabs lg:justify-start justify-center"
//                     indicatorProps={{
//                       className:
//                         "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
//                     }}>
//                     <Tab key="1" value="1" activeClassName="active" className="bg-[#EAEAEA] lg:bg-transparent min-w-20 text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl lg:font-medium lg:uppercase">
//                       Front
//                     </Tab>
//                     <Tab key="2" value="2" activeClassName="active" className="bg-[#EAEAEA] lg:bg-transparent min-w-20 text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl ml-5 lg:font-medium lg:uppercase">
//                       Back
//                     </Tab>
//                   </TabsHeader>
//                 </div>
//                 <div className="lg:col-span-8 col-span-12">
//                   <TabsBody className="text-center lg:text-left">
//                     <TabPanel key="1" value="1">
//                       <div className="injured-body relative lg:-ml-5 lg:-mt-7">
//                         <Image width={0} height={0} src={HumanFront} alt="" className="w-auto h-auto" />
//                         <div className="border border-[#EAEAEA] rounded-lg px-4 py-3 injured-part absolute top-[90px] right-0 md:-right-[72px] lg:right-0 xl:-right[30px] 2xl:-right-[72px] bg-white drop-shadow-lg">
//                           <div className="flex items-center py-1">
//                             <Radio
//                               className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
//                             />
//                             <div className="ml-2 text-[#898989]">Severe</div>
//                           </div>
//                           <div className="flex items-center py-1">
//                             <Radio
//                               className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
//                             />
//                             <div className="ml-2 text-[#898989]">Moderate</div>
//                           </div>
//                           <div className="flex items-center py-1">
//                             <Radio
//                               className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
//                             />
//                             <div className="ml-2 text-[#898989]">Mild</div>
//                           </div>
//                         </div>
//                       </div>
//                     </TabPanel>
//                     <TabPanel key="2" value="2">
//                       <div className="injured-body relative lg:-ml-5 lg:-mt-7">
//                         <Image width={0} height={0} src={HumanBack} alt="" className="w-auto h-auto" />
//                         <div className="border border-[#EAEAEA] rounded-lg px-4 py-3 injured-part absolute top-[90px] right-0 md:-right-[72px] lg:right-0 xl:-right[30px] 2xl:-right-[72px] bg-white drop-shadow-lg">
//                           <div className="flex items-center py-1">
//                             <Radio
//                               className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
//                             />
//                             <div className="ml-2 text-[#898989]">Severe</div>
//                           </div>
//                           <div className="flex items-center py-1">
//                             <Radio
//                               className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
//                             />
//                             <div className="ml-2 text-[#898989]">Moderate</div>
//                           </div>
//                           <div className="flex items-center py-1">
//                             <Radio
//                               className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
//                             />
//                             <div className="ml-2 text-[#898989]">Mild</div>
//                           </div>
//                         </div>
//                       </div>
//                     </TabPanel>
//                   </TabsBody>
//                 </div>
//               </div>
//             </Tabs>
//           </div>

//         </div>
//       </div>
//     </div>
//     <div className=" mb-10 mt-5 flex justify-end lg:mb-0">
//       <button
//         className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
//         type="button"

//       >
//         Finish
//       </button>
//     </div>
//   </div>
// </Card>

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
      CoachQualifications:true
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
}: {
  coach: Coach;
  sports: Sports[];
}) {

  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>();

  const [selectedTab, setSelectedTab] = useState<string | undefined>(
    tabs[0]?.name
  );

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [finalTabs, setFinalTabs] = useState<TabType[]>(tabs);

  useEffect(() => {
    if (finalTabs && finalTabs.length > 0 && Object.keys(coach).length > 0) {
      const arr:TabType[]= [...finalTabs];
      const certificatesIndex = arr.findIndex((item:TabType) => item.name === "certificates");
      if (certificatesIndex > -1 && coach?.CoachQualifications) {
        const obj:TabType={...arr[certificatesIndex]}
        obj.value =  coach?.CoachQualifications?coach?.CoachQualifications?.length:0;
        arr[certificatesIndex]=obj
      }
      const batchIndex = arr.findIndex((item:TabType) => item.name === "batches");
      if (batchIndex > -1 && coach?.CoachCentersBatches) {
        const batchObj:TabType={...arr[batchIndex]}

        batchObj.value = coach?.CoachCentersBatches?coach?.CoachCentersBatches?.length:0;
        arr[batchIndex]=batchObj

      }
      if(JSON.stringify(finalTabs)!==JSON.stringify(arr)){
        setFinalTabs(arr);

      }
    }
  }, [coach, finalTabs]);

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        editButtonUrl={`/edit-coach-${coach?.id}`}
        editText={"Edit Coach"}
        tabs={finalTabs}
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
