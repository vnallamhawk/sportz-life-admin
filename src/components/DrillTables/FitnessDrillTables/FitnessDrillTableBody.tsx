import React from 'react'
// import Button from '~/components/Button'
// import {type BatchData} from '~/types/coach'
// import * as Tooltip from '@radix-ui/react-tooltip'
import {DotsHorizontalIcon} from '@radix-ui/react-icons'
// import {useRouter} from 'next/router'
// import {api} from '~/utils/api'
import {Dropdown, DropdownHeader} from 'flowbite-react'
// import moment from 'moment-timezone'

// interface fitnessDrillFilter {
//   name: string
// }

// interface coachTableFilter {
//   name: string;
// }
export default function FitnessDrillTableBody() {
  // filter: fitnessDrillFilter,
  // handleIsLoading: (isLoading: boolean) => void
  // const router = useRouter();

  //   const [tableData, setTableData] = useState([]);

  //   const { data: centers } =
  //     filter.name == ""
  //       ? api.center.getAllCenters.useQuery()
  //       : api.center.getCentersByName.useQuery(filter);
  //   const { data: sports, isLoading } = api.sports.getAllSports.useQuery();

  //   useEffect(() => {
  //     if (centers && centers.length > 0) {
  //       setTableData(centers);
  //     }
  //   }, [centers]);

  //   const { mutate: deleteMutate } = api.center.deleteCenter.useMutation({
  //     onSuccess: (response) => {
  //       let arr = [...tableData];
  //       const index = tableData?.findIndex((item) => item?.id == response?.id);
  //       if (index > -1) {
  //         arr.splice(index, 1);
  //       }
  //       setTableData(arr);
  //       return response;
  //     },
  //   });

  //   const deleteCenter = (id: number) => {
  //     deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  //   };
  const tableData = [
    {
      drillName: 'name1',
      fitnessComp: 'Agility',
      trainingLevel: 'Begineer',
    },
    {
      drillName: 'name1',
      fitnessComp: 'Endurance',
      trainingLevel: 'Begineer',
    },
    {
      drillName: 'name1',
      fitnessComp: 'Agility',
      trainingLevel: 'Begineer',
    },
  ]
  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        tableData?.map(({drillName, fitnessComp, trainingLevel}, index) => (
          <tr
            key={`${drillName}-${index}`}
            className='cursor-pointer border-b border-gray-200 hover:bg-gray-100'
          >
            <td className='whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left'>
              {drillName}
            </td>
            <td className='border-y-2 border-solid px-6 py-3 text-left'>{fitnessComp}</td>
            <td className='border-y-2 border-solid px-6 py-3 text-left'>{trainingLevel}</td>
            <td className='rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left'>
              <Dropdown
                label=''
                dismissOnClick={false}
                placement='top'
                className='view-drop rounded-lg bg-black'
                renderTrigger={() => (
                  <button className='py-2'>
                    <DotsHorizontalIcon />
                  </button>
                )}
              >
                <DropdownHeader>
                  <div className='flex items-center'>
                    <button
                      className='mx-1 text-white'
                      //   onClick={() => router.push(`/edit-center-${id}`)}
                      // onClick={() => {}}
                    >
                      Edit
                    </button>
                    <button
                      className='mx-1 text-white'
                      //   onClick={() => router.push(`/centers/${id ?? ""}`)}
                      // onClick={() => {}}
                    >
                      View
                    </button>
                    <button
                      className='mx-1 text-white'
                      //   onClick={() => deleteCenter(id)}
                      // onClick={() => {}}
                    >
                      Delete
                    </button>
                  </div>
                </DropdownHeader>
              </Dropdown>
            </td>
          </tr>
        ))}
    </>
  )
}
