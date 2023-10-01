import React, { useState } from "react";
import Card from "~/components/Card/Card";
import CardTitle from "~/components/Card/CardTitle";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { DataTable } from "~/components/coaches/data-table,";
import { type Coach, columns } from "~/components/coaches/columns";
import { differenceInYears } from "date-fns";
import Link from "next/link";
import { useDebounce } from "usehooks-ts";

export default function AllCoach() {
  const [filterByName, setFilterByName] = useState("");
  const debouncedFilter = useDebounce<string>(filterByName, 200);

  const { data: coaches } =
    debouncedFilter == ""
      ? api.coach.getAllCoaches.useQuery()
      : api.coach.getCoachesByName.useQuery({ name: debouncedFilter });
  const { data: allSports } = api.sports.getAllSports.useQuery();

  const tableData: Coach[] = coaches
    ? coaches.map((coach) => {
        const {
          id,
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
          id,
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
          <div className="flex items-center gap-2">
            <Input
              onChange={(e) => setFilterByName(e.target.value)}
              value={filterByName}
              placeholder="Search By Name..."
            />
            <Button asChild className="whitespace-nowrap">
              <Link href={"/coach/AddCoach"}>Add New Coach</Link>
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
