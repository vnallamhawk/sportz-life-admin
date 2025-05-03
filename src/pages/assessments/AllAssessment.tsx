import moment from 'moment'
import {useRouter} from 'next/navigation'
import {useSession} from 'next-auth/react'
import React, {useEffect, useState} from 'react'
import AllData from '~/common/AllData'
import MultiTabComp from '~/common/MultiTabComp'
import {
  ASSESSMENT_TABLE_HEADERS,
  PHYSICAL_TEST_TABLE_HEADERS,
  SPORT_SPECIFIC_TABLE_HEADERS,
} from '~/constants/assessment'
import {api} from '~/utils/api'
import type {
  AssessmentAssignedAthletes,
  AssessmentAssignedCoaches,
  AssessmentBatches,
  AssessmentCenters,
  AssessmentResults,
  AssessmentSports,
  Assessments,
  AssignedTestBanks,
  Centers,
  Sports,
  Academies,
  Tests,
} from '@prisma/client'

interface AssessmentCentersType extends AssessmentCenters {
  AssessmentCenterBatches?: AssessmentCenterBatchesType[]
  AssessmentCenterSports?: AssessmentCenterSportsType[]
  Centers?: Centers
}

interface AssessmentCenterBatchesType {
  id: number
  assessmentCenterId: number
  batchId: number
  createdAt: Date
  updatedAt: Date
}

interface AssessmentCenterSportsType {
  id: number
  assessmentCenterId: number
  sportId: number
  createdAt: Date
  updatedAt: Date
  Sports?: Sports
}

interface AssessmentsType extends Assessments {
  AssessmentAssignedAthletes?: AssessmentAssignedAthletes[]
  AssessmentAssignedCoaches?: AssessmentAssignedCoaches[]
  AssessmentBatches?: AssessmentBatches[]
  AssessmentCenters?: AssessmentCentersType[]
  AssessmentResults?: AssessmentResults[]
  AssessmentSports?: AssessmentSports[]
  Academies?: Academies
  Sports?: Sports
  AssignedTestBanks?: AssignedTestBanks[]
}

const AllAssessment = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [filterByName, setFilterByName] = useState('')
  const [finalData, setFinalData] = useState<AssessmentsType[]>([])
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading)
  }
  const [activeKey, setActiveKey] = useState('0')
  const [childActiveKey, setChildActiveKey] = useState('0')
  const [currentPage, setCurrentPage] = useState(1)
  const [physicalTests, setPhysicalTests] = useState<Tests[]>([])
  const [sportsSkillsTests, setSportsSkillsTests] = useState<Tests[]>([])

  const {data: sessionData} = useSession()

  const academyId = sessionData?.token?.academyId || sessionData?.user?.academyId

  const {data: testsData} = api.test.getTestByAcademyId.useQuery({
    id: parseInt(academyId as string) ?? 0,
  })

  useEffect(() => {
    if (testsData && testsData.length) {
      const updatedTestsData = testsData.map((test) => ({
        ...test,
        sportName: test?.Sports?.name,
        fitness_type: test.fitnessType === 'general_fitness' ? 'general fitness' : 'sport specific',
        test_type:
          test.typeTest === 'sports_specific_skill' ? 'sports specific skill' : test.typeTest,
        fitness_component:
          test.fitnessComponent === 'movement_coordination'
            ? 'movement coordination'
            : test.fitnessComponent === 'reaction_time'
            ? 'reaction time'
            : test.fitnessComponent, // Keep other values unchanged
      }))

      const physicalTests = updatedTestsData.filter((test) => test.typeTest === 'physical')
      const sportsSpecificSkillTests = updatedTestsData.filter(
        (test) => test.typeTest === 'sports_specific_skill'
      )

      setPhysicalTests(physicalTests)
      setSportsSkillsTests(sportsSpecificSkillTests)
    }
  }, [testsData])

  const assessmentsDataArray = api.assessment.getAllAssessmentsWithPagination.useQuery({
    page: currentPage,
    limit: 10,
  })

  const assessmentsData = assessmentsDataArray?.data?.data ?? [] // Ensure it's an array

  // eslint-disable-next-line
  const totalPages = assessmentsDataArray?.data?.totalPages ?? 1 // Ensure a valid number

  useEffect(() => {
    if (assessmentsData && assessmentsData?.length > 0) {
      const updatedAssessments = assessmentsData.map((assessment) => {
        return {
          ...assessment,
          sportName: assessment.Sports?.name ?? '',
        }
      })
      setFinalData(updatedAssessments)
    }
  }, [assessmentsData])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <>
      <MultiTabComp
        tab1label='ALL ASSESSMENTS'
        tab2label='All Test Banks'
        addButtonText={activeKey === '0' ? 'Add Assessment' : 'Add Test Bank'}
        addButtonUrl={
          activeKey === '0'
            ? `/assessments/AddAssessment`
            : childActiveKey === '0'
            ? `/assessments/AddPhysicalTestBank`
            : `/assessments/AddSportSpecificTestBank`
        }
        dropdownItems={{}}
        table1show={true}
        table2show={false}
        table2Component={
          <MultiTabComp
            tab1label='PHYSICAL TESTS'
            tab2label='SPORTS-SPECIFIC TESTS'
            dropdownItems={{}}
            table1show={true}
            table2show={true}
            TABLE1_HEAD={PHYSICAL_TEST_TABLE_HEADERS}
            TABLE1_ROWS={physicalTests}
            TABLE2_HEAD={SPORT_SPECIFIC_TABLE_HEADERS}
            TABLE2_ROWS={sportsSkillsTests}
            setActiveKey={(key: string) => setChildActiveKey(key)}
            activeKey={childActiveKey}
            // onViewClick={(id: number) => {}}
            // onEditClick={(id: number) => {}}
            // onDeleteClick={(id: number) => {}}
            totalPages={totalPages}
            currentPage={currentPage}
            onHandlePageChange={handlePageChange}
          />
        }
        TABLE1_HEAD={ASSESSMENT_TABLE_HEADERS}
        TABLE1_ROWS={finalData}
        TABLE2_HEAD={ASSESSMENT_TABLE_HEADERS}
        TABLE2_ROWS={[]}
        filter={activeKey === '0' ? false : true}
        filters={activeKey === '0' ? [] : []}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        setActiveKey={(key: string) => setActiveKey(key)}
        activeKey={activeKey}
        onViewClick={(id: number) => {
          router.replace(`/assessments/${id}`)
          // window.location.reload();
        }}
        // eslint-disable-next-line
        onEditClick={(id: number) => {
          router.replace(`/edit-assessment-${id}`)
          // window.location.reload();
        }}
        // onDeleteClick={(id: number) => deleteAthlete(id)}
        totalPages={totalPages}
        currentPage={currentPage}
        onHandlePageChange={handlePageChange}
      />
    </>
  )
}

export default AllAssessment
