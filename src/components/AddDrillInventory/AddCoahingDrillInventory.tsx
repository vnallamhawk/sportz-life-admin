/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormContext } from "~/pages/drills/AddDrills/AddCoachingDrills";
// import AddInventoryModal from "./AddInventoryModal";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";
import { DRILL_INVENTORY_TABLE_HEADERS } from "~/constants/inventoryConstant";
import type { MultiSelectOption } from "~/types/select";

const AddCoachingDrillInventory = (props: any) => {
  const [inventories, setInventories] = useState<{ [key: string]: any }[]>([]);
  const [finalOptions, setFinalOptions] = useState<MultiSelectOption[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryDetails, setInventoryDetails] = useState({
    name: "",
    category: "",
  });
  //   const { data: allInventories } = api.inventory.getAllInventories.useQuery();
  const { data: sessionData } = useSession();

  //   const { mutate: createMutate } = api.inventory.createInventory.useMutation({
  //     onSuccess: (response) => {
  //       const arr: MultiSelectOption[] = [...finalOptions];
  //       arr.push({ label: response?.name, value: response?.id });
  //       setFinalOptions(arr);
  //     },
  //   });

  //   useEffect(() => {
  //     if (allInventories && allInventories?.length > 0) {
  //       const arr: MultiSelectOption[] = [];
  //       for (let i = 0; i < allInventories.length; i++) {
  //         const index =
  //           inventories && inventories.length > 0
  //             ? inventories?.findIndex(
  //                 (item) => item.name === finalOptions[i]?.value
  //               )
  //             : -1;
  //         if (index === -1) {
  //           arr.push({
  //             label: allInventories[i]?.name || "",
  //             value: allInventories[i]?.id || "",
  //           });
  //         }
  //       }

  //       setFinalOptions(arr);
  //     }
  //   }, [inventories, allInventories, finalOptions]);

  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  //   const submitCallback = () => {
  //     const finalFormData = {
  //       ...formData,
  //       inventories,
  //     };
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     props?.finalFormSubmissionHandler(finalFormData);
  //   };

  //   const onSaveInventories = (selectedInventory: any) => {
  //     const arr: { [key: string]: any }[] = [...inventories];
  //     arr.push({
  //       ...selectedInventory,
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //       inventoryId: parseInt(selectedInventory?.value),
  //     });
  //     setInventories(arr);
  //   };

  //   const removeInventory = (index: number) => {
  //     const arr = [...inventories];
  //     arr.splice(index, 1);
  //     setInventories(arr);
  //   };

  //   const addNewInventory = (e: any) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     e.preventDefault();
  //     createMutate({
  //       ...inventoryDetails,
  //       createdBy: sessionData ? sessionData.token.id : 1,
  //     });

  //     setShowModal(false);
  //   };

  // const onSaveInventories = () => {};
  // const removeInventory = () => {};
  // const addNewInventory = () => {};
  // const submitCallback = () => {};

  return (
    <>
      {/* {showModal && (
        <AddInventoryModal
          show={showModal}
          setShow={setShowModal}
          setInventoryDetails={setInventoryDetails}
          inventoryDetails={inventoryDetails}
          handleInventory={addNewInventory}
        />
      )} */}
      <AddForm
        cardTitle="ADD COACHING DRILL"
        tableTitle="ADD EQUIPMENT"
        tableDescription={""}
        tableFields={[
          {
            type: "select",
            name: "value",
            placeholder: "Select Equipment",
            options: finalOptions,
          },
          { type: "number", name: "quantity" },
        ]}
        TableHeadings={DRILL_INVENTORY_TABLE_HEADERS}
        tablekey="drill_inventory"
        tableData={inventories}
        // addTableData={onSaveInventories}
        buttonItems={{ prevFinish: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButtonText={"Add"}
        addTableButton={() => {
          setShowModal(!showModal);
        }}
        mobileAddButtonText="Add"
        // onRemoveTableButton={removeInventory}
        // finalFormSubmissionHandler={submitCallback}
      />
    </>
  );
};

export default AddCoachingDrillInventory;
