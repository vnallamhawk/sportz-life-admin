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

export default function AllInjuryLogs() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL Injuries" />
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
              ADD Injury
            </Button>
          </div>
        </header>
        <TabsComponent
          tabs={[
            {
              name: "ATHLETE INJURIES",
              component: (
                <Table
                  tableHeader={CoachTableHeader()}
                  tableBody={CoachTableBody(
                    { name: filterByName },
                    handleIsLoading
                  )}
                />
              ),
            },
            {
              name: "COACH INJURIES",
              component: (
                <Table
                  tableHeader={CoachTableHeader()}
                  tableBody={CoachTableBody(
                    { name: filterByName },
                    handleIsLoading
                  )}
                />
              ),
            },
          ]}
        />
        {/* <Table
          tableHeader={CoachTableHeader()}
          tableBody={CoachTableBody({ name: filterByName }, handleIsLoading)}
        /> */}
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
}
