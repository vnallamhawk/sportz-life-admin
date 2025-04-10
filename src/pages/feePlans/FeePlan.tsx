import {useState} from 'react'
import FeePlanTable from '~/components/FeePlan/FeePlanTable'
import Pagination from '~/components/Pagination'
import {usePagination} from '~/hooks/usePagination'
import {api} from '~/utils/api'

export const FeePlan = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {data} = api?.feePlan.getAllFeePlans.useQuery({limit: 5, page: currentPage})
  const totalItems = data?.totalItems
  const feePlans = data?.data
  const {pageNumbers, totalPages} = usePagination(totalItems ?? 0, 5, currentPage)

  return (
    <div>
      <h1 className='ml-10 text-xl text-[#404040]'>FEE PLANS</h1>
      <FeePlanTable tableData={feePlans} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default FeePlan
