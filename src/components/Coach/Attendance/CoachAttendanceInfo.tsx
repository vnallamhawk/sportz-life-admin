import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CoachAttendanceGraph from "./CoachAttendanceGraph";
import CoachAttendanceLog from "./CoachAttendanceLog";

export default function CoachAttendanceInfo() {
  return (
    <div className="ml-5 mr-5 mt-5 w-full flex-1 rounded-xl border p-5">
      <Tabs>
        <TabList className="flex flex-row p-0">
          <Tab
            className="cursor-pointer pr-2 font-bold"
            selectedClassName="underline text-neutral-950"
          >
            ATTENDANCE LOGS FOR MONTH
          </Tab>
          <Tab
            className="cursor-pointer pr-2 font-bold"
            selectedClassName="underline text-neutral-950"
          >
            GRAPH
          </Tab>
        </TabList>

        <TabPanel>
          <table className="mt-1 w-full table-auto border-separate border-spacing-y-3 place-self-center">
            <tbody>
              <tr>
                <td className="rounded-l-lg border-y-2 border-l-2 border-solid pl-5">
                  Sunday 01
                </td>
                <td className="border-y-2 border-solid">10:30am</td>
                <td className="border-y-2 border-solid">Present</td>
                <td className="rounded-r-lg border-y-2 border-r-2 border-solid">
                  On Time
                </td>
              </tr>
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
      <CoachAttendanceLog />
      <CoachAttendanceGraph />
    </div>
  );
}
