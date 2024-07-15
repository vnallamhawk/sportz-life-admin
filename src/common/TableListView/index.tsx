import React, { useEffect, useContext, useState, useRef } from "react";
import CommonTable from "../CommonTable/table";
import CommonList from "../CommonList/list";
import User from "../../images/user.png";

const TABLE_HEAD = ["Athlete Name", "Training Level", "Center", "Batch", "Fee Status of the Month", ""];

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
const TableListView=()=> {
  


  return (
    <>
   <div className="lg:block hidden">
                        <CommonTable TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS}/>
                    </div>
                    <div className="lg:hidden block">
                       {TABLE_ROWS && TABLE_ROWS.length>0 && TABLE_ROWS.map((item,index)=>{
                        return (
                            <CommonList item={item} key={index} />
                        )

                       }) }
                        
                    </div>
    

    </>
  )
}

export default TableListView