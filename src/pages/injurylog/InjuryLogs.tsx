import React, { useState } from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import Table from "~/components/Table/Table";
import CoachTableHeader from "../../components/AllCoaches/CoachTableHeader";
import CoachTableBody from "../../components/AllCoaches/CoachTableBody";
import { useRouter } from "next/navigation";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import TabsComponent from "~/components/Tabs";
import MultiTabComp from "~/common/MultiTabComp";
import { INJURY_ATHLETE_TABLE_HEADER, INJURY_COACH_TABLE_HEADER } from "~/constants/injuryLog";

export default function AllInjuryLogs() {
  const router = useRouter();
  const [activeKey,setActiveKey]=useState("0")

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
   <>
     {/* <Checkout /> */}
     <MultiTabComp
        tab1label="Athlete Injuries"
        tab2label="Coach Injuries"
        addButtonText="Add Injury"
        addButtonUrl="/injurylog/AddInjury"
        dropdownItems={{}}
        table1show={true}
        table2show={true}
        TABLE1_HEAD={INJURY_ATHLETE_TABLE_HEADER}
        TABLE1_ROWS={[]}
        TABLE2_HEAD={INJURY_COACH_TABLE_HEADER}
        TABLE2_ROWS={[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        setActiveKey={(key:string)=>setActiveKey(key)}              
        activeKey={activeKey}
        // onViewClick={(id: number) => {}}
        // onEditClick={(id: number) => {}}
        // onDeleteClick={(id: number) => {}}
      />
   </>
  );
}
