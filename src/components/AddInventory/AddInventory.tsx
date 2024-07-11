import React, { useContext, useEffect, useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Select from "../Select";
// import { options } from "../../constants/inventoryConstant";
import InventoryTableHeader from "../Inventory/InventoryTableHeader";
import InventoryTableBody from "../Inventory/InventoryTableBody";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import AddInventoryModal from "./AddInventoryModal";
import { api } from "~/utils/api";

const AddInventory = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState({});
  const [finalOptions, setFinalOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inventoryDetails,setInventoryDetails]=useState({})
  const { data: allInventories } = api.inventory.getAllInventories.useQuery();

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const { mutate: createMutate } = api.inventory.createInventory.useMutation({
    onSuccess: (response) => {
      let arr:any=[...finalOptions]
      arr.push({label: response?.name, value: response?.id })
      setFinalOptions(arr)
    },
  });
  useEffect(() => {
    if (allInventories && allInventories?.length > 0) {
      let arr = [];
      for (let i = 0; i < allInventories.length; i++) {
        const index =
        inventories && inventories.length > 0
            ? inventories?.findIndex((item) => item?.name === finalOptions[i]?.value)
            : -1;
        if (index === -1) {
          arr.push({ label: allInventories[i]?.name, value: allInventories[i]?.id });
        }
      }

      setFinalOptions(arr);
    }
  }, [inventories, allInventories]);

  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData },
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

  const handleChangeInventory = (value: string) => {
    let obj: any = { ...selectedInventory,value };
    if (!obj.quantity) {
      obj.quantity = 1;
    }
    setSelectedInventory(obj);
  };
  const handleChangeQuantity = (e) => {
    let obj: any = { ...selectedInventory, quantity: e.target.value };

    setSelectedInventory(obj);
  };

  const onSaveInventories = () => {
    const arr = [...inventories];
    arr.push({...selectedInventory,inventoryId:selectedInventory?.value});
    setInventories(arr);
    setSelectedInventory({});
  };

  const removeInventory = (index: number) => {
    const arr = [...inventories];
    arr.splice(index, 1);
    setInventories(arr);
  };

  const addNewInventory = (e) => {
    e.preventDefault();
    createMutate(inventoryDetails);

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
      <Card className="h-full">
        <header className="mb-3 flex justify-between p-2">
          <CardTitle title="ADD CENTER" />
        </header>
        <div className="flex justify-between align-middle ">
          <div>
            <p className="text-xl text-gray-400">Hi!First things first</p>
            <CardTitle title="ADD INVENTORIES" />
          </div>
          <div
            className="  h-12 cursor-pointer  rounded-lg bg-pink-600 p-3  text-center text-white"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Add New Inventory
          </div>
        </div>

        <div className="flex justify-evenly">
          <Select
            // isMulti={props?.isMulti ?? false}
            options={finalOptions}
            value={selectedInventory?.name}
            placeholder={"select Inventories"}
            className="w-full"
            onChangeHandler={(value) => handleChangeInventory(value)}
          />
          {selectedInventory && Object.keys(selectedInventory).length > 0 && (
            <>
              {" "}
              <div className="ml-4 flex rounded-[5px]  border-2 border-gray-400">
                <input
                  className="w-10 text-gray-400"
                  value={selectedInventory?.quantity}
                  type="number"
                  onChange={handleChangeQuantity}
                />

                <span className=" mt-2 flex justify-center px-2 text-center text-sm  text-gray-400">
                  Qty
                </span>
              </div>
              <Button
                className="border-1  ml-3 rounded-lg border-pink-700 p-2 text-pink-700"
                onClick={() => onSaveInventories()}
              >
                Add
              </Button>
            </>
          )}
        </div>
        <Table
          tableHeader={InventoryTableHeader()}
          tableBody={InventoryTableBody(inventories, removeInventory,finalOptions)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
      <div className="flex justify-end">
        <Button
          type="button"
          className="mx-3 bg-pink-600 hover:bg-pink-800"
          onClick={prevClickHandler}
        >
          Prev
        </Button>
        <Button
          type="button"
          className="mx-3 bg-pink-600 hover:bg-pink-800"
          onClick={submitCallback}
        >
          Finish
        </Button>
      </div>
    </>
  );
};

export default AddInventory;
