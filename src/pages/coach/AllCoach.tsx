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

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <>
      <Card className="container relative mx-auto mb-[167px] mt-[112px] h-full max-h-[721px] w-full max-w-[1440px] rounded-2xl bg-white ">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL COACHES" />
          <div>
            <Textbox
              value={filterByName}
              setValue={setFilterByName}
              placeHolder="Search By Name"
              className="SearchByName font-['DM Sans'] mr-4 text-base font-medium leading-tight text-stone-300"
            />
            <Button
              className=" font-['DM Sans'] inline-flex h-12 w-48 items-center justify-center gap-2 rounded-lg border-transparent bg-rose-500 px-6 py-3 text-lg font-medium capitalize tracking-tight dark:text-white "
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
