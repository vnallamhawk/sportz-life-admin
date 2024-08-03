import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import Cross from "../../images/cross.svg";
import DatePicker from "react-datepicker";


const FreezeModal = ({
  selectedComponent,
  setSelectedComponent,
}: {
    selectedComponent: string;
  setSelectedComponent: (value: string) => void;
}) => {
  const customTheme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg bg-white border-gray-200 border w-full  focus:outline-none  font-medium rounded-lg  px-5 py-2.5 justify-between inline-flex items-center ",
  };
  const handleClose = () => {
    setSelectedComponent("");
  };
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <>
      <Dialog
        open={selectedComponent==="freeze"}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-6 py-3 2xl:min-w-[30%] 2xl:max-w-[30%]"
      >
        <DialogHeader className="flex items-center justify-between px-0 pb-0">
          <div className="font-heading text-2xl font-medium uppercase">
            Freeze
          </div>
          <button onClick={handleClose}>
            <Image width={0} height={0} className="w-auto h-auto" src={Cross} alt="" />
          </button>
        </DialogHeader>
        <DialogBody className="px-0">
          <div>
            <div>
              <div className="my-3">
                {/* <input type="date" value="Freeze From" placeholder="Freeze From" className="w-full rounded-lg focus:ring-0 text-lg border-gray-400" /> */}
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="c-date w-full rounded-lg border-gray-400 text-lg focus:ring-0"
                />
              </div>
              <div className="my-3">
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="c-date w-full rounded-lg border-gray-400 text-lg focus:ring-0"
                  placeholderText="date"
                />
                {/* <input type="date" value="Freeze From" placeholder="Freeze To" className="w-full rounded-lg focus:ring-0 text-lg border-gray-400" /> */}
              </div>
              <div className="my-3">
                <textarea
                  className="min-h-[117px] w-full resize-y rounded-lg border border-solid border-gray-400 px-5 py-2 text-lg focus:ring-0"
                  placeholder="Write a Reason"
                ></textarea>
              </div>
            </div>

            <button className="mt-2 w-full rounded-lg bg-burgundy-dark py-3 text-white">
              Done
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default FreezeModal;
