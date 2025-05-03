import React, {useState} from 'react'
// import Card from '~/components/Card/Card'
// import CardTitle from '~/components/Card/CardTitle'
// import Textbox from '~/components/Textbox/Textbox'
// import Button from '~/components/Button/Button'
// import Table from '~/components/Table/Table'
// import CoachTableHeader from '../../components/AllCoaches/CoachTableHeader'
// import CoachTableBody from "../../components/AllCoaches/CoachTableBody";
// import {useRouter} from 'next/navigation'
// import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner'
// import TabsComponent from '~/components/Tabs'
import MultiTabComp from '~/common/MultiTabComp'
import {INJURY_ATHLETE_TABLE_HEADER, INJURY_COACH_TABLE_HEADER} from '~/constants/injuryLog'

export default function AllTrainingPlans() {
  // const router = useRouter()

  const [activeKey, setActiveKey] = useState('0')

  const [filterByName, setFilterByName] = useState('')
  // const [loading, setLoading] = useState(true)
  // const [filters, setFilters] = useState<{[key: string]: any}>([])

  // const handleFilters = (appliedFilters: {[key: string]: any}) => {
  //   setFilters(appliedFilters)
  // }
  // const handleIsLoading = (isLoading: boolean) => {
  //   setLoading(isLoading);
  // };

  return (
    <>
      {/* <Checkout /> */}
      <MultiTabComp
        tab1label='FITNESS PLAN'
        tab2label='COACHING PLAN'
        addButtonText='Add Plan'
        setActiveKey={(key: string) => setActiveKey(key)}
        activeKey={activeKey}
        addButtonUrl={
          activeKey === '0'
            ? '/trainingPlan/AddTrainingPlan/FitnessPlan'
            : '/trainingPlan/AddTrainingPlan/CoachingPlan'
        }
        filters={[]}
        // applyFilters={(appliedFilters: {[key: string]: any}) => handleFilters(appliedFilters)}
        dropdownItems={{}}
        table1show={true}
        table2show={true}
        TABLE1_HEAD={INJURY_ATHLETE_TABLE_HEADER}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={INJURY_COACH_TABLE_HEADER}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}

        // onViewClick={(id: number) => {}}
        // onEditClick={(id: number) => {}}
        // onDeleteClick={(id: number) => {}}
      />
    </>
  )
}
