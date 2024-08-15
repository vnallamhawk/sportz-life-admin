/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import AddInventoryModal from "./AddInventoryModal";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";
import { INVENTORY_TABLE_HEADERS } from "~/constants/inventoryConstant";
import type { MultiSelectOption } from "~/types/select";

const AddInventory = (props: any) => {
  const router=useRouter()
  const [inventories, setInventories] = useState<{[key:string]:any}[]>([]);
  const [finalOptions, setFinalOptions] = useState<MultiSelectOption[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryDetails, setInventoryDetails] = useState({
    name: "",
    category: "",
  });
  const { data: allInventories } = api.inventory.getAllInventories.useQuery();
  const { data: sessionData } = useSession();  
  const  createdBy= sessionData?.token?sessionData?.token?.id:sessionData?.user?.id
  const  academyId= sessionData?.token?sessionData?.token?.academyId:sessionData?.user?.academyId


  const { mutate: createMutate } = api.inventory.createInventory.useMutation({
    onSuccess: (response) => {
      const arr: MultiSelectOption[] = [...finalOptions];
      arr.push({ label: response?.name, value: response?.id });
      setFinalOptions(arr);
    },
  });

  useEffect(() => {
    if (allInventories && allInventories?.length > 0) {
      const arr: MultiSelectOption[] = [];
      for (let i = 0; i < allInventories.length; i++) {
        const index =
          inventories && inventories.length > 0
            ? inventories?.findIndex(
                (item) => item.name === finalOptions[i]?.value
              )
            : -1;
        if (index === -1) {
          arr.push({
            label: allInventories[i]?.name || "",
            value: allInventories[i]?.id || "",
          });
        }
      }

      setFinalOptions(arr);
    }
  }, [inventories, allInventories, finalOptions]);

  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const submitCallback = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const finalFormData = {
      ...formData,
      inventories,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    props?.finalFormSubmissionHandler(finalFormData);
  };

  const onSaveInventories = (selectedInventory: any) => {
    const arr: {[key:string]:any}[] = [...inventories];
    arr.push({
      ...selectedInventory,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();
    if(createdBy){
      createMutate({
        ...inventoryDetails,
        createdBy:parseInt(createdBy as string)
      });
    }
   

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
