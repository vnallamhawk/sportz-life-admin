import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import CenterBatchTableBody from "~/components/CenterBatchTable/CenterBatchTableBody";
import CenterBatchTableHeader from "~/components/CenterBatchTable/CenterBatchTableHeader";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import StaffPayrollTableBody from "~/components/StaffPayroll/StaffPayrollTableBody";
import StaffPayrollTableHeader from "~/components/StaffPayroll/StaffPayrollTableHeader";
import Table from "~/components/Table";
import Textbox from "~/components/Textbox";
import { api } from "~/utils/api";

const AllCenter = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };


  const [tableData,setTableData]=useState([])


  const { data: staffPayroll } = api.staffPayroll.getAllPayroll.useQuery()


  useEffect(()=>{
    if(staffPayroll && staffPayroll.length>0){
      setTableData(staffPayroll)
    }

  },[staffPayroll])

  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL PAYROLLS" />
          <div>
            <Button
              className="ml-3 bg-pink-700 p-2 text-white"
              onClick={() => router.push("/staffPayroll/AddPayroll")}
            >
              Add Payroll
            </Button>
          </div>
        </header>
        <Table
          tableHeader={StaffPayrollTableHeader()}
          tableBody={StaffPayrollTableBody(
            tableData
          )}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
};

export default AllCenter;
