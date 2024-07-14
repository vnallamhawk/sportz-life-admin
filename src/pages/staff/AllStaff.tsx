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
import Modal from "~/components/Modal/modal";
import StaffReminderModal from "~/components/Modal/StaffReminderModal";
import StaffChangeCenterModal from "~/components/Modal/StaffChangeCenterModal";

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showReminder, setShowReminder] = useState(false);
  const [showChangeCenter, setShowChangeCenter] = useState(false);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      {showReminder && (
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
              ADD New Staff
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
      </Card>
    </>
  );
}
