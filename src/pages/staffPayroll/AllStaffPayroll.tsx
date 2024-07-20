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
import { STAFF_PAYROLL_TABLE_HEADERS } from "~/constants/staffPayroll";
import AllData from "~/common/AllData";

const AllStaffPayroll = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };


  const [finalData,setFinalData]=useState([])


  const { data: staffPayroll } = api.staffPayroll.getAllPayroll.useQuery()


useEffect(() => {
  if (staffPayroll && staffPayroll?.length > 0) {
    const updatedStaffPayroll = staffPayroll.map((payroll) => {
      return {
        ...payroll,
        designation:payroll?.StaffDesignation?.designation,
        tax:payroll?.grossSalary-payroll?.netSalary
      };
    });
    setFinalData(updatedStaffPayroll);
  }
}, [JSON.stringify(staffPayroll)]);

  return (
    <>

<AllData
        title="ALL PAYROLLS"
        addButtonText="ADD Payroll"
        addButtonUrl="/staffPayroll/AddPayroll"
        dropdownItems={{}}
        filter={false}
        TABLE_HEAD={STAFF_PAYROLL_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        rowSelection={false}
        showImage={false}
        onEditClick={(id)=>router.push(`/edit-staffPayroll-${id}`)}
      />
     
    </>
  );
};

export default AllStaffPayroll;
