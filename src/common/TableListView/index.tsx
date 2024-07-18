import React, { useEffect, useContext, useState, useRef } from "react";
import CommonTable from "../CommonTable/table";
import CommonList from "../CommonList/list";


const TableListView=({TABLE_HEAD,TABLE_ROWS,rowSelection,showImage,onViewClick,onEditClick})=> {
  


  return (
    <>
   <div className="lg:block hidden">
                        <CommonTable TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} rowSelection={rowSelection} showImage={showImage} onViewClick={onViewClick} onEditClick={onEditClick}/>
                    </div>
                    <div className="lg:hidden block">
                       {TABLE_ROWS && TABLE_ROWS.length>0 && TABLE_ROWS.map((item,index)=>{
                        return (
                            <CommonList item={item} key={index} onViewClick={onViewClick}/>
                        )

                       }) }
                        
                    </div>
    

    </>
  )
}

export default TableListView