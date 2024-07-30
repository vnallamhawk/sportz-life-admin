import type { TableHead } from "~/types/common";
import CommonList from "../CommonList/list";
import CommonTable from "../CommonTable/table";

const TableListView = ({
  TABLE_HEAD,
  TABLE_ROWS,
  rowSelection,
  showImage,
  onViewClick,
  onEditClick,
  onDeleteClick,
}: {
  TABLE_HEAD: TableHead;
  // TABLE_ROWS: TableRows;
  TABLE_ROWS:{[key:string]:any}[],
  rowSelection: boolean;
  showImage: boolean;
  onViewClick: (id:number) => void;
  onEditClick: (id:number) => void;
  onDeleteClick?: (id:number) => void;
}) => {
  return (
    <>
      <div className="hidden lg:block">
        <CommonTable
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={TABLE_ROWS}
          rowSelection={rowSelection}
          showImage={showImage}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
      <div className="block lg:hidden">
        {TABLE_ROWS &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          TABLE_ROWS.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          TABLE_ROWS.map((item: any, index: number) => {
            return (
              <CommonList item={item} key={index} onViewClick={onViewClick} />
            );
          })}
      </div>
    </>
  );
};

export default TableListView;
