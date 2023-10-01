import React, { useState } from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import Textbox from "~/components/Textbox/Textbox";
import Button from "~/components/Button/Button";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { DataTable } from "~/components/coaches/data-table,";
import { type Coach, columns } from "~/components/coaches/columns";
import { differenceInYears } from "date-fns";

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const { data: coaches } =
    filterByName == ""
      ? api.coach.getAllCoaches.useQuery()
      : api.coach.getCoachesByName.useQuery({ name: filterByName });
  const { data: allSports } = api.sports.getAllSports.useQuery();

  const tableData: Coach[] = coaches
    ? coaches.map((coach) => {
        const {
          name,
          dateOfBirth,
          designation,
          sports,
          gender,
          contactNumber,
          image,
        } = coach;

        let avatar;

        // why is the image stored directly into the database?
        // TODO: Upload image during adding of coach
        if (image) {
          const reader = new FileReader();
          reader.readAsDataURL(
            new Blob([image], { type: "application/octet-stream" })
          );
          reader.onload = () => {
            avatar = reader.result as string;
          };
        }

        return {
          name,
          age: differenceInYears(new Date(), new Date(dateOfBirth)),
          designation,
          sports: sports
            ? sports
                ?.map(
                  (sport) =>
                    allSports?.find((s) => s.id === sport.sportId)?.name
                )
                ?.join(",")
            : "",
          batches: "batch",
          gender,
          contact: contactNumber,
          avatar: avatar ?? "",
        };
      })
    : [];

  return (
    <>
      <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL COACHES" />
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
              ADD COACH
            </Button>
          </div>
        </header>

        <DataTable columns={columns} data={tableData} />

        {/* <Table tableHeader={CoachTableHeader()} tableBody={CoachTableBody({ name: filterByName }, (handleIsLoading))} />
        {loading ? <LoadingSpinner /> : ""} */}
      </Card>
    </>
  );
}
