import DashboardHeader from "~/components/DashboardHeader";
import Filter from "~/components/Filter";
import Table from "../../components/CommonTable";

export default function athlete() {
    return (
        <div className="px-6 bg-s-gray pb-7 h-full">
            <DashboardHeader />
            <div className="p-6 shadow-sm rounded-2xl bg-white">
                <Filter />
                <Table />
            </div>
        </div>
    )


}