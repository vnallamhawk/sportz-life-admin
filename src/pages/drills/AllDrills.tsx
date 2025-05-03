import {useRouter} from 'next/navigation'
import {useState} from 'react'
import MultiTabComp from '~/common/MultiTabComp'
import {COACHING_DRILL_TABLE_HEADERS, FITNESS_DRILL_TABLE_HEADERS} from '~/constants/drillConstant'

const AllDrills = () => {
  const router = useRouter()
  // const [loading, setLoading] = useState(true)
  const [filterByName, setFilterByName] = useState('')
  const [activeKey, setActiveKey] = useState('0')

  // const handleIsLoading = (isLoading: boolean) => {
  //   setLoading(isLoading)
  // }
  // const [finalData, setFinalData] = useState<{[key: string]: any}[]>([])
  // const [filters, setFilters] = useState<{[key: string]: any}>([])

  // const deleteDrills = (id: number) => {
  // deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  // };
  // const handleFilters = (appliedFilters: {[key: string]: any}) => {
  //   setFilters(appliedFilters)
  // }
  return (
    <>
      <MultiTabComp
        tab1label='FITNESS DRILL'
        tab2label='COACHING DRILL'
        addButtonText='Add Drill'
        addButtonUrl={
          activeKey === '0'
            ? '/drills/AddDrills/AddFitnessDrills'
            : '/drills/AddDrills/AddCoachingDrills'
        }
        dropdownItems={{}}
        table1show={true}
        filters={[]}
        // applyFilters={(appliedFilters: {[key: string]: any}) => handleFilters(appliedFilters)}
        table2show={true}
        TABLE1_HEAD={COACHING_DRILL_TABLE_HEADERS}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={FITNESS_DRILL_TABLE_HEADERS}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        onViewClick={(id: number) => router.push(`/drills/${id ?? ''}`)}
        onEditClick={(id: number) => router.push(`/edit-drills-${id}`)}
        // onDeleteClick={(id: number) => deleteDrills(id)}
        activeKey={activeKey}
        setActiveKey={(key: string) => setActiveKey(key)}
      />
    </>
  )
}

export default AllDrills
