import React, { useEffect, useState } from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import Table from "~/components/Table/Table";
import CoachTableHeader from "../../components/AllCoaches/CoachTableHeader";
import CoachTableBody from "../../components/AllCoaches/CoachTableBody";
import { useRouter } from "next/navigation";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import DashboardHeader from "~/components/DashboardHeader";
import AllData from "~/common/AllData";
import { COACH_TABLE_HEADERS } from "~/constants/coachConstants";
import { api } from "~/utils/api";
import moment from "moment-timezone";

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState([]);
 
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const { data: coaches } =
    filterByName == ""
      ? api.coach.getAllCoaches.useQuery()
      : api.coach.getCoachesByName.useQuery({ name: filterByName });

  useEffect(() => {
    if (coaches && coaches?.length > 0) {
      const updatedCoaches = coaches.map((coach) => {
        return {
          ...coach,
          status: coach?.designation
        };
      });
      setFinalData(updatedCoaches);
    }
  }, [JSON.stringify(coaches)]);

  const { mutate: deleteMutate } = api.coach.deleteCoach.useMutation({
    onSuccess: (response) => {
      let arr=[...finalData]
      const index=finalData?.findIndex((item)=>item?.id==response?.id)
      if(index>-1){
        arr.splice(index,1)
      }
     setFinalData(arr)
      return response
    },
  });

  const deleteCoach=(id:number)=>{
  
    deleteMutate({coachId:id,deletedAt:moment().toISOString()})
   

  }

  return (
    <>
      {/* <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL COACHES" />
          <div>
            <Textbox
              value={filterByName}
              setValue={setFilterByName}
              placeHolder="Search By Name"
            />
            <Button
              className="ml-3 bg-pink-700 p-2"
              onClick={() => router.push("/coach/AddCoach")}
            >
              ADD NEW COACH
            </Button>
          </div>
        </header>
        <Table
          tableHeader={CoachTableHeader()}
          tableBody={CoachTableBody({ name: filterByName }, handleIsLoading)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card> */}
    <AllData
        title="ALL COACHES"
        addButtonText="ADD NEW COACH"
        addButtonUrl="/coach/AddCoach"
        dropdownItems={{reminder:true,freeze:true,changeBatch:true}}
        filter={false}
        TABLE_HEAD={COACH_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={true}
        showImage={false}
        onViewClick={(id)=>router.push(`/coach/${id ?? ""}`)}
        onEditClick={(id)=>router.push(`/edit-coach-${id}`)}
        onDeleteClick={(id)=>deleteCoach(id)}

      />

    </>
  );
}
