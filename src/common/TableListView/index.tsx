import type {TableHead} from '~/types/common'
import CommonList from '../CommonList/list'
import CommonTable from '../CommonTable/table'

const TableListView = ({
  TABLE_HEAD,
  TABLE_ROWS,
  rowSelection,
  showImage,
  onViewClick,
  onEditClick,
  onDeleteClick,
  totalPages,
  currentPage,
  onHandlePageChange,
}: {
  TABLE_HEAD: TableHead
  // TABLE_ROWS: TableRows;
  TABLE_ROWS: {[key: string]: any; id: number}[]
  rowSelection: boolean
  showImage: boolean
  onViewClick?: (id: number) => void
  onEditClick?: (id: number) => void
  onDeleteClick?: (id: number) => void
  totalPages?: number
  currentPage?: number
  onHandlePageChange?: (page: number) => void
}) => {
  return (
    <>
      <div className='hidden lg:block'>
        <CommonTable
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          rowSelection={rowSelection}
          showImage={showImage}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          totalPages={totalPages}
          currentPage={currentPage}
          onHandlePageChange={onHandlePageChange}
        />
      </div>
      {/* <div className='block lg:hidden'>
        {TABLE_ROWS &&
          TABLE_ROWS.length > 0 &&
          TABLE_ROWS.map((item: {[key: string]: any; id: number}, index: number) => {
            return <CommonList item={item} key={index} onViewClick={onViewClick} />
          })}
      </div> */}
    </>
  )
}

export default TableListView
