import React, { useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Textbox from "../Textbox";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import Select from "../Select";
import { MultiSelectOption } from "~/types/select";
import InventoryTableHeader from "../Inventory/InventoryTableHeader";
import InventoryTableBody from "../Inventory/InventoryTableBody";
const options: MultiSelectOption[] = [
  {
    label: "Invent1",
    value: "Inventory1",
  },
  {
    label: "Invent2",
    value: "Inventory2",
  },
  { label: "Invent3", value: "Inventory13" },
];
const AddInventory = () => {
  const router = useRouter();
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
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
            options={options}
            value={"Inventory1"}
            placeholder={"selecct Inventories"}
            className="w-full"
            onChangeHandler={() => {}}
          />
          <div className="ml-4 flex rounded-[5px]  border-2 border-gray-400">
            <input className="w-10 text-gray-400" value={1} />

            <span className=" mt-2 flex justify-center px-2 text-center text-sm  text-gray-400">
              Qty
            </span>
          </div>

          <Button
            className="border-1  ml-3 rounded-lg border-pink-700 p-2 text-pink-700"
            onClick={() => router.push("/center/AddCenter")}
          >
            Add
          </Button>
        </div>
        <Table
          tableHeader={InventoryTableHeader()}
          tableBody={InventoryTableBody([], handleIsLoading)}
        />
        {loading ? <LoadingSpinner /> : ""}
      </Card>
    </>
  );
};

export default AddInventory;
