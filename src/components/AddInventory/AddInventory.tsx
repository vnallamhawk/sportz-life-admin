import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import AddInventoryModal from "./AddInventoryModal";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";
import { INVENTORY_TABLE_HEADERS } from "~/constants/inventoryConstant";
import type { MultiSelectOption } from "~/types/select";
import { Inventories } from "@prisma/client";


const AddInventory = (props: any) => {
  const [inventories, setInventories] = useState([]);
  const [finalOptions, setFinalOptions] = useState<MultiSelectOption[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryDetails, setInventoryDetails] = useState({name:"",category:""});
  const { data: allInventories } = api.inventory.getAllInventories.useQuery();
  const { data: sessionData } = useSession();

  const { mutate: createMutate } = api.inventory.createInventory.useMutation({
    onSuccess: (response) => {
      const arr: MultiSelectOption[] = [...finalOptions];
      arr.push({ label: response?.name, value: response?.id });
      setFinalOptions(arr);
    },
  });

  useEffect(() => {
    if (allInventories && allInventories?.length > 0) {
      const arr :MultiSelectOption[]= [];
      for (let i = 0; i < allInventories.length; i++) {
        const index =
          inventories && inventories.length > 0
            ? inventories?.findIndex(
                (item: Inventories) => item?.name === finalOptions[i]?.value
              )
            : -1;
        if (index === -1) {
          arr.push({
            label: allInventories[i]?.name,
            value: allInventories[i]?.id,
          });
        }
      }

      setFinalOptions(arr);
    }
  }, [inventories, allInventories, finalOptions]);

  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const submitCallback = () => {
    const finalFormData = {
      ...formData,
      inventories,
    };
    props?.finalFormSubmissionHandler(finalFormData);
  };

  const onSaveInventories = (selectedInventory: any) => {
    const arr: any = [...inventories];
    arr.push({
      ...selectedInventory,
      inventoryId: parseInt(selectedInventory?.value),
    });
    setInventories(arr);
  };

  const removeInventory = (index: number) => {
    const arr = [...inventories];
    arr.splice(index, 1);
    setInventories(arr);
  };

  const addNewInventory = (e: any) => {
    e.preventDefault();
    createMutate({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...inventoryDetails, createdBy: sessionData?.token?.id,
     
    });

    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <AddInventoryModal
          show={showModal}
          setShow={setShowModal}
          setInventoryDetails={setInventoryDetails}
          inventoryDetails={inventoryDetails}
          handleInventory={addNewInventory}
        />
      )}
      <AddForm
        cardTitle="ADD CENTER"
        tableTitle="ADD INVENTORIES"
        tableDescription={"Hi! First things first"}
        tableFields={[
          {
            type: "select",
            name: "value",
            placeholder: "Select Inventrories",
            options: finalOptions,
          },
          { type: "number", name: "quantity" },
        ]}
        TableHeadings={INVENTORY_TABLE_HEADERS}
        tablekey="inventories"
        tableData={inventories}
        addTableData={onSaveInventories}
        buttonItems={{ prevFinish: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButtonText={"Add New Inventory"}
        addTableButton={() => {
          setShowModal(!showModal);
        }}
        mobileAddButtonText="Add another inventory"
        onRemoveTableButton={removeInventory}
        finalFormSubmissionHandler={submitCallback}
      />
    </>
  );
};

export default AddInventory;
