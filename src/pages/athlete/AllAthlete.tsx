import React, {useEffect, useState} from 'react'
import AllData from '~/common/AllData'
import {useRouter} from 'next/router'
import {api} from '~/utils/api'
import moment from 'moment-timezone'
import type {
  AthleteBatchesMaps,
  Athletes,
  AthleteSportsMaps,
  Batches,
  Centers,
  Coaches,
  FeePlans,
  Sports,
} from '@prisma/client'

interface BatchesType extends Batches {
  Coaches?: Coaches
  FeePlans?: FeePlans
  Sports?: Sports
  Centers?: Centers
}

interface AthleteBatchesMapsType extends AthleteBatchesMaps {
  Batches?: BatchesType
}

interface AthleteSportsMapsType extends AthleteSportsMaps {
  Sports?: Sports
  Centers?: Centers
}

type AthletesType = Athletes & {
  AthleteSportsMaps: AthleteSportsMapsType[]
  AthleteBatchesMaps: AthleteBatchesMapsType[]
}

const TABLE_HEAD = [
  {label: 'Athlete Name', id: 'name'},
  // { label: "Training Level", id: "t_level" },
  {label: 'Center', id: 'center'},
  {label: 'Batch', id: 'batches'},
  {label: 'Fee Status of the Month', id: 'status'},
  {label: 'Action', id: 'action'},
]

export default function Athlete() {
  const [filterByName, setFilterByName] = useState('')
  const router = useRouter()
  const [finalData, setFinalData] = useState<Athletes[]>([])
  // const [filters, setFilters] = useState<{ [key: string]: any }>([]);
  const [currentPage, setCurrentPage] = useState(1)

  const athletesData =
    filterByName == ''
      ? api.athlete.getAllAthletesWithPagination.useQuery({
          page: currentPage,
          limit: 10,
        })
      : api.athlete.getAthleteByName.useQuery({name: filterByName})
  const {data: sports} = api.sports.getAllSports.useQuery()
  const {data: centers} = api.center.getAllCenters.useQuery()
  const {data: batches} = api.batches.getAllBatches.useQuery()

  // eslint-disable-next-line
  const athletes = athletesData?.data?.data ?? [] // Ensure it's an array

  // eslint-disable-next-line
  const totalPages = athletesData?.data?.totalPages ?? 1 // Ensure a valid number

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const dropdownObj = {
    changeCenter: true,
    changeBatch: true,
    delete: true,
    attendance: true,
    reminder: true,
    freeze: true,
  }

  const {mutate: deleteMutate} = api.athlete.deleteAthlete.useMutation({
    onSuccess: (response) => {
      const arr: Athletes[] = [...finalData]
      const index = finalData?.findIndex((item: Athletes) => item?.id == response?.id)
      if (index > -1) {
        arr.splice(index, 1)
      }
      setFinalData(arr)
      return response
    },
  })

  useEffect(() => {
    if (athletes && athletes?.length > 0) {
      const updatedAthletes: AthletesType[] = athletes.map((athletes: AthletesType) => {
        return {
          ...athletes,
          batches: athletes?.AthleteBatchesMaps.map(
            // eslint-disable-next-line
            (map: any) => map.Batches.name
          ).join(', '),
          center: athletes?.AthleteSportsMaps[0]?.Centers?.name,

          // status: athlete?.designation,
        }
      })
      setFinalData(updatedAthletes)
    }
  }, [athletes])

  const deleteAthlete = (id: number) => {
    deleteMutate({athleteId: id, deletedAt: moment().toISOString()})
  }

  // const handleFilters = (appliedFilters: { [key: string]: any }) => {
  //   setFilters(appliedFilters);
  // };

  return (
    <>
      <AllData
        title='ALL ATHLETES'
        addButtonText='Add Athlete'
        addButtonUrl='/athlete/AddAthlete'
        dropdownItems={dropdownObj}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        filter={true}
        filters={[
          {
            label: 'Filter by Sports',
            id: 'sports',
            type: 'multiSelect',
            data: sports,
          },
          {
            label: 'Filter by Center',
            id: 'centers',
            type: 'multiSelect',
            data: centers,
          },
          {
            label: 'Filter by Batches',
            id: 'batches',
            type: 'multiSelect',
            data: batches,
          },
          {
            label: 'Filter by Age',
            id: 'age',
            type: 'bar',
          },
          {
            label: 'Filter by Payment Status',
            id: 'payment_status',
            type: 'multiSelect',
            data: [
              {id: 1, name: 'Payment Dues'},
              {id: 2, name: 'Paid'},
            ],
          },
          {
            label: 'Filter by Gender',
            id: 'gender',
            type: 'multiSelect',
            data: [
              {id: 1, name: 'Male'},
              {id: 2, name: 'Female'},
            ],
          },
        ]}
        applyFilters={() =>
          // appliedFilters: { [key: string]: any }
          {
            // handleFilters(appliedFilters);
          }
        }
        // eslint-disable-next-line
        onViewClick={(id: number) => router.replace(`/athlete/${id}`).then(() => router.reload())}
        // eslint-disable-next-line
        onEditClick={(id: number) =>
          router.replace(`/edit-athlete-${id}`).then(() => router.reload())
        }
        onDeleteClick={(id: number) => deleteAthlete(id)}
        rowSelection={true}
        // eslint-disable-next-line
        totalPages={totalPages}
        currentPage={currentPage}
        onHandlePageChange={handlePageChange}
      />
    </>
  )
}
