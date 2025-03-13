import type { Centers } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AllData from "~/common/AllData";
import { CENTER_BATCH_TABLE_HEADERS } from "~/constants/coachConstants";
import { api } from "~/utils/api";

const AllCenter = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const [finalData, setFinalData] = useState<Centers[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const centersData: any =
    filterByName === ""
      ? api.center.getAllCentersWithPagination.useQuery({ page: currentPage, limit: 10 })
      : api.center.getCentersByName.useQuery({ name: filterByName });

  const centers = centersData?.data?.data ?? []; // Ensure it's an array
  const totalPages = centersData?.data?.totalPages ?? 1; // Ensure a valid number

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  useEffect(() => {
    if (centers.length > 0) { // Check only after ensuring centers is an array
      const updatedCenters = centers.map((center: { Batches: string | any[]; }) => ({
        ...center,
        batches: center?.Batches?.length || 0, // Ensure a valid number
      }));
      setFinalData(updatedCenters);
    }
  }, [centers]);


  const { mutate: deleteMutate } = api.center.deleteCenter.useMutation({
    onSuccess: (response) => {
      const arr: Centers[] = [...finalData];
      const index = finalData?.findIndex(
        (item: Centers) => item?.id == response?.id
      );
      if (index > -1) {
        arr.splice(index, 1);
      }
      setFinalData(arr);
      return response;
    },
  });

  const deleteCenter = (id: number) => {
    deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  };

  return (
    <>
      <AllData
        title="ALL CENTERS"
        addButtonText="ADD NEW CENTER"
        addButtonUrl="/centers/AddCenter"
        dropdownItems={{}}
        filter={false}
        TABLE_HEAD={CENTER_BATCH_TABLE_HEADERS}
        TABLE_ROWS={finalData}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        rowSelection={false}
        showImage={false}
        onViewClick={(id: number) => router.push(`/centers/${id ?? ""}`)}
        onEditClick={(id: number) => router.push(`/edit-center-${id}`)}
        onDeleteClick={(id: number) => deleteCenter(id)}
        totalPages={totalPages}
        currentPage={currentPage}
        onHandlePageChange={handlePageChange}
      />
    </>
  );
};

export default AllCenter;
