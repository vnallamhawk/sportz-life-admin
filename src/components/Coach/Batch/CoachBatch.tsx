import CardTitle from "~/components/Card/CardTitle"
import Card from "../../Card"
import Textbox from "~/components/Textbox"
import type { CoachWithRelations } from "~/pages/coach/[id]"
import { useState } from "react"
import CoachBatchTableHeader from "./CoachBatchTableHeader"
import CoachBatchTableBody from "./CoachBatchTableBody"
import type { Batches, Center } from "@prisma/client"

export default function CoachCertificate({
    coach,
    displayBatch,
} : {
    coach: CoachWithRelations
    displayBatch: boolean,
}) {
    const [ tableCoach, setTableCoach ] = useState(coach);
    const [ filterByBatch, setFilterByBatch ] = useState("");
    const handleFilterByBatchChange = (filter: string) => {
        const newBatch = coach.batches.filter( batch => {
            return batch.batch.name.toLowerCase().includes(filter);
        });
        let newTableCoach = {...tableCoach};
        newTableCoach.batches = [...newBatch];
        setTableCoach(newTableCoach);
        setFilterByBatch(filter);
    }

    return (
        <Card
            className={ `${displayBatch ? "" : "hidden"} h-100` }>
            <header className="flex justify-between ml-5">
                <CardTitle title="ALL BATCHES" />
                <div
                    className="w-1/3 mb-3 relative">
                    <Textbox 
                        className={ `w-full` }
                        value={ filterByBatch }
                        setValue={ handleFilterByBatchChange }
                        placeHolder="Search by batch name" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute right-3 top-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </div>
            </header>
            <table
                className="table-auto w-full mt-1 border-separate place-self-center border-spacing-y-3">
                <CoachBatchTableHeader/>
                <CoachBatchTableBody
                    coach={ tableCoach } />
            </table>
        </Card>
    )
}