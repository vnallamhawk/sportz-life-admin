import DashboardHeader from "~/components/DashboardHeader";
import Filter from "~/components/Filter";
// import Table from "../../components/CommonTable";
import Modal from "../../components/Modal";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchIcon from "../../images/search.png";
import Plus from "../../images/plus.svg";
import FilterIcon from "../../images/filter-icon.svg";
import Dots from "../../images/dots.svg";
// import List from "~/components/CommonList/list";
import { Dropdown } from "flowbite-react";
import Link from "next/link";
import TableListView from "~/common/TableListView";
import AllData from "~/common/AllData";
import User from "../../images/user.png";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import moment from "moment-timezone";

const TABLE_HEAD = [
  { label: "Athlete Name", id: "name" },
  { label: "Training Level", id: "t_level" },
  { label: "Center", id: "center" },
  { label: "Batch", id: "batch" },
  { label: "Fee Status of the Month", id: "status" },
  { label: "Action", id: "action" },
];

export default function Athlete() {
  const [filterByName, setFilterByName] = useState("");
  const router=useRouter()
  const [finalData, setFinalData] = useState([]);


  const { data: athletes } =
  filterByName == ""
    ? api.athlete.getAllAthletes.useQuery()
    : api.athlete.getAthleteByName.useQuery({ name: filterByName });

  const dropdownObj = {
    center: true,
    batch: true,
    delete: true,
    attendance: true,
    reminder: true,
    freeze: true,
  };

  const { mutate: deleteMutate } = api.athlete.deleteAthlete.useMutation({
    onSuccess: (response) => {
      let arr=[...finalData]
      const index=finalData?.findIndex((item)=>item?.id==response?.id)
      if(index>-1){
        arr.splice(index,1)
      }
     setFinalData(arr)
      return response
    },
  });

  useEffect(() => {
    if (athletes && athletes?.length > 0) {
      const updatedAthletes = athletes.map((athlete) => {
        return {
          ...athletes,
          status: athlete?.designation
        };
      });
      setFinalData(updatedAthletes);
    }
  }, [JSON.stringify(athletes)]);


  const deleteAthlete=(id:number)=>{
  
    deleteMutate({athleteId:id,deletedAt:moment().toISOString()})
   

  }

  return (
    <>
      <AllData
        title="ALL ATHLETES"
        addButtonText="Add Athlete"
        addButtonUrl="/athlete/AddAthlete"
        dropdownItems={dropdownObj}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={TABLE_ROWS}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        onViewClick={(id) => router.push(`/athlete/${id ?? ""}`)}
        onEditClick={(id) => router.push(`/edit-athlete-${id}`)}
        onDeleteClick={(id)=>deleteAthlete(id)}

      />
      <Modal />
    </>
  );
}
