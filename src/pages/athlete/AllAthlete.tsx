
import Modal from "../../components/Modal";
import React, { useEffect, useState } from "react";
import AllData from "~/common/AllData";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import moment from "moment-timezone";
import type { Athletes } from "@prisma/client";

const TABLE_HEAD = [
  { label: "Athlete Name", id: "name" },
  { label: "Training Level", id: "t_level" },
  { label: "Center", id: "center" },
  { label: "Batch", id: "batch" },
  { label: "Fee Status of the Month", id: "status" },
  { label: "Action", id: "action" },
];

export default function Athlete() {
  const [filterByName, setFilterByName] = useState("");
  const router = useRouter();
  const [finalData, setFinalData] = useState<Athletes[]>([]);

  const { data: athletes } =
    filterByName == ""
      ? api.athlete.getAllAthletes.useQuery()
      : api.athlete.getAthleteByName.useQuery({ name: filterByName });

  const dropdownObj = {
    center: true,
    batch: true,
    delete: true,
    attendance: true,
    reminder: true,
    freeze: true,
  };

  const { mutate: deleteMutate } = api.athlete.deleteAthlete.useMutation({
    onSuccess: (response) => {
      const arr :Athletes[]= [...finalData];
      const index = finalData?.findIndex(
        (item: Athletes) => item?.id == response?.id
      );
      if (index > -1) {
        arr.splice(index, 1);
      }
      setFinalData(arr);
      return response;
    },
  });

  useEffect(() => {
    if (athletes && athletes?.length > 0) {
      const updatedAthletes: Athletes[] = athletes.map((athletes:Athletes) => {
        return {
          ...athletes,
          // status: athlete?.designation,
        };
      });
      setFinalData(updatedAthletes);
    }
  }, [athletes]);

  const deleteAthlete = (id: number) => {
    deleteMutate({ athleteId: id, deletedAt: moment().toISOString() });
  };

  return (
    <>
      <AllData
        title="ALL ATHLETES"
        addButtonText="Add Athlete"
        addButtonUrl="/athlete/AddAthlete"
        dropdownItems={dropdownObj}
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={athletes}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        onViewClick={(id: number) => void router.push(`/athlete/${id ?? ""}`)}
        onEditClick={(id: number) => void router.push(`/edit-athlete-${id}`)}
        onDeleteClick={(id: number) => deleteAthlete(id)}
      />
      <Modal />
    </>
  );
}
