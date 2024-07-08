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
export default function CenterDashCoachTableBody(
  filter: coachTableFilter,
  handleIsLoading: (isLoading: boolean) => void
) {
  const router = useRouter();

  let tableData;

  //   const { data: centers } =
  //     filter.name == ""
  //       ? api.center.getAllCenters.useQuery()
  //       : api.center.getCentersByName.useQuery(filter);
  //   const { data: sports, isLoading } = api.sports.getAllSports.useQuery();

  //   if (centers && sports) {
  //     tableData =
  //       centers && centers.length > 0
  //         ? centers?.map((center) => ({
  //             ...center,
  //             // sports: coach?.sports
  //             //   ? coach?.sports
  //             //       ?.map((sport) => sports.find((s) => s.id === sport.sportId)?.name)
  //             //       ?.join(",")
  //             //   : "",
  //           }))
  //         : [];
  //   }

  const onClickHandler = (id: number) => {
    void router.push(`/centers/${id ?? ""}`);
  };

  //hardcoded table data
  tableData = [
    {
      name: "John.h.martin",
      coaching: "Basketball",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
    {
      name: "John.h.martin2",
      coaching: "Basketball2",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
    {
      name: "John.h.martin3",
      coaching: "Basketball3",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
    {
      name: "John.h.martin4",
      coaching: "Basketball4",
      age: 33,
      batches: 2,
      phone: "+78956535354",
    },
  ];

  return (
    <>
      {tableData &&
        tableData.length > 0 &&
        // tableData?.map(({ name, address, batches, mobile }, index) => (
        tableData?.map(({ name, coaching, age, batches, phone }, index) => (
          <tr
            key={`${name}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {coaching}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {age}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {batches}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {phone}
            </td>
          </tr>
        ))}
    </>
  );
}
