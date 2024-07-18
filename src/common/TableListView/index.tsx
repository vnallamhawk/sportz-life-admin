import React, { useEffect, useContext, useState, useRef } from "react";
import CommonTable from "../CommonTable/table";
import CommonList from "../CommonList/list";


const TableListView=({TABLE_HEAD,TABLE_ROWS,rowSelection,showImage})=> {
  


  return (
    <>
   <div className="lg:block hidden">
                        <CommonTable TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} rowSelection={rowSelection} showImage={showImage}/>
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