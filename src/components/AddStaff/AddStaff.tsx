import React, { useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Select from "../Select";


const AddStaff = () => {
  const router = useRouter();
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  return (
    <>
      <Card className="h-full">
        <header className="mb-3 flex justify-between p-2">
          <CardTitle title="ADD CENTER" />
        </header>

        <p className="text-xl text-gray-400">Hi!First things first</p>
        <CardTitle title="ADD STAFFS" />

        {/* <Table
          tableHeader={InventoryTableHeader()}
          tableBody={InventoryTableBody([], handleIsLoading)}
        /> */}
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
};

export default AddStaff;
