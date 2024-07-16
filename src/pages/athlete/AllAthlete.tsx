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

export default function Athlete() {
    const dropdownObj={center:true,batch:true,delete:true,attendance:true,reminder:true,freeze:true}

    return (
        <>
            <AllData title="ALL ATHLETES" addButtonText="Add Athlete" addButtonUrl="/athlete/AddAthlete" dropdownItems={dropdownObj}/>
            <Modal />
        </>
    )


}