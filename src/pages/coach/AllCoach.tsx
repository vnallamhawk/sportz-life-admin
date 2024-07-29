import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AllData from "~/common/AllData";
import { COACH_TABLE_HEADERS } from "~/constants/coachConstants";
import { api } from "~/utils/api";
import moment from "moment-timezone";
import type { Coaches } from "@prisma/client";

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const [finalData, setFinalData] = useState<Coaches[]>([]);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const { data: coaches } =
    filterByName == ""
      ? api.coach.getAllCoaches.useQuery()
      : api.coach.getCoachesByName.useQuery({ name: filterByName });

  useEffect(() => {
    if (coaches && coaches?.length > 0) {
      const updatedCoaches:Coaches[] = coaches.map((coach:Coaches) => {
        return {
          ...coach,
          status: coach?.designation,
        };
      });
      setFinalData(updatedCoaches);
    }
  }, [coaches]);

  const { mutate: deleteMutate } = api.coach.deleteCoach.useMutation({
    onSuccess: (response) => {
      const arr :Coaches[]= [...finalData];
      const index = finalData?.findIndex(
        (item: Coaches) => item?.id == response?.id
      );
      if (index > -1) {
        arr.splice(index, 1);
      }
      setFinalData(arr);
      return response;
    },
  });

  const deleteCoach = (id: number) => {
    deleteMutate({ coachId: id, deletedAt: moment().toISOString() });
  };

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
        dropdownItems={{ reminder: true, freeze: true, changeBatch: true }}
        filter={false}
        TABLE_HEAD={COACH_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={true}
        showImage={false}
        onViewClick={(id: number) => router.push(`/coach/${id ?? ""}`)}
        onEditClick={(id: number) => router.push(`/edit-coach-${id}`)}
        onDeleteClick={(id: number) => deleteCoach(id)}
      />
    </>
  );
}
