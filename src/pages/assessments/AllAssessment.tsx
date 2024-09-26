import type { Centers } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AllData from "~/common/AllData";
import MultiTabComp from "~/common/MultiTabComp";
import { ASSESSMENT_TABLE_HEADERS, PHYSICAL_TEST_TABLE_HEADERS, SPORT_SPECIFIC_TABLE_HEADERS } from "~/constants/assessment";
import { api } from "~/utils/api";

const AllAssessment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState("");
  const [finalData, setFinalData] = useState<Centers[]>([]);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const [activeKey, setActiveKey] = useState("0");
  const [childActiveKey, setChildActiveKey] = useState("0");

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

  const deleteAssessment = (id: number) => {
    deleteMutate({ centerId: id, deletedAt: moment().toISOString() });
  };

  return (
    <>

<MultiTabComp
        tab1label="ALL ASSESSMENTS"
        tab2label="All Test Banks"
        addButtonText={activeKey==="0"?"Add Assessment":"Add Test Bank"}
        addButtonUrl={activeKey==="0"?`/assessments/AddAssessment`:childActiveKey==="0"?`/assessments/AddPhysicalTestBank`:`/assessments/AddSportSpecificTestBank`}
        dropdownItems={{}}
        table1show={true}
        table2show={false}
        table2Component={<MultiTabComp
          tab1label="PHYSICAL TESTS"
          tab2label="SPORTS-SPECIFIC TESTS"
          dropdownItems={{}}
          table1show={true}
          table2show={true}
          TABLE1_HEAD={PHYSICAL_TEST_TABLE_HEADERS}
          TABLE1_ROWS={finalData}
          TABLE2_HEAD={SPORT_SPECIFIC_TABLE_HEADERS}
          TABLE2_ROWS={finalData}
          setActiveKey={(key: string) => setChildActiveKey(key)}
          activeKey={childActiveKey}
          // onViewClick={(id: number) => {}}
          // onEditClick={(id: number) => {}}
          // onDeleteClick={(id: number) => {}}
        />

        }
        TABLE1_HEAD={ASSESSMENT_TABLE_HEADERS}
        TABLE1_ROWS={finalData}
        TABLE2_HEAD={ASSESSMENT_TABLE_HEADERS}
        TABLE2_ROWS={[]}
        filter={activeKey==="0"?false:true}
        filters={activeKey==="0"?[]:[]}
        setFilterByName={setFilterByName}
        filterByName={filterByName}
        setActiveKey={(key: string) => setActiveKey(key)}
        activeKey={activeKey}
        // onViewClick={(id: number) => {}}
        // onEditClick={(id: number) => {}}
        // onDeleteClick={(id: number) => {}}
      />
    </>
  );
};

export default AllAssessment;
