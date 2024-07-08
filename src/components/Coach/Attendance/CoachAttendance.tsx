import CardTitle from "~/components/Card/CardTitle";
import Card from "../../Card";
import CoachAttendanceCard from "./CoachAttendanceCard";
import CoachAttendanceCalendarView from "./CoachAttendanceCalendarView";
import CoachAttendanceInfo from "./CoachAttendanceInfo";
import { type CoachWithRelations } from "~/types/coach";

export default function CoachAttendance({
  displayAttendance,
}: {
  coach: CoachWithRelations;
  displayAttendance: boolean;
}) {
  return (
    <Card className={`${displayAttendance ? "" : "hidden"} h-100`}>
      <header className="ml-5 flex justify-between">
        <CardTitle title="ATTENDANCE" />
      </header>
      <div className="ml-3 flex flex-row pb-5">
        <CoachAttendanceCard
          title="Total Classess Held"
          count="16"
          color="bg-indigo-600"
        />
        <CoachAttendanceCard title="Present" count="16" color="bg-green-400" />
        <CoachAttendanceCard title="Absent" count="16" color="bg-red-700" />
        <CoachAttendanceCard title="Late" count="16" color="bg-amber-500" />
        <CoachAttendanceCard
          title="Cancelled"
          count="16"
          color="bg-gray-200"
          textColor="text-neutral-950"
        />
      </div>
      <div className="flex flex-row">
        <CoachAttendanceCalendarView />
        <CoachAttendanceInfo />
      </div>
    </Card>
  );
}
