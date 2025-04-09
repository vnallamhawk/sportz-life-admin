import {Chip} from '@material-tailwind/react'
import {FEE_PLAN_TABLE_HEADER} from '~/constants/feePlanConstants'
import {PLANNING_FEE_TYPE} from '~/constants/pricingConstant'
import type {FEE_PLAN_TABLE, FEE_PLAN_TABLE_ID} from '~/types/feePlan'
import {Dropdown, DropdownHeader} from 'flowbite-react'
import Image from 'next/image'
import Dots from '../../images/dots.svg'
import {useRouter} from 'next/navigation'
import {api} from '~/utils/api'

const FeePlanTable = ({tableData}: {tableData: Partial<FEE_PLAN_TABLE>[] | undefined}) => {
  const router = useRouter()

  const getTableCellContent = (id: FEE_PLAN_TABLE_ID, data: Partial<FEE_PLAN_TABLE>) => {
    let cellContent: React.ReactNode = undefined

    const {mutate: deleteFeePlanMutate} = api.feePlan.deleteFeePlan.useMutation({
      onSuccess: () => {
        router.push('/feePlans') // Redirect after deletion or refetch data
      },
      onError: (error) => {
        console.error('Error deleting fee plan:', error)
      },
    })

    switch (id) {
      case 'action':
        cellContent = (
          <Dropdown
            label=''
            dismissOnClick={false}
            placement='top'
            className='view-drop h-auto w-auto rounded-lg bg-black'
            renderTrigger={() => (
              <button className='py-2'>
                <Image width={20} height={20} src={Dots} alt='' />
              </button>
            )}
          >
            <DropdownHeader>
              <div className='flex items-center'>
                <button
                  className='mx-1 text-white'
                  onClick={() => (data.id ? void router.push(`/edit-fee-plan-${data?.id}`) : null)}
                >
                  Edit
                </button>
                <button
                  className='mx-1 text-white'
                  onClick={() => (data.id ? deleteFeePlanMutate({feePlanId: data.id}) : null)}
                >
                  Delete
                </button>
                {/* )} */}
              </div>
            </DropdownHeader>
          </Dropdown>
        )
        break

      case 'feeType':
        if (data.feeType) {
          cellContent = PLANNING_FEE_TYPE[data.feeType]
        }
        break

      case 'status':
        if (data.feeType) {
          cellContent = (
            <div className='w-max'>
              <Chip
                className={data?.status === true ? 'text-green-500' : 'text-red-500'}
                size='sm'
                variant='ghost'
                value={data?.status === true ? 'On' : 'Off'}
              />
            </div>
          )
        }
        break

      default:
        cellContent = data[id]
    }

    return cellContent
  }

  return (
    <div className='scroll mt-5 hidden overflow-auto px-0 px-10 lg:block'>
      <table className='common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left'>
        <thead>
          <tr className='bg-gray-200 text-sm uppercase leading-normal text-gray-600'>
            {FEE_PLAN_TABLE_HEADER?.map((head, index) => (
              <th
                key={index}
                className='p-4 pb-2 pl-7'
                style={{minWidth: '150px', wordBreak: 'break-word'}} // Prevents text overflow
              >
                {head.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100 bg-white text-gray-800'>
          {tableData &&
            tableData?.length > 0 &&
            tableData?.map((data, dataIndex) => (
              <tr key={dataIndex} className='border-b border-gray-100'>
                {FEE_PLAN_TABLE_HEADER.map((head, headIndex) => (
                  <td
                    key={headIndex}
                    className='px-6 py-4 font-semibold'
                    style={{minWidth: '150px', wordBreak: 'break-word'}} // Ensures text wraps properly
                  >
                    {getTableCellContent(head.id, data)}
                    {/* {head.id !== 'action' ? (
                      <span>{data[head.id]}</span>
                    ) : (
                      <span
                        className='cursor-pointer font-medium text-gray-400 hover:text-red-500'
                        onClick={() => onRemoveTableButton(dataIndex)}
                      >
                        Remove
                      </span>
                    )} */}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeePlanTable
