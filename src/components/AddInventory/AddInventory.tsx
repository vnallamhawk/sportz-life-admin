import React, { useContext, useEffect, useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Select from "../Select";
import {options} from "../../constants/inventoryConstant"
import InventoryTableHeader from "../Inventory/InventoryTableHeader";
import InventoryTableBody from "../Inventory/InventoryTableBody";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";


const AddInventory = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inventories,setInventories]=useState([])
  const [selectedInventory,setSelectedInventory]=useState({})
  const [finalOptions,setFinalOptions]=useState(options)

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  useEffect(()=>{
    if(inventories && inventories.length>0 && finalOptions.length>0){
      let arr=[]
      for(let i=0;i<finalOptions.length;i++){
        const index=inventories?.findIndex((item)=>item?.name===finalOptions[i]?.value)
        if(index===-1){
          arr.push(finalOptions[i])
        }
      }
      setFinalOptions(arr)
    }


  },[JSON.stringify(inventories),finalOptions])


  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData },
  } = useContext(FormContext);


  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };

  const submitCallback = () => {
    debugger
    const finalFormData = {
      ...formData,
      inventories
    };
    props?.finalFormSubmissionHandler(finalFormData);
  };

  const handleChangeInventory=(value:string)=>{
    let obj:any={...selectedInventory,name:value}
    if(!obj.quantity){
      obj.quantity=1
    }
    setSelectedInventory(obj)
  }
  const handleChangeQuantity=(e)=>{
    let obj:any={...selectedInventory,quantity:e.target.value}
  
    setSelectedInventory(obj)
  }

  const onSaveInventories=()=>{
    const arr=[...inventories]
    arr.push(selectedInventory)
    setInventories(arr)

  }

  const removeInventory=(index,number)=>{
    const arr=[...inventories]
    arr.splice(index,1)
    setInventories(arr)
  }

  return (
    <>
      <Card className="h-full">
        <header className="mb-3 flex justify-between p-2">
          <CardTitle title="ADD CENTER" />
        </header>

        <p className="text-xl text-gray-400">Hi!First things first</p>
        <CardTitle title="ADD INVENTORIES" />

        <div className="flex justify-evenly">
          <Select
            // isMulti={props?.isMulti ?? false}
            options={finalOptions}
            value={selectedInventory?.name}
            placeholder={"select Inventories"}
            className="w-full"
            onChangeHandler={(value) => handleChangeInventory(value)}
          />
         {selectedInventory && Object.keys(selectedInventory).length>0 && <> <div className="ml-4 flex rounded-[5px]  border-2 border-gray-400">
            <input className="w-10 text-gray-400" value={selectedInventory?.quantity} type="number" onChange={handleChangeQuantity}/>

            <span className=" mt-2 flex justify-center px-2 text-center text-sm  text-gray-400">
              Qty
            </span>
          </div>

          <Button
            className="border-1  ml-3 rounded-lg border-pink-700 p-2 text-pink-700"
            onClick={() => onSaveInventories()}
          >
            Add
          </Button></>}
        </div>
        <Table
          tableHeader={InventoryTableHeader()}
          tableBody={InventoryTableBody(inventories,removeInventory)}
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
