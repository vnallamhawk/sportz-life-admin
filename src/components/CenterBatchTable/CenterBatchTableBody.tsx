import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import { type BatchData } from "~/types/coach";
import * as Tooltip from "@radix-ui/react-tooltip";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Dropdown, DropdownHeader } from "flowbite-react";
import moment from "moment-timezone";

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

  const [tableData,setTableData]=useState([])


  const { data: centers } =
    filter.name == ""
      ? api.center.getAllCenters.useQuery()
      : api.center.getCentersByName.useQuery(filter);
  const { data: sports, isLoading } = api.sports.getAllSports.useQuery();


  useEffect(()=>{
    if(centers && centers.length>0){
      setTableData(centers)
    }

  },[centers])



  const { mutate: deleteMutate } = api.center.deleteCenter.useMutation({
    onSuccess: (response) => {
      let arr=[...tableData]
      const index=tableData?.findIndex((item)=>item?.id==response?.id)
      if(index>-1){
        arr.splice(index,1)
      }
     setTableData(arr)
      return response
    },
  });

  const deleteCenter=(id:number)=>{
  
    deleteMutate({centerId:id,deletedAt:moment().toISOString()})
   

  }

  return (
    <>
      {tableData && tableData.length>0 && tableData?.map(
        ({ name, address, batches, mobile ,id}, index) => (
          <tr
            key={`${id}-${index}`}
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
             
              <Dropdown label="" dismissOnClick={false} placement="top" className="view-drop bg-black rounded-lg" renderTrigger={() =>     
                        <button className="py-2">
                       <DotsHorizontalIcon />
                      </button>}>
                      <DropdownHeader>
                          <div className="flex items-center">
                              <button className="mx-1 text-white" onClick={()=>router.push(`/edit-center-${id}`)}>Edit</button>
                              <button className="mx-1 text-white" onClick={()=>router.push(`/centers/${id ?? ""}`)}>View</button>
                              <button className="mx-1 text-white" onClick={()=>deleteCenter(id)}>Delete</button>
                          </div>
                      </DropdownHeader>                    
                      </Dropdown>  
            </td>
          </tr>
        )
      )}
    </>
  );
}
