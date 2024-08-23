import { Typography, Chip, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Dots from "../../images/dots.svg";
import User from "../../images/user.png";

import { Dropdown, DropdownHeader } from "flowbite-react";

interface CommonTable{
  
    TABLE_HEAD: { label: string; id: string }[];
    TABLE_ROWS:{[key:string]:any,id:number}[];
    rowSelection: boolean;
    showImage: boolean;
    onViewClick?: (id:number)=>void;
    onEditClick?: (id:number)=>void;
    onDeleteClick?: (id:number)=>void;
  
}

const CommonTable = ({
  TABLE_HEAD,
  TABLE_ROWS,
  rowSelection,
  showImage,
  onViewClick,
  onEditClick,
  onDeleteClick,

}:CommonTable) => {
  return (
    <>
      <div className="overflow-auto px-0">
        <table className="common-table w-full min-w-max table-auto border-separate border-spacing-y-3 text-left">
          <thead>
            <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
              {rowSelection && (
                <th className="p-4 pb-2 pl-7">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0"
                  />
                </th>
              )}
              {TABLE_HEAD?.map(
                (head: { label: string; id: string }, index: number) => (
                  <th key={index} className="px-6 py-3 text-left">
                    <Typography
                      variant="small"
                      className="font-bold leading-none "
                    >
                      {head?.label}
                    </Typography>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.map((data: {[key:string]:any,id:number}, index: number) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4 border-y-2 border-gray-100"
                : "p-4 border-y-2 border-gray-100 ";

              return (
                <tr key={index} className={``}>
                  {rowSelection && (
                    <td className={`pl-7 ${classes}`}>
                      {" "}
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-orange-light text-orange-light focus:ring-0 "
                      />
                    </td>
                  )}
                  {TABLE_HEAD?.map(
                    (
                      head:{ label: string; id: string } ,
                      columnIndex: number
                    ) => {
                      return (
                        <td className={classes} key={columnIndex}>
                          {head?.id !== "status" ? (
                            head?.id !== "action" ? (
                              columnIndex == 0 &&
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                              data?.image &&
                              showImage ? (
                                <div className="flex items-center gap-3">
                                  <Image width={0} height={0}
                                    src={User}
                                    alt=""
                                    className="h-6 w-6 rounded md:h-8 md:w-8"
                                  />
                                  <Typography
                                    variant="small"
                                    className="font-bold"
                                  >
                                    {data[head?.id]}
                                  </Typography>
                                </div>
                              ) : (
                                <Typography
                                  variant="small"
                                  className="font-bold"
                                >
                                  {data[head?.id]}
                                </Typography>
                              )
                            ) : (
                              <Dropdown
                                label=""
                                dismissOnClick={false}
                                placement="top"
                                className="view-drop rounded-lg bg-black w-auto h-auto"
                                renderTrigger={() => (
                                  <button className="py-2">
                                    <Image width={20} height={20} src={Dots} alt=""  />
                                  </button>
                                )}
                              >
                                <DropdownHeader>
                                  <div className="flex items-center">
                                    {onEditClick && <button
                                      className="mx-1 text-white"
                                      onClick={() =>
                                          onEditClick(data?.id)
                                      }
                                    >
                                      Edit
                                    </button>}
                                    {onViewClick && (
                                      <button
                                        className="mx-1 text-white"
                                        onClick={() =>
                                          onViewClick(data?.id)
                                        }
                                      >
                                        View
                                      </button>
                                    )}
                                    {onDeleteClick && <button
                                      className="mx-1 text-white"
                                      onClick={() => {
                                        onDeleteClick(data?.id);
                                      }}
                                    >
                                      Delete
                                    </button>}
                                  </div>
                                </DropdownHeader>
                              </Dropdown>
                            )
                          ) : (
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                value={data?.status}
                                className="rounded-full border border-tertiary-700 bg-tertiary-200 px-3 font-normal capitalize text-tertiary-700"
                              />
                            </div>
                          )}
                        </td>
                      );
                    }
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm" className="mx-1">
            1
          </IconButton>
          <IconButton
            variant="text"
            size="sm"
            className="mx-1 bg-gray-700 text-white"
          >
            2
          </IconButton>
          <IconButton
            variant="text"
            size="sm"
            className="mx-1 bg-gray-700 text-white"
          >
            3
          </IconButton>
          {/* <IconButton variant="text" size="sm" className="bg-gray-700 text-white">
            ...
          </IconButton>
          <IconButton variant="text" size="sm" >
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton> */}
        </div>
        {/* <Button variant="outlined" size="sm">
          Next
        </Button> */}
      </div>
    </>
  );
};

export default CommonTable;
