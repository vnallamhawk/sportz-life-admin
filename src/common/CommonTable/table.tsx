import { Typography, Chip, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Dots from "../../images/dots.svg";
import User from "../../images/user.png";

import { Dropdown, DropdownHeader } from "flowbite-react";
import { PLANNING_FEE_TYPE } from "~/constants/pricingConstant";

interface CommonTable {
  TABLE_HEAD: { label: string; id: string }[];
  TABLE_ROWS: { [key: string]: any; id: number }[];
  rowSelection: boolean;
  showImage: boolean;
  onViewClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  totalPages?: number;
  currentPage?: number;
  onHandlePageChange?: (page: number) => void;
}

const CommonTable = ({
  TABLE_HEAD,
  TABLE_ROWS,
  rowSelection,
  showImage,
  onViewClick,
  onEditClick,
  onDeleteClick,
  totalPages = 1,
  currentPage = 1,
  onHandlePageChange,
}: CommonTable) => {

  console.log({ totalPages })
  const renderPages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

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
            {TABLE_ROWS?.map(
              (data: { [key: string]: any; id: number }, index: number) => {
                console.log({ data })
                console.log("status: ", data?.assessmentStatus)
                console.log("status type: ", typeof data?.assessmentStatus);

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
                        head: { label: string; id: string },
                        columnIndex: number
                      ) => {
                        return (
                          <td className={classes} key={columnIndex}>
                            {head?.id === "feeType" ? (
                              <Typography variant="small" className="font-bold">
                                {PLANNING_FEE_TYPE[
                                  data[
                                  head?.id
                                  ] as keyof typeof PLANNING_FEE_TYPE
                                ] || "Unknown"}
                              </Typography>
                            ) : head?.id !== "status" && head?.id !== "assessmentStatus" ? (
                              head?.id !== "action" ? (
                                columnIndex == 0 && data?.image && showImage ? (
                                  <div className="flex items-center gap-3">
                                    <Image
                                      width={0}
                                      height={0}
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
                                  className="view-drop h-auto w-auto rounded-lg bg-black"
                                  renderTrigger={() => (
                                    <button className="py-2">
                                      <Image
                                        width={20}
                                        height={20}
                                        src={Dots}
                                        alt=""
                                      />
                                    </button>
                                  )}
                                >
                                  <DropdownHeader>
                                    <div className="flex items-center">
                                      {onEditClick && (
                                        <button
                                          className="mx-1 text-white"
                                          onClick={() => {
                                            onEditClick(data?.id);
                                          }}
                                        >
                                          Edit
                                        </button>
                                      )}
                                      {onViewClick && (
                                        <button
                                          className="mx-1 text-white"
                                          onClick={() => onViewClick(data?.id)}
                                        >
                                          View
                                        </button>
                                      )}
                                      {onDeleteClick && (
                                        <button
                                          className="mx-1 text-white"
                                          onClick={() =>
                                            onDeleteClick(data?.id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      )}
                                    </div>
                                  </DropdownHeader>
                                </Dropdown>
                              )
                            ) : (
                              <div className="w-max">
                                <Chip
                                  size="sm"
                                  variant="ghost"
                                  value={
                                    data?.status === 1
                                      ? "On"
                                      : data?.status === 2
                                        ? "Off"
                                        : data?.assessmentStatus?.trim().toLowerCase() === "upcoming"
                                          ? "Upcoming"
                                          : data?.assessmentStatus?.trim().toLowerCase() === "completed"
                                            ? "Completed"
                                            : data?.assessmentStatus?.trim().toLowerCase() === "ongoing"
                                              ? "Ongoing"
                                              : "Unknown"
                                  }
                                  className={`rounded-full border px-3 font-normal capitalize 
                                  ${data?.status === 1
                                      ? "border-green-400 bg-green-50 text-green-400"
                                      : ""
                                    } 
                                  ${data?.status === 2
                                      ? "border-orange-400 bg-orange-50 text-orange-400"
                                      : ""
                                    }
                                    ${data?.assessmentStatus?.trim().toLowerCase() === "upcoming" ? "border-green-400 bg-green-50 text-green-400" : ""}
                                    ${data?.assessmentStatus?.trim().toLowerCase() === "completed" ? "border-red-400 bg-red-50 text-red-400" : ""}
                                    ${data?.assessmentStatus?.trim().toLowerCase() === "ongoing" ? "border-yellow-400 bg-yellow-50 text-yellow-400" : ""}
                                    `}
                                />
                              </div>
                            )}
                          </td>
                        );
                      }
                    )}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center p-4">
          <div className="flex items-center gap-2">
            {renderPages().map((page, index) => (
              <IconButton
                key={index}
                variant={currentPage === page ? "text" : "outlined"}
                size="sm"
                className={`mx-1 ${currentPage === page ? "bg-gray-700 text-white" : ""
                  }`}
                onClick={() =>
                  typeof page === "number" && onHandlePageChange?.(page)
                }
                disabled={page === "..."}
              >
                {page}
              </IconButton>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CommonTable;
