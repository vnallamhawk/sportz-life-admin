import React, { useEffect, useState } from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import Table from "~/components/Table/Table";
import StaffTableHeader from "../../components/AllStaffs/StaffTableHeader";
import StaffTableBody from "../../components/AllStaffs/StaffTableBody";
import { useRouter } from "next/navigation";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import Modal from "~/components/Modal/modal";
import StaffReminderModal from "~/components/Modal/StaffReminderModal";
import StaffChangeCenterModal from "~/components/Modal/StaffChangeCenterModal";
import AllData from "~/common/AllData";
import { STAFF_TABLE_HEADERS } from "~/constants/staffConstants";
import { api } from "~/utils/api";
import moment from "moment-timezone";

export default function AllCoach() {
  const router = useRouter();

  const [finalData, setFinalData] = useState([]);
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const { data: staffs } =
    filterByName == ""
      ? api.staff.getAllStaffs.useQuery()
      : api.staff.getAllStaffsByName.useQuery({ name: filterByName });

  useEffect(() => {
    if (staffs && staffs?.length > 0) {
      const updatedStaffs = staffs.map((staff) => {
        return {
          ...staff,
        };
      });
      setFinalData(updatedStaffs);
    }
  }, [JSON.stringify(staffs)]);


  const { mutate: deleteMutate } = api.staff.deleteStaff.useMutation({
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
  
  const deleteStaff=(id:number)=>{
  
    deleteMutate({staffId:id,deletedAt:moment().toISOString()})
   
  
  }

  return (
    <>

<AllData
        title="ALL STAFFS"
        addButtonText="ADD NEW STAFF"
        addButtonUrl="/staff/AddStaff"
        dropdownItems={{reminder:true,changeCenter:true}}
        filter={false}
        TABLE_HEAD={STAFF_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={true}
        showImage={false}
        onViewClick={(id)=>router.push(`/staff/${id ?? ""}`)}
        onEditClick={(id)=>router.push(`/edit-staff-${id}`)}
        onDeleteClick={(id)=>deleteStaff(id)}

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
