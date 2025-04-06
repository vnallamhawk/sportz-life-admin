import {COACH_CERTIFICAT_TABLE_HEADERS} from '~/constants/coachConstants'
import type {COACH_CERTIFICATE_TABLE_TYPES} from '~/types/coach'

const CoachCertificateTable = ({
  tableData,
  onRemoveTableButton,
}: {
  tableData: Partial<COACH_CERTIFICATE_TABLE_TYPES>[]
  onRemoveTableButton: (index: number) => void
}) => (
  <div className='scroll mt-5 hidden max-h-[370px] overflow-auto px-0 lg:block'>
    <table className='common-table w-full table-fixed border-separate border-spacing-y-2 text-left'>
      <thead>
        <tr>
          {COACH_CERTIFICAT_TABLE_HEADERS?.map((head, index) => (
            <th
              key={index}
              className='pl-7 font-medium text-gray-400'
              style={{minWidth: '150px', wordBreak: 'break-word'}} // Prevents text overflow
            >
              {head.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.length > 0 &&
          tableData?.map((data, dataIndex) => (
            <tr key={dataIndex} className='border-b border-gray-100'>
              {COACH_CERTIFICAT_TABLE_HEADERS.map((head, headIndex) => (
                <td
                  key={headIndex}
                  className='border-gray-100 p-4'
                  style={{minWidth: '150px', wordBreak: 'break-word'}} // Ensures text wraps properly
                >
                  {head.id !== 'action' ? (
                    <span>{data[head.id]}</span>
                  ) : (
                    <span
                      className='cursor-pointer font-medium text-gray-400 hover:text-red-500'
                      onClick={() => onRemoveTableButton(dataIndex)}
                    >
                      Remove
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)

export default CoachCertificateTable
