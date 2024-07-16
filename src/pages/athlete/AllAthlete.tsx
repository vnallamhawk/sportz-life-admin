import DashboardHeader from "~/components/DashboardHeader";
import Filter from "~/components/Filter";
// import Table from "../../components/CommonTable";
import Modal from "../../components/Modal";
import React from "react";
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


const TABLE_HEAD = [{label:"Athlete Name",id:"name"}, {label:"Training Level",id:"t_level"}, {label:"Center",id:'center'}, {label:"Batch",id:"batch"}, {label:"Fee Status of the Month",id:"status"}];

const TABLE_ROWS = [
  {
    img: User,
    name: "John H. Martin",
    t_level: "Intermediate",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Paid on 5/7/2023",
  },
  {
    img: User,
    name: "Robert G. Lioness",
    t_level: "Advanced",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Due",
  },
  {
    img: User,
    name: "Emille Johnson",
    t_level: "Advanced",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Paid on 5/7/2023",
  },
  {
    img: User,
    name: "John H. Martin",
    t_level: "Beginner ",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Paid on 5/7/2023",
  }
];
export default function Athlete() {
    const dropdownObj={center:true,batch:true,delete:true,attendance:true,reminder:true,freeze:true}

    return (
        <>
            <AllData title="ALL ATHLETES" addButtonText="Add Athlete" addButtonUrl="/athlete/AddAthlete" dropdownItems={dropdownObj} TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS}/>
            <Modal />
        </>
    )


}