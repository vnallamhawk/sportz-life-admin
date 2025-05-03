import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'
import {api} from '~/utils/api'
import {STAFF_PAYROLL_TABLE_HEADERS} from '~/constants/staffPayroll'
import AllData from '~/common/AllData'
import moment from 'moment-timezone'
import type {StaffPayroll} from '@prisma/client'

const AllStaffPayroll = () => {
  const router = useRouter()
  // const [loading, setLoading] = useState(true);
  // const handleIsLoading = (isLoading: boolean) => {
  //   setLoading(isLoading);
  // };

  const [finalData, setFinalData] = useState<StaffPayroll[]>([])

  const {data: staffPayroll} = api.staffPayroll.getAllPayroll.useQuery()

  useEffect(() => {
    if (staffPayroll && staffPayroll?.length > 0) {
      const updatedStaffPayroll = staffPayroll.map((payroll) => {
        return {
          ...payroll,
          designation: payroll?.StaffDesignation?.designation,
          tax: payroll?.grossSalary - payroll?.netSalary,
        }
      })
      setFinalData(updatedStaffPayroll)
    }
  }, [staffPayroll])

  const {mutate: deleteMutate} = api.staffPayroll.deletePayroll.useMutation({
    onSuccess: (response) => {
      const arr: StaffPayroll[] = [...finalData]
      const index = finalData?.findIndex((item: StaffPayroll) => item?.id == response?.id)
      if (index > -1) {
        arr.splice(index, 1)
      }
      setFinalData(arr)
      return response
    },
  })

  const deletePayroll = (id: number) => {
    deleteMutate({payrollId: id, deletedAt: moment().toISOString()})
  }

  return (
    <>
      <AllData
        title='ALL PAYROLLS'
        addButtonText='ADD Payroll'
        addButtonUrl='/staffPayroll/AddPayroll'
        dropdownItems={{}}
        filter={false}
        TABLE_HEAD={STAFF_PAYROLL_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        rowSelection={false}
        showImage={false}
        onEditClick={(id: number) => router.push(`/edit-staffPayroll-${id}`)}
        onDeleteClick={(id: number) => deletePayroll(id)}
      />
    </>
  )
}

export default AllStaffPayroll
