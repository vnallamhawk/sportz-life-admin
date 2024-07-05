import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import CenterBatchTableBody from "~/components/CenterBatchTable/CenterBatchTableBody";
import CenterBatchTableHeader from "~/components/CenterBatchTable/CenterBatchTableHeader";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import Table from "~/components/Table";
import Textbox from "~/components/Textbox";

const AllCenter = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL CENTERS" />
          <div>
            <Textbox
              value={filterByName}
              setValue={setFilterByName}
              placeHolder="Search by center,location ..."
              className="w-80 p-1.5"
            />
            <Button
              className="ml-3 bg-pink-700 p-2"
              onClick={() => router.push("/center/AddCenter")}
            >
              ADD NEW CENTER
            </Button>
          </div>
        </header>
        <Table
          tableHeader={CenterBatchTableHeader()}
          tableBody={CenterBatchTableBody([], handleIsLoading)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
};

export default AllCenter;
