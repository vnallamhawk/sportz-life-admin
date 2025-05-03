import React, {useState} from 'react'

// import {useRouter} from 'next/navigation'

import MultiTabComp from '~/common/MultiTabComp'
import {INJURY_ATHLETE_TABLE_HEADER, INJURY_COACH_TABLE_HEADER} from '~/constants/injuryLog'

export default function AllInjuryLogs() {
  // const router = useRouter()
  const [activeKey, setActiveKey] = useState('0')

  const [filterByName, setFilterByName] = useState('')
  // const [loading, setLoading] = useState(true)
  // const [filters, setFilters] = useState<{[key: string]: any}>([])

  // const handleIsLoading = (isLoading: boolean) => {
  //   setLoading(isLoading);
  // };

  // const handleFilters = (appliedFilters: {[key: string]: any}) => {
  //   setFilters(appliedFilters)
  // }

  return (
    <>
      <MultiTabComp
        tab1label='Athlete Injuries'
        tab2label='Coach Injuries'
        addButtonText='Add Injury'
        addButtonUrl={`/injurylog/AddInjury`}
        dropdownItems={{}}
        table1show={true}
        table2show={true}
        TABLE1_HEAD={INJURY_ATHLETE_TABLE_HEADER}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={INJURY_COACH_TABLE_HEADER}
        TABLE2_ROWS={[]}
        // applyFilters={(appliedFilters: {[key: string]: any}) => handleFilters(appliedFilters)}
        filter={true}
        filters={[
          {
            label: 'Filter by Injury Type',
            id: 'sports',
            type: 'multiSelect',
            data: [
              {label: 'Severe', value: 'Severe'},
              {label: 'Moderate', value: 'Moderate'},
              {label: 'Mild', value: 'Mild'},
            ],
          },
          {
            label: 'Filter by Injury Status',
            id: 'centers',
            type: 'multiSelect',
            data: [
              {label: 'Active', value: 'active'},
              {label: 'Past', value: 'past'},
            ],
          },
        ]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        setActiveKey={(key: string) => setActiveKey(key)}
        activeKey={activeKey}
        // onViewClick={(id: number) => {}}
        // onEditClick={(id: number) => {}}
        // onDeleteClick={(id: number) => {}}
      />
    </>
  )
}
