import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AllData from "~/common/AllData";
import { STAFF_TABLE_HEADERS } from "~/constants/staffConstants";
import { api } from "~/utils/api";
import moment from "moment-timezone";
import type { Staffs,StaffDesignation, Centers } from "@prisma/client";



export default function AllCompetition() {
  const router = useRouter();

  const [finalData, setFinalData] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const { data: staffs } =
    filterByName == ""
      ? api.staff.getAllStaffs.useQuery()
      : api.staff.getAllStaffsByName.useQuery({ name: filterByName });

//   useEffect(() => {
//     if (staffs && staffs?.length > 0) {
//       const updatedStaffs = staffs.map((staff) => {
//         return {
//           ...staff,
//           designation:staff.StaffDesignation?staff.StaffDesignation.designation:"",
//           center:staff.Centers?staff.Centers?.name:""

//         };
//       });
//       setFinalData(updatedStaffs);
//     }
//   }, [staffs]);


  const { mutate: deleteMutate } = api.staff.deleteStaff.useMutation({
    onSuccess: (response) => {
      const arr=[...finalData]
      const index=finalData?.findIndex((item:Staffs)=>item?.id==response?.id)
      if(index>-1){
        arr.splice(index,1)
      }
     setFinalData(arr)
      return response
    },
  });
  
  const deleteStaff=(id:number)=>{
  
    deleteMutate({staffId:id,deletedAt:moment().toISOString()})
   
  
  }

  return (
    <>

<AllData
        title="ALL COMPETITIONS"
        addButtonText="ADD Competition"
        addButtonUrl="/competitions/AddCompetitions"
        dropdownItems={{}}
        filter={true}
        TABLE_HEAD={STAFF_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={true}
        showImage={false}
        onViewClick={(id:number)=>router.push(`/staff/${id ?? ""}`)}
        onEditClick={(id:number)=>router.push(`/edit-staff-${id}`)}
        onDeleteClick={(id:number)=>deleteStaff(id)}

      />

      {/* {showReminder && (
        <StaffReminderModal open={showReminder} setShow={setShowReminder} />
      )}

      {showChangeCenter && (
        <StaffChangeCenterModal
          open={showChangeCenter}
          setShow={setShowChangeCenter}
        />
      )}
      <Card className="h-full dark:bg-black dark:text-white">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL STAFF" />
          <div>
            <Textbox
              value={filterByName}
              setValue={setFilterByName}
              placeHolder="Search By Name"
            />
            <Button
              className="ml-3 bg-[#F3476D] p-2 text-white"
              onClick={() => router.push("/staff/AddStaff")}
            >
              Add New Staff
            </Button>
          </div>
        </header>
        <div className="flex gap-3">
          <Button
            className="hover:bg-[#6E7280] hover:text-white"
            onClick={() => setShowReminder(!showReminder)}
          >
            Reminder
          </Button>
          <Button
            className="hover:bg-[#6E7280] hover:text-white"
            onClick={() => setShowChangeCenter(!showChangeCenter)}
          >
            Change Center
          </Button>
        </div>
        <Table
          tableHeader={StaffTableHeader()}
          tableBody={StaffTableBody({ name: filterByName }, handleIsLoading)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card> */}
    </>
  );
}
