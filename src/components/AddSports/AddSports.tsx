import React, { useContext, useEffect, useState } from "react";
import Card from "../Card";
import CardTitle from "../Card/CardTitle";
import Button from "../Button";
import Table from "../Table";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Select from "react-select";
import SportsTableHeader from "../Sports/SportsTableHeader";
import { FormContext } from "~/pages/centers/AddCenter/AddCenterForm";
import { api } from "~/utils/api";
import SportsTableBody from "../Sports/SportsTableBody";
import AddSportModal from "./AddSportModal";
const AddSports = () => {
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState({});
  const [finalOptions, setFinalOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSport, setNewSport] = useState(null);
  const [about, setAbout] = useState(null);
  const [sportImage, setSportImage] = useState(null);

  const { data: allSports } = api.sports.getAllSports.useQuery();

  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  useEffect(() => {
    if (allSports && allSports?.length > 0) {
      let arr = [];
      for (let i = 0; i < allSports.length; i++) {
        const index =
          sports && sports.length > 0
            ? sports?.findIndex((item) => item?.name === finalOptions[i]?.value)
            : -1;
        if (index === -1) {
          arr.push({ label: allSports[i]?.name, value: allSports[i]?.id });
        }
      }

      setFinalOptions(arr);
    }
  }, [sports, allSports]);

  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const prevClickHandler = () => {
    setCurrentStep && setCurrentStep(currentStep - 1);
  };
  const nextClickHandler = () => {
    const finalFormData = {
      ...formData,
      sports,
    };
    setFormData(finalFormData);
    setCurrentStep && setCurrentStep(currentStep + 1);
  };

  const handleChangeInventory = (value: string) => {
    const option = finalOptions?.find((item) => item?.value == value);
    let obj: any = { ...selectedSport, name: option.label, value };

    setSelectedSport(obj);
  };

  const onSaveSports = () => {
    const arr = [...sports];
    arr.push(selectedSport);
    setSports(arr);
    setSelectedSport({});
  };

  const removeSports = (index: number) => {
    const arr = [...sports];
    arr.splice(index, 1);
    setSports(arr);
  };

  const addNewSport = (e) => {
    e.preventDefault();
    setShowModal(false);

    console.log(
      "sport is ",
      newSport,
      "about is ",
      about,
      "image is ",
      sportImage
    );

    // api for create sport
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <AddSportModal
          show={showModal}
          setShow={setShowModal}
          addSport={setNewSport}
          addAbout={setAbout}
          addImage={setSportImage}
          handleSport={addNewSport}
        />
      )}
      <Card className="h-full">
        <header className="mb-3 flex justify-between p-2">
          <CardTitle title="ADD CENTER" />
        </header>
        <div className="flex justify-between align-middle ">
          <div>
            <p className="text-xl text-gray-400">Hi!First things first</p>
            <CardTitle title="ADD SPORTS" />
          </div>
          <div
            className="  h-12 cursor-pointer  rounded-lg bg-pink-600 p-3  text-center text-white"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Add New Sport
          </div>
        </div>

        <div className="flex justify-evenly">
          <Select
            // isMulti={props?.isMulti ?? false}
            options={finalOptions}
            // searchable={true}
            value={selectedSport?.value}
            placeholder={"Select Sport"}
            className="w-full"
            onChange={(value) => handleChangeInventory(value)}
          />
          {selectedSport && Object.keys(selectedSport).length > 0 && (
            <Button
              className="border-1  ml-3 rounded-lg border-pink-700 p-2 text-pink-700"
              onClick={() => onSaveSports()}
            >
              Add
            </Button>
          )}
        </div>

        <Table
          tableHeader={SportsTableHeader()}
          tableBody={SportsTableBody(sports, removeSports)}
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
          onClick={nextClickHandler}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default AddSports;
