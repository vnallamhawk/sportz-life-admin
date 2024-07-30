import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AllData from "~/common/AllData";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import FitnessDrillTableBody from "~/components/DrillTables/FitnessDrillTables/FitnessDrillTableBody";
import FitnessDrillTableheader from "~/components/DrillTables/FitnessDrillTables/FitnessDrillTableHeader";
import FilterTextBox from "~/components/FilterTextBox/FilterTextBox";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import Table from "~/components/Table";
import Textbox from "~/components/Textbox";
import {
  COACHING_DRILL_TABLE_HEADERS,
  FITNESS_DRILL_TABLE_HEADERS,
} from "~/constants/drillConstant";

const AllDrills = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const [finalData, setFinalData] = useState<any>([]);

  const deleteDrills = (id: number) => {
    // deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  };

  const [coachingDrill, setCoachingDrill] = useState(false);
  return (
    <>
      <AllData
        title="ALL CENTERS"
        addButtonText="Add Drill"
        addButtonUrl="/drills/AddDrills"
        dropdownItems={{}}
        filter={true}
        TABLE_HEAD={
          coachingDrill
            ? COACHING_DRILL_TABLE_HEADERS
            : FITNESS_DRILL_TABLE_HEADERS
        }
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={false}
        showImage={false}
        onViewClick={(id: any) => router.push(`/drills/${id ?? ""}`)}
        onEditClick={(id: any) => router.push(`/edit-drills-${id}`)}
        onDeleteClick={(id: any) => deleteDrills(id)}
        drills={true}
        setCoachingDrill={setCoachingDrill}
      />
    </>
  );
};

export default AllDrills;
