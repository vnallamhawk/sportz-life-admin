import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";

import { useRouter } from "next/router";
import { ASSIGN_TEST_BANK_TABLE_HEADERS } from "~/constants/assessment";

interface Options {
  label: string|undefined;
  value: string | number|undefined;
}

const AssignTestBank = () => {
  const router=useRouter()
  const [testBanks, setTestBanks] = useState<{[key:string]:any}[]>([]);
  const [finalOptions, setFinalOptions] = useState<Options[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { data: sessionData } = useSession();

  const  createdBy= sessionData?.token?sessionData?.token?.id:sessionData?.user?.id
  const  academyId= sessionData?.token?sessionData?.token?.academyId:sessionData?.user?.academyId



  const { data: allSports } = api.sports.getAllSports.useQuery();

  const { mutate: createMutate } = api.sports.createSports.useMutation({
    onSuccess: (response) => {
      const arr: Options[] = [...finalOptions];
      arr.push({ label: response?.name, value: response?.id });
      setFinalOptions(arr);
    },
  });
 
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const onSaveTestbank = (currentTestBankData: {[key:string]:any}) => {
    const arr: {[key:string]:any}[] = [...testBanks];
    arr.push({
      ...currentTestBankData,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      sportId: parseInt(currentTestBankData?.value),
    });
    setTestBanks(arr);
  };

  const removeSports = (index: number) => {
    const arr = [...testBanks];
    arr.splice(index, 1);
    setTestBanks(arr);
  };

  

  return (
    <>

      <AddForm
        cardTitle="CREATE ASSESSMENT"
        tableTitle="ASSIGN TEST BANK"
        tableFields={[
          {
            type: "select",
            name: "type",
            placeholder: "Select Test Bank Type",
            options: finalOptions,
          },
          {
            type: "select",
            name: "name",
            placeholder: "Select Test Name",
            options: finalOptions,
          },
        ]}
        TableHeadings={ASSIGN_TEST_BANK_TABLE_HEADERS}
        tablekey="testBanks"
        tableData={testBanks}
        addTableData={onSaveTestbank}
        buttonItems={{ next: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButton={() => {
          setShowModal(!showModal);
        }}
        onRemoveTableButton={removeSports}
      />
    </>
  );
};

export default AssignTestBank;
