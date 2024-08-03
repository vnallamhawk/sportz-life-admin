import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiTabComp from "~/common/MultiTabComp";
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

  const [fitnessDrill, setFitnessDrill] = useState<boolean>(true);

  const deleteDrills = (id: number) => {
    // deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  };

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
        addButtonUrl={
          fitnessDrill
            ? "/drills/AddDrills/AddFitnessDrills"
            : "/drills/AddDrills/AddCoachingDrills"
        }
        dropdownItems={{}}
        table1show={true}
        table2show={true}
        TABLE1_HEAD={COACHING_DRILL_TABLE_HEADERS}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={FITNESS_DRILL_TABLE_HEADERS}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        fitnessDrill={fitnessDrill}
        setFitnessDrill={setFitnessDrill}
        onViewClick={(id: number) => router.push(`/drills/${id ?? ""}`)}
        onEditClick={(id: number) => router.push(`/edit-drills-${id}`)}
        onDeleteClick={(id: number) => deleteDrills(id)}
      />
    </>
  );
};

export default AllDrills;
