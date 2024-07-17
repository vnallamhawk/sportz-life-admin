import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import FitnessDrillTableBody from "~/components/DrillTables/FitnessDrillTables/FitnessDrillTableBody";
import FitnessDrillTableheader from "~/components/DrillTables/FitnessDrillTables/FitnessDrillTableHeader";
import FilterTextBox from "~/components/FilterTextBox/FilterTextBox";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import Table from "~/components/Table";
import Textbox from "~/components/Textbox";

const AllDrills = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  return (
    <>
      <Card className="h-full">
        <header className="flex justify-center gap-5 p-2  align-middle">
          <p className="text-[15px] font-bold text-[#F3476D]">FITNESS DRILL</p>
          <p className="text-[15px] font-bold hover:text-[#F3476D]">
            COACHING DRILL
          </p>

          <Textbox
            value={filterByName}
            setValue={setFilterByName}
            placeHolder="Search by center,location ..."
            className="w-80 p-1.5"
          />
          <FilterTextBox />
          <Button
            className="ml-3 bg-[#F3476D] p-2 text-white"
            onClick={() => router.push("/drills/AddDrills")}
          >
            Add Drill
          </Button>
        </header>
        <Table
          tableHeader={FitnessDrillTableheader()}
          tableBody={FitnessDrillTableBody(
            { name: filterByName },
            handleIsLoading
          )}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
};

export default AllDrills;
