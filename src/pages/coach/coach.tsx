import React from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import Table from "~/components/Table/Table";
import CoachTableHeader from "./coachTableHeader";
import CoachTableBody from "./coachTableBody";

export default function coach() {
  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between">
          <CardTitle title="ALL COACHES" />
          <div>
            <Textbox />
            <Button className="bg-pink-700 p-2" text="ADD COACH" />
          </div>
        </header>
        <Table tableHeader={CoachTableHeader()} tableBody={CoachTableBody()} />
      </Card>
    </>
  );
}
