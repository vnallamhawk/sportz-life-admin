import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AllData from "~/common/AllData";
import {
  COACH_DESIGNATION,
  COACH_TABLE_HEADERS,
} from "~/constants/coachConstants";
import { api } from "~/utils/api";
import moment from "moment-timezone";
import type { Prisma, Coaches } from "@prisma/client";
import { calculateAge } from "~/utils/common";
import { debounce } from "lodash";
type Modify<T, R> = Omit<T, keyof R> & R;

type CoachesType = Modify<Coaches, { status: string }>;

type CoachWithRelations = Prisma.CoachesGetPayload<{
  include: {
    CoachCentersBatches: true;
    CoachSportsMaps: {
      include: {
        Sports: true;
      };
    };
  };
}>;

export default function AllCoach() {
  const router = useRouter();

  const [filterByName, setFilterByName] = useState<string | undefined>();
  const [debouncedName, setDebouncedName] = useState<string | undefined>("");
  const [finalData, setFinalData] = useState<CoachesType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedQuery = debounce((value: string) => {
    setDebouncedName(value);
  }, 1000);

  const { data: coachesResponse, isLoading } =
    api.coach.getAllCoachesWithPagination.useQuery({
      page: currentPage,
      limit: 10,
      name: debouncedName,
    });
  const coaches = coachesResponse?.data;
  const totalPages = coachesResponse?.totalPages;

  const handlePageChange = (page: number) => {
    if (totalPages && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (coaches && coaches?.length > 0) {
      const updatedCoaches = coaches.map((coach: CoachWithRelations) => {
        // eslint-disable-next-line
        return {
          ...coach,
          status: coach?.designation,
          age: calculateAge(coach?.dateOfBirth),
          batchesCount: coach?.CoachCentersBatches
            ? coach.CoachCentersBatches.length
            : 0,
          sportCoaching: coach?.CoachSportsMaps.map(
            // eslint-disable-next-line
            (map: any) => map.Sports.name
          ).join(", "),
          designation:
            // eslint-disable-next-line
            COACH_DESIGNATION.find((d: any) => d.value === coach.designation)
              ?.label || coach.designation,
        };
      });
      setFinalData(updatedCoaches);
    }
  }, [coaches]);

  const { mutate: deleteMutate } = api.coach.deleteCoach.useMutation({
    onSuccess: (response) => {
      const arr: CoachesType[] = [...finalData];
      const index = finalData?.findIndex(
        (item: CoachesType) => item?.id == response?.id
      );
      if (index > -1) {
        arr.splice(index, 1);
      }
      setFinalData(arr);
      return response;
    },
  });

  const deleteCoach = (id: number) => {
    deleteMutate({ coachId: id, deletedAt: moment().toISOString() });
  };

  return (
    <>
      <AllData
        title="ALL COACHES"
        addButtonText="ADD NEW COACH"
        addButtonUrl="/coach/AddCoach"
        dropdownItems={{ reminder: true, freeze: true, changeBatch: true }}
        filter={false}
        TABLE_HEAD={COACH_TABLE_HEADERS}
        TABLE_ROWS={finalData ?? []}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={true}
        showImage={false}
        onViewClick={(id: number) => router.push(`/coach/${id ?? ""}`)}
        onEditClick={(id: number) => router.push(`/edit-coach-${id}`)}
        onDeleteClick={(id: number) => deleteCoach(id)}
        // eslint-disable-next-line
        totalPages={totalPages}
        currentPage={currentPage}
        onHandlePageChange={handlePageChange}
        debouncedQuery={debouncedQuery}
        isLoading={isLoading}
      />
    </>
  );
}
