import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CoachAttendanceGraph from "./CoachAttendanceGraph";
import CoachAttendanceLog from "./CoachAttendanceLog";

export default function CoachAttendanceInfo() {
    return (
        <div
            className="flex-1 ml-5 mr-5 mt-5 p-5 w-full border rounded-xl">
            <Tabs>
                <TabList
                    className="p-0 flex flex-row">
                    <Tab
                        className="pr-2 cursor-pointer font-bold"
                        selectedClassName="underline text-neutral-950">ATTENDANCE LOGS FOR MONTH</Tab>
                    <Tab
                        className="pr-2 cursor-pointer font-bold"
                        selectedClassName="underline text-neutral-950">GRAPH</Tab>
                </TabList>
                
                <TabPanel>
                    <table
                        className="table-auto w-full mt-1 border-separate place-self-center border-spacing-y-3">
                        <tbody>
                            <tr>
                                <td className="rounded-l-lg border-l-2 border-y-2 border-solid pl-5">Sunday 01</td>
                                <td className="border-y-2 border-solid">10:30am</td>
                                <td className="border-y-2 border-solid">Present</td>
                                <td className="rounded-r-lg border-r-2 border-y-2 border-solid">On Time</td>
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
    )
}