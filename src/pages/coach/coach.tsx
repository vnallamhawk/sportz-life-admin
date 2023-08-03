import React from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import Table from "~/components/Table/Table";
import CoachTableHeader from "../../components/AllCoaches/CoachTableHeader";
import CoachTableBody from "../../components/AllCoaches/CoachTableBody";
import { useRouter } from "next/navigation";

export default function Coach() {
  const router = useRouter();
  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL COACHES" />
          <div>
            <Textbox placeHolder="Search By Name" />
            <Button
              className="bg-pink-700 p-2"
              onClick={() => router.push("/coach/AddCoach")}
            >
              ADD COACH
            </Button>
          </div>
        </header>
        <Table tableHeader={CoachTableHeader()} tableBody={CoachTableBody()} />
      </Card>
    </>
  );
}
