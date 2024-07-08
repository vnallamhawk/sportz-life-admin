import React from "react";
import Button from "~/components/Button";
import { type BatchData } from "~/types/coach";
import * as Tooltip from "@radix-ui/react-tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface centerTableFilter {
  str: string;
}

interface coachTableFilter {
  name: string;
}
export default function CenterBatchTableBody(
  filter: coachTableFilter,
  handleIsLoading: (isLoading: boolean) => void
) {
  const router = useRouter();

  let tableData;


  const { data: centers } =
    filter.name == ""
      ? api.center.getAllCenters.useQuery()
      : api.center.getCentersByName.useQuery(filter);
  const { data: sports, isLoading } = api.sports.getAllSports.useQuery();

  if (centers && sports) {
    tableData = centers && centers.length>0?centers?.map((center) => ({
      ...center,
      // sports: coach?.sports
      //   ? coach?.sports
      //       ?.map((sport) => sports.find((s) => s.id === sport.sportId)?.name)
      //       ?.join(",")
      //   : "",
    })):[];
  }

  const onClickHandler = (id: number) => {
    void router.push(`/centers/${id ?? ""}`);
  };

  return (
    <>
      {tableData && tableData.length>0 && tableData?.map(
        ({ name, address, batches, mobile }, index) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {address}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {batches}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {mobile}
            </td>

            <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className="IconButton">
                      <DotsHorizontalIcon />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                      <div className="flex justify-evenly gap-3 rounded-lg bg-black p-2 text-[12px] text-white">
                        <p>Edit</p>
                        <p onClick={()=>onClickHandler(id)} >View</p>
                        <p>Delete</p>
                      </div>
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </td>
          </tr>
        )
      )}
    </>
  );
}
