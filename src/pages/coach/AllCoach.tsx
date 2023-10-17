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
import Image from "next/image";

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <Card className="h-full rounded-lg bg-stone-50">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL COACHES" />
          <div className="flex justify-between">
            <div className="flex justify-around rounded-lg border-2 border-zinc-100 bg-white px-2 focus-within:border-zinc-400">
              <Textbox
                className="border-none outline-none"
                value={filterByName}
                setValue={setFilterByName}
                placeHolder="Search By Name"
              />
              <Image
                width="20"
                height="20"
                src="/images/search.svg"
                alt="search icon"
              />
            </div>
            <Button
              className="ml-3 bg-pink-600 p-2 text-white hover:border-zinc-400 hover:bg-pink-800"
              onClick={() => router.push("/coach/AddCoach")}
            >
              ADD COACH
            </Button>
          </div>
        </header>
        <Table
          tableHeader={CoachTableHeader()}
          tableBody={CoachTableBody({ name: filterByName }, handleIsLoading)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
}
