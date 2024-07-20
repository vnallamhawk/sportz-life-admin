import React, { useContext, useEffect, useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Select from "../Select";
import Image from "next/image";
import Plus from "../../images/plus.svg";
import Remove from "../../images/remove.svg";
// import { options } from "../../constants/inventoryConstant";
import InventoryTableHeader from "../Inventory/InventoryTableHeader";
import InventoryTableBody from "../Inventory/InventoryTableBody";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import AddInventoryModal from "./AddInventoryModal";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";
import { INVENTORY_TABLE_HEADERS } from "~/constants/inventoryConstant";

const AddInventory = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [finalOptions, setFinalOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryDetails, setInventoryDetails] = useState({});
  const { data: allInventories } = api.inventory.getAllInventories.useQuery();
  const { data: sessionData } = useSession();

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const { mutate: createMutate } = api.inventory.createInventory.useMutation({
    onSuccess: (response) => {
      let arr: any = [...finalOptions];
      arr.push({ label: response?.name, value: response?.id });
      setFinalOptions(arr);
    },
  });

  useEffect(() => {
    if (allInventories && allInventories?.length > 0) {
      let arr = [];
      for (let i = 0; i < allInventories.length; i++) {
        const index =
          inventories && inventories.length > 0
            ? inventories?.findIndex(
              (item) => item?.name === finalOptions[i]?.value
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
  }, [inventories, allInventories]);

  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData,setFormData },
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

  const onSaveInventories = (selectedInventory) => {
    const arr = [...inventories];
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

  const addNewInventory = (e) => {
    e.preventDefault();
    createMutate({ ...inventoryDetails, createdBy: sessionData?.token?.id });

    setShowModal(false);

    // api for create inventory
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
        tableDescription={
          "Hi!First things first"
        }
        tableFields={[{type:"select",name:"value",placeholder:"Select Inventrories",options:finalOptions},{type:"number",name:"quantity"}]}
        TableHeadings={INVENTORY_TABLE_HEADERS}
        tablekey="inventories"
        tableData={inventories}
        addTableData={onSaveInventories}
        buttonItems={{ prevFinish: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButtonText={'Add New Inventory'}
        addTableButton={()=>{
            setShowModal(!showModal);
        }}
        onRemoveTableButton={removeInventory}
        finalFormSubmissionHandler={submitCallback}
      />
    </>
  );
};

export default AddInventory;
