import {useEffect, useState} from 'react'
// import type {StaticImageData} from 'next/image'
import CoachImg from '../../images/CoachesImg.png'
import BatchImg from '../../images/BatchesImg.png'
import AthleteImg from '../../images/AthelteImg.png'
import InventoryImg from '../../images/InventoryImg.png'
import {prisma} from '~/server/db'
import {type GetServerSidePropsContext} from 'next'
import type {
  AssessmentAssignedAthletes,
  AssessmentAssignedCoaches,
  AssessmentBatches,
  AssessmentCenters,
  Assessments,
  AthleteBatchesMaps,
  Athletes,
  Batches,
  Centers,
  Coaches,
  Sports,
} from '@prisma/client'
// import {ToastContext} from '~/contexts/Contexts'
// import {useRouter} from 'next/router'
import DetailPage from '~/common/DetailPage/DetailPage'
import AllData from '~/common/AllData'
// import { ASSESSMENT_DASH_ATHLETE_TABLE_HEADERS, ASSESSMENT_DASH_BATCH_TABLE_HEADERS, ASSESSMENT_DASH_COACH_TABLE_HEADERS, ASSESSMENT_DASH_CENTER_TABLE_HEADERS } from "~/constants/assessmentDashTables";
import type {TabType} from '~/types/common'
import {ASSESSMENT_ASSIGNED_TABLE_HEADERS} from '~/constants/assessment'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context?.params?.id
  const assessment = await prisma.assessments.findUnique({
    where: {id: id ? Number(id) : undefined},
    include: {
      AssessmentAssignedAthletes: {
        include: {
          Athletes: {
            include: {
              AthleteBatchesMaps: {
                include: {
                  Batches: {
                    include: {
                      Coaches: true, // Assuming Coaches are linked to Batches
                      Centers: true,
                    },
                  },
                  Sports: true, // If you need sport info
                },
              },
            },
          },
        },
      },
      AssessmentAssignedCoaches: true,
      AssessmentBatches: true,
      AssessmentCenters: {
        include: {
          Centers: true,
        },
      },
      AssessmentResults: {
        include: {
          AssignedTests: {
            include: {
              AssignedTestBanks: true,
              Tests: true,
            },
          },
        },
      },
      AssessmentSports: true,
      Academies: true,
      Sports: true,
    },
  })

  return {
    props: {
      assessment: JSON.parse(JSON.stringify(assessment)), // <== Convert data to JSON-safe format
    },
  }
}

const tabs: TabType[] = [
  {label: 'Athletes', name: 'athletes', value: '0', image: AthleteImg, allLabel: 'All Athletes'},
  {label: 'Coaches', name: 'coaches', value: '0', image: CoachImg, allLabel: 'All Coaches'},
  {label: 'Batches', name: 'batches', value: '0', image: BatchImg, allLabel: 'All Batches'},
  {label: 'Centers', name: 'centers', value: '0', image: InventoryImg, allLabel: 'All Centers'},
]

interface AssessmentCentersType extends AssessmentCenters {
  Centers?: Centers
}

interface BatchesType extends Batches {
  Coaches: Coaches
}
interface AthleteBatchesMapsType extends AthleteBatchesMaps {
  Batches: BatchesType
}
interface AthletesType extends Athletes {
  AthleteBatchesMaps: AthleteBatchesMapsType[]
}
interface AssessmentAssignedAthletesType extends AssessmentAssignedAthletes {
  Athletes: AthletesType
}

interface AssessmentDetails extends Assessments {
  AssessmentAssignedAthletes?: AssessmentAssignedAthletesType[]
  AssessmentAssignedCoaches?: AssessmentAssignedCoaches[]
  AssessmentBatches?: AssessmentBatches[]
  AssessmentCenters?: AssessmentCentersType[]
  Sports?: Sports
}

interface SingleAssessment {
  id: number
  name: string
  assessmentDetails: object
  assessmentDescription: string
  assessmentSchedule: object
  assessmentScoreAccess: object
  assessmentPerformanceTests: object
}

interface AssessmentAssignedTableRow {
  id: number // Add an id field
  athleteName: string
  batchName: string
  centerName: string
  coachName: string
}

export default function Page({assessment}: {assessment: AssessmentDetails}) {
  // const router = useRouter()
  // const {openToast, setOpenToast} = useContext(ToastContext)
  const [selectedTab, setSelectedTab] = useState<string | undefined>(tabs[0]?.name)
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>()
  // const [finalTabs, setFinalTabs] = useState<TabType[]>(tabs)
  const [finalData, setFinalData] = useState<SingleAssessment | null>(null)
  const [finalAssignedData, setFinalAssignedData] = useState<AssessmentAssignedTableRow[]>([])

  useEffect(() => {
    if (assessment && Object.keys(assessment).length > 0) {
      const newAssessment = {
        id: assessment.id,
        name: assessment.name,
        assessmentDescription: assessment.description || '',
        assessmentDetails: {
          sport: assessment?.Sports?.name,
          trainingLevel: assessment.level,
          testRankType: '-',
        },
        assessmentSchedule: {
          duration: assessment?.mode,
          type: assessment?.interval,
          startDate: assessment?.startDate
            ? new Date(assessment.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
            : '',
          endDate: assessment?.endDate
            ? new Date(assessment.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
            : '',
        },
        assessmentScoreAccess: {},
        assessmentPerformanceTests: {},
      }

      if (assessment?.AssessmentAssignedAthletes && assessment?.AssessmentAssignedAthletes.length) {
        const formattedData: AssessmentAssignedTableRow[] =
          assessment?.AssessmentAssignedAthletes.map((assignedAthlete) => {
            const athlete = assignedAthlete?.Athletes
            const batches = athlete?.AthleteBatchesMaps || []

            const batchName = batches
              .map((batchMap) => batchMap?.Batches?.name)
              .filter(Boolean)
              .join(', ')
            const firstBatch = batches[0]
            const coachName = firstBatch?.Batches?.Coaches?.name || 'N/A'
            const centerName = firstBatch?.centerId ? `Center ${firstBatch.centerId}` : 'N/A'

            return {
              id: athlete?.id,
              athleteName: athlete?.name || 'N/A',
              batchName: batchName || 'N/A', // Changed from batchNames to batchName
              centerName,
              coachName,
            }
          })

        setFinalAssignedData(formattedData)
      } else {
        setFinalAssignedData([])
      }

      setFinalData(newAssessment)
    }
  }, [assessment])

  const handleClick = (tab: TabType) => {
    // let TABLE_HEAD
    // let TABLE_ROWS = []
    // let tableProps = {}

    // switch (tab?.name) {
    //   case "athletes":
    //     TABLE_HEAD = ASSESSMENT_DASH_ATHLETE_TABLE_HEADERS;
    //     TABLE_ROWS = assessment?.AssessmentAssignedAthletes || [];
    //     break;
    //   case "coaches":
    //     TABLE_HEAD = ASSESSMENT_DASH_COACH_TABLE_HEADERS;
    //     TABLE_ROWS = assessment?.AssessmentAssignedCoaches || [];
    //     break;
    //   case "batches":
    //     TABLE_HEAD = ASSESSMENT_DASH_BATCH_TABLE_HEADERS;
    //     TABLE_ROWS = assessment?.AssessmentBatches || [];
    //     break;
    //   case "centers":
    //     TABLE_HEAD = ASSESSMENT_DASH_CENTER_TABLE_HEADERS;
    //     TABLE_ROWS = assessment?.AssessmentCenters?.map((data) => ({
    //       ...assessment,
    //       name: data?.Centers?.name || "Unknown",
    //     })) || [];
    //     break;
    // }

    setSelectedComponent(
      <AllData
        title={tab?.allLabel || ''}
        dropdownItems={{}}
        TABLE_HEAD={[]}
        TABLE_ROWS={[]}
        rowSelection={false}
        showImage={false}
      />
    )
    setSelectedTab(tab?.name)
  }

  return (
    <DetailPage
      cardTitle='ASSESSMENTS'
      editButtonUrl={`/edit-assessment-${assessment?.id}`}
      editText='Edit Assessment'
      handleTabClick={handleClick}
      data={finalData ?? {}}
      selectedComponent={selectedComponent}
      selectedTab={selectedTab}
      showImage={false}
      assessmentAsignedComponent={
        <AllData
          title={'Assessments'}
          dropdownItems={{}}
          TABLE_HEAD={ASSESSMENT_ASSIGNED_TABLE_HEADERS}
          TABLE_ROWS={finalAssignedData}
          rowSelection={false}
          showImage={false}
        />
      }
      // badgeData={assessment?.AssessmentSports || []}
      // details={[
      //   { items: [{ label: "Sport", value: assessment?.Sports?.name }] },
      //   { items: [{ label: "Academy", value: assessment?.Academies?.name }] },
      //   { items: [{ label: "Start Date", value: assessment?.startDate }] },
      //   { items: [{ label: "End Date", value: assessment?.endDate }] },
      // ]}
    />
  )
}
