import {Fragment, useState} from 'react'
import Button from '~/components/Button'
import Card from '~/components/Card'
import FeePlanTable from '~/components/FeePlan/FeePlanTable'
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner'
import Pagination from '~/components/Pagination'
import {usePagination} from '~/hooks/usePagination'
import {api} from '~/utils/api'
import {useRouter} from 'next/router'

export const FeePlan = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {data, isLoading} = api?.feePlan.getAllFeePlans.useQuery({limit: 5, page: currentPage})
  const totalItems = data?.totalItems
  const feePlans = data?.data
  const {pageNumbers, totalPages} = usePagination(totalItems ?? 0, 5, currentPage)
  const router = useRouter()

  return (
    <div>
      {/* <h1 className='ml-10 text-xl text-[#404040]'>FEE PLANS</h1> */}

      <div className='px-6'>
        <Card className=' relative col-span-12 h-full min-h-screen !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4'>
          <div className='flex justify-between'>
            <div className='FEE PLANS text-xl'> FEE PLANS</div>
            <Button
              className='w-full rounded-full !border-0 bg-mandy-dark px-5 py-3 text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring-0 lg:w-auto lg:rounded lg:py-1.5'
              type='submit'
              onClick={() => void router.push('/feePlans/AddPlan')}
            >
              Add Fee Plan
            </Button>
          </div>

          {isLoading ? (
            <div className='flex h-full items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <Fragment>
              <FeePlanTable tableData={feePlans} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onPageChange={setCurrentPage}
              />
            </Fragment>
          )}
        </Card>
      </div>
    </div>
  )
}

export default FeePlan
