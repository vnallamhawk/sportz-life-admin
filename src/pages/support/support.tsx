import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MultiTabComp from "~/common/MultiTabComp";
import { SUPPORT_TABLE_HEADER } from "~/constants/supportConstants";
import { api } from "~/utils/api";


interface AthleteSettings {
    id: number;
    name: string;
    batchName: string;
    centerName: string;
    sportName: string;
    trainingLevel: string
}

interface CoachSettings {
    id: number;
    name: string;
    experience: string;
    centerName: string;
    sportName: string;
    trainingLevel: string
}

interface StaffSettings {
    id: number;
    email: string;
    name: string;
    phone: string;
}

export default function Support() {
    const [activeKey, setActiveKey] = useState("0");
    const [athleteSettingsData, setAthleteSettingsData] = useState<AthleteSettings[]>()

    const { data: athletesData } = api.athlete.getAthletesDataByAcademyId.useQuery()




    return (
        <>
            {/* <Checkout /> */}
            <MultiTabComp
                tab1label="Tickets to Respond"
                tab2label="Tickets Raised"
                dropdownItems={{}}
                table1show={true}
                table2show={true}
                TABLE1_HEAD={SUPPORT_TABLE_HEADER}
                TABLE2_HEAD={SUPPORT_TABLE_HEADER}
                TABLE1_ROWS={[]}
                TABLE2_ROWS={[]}
                filters={[]}
                activeKey={activeKey}
                setActiveKey={setActiveKey}
            />
        </>
    );
}


