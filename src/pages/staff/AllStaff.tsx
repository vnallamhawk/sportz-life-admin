import React, { useState } from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import Table from "~/components/Table/Table";
import StaffTableHeader from "../../components/AllStaffs/StaffTableHeader";
import StaffTableBody from "../../components/AllStaffs/StaffTableBody";
import { useRouter } from "next/navigation";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL STAFF" />
          <div>
            <Textbox
              value={filterByName}
              setValue={setFilterByName}
              placeHolder="Search By Name"
            />
            <Button
              className="ml-3 bg-pink-700 p-2"
              onClick={() => router.push("/staff/AddStaff")}
            >
              ADD New Staff
            </Button>
          </div>
        </header>
        <Table
          tableHeader={StaffTableHeader()}
          tableBody={StaffTableBody({ name: filterByName }, handleIsLoading)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
}
