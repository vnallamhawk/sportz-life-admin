import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AllData from "~/common/AllData";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import CenterBatchTableBody from "~/components/CenterBatchTable/CenterBatchTableBody";
import CenterBatchTableHeader from "~/components/CenterBatchTable/CenterBatchTableHeader";
import LoadingSpinner from "~/components/LoadingSpinner/LoadingSpinner";
import Table from "~/components/Table";
import Textbox from "~/components/Textbox";
import { CENTER_BATCH_TABLE_HEADERS } from "~/constants/coachConstants";
import { api } from "~/utils/api";

const AllCenter = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const [finalData, setFinalData] = useState<any>([]);
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
          // batches: center?.Batches?.length,
        };
      });
      setFinalData(updatedCenters);
    }
  }, [JSON.stringify(centers)]);

  const { mutate: deleteMutate } = api.center.deleteCenter.useMutation({
    onSuccess: (response) => {
      let arr = [...finalData];
      const index = finalData?.findIndex(
        (item: any) => item?.id == response?.id
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
        onViewClick={(id: any) => router.push(`/centers/${id ?? ""}`)}
        onEditClick={(id: any) => router.push(`/edit-center-${id}`)}
        onDeleteClick={(id: any) => deleteCenter(id)}
      />

      {/* <Card className="h-full">
        <header className="flex justify-between p-2">
          <CardTitle title="ALL CENTERS" />
          <div>
            <Textbox
              value={filterByName}
              setValue={setFilterByName}
              placeHolder="Search by center,location ..."
              className="w-80 p-1.5"
            />
            <Button
              className="ml-3 bg-pink-700 p-2 text-white"
              onClick={() => router.push("/centers/AddCenter")}
            >
              ADD NEW CENTER
            </Button>
          </div>
        </header>
        <Table
          tableHeader={CenterBatchTableHeader()}
          tableBody={CenterBatchTableBody(
            { name: filterByName },
            handleIsLoading
          )}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card> */}
    </>
  );
};

export default AllCenter;
