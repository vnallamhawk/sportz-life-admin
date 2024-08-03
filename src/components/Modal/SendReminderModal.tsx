import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";
import Cross from "../../images/cross.svg";

const SendReminderModal = ({
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
  return (
    <>
      <Dialog
        open={selectedComponent==="reminder"}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-6 py-3 2xl:min-w-[30%] 2xl:max-w-[30%]"
      >
        <DialogHeader className="flex items-center justify-between px-0 pb-0">
          <div className="font-heading text-2xl font-medium uppercase">
            Send Reminder
          </div>
          <button onClick={handleClose}>
            <Image width={0} height={0} className="w-auto h-auto" src={Cross} alt="" />
          </button>
        </DialogHeader>
        <DialogBody className="px-0">
          <div>
            <div className="dropdown">
              <Dropdown
                label="Select Reminder"
                inline={true}
                theme={customTheme}
                dismissOnClick={false}
                className="w-50 text-black"
              >
                <Dropdown.Item>Present</Dropdown.Item>
                <Dropdown.Item>Present</Dropdown.Item>
              </Dropdown>
            </div>
            <button className="mt-6 w-full rounded-lg bg-burgundy-dark py-3 text-white">
              Send
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SendReminderModal;
