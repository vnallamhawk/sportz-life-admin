import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AllData from "~/common/AllData";
import MultiTabComp from "~/common/MultiTabComp";
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
  const [finalData, setFinalData] = useState<{ [key: string]: any }[]>([]);

  const deleteDrills = (id: number) => {
    // deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  };

  const [coachingDrill, setCoachingDrill] = useState(false);
  return (
    <>
      {/* <AllData
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
        onViewClick={(id: number) => router.push(`/drills/${id ?? ""}`)}
        onEditClick={(id: number) => router.push(`/edit-drills-${id}`)}
        onDeleteClick={(id: number) => deleteDrills(id)}
        drills={true}
        setCoachingDrill={setCoachingDrill}
      /> */}

      <MultiTabComp
        tab1label="FITNESS DRILL"
        tab2label="COACHING DRILL"
        addButtonText="Add Drill"
        addButtonUrl="/drills/AddDrills"
        dropdownItems={{}}
        table1show={true}
        table2show={true}
        TABLE1_HEAD={COACHING_DRILL_TABLE_HEADERS}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={FITNESS_DRILL_TABLE_HEADERS}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        onViewClick={(id: number) => router.push(`/drills/${id ?? ""}`)}
        onEditClick={(id: number) => router.push(`/edit-drills-${id}`)}
        onDeleteClick={(id: number) => deleteDrills(id)}
      />
    </>
  );
};

export default AllDrills;
