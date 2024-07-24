import CardTitle from "~/components/Card/CardTitle";
import Card from "../../Card";
import Textbox from "~/components/Textbox";
import { useState } from "react";
import CoachBatchTableHeader from "./CoachBatchTableHeader";
import CoachBatchTableBody from "./CoachBatchTableBody";
import { type CoachWithRelations } from "~/types/coach";

export default function CoachCertificate({
  coach,
  displayBatch,
}: {
  // coach: CoachWithRelations;
  coach: any;
  displayBatch: boolean;
}) {
  const [tableCoach, setTableCoach] = useState(coach);
  const [filterByBatch, setFilterByBatch] = useState("");
  const handleFilterByBatchChange = (filter: string) => {
    const newBatch = coach.batches.filter((batch: any) => {
      return batch.batch.name.toLowerCase().includes(filter);
    });
    const newTableCoach = { ...tableCoach };
    newTableCoach.batches = [...newBatch];
    setTableCoach(newTableCoach);
    setFilterByBatch(filter);
  };

  return (
    <Card className={`${displayBatch ? "" : "hidden"} h-100`}>
      <header className="ml-5 flex justify-between">
        <CardTitle title="ALL BATCHES" />
        <div className="relative mb-3 w-1/3">
          <Textbox
            className={`w-full`}
            value={filterByBatch}
            setValue={handleFilterByBatchChange}
            placeHolder="Search by batch name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-3 top-1 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </header>
      <table className="mt-1 w-full table-auto border-separate border-spacing-y-3 place-self-center">
        <CoachBatchTableHeader />
        <CoachBatchTableBody coach={tableCoach} />
      </table>
    </Card>
  );
}
