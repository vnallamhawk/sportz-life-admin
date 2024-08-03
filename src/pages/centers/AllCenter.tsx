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
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const { data: centers } =
    filterByName == ""
      ? api.center.getAllCenters.useQuery()
      : api.center.getCentersByName.useQuery({ name: filterByName });

  useEffect(() => {
    if (centers && centers?.length > 0) {
      const updatedCenters = centers.map((center) => {
        return {
          ...center,
          batches: center?.Batches?.length,
        };
      });
      setFinalData(updatedCenters);
    }
  }, [centers]);

  const { mutate: deleteMutate } = api.center.deleteCenter.useMutation({
    onSuccess: (response) => {
      const arr:Centers[] = [...finalData];
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
      />
    </>
  );
};

export default AllCenter;
