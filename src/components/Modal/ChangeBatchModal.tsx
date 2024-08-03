import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";
import Cross from "../../images/cross.svg";

const ChangeBatchModal = (
  {
    selectedComponent,
    setSelectedComponent,
  }: {
    selectedComponent: string;
    setSelectedComponent: (value: string) => void;
  }
) => {
  const customTheme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg bg-white border-gray-200 border w-full  focus:outline-none  font-medium rounded-lg  px-5 py-2.5 justify-between inline-flex items-center ",
  };
  const Theme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg relative bg-white border-gray-200 border w-full  focus:outline-none  font-medium rounded-lg  px-5 py-2.5 justify-between inline-flex items-center ",
  };
  const handleClose = () => {
    setSelectedComponent("");
  };
  return (
    <>
      <Dialog
        open={selectedComponent==="changeBatch"}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-6 py-3 2xl:min-w-[30%] 2xl:max-w-[30%]"
      >
        <DialogHeader className="flex items-center justify-between px-0 pb-0">
          <div className="font-heading text-2xl font-medium uppercase">
            Change Batch
          </div>
          <button onClick={handleClose}>
            <Image width={0} height={0} className="w-auto h-auto" src={Cross} alt="" />
          </button>
        </DialogHeader>
        <DialogBody className="px-0">
          <div>
            <Dropdown
              label="Centers"
              inline={true}
              theme={Theme}
              dismissOnClick={false}
              className="w-50 drop-shadow-[0_12px_16px_-4px_rgba(16, 24, 40, 0.08)] !relative top-0 mt-2 !translate-y-0 !transform  border-0 text-black transition-all duration-300 ease-in"
            >
              <div className="scroll max-h-[117px] overflow-auto rounded-b-lg px-4">
                <div className="my-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                  />
                  <span className="ml-3 text-lg font-medium text-gray-500">
                    Biswa Bharati Stadium
                  </span>
                </div>
                <div className="my-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                  />
                  <span className="ml-3 text-lg font-medium text-gray-500">
                    Netaji Indoor Stadium
                  </span>
                </div>
                <div className="my-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                  />
                  <span className="ml-3 text-lg font-medium text-gray-500">
                    Bijoygorh Sports Ground
                  </span>
                </div>
                <div className="my-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-2 border-orange-light border-opacity-30 text-orange-light focus:ring-0 "
                  />
                  <span className="ml-3 text-lg font-medium text-gray-500">
                    Bijoygorh Sports Ground
                  </span>
                </div>
              </div>
            </Dropdown>

            <button className="mt-6 w-full rounded-lg bg-burgundy-dark py-3 text-white">
              Save Changes
            </button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ChangeBatchModal;
