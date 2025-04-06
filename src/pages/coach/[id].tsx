import {
  // useContext
  useEffect,
  useState,
} from 'react'
// import Button from "~/components/Button";
// import Card from "~/components/Card";
// import CardTitle from "~/components/Card/CardTitle";
// import Image from "next/image";
import {prisma} from '~/server/db'
import {type GetServerSidePropsContext} from 'next'
import staffCalendar from '../../images/Staff_calendar.png'
import staffCenter from '../../images/Staff_center.png'
import staffPayroll from '../../images/Staff_payroll.png'
import staffShift from '../../images/Staff_shift.png'
import type {
  Batches,
  Centers,
  CoachCentersBatches,
  CoachQualifications,
  CoachSportsMaps,
  Coaches,
  StaffPayroll,
} from '@prisma/client'
import {type Sports} from '@prisma/client'
import type {TabType, TableHead} from '~/types/common'
import Attendance from '~/components/Attendance'
import AllData from '~/common/AllData'
import DetailPage from '~/common/DetailPage/DetailPage'

import // DATE_TIME_FORMAT,
// NO_DATA,
'~/globals/globals'
// import {
//   type CoachWithRelations,
//   ExperienceLevelEnum,
//   TrainingLevelEnum,
// } from "~/types/coach";
// import { dateFormat } from "~/helpers/date";
// import CoachBatch from "~/components/Coach/Batch/CoachBatch";
// import CoachAttendance from "~/components/Coach/Attendance/CoachAttendance";
import {calculateAge} from '~/utils/common'
import {COACH_DASH_BATCH_TABLE_HEADERS} from '~/constants/centerDashTables'
import {STAFF_DASH_PAYROLL_TABLE_HEADERS} from '~/constants/staffConstants'
import {COACH_CERTIFICATE_TABLE_HEADERS, COACH_DESIGNATION} from '~/constants/coachConstants'

interface CoachCentersBatchesType extends CoachCentersBatches {
  Batches?: Batches
}

interface CoachSportsMapsType extends CoachSportsMaps {
  Sports?: Sports
}

type Coach = Coaches & {
  CoachSportsMaps: CoachSportsMapsType[]
  CoachQualifications: CoachQualifications[]
  CoachCentersBatches: CoachCentersBatchesType[]
  StaffPayroll: StaffPayroll
  Centers: Centers
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context?.params?.id
  // const sports = await prisma.sports.findMany();
  const coach = await prisma.coaches.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      Centers: true,
      CoachCentersBatches: {
        include: {
          Batches: {
            include: {
              Sports: true,
            },
          },
        },
      },
      CoachSportsMaps: {
        include: {
          Sports: true,
        },
      },
      StaffPayroll: true,
      CoachQualifications: true,
    },
  })

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      coach: JSON.parse(JSON.stringify(coach)), // <== here is a solution
    },
  }
}

const tabs = [
  {
    label: 'Attendance',
    name: 'attendance',
    value: '60%',
    image: staffCalendar,
    allLabel: 'ATTENDANCE',
  },
  {
    label: 'Batches',
    name: 'batches',
    value: '02',
    image: staffCenter,
    allLabel: 'CENTERS',
  },
  // {
  //   label: "Payroll",
  //   name: "payroll",
  //   value: "$400",
  //   image: staffPayroll,
  //   allLabel: "PAYROLL",
  // },
  {
    label: 'Certificates',
    name: 'certificates',
    // value: "03",
    image: staffShift,
    allLabel: 'DUTY SHIFT',
  },
]

export default function Page({coach}: {coach: Coach; sports: Sports[]}) {
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>()

  const [selectedTab, setSelectedTab] = useState<string | undefined>(tabs[0]?.name)

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [finalTabs, setFinalTabs] = useState<TabType[]>(tabs)

  useEffect(() => {
    if (finalTabs && finalTabs.length > 0 && Object.keys(coach).length > 0) {
      const arr: TabType[] = [...finalTabs]
      const certificatesIndex = arr.findIndex((item: TabType) => item.name === 'certificates')
      if (certificatesIndex > -1 && coach?.CoachQualifications) {
        const obj: TabType = {...arr[certificatesIndex]}
        obj.value = coach?.CoachQualifications ? coach?.CoachQualifications?.length : 0
        arr[certificatesIndex] = obj
      }
      const batchIndex = arr.findIndex((item: TabType) => item.name === 'batches')
      if (batchIndex > -1 && coach?.CoachCentersBatches) {
        const batchObj: TabType = {...arr[batchIndex]}

        batchObj.value = coach?.CoachCentersBatches ? coach?.CoachCentersBatches?.length : 0
        arr[batchIndex] = batchObj
      }
      if (JSON.stringify(finalTabs) !== JSON.stringify(arr)) {
        setFinalTabs(arr)
      }
    }
  }, [coach, finalTabs])

  useEffect(() => {
    if (coach && coach.image) {
      void getSignedUrlForImage(coach.image)
    }
  }, [coach])

  // eslint-disable-next-line @typescript-eslint/require-await
  // const getSignedUrlForImage = async (key: string) => {
  //   try {
  //     const s3info = s3.getSignedUrl("getObject", {
  //       Bucket: process.env.BUCKET_NAME,
  //       Key: key,
  //       Expires: 60,
  //     });
  //     // eslint-disable-next-line no-console
  //     console.log({ s3info });
  //     setImageUrl(s3info);
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // };

  const getSignedUrlForImage = async (key: string) => {
    try {
      const response = await fetch(`/api/aws/getAwsSignedURL?key=${encodeURIComponent(key)}`)
      if (!response.ok) throw new Error('Failed to fetch signed URL')

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {url} = await response.json()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setImageUrl(url)
    } catch (error) {
      console.error('Error fetching signed URL:', error)
    }
  }

  const handleClick = (tab: TabType) => {
    let component
    let TABLE_HEAD: TableHead = []
    let TABLE_ROWS: {[key: string]: any; id: number}[] = []
    if (tab?.name === 'attendance') {
      component = <Attendance />
    } else {
      if (tab?.name === 'batches') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        TABLE_HEAD = COACH_DASH_BATCH_TABLE_HEADERS

        // eslint-disable-next-line
        coach.CoachCentersBatches = coach?.CoachCentersBatches?.map(
          // eslint-disable-next-line
          (item: any) => ({
            ...item,
            center: coach?.Centers?.name, // Access 'Centers' from each batch entry
            // eslint-disable-next-line
            batchName: item.Batches?.name,
            // eslint-disable-next-line
            students: item.Batches?.capacity,
            // eslint-disable-next-line
            startDate: new Date(item.Batches?.createdAt).toLocaleDateString('en-GB'),
            // eslint-disable-next-line
            sportName: item.Batches?.Sports?.name,
          })
        )

        TABLE_ROWS = coach?.CoachCentersBatches || []
      } else if (tab?.name === 'payroll') {
        TABLE_HEAD = STAFF_DASH_PAYROLL_TABLE_HEADERS
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        TABLE_ROWS = coach?.StaffPayroll ? [coach?.StaffPayroll] : []
      } else if (tab?.name === 'certificates') {
        TABLE_HEAD = COACH_CERTIFICATE_TABLE_HEADERS
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        TABLE_ROWS = coach?.CoachQualifications ? coach?.CoachQualifications : []
      }
      component = (
        <AllData
          title={tab?.allLabel ? tab?.allLabel : ''}
          dropdownItems={{}}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          rowSelection={false}
          showImage={false}
        />
      )
    }
    setSelectedComponent(component)
    setSelectedTab(tab?.name)
  }

  const coachDesignation =
    COACH_DESIGNATION.find((d) => d.value === coach.designation)?.label || coach.designation

  return (
    <>
      <DetailPage
        cardTitle='Coach DETAILS'
        editButtonUrl={`/edit-coach-${coach?.id}`}
        editText={'Edit Coach'}
        tabs={finalTabs}
        handleTabClick={handleClick}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        data={{...coach, imageUrl}}
        name={`${coach?.name}(${coachDesignation})`}
        selectedComponent={selectedComponent}
        selectedTab={selectedTab}
        badgeData={coach?.CoachSportsMaps || []}
        details={[
          {
            items: [
              {
                label: 'Contact Number',
                value: coach?.phone || '',
              },
              {label: 'Email', value: coach?.email || ''},

              {
                label: 'Age',
                value: calculateAge(coach?.dateOfBirth),
              },

              {label: 'Gender', value: coach?.gender || ''},
              {
                label: 'Training Level',
                value: coach?.trainingLevel || '',
              },
            ],
          },
        ]}
      />
    </>
  )
}
