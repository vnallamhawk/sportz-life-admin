import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import Cross from "../../images/cross.svg";
import Calendar from "react-calendar";


const AttendanceModal = ({
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
  const [value, onChange] = useState<Date>(new Date());

  return (
    <>
      <Dialog
        open={selectedComponent==="attendance"}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-6 py-3 2xl:min-w-[30%] 2xl:max-w-[30%]"
      >
       <DialogHeader className="flex justify-between items-center pb-0 px-0">
                    <div className="text-2xl font-medium font-heading uppercase">Attendance</div>
                    <button onClick={handleClose}><Image width={0} height={0} className="w-auto h-auto" src={Cross} alt="" /></button>
                </DialogHeader>
                <DialogBody className="px-0 pt-2">
                    <div>
                        <Calendar  value={value} className="w-full text-base mb-4" />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <div className="dropdown">
                                    <Dropdown label="Present" inline={true}  theme={customTheme} dismissOnClick={false} className="text-black w-50">
                                        <Dropdown.Item>Present</Dropdown.Item>
                                        <Dropdown.Item>Present</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="dropdown">
                                    <Dropdown label="Late" inline={true}  theme={customTheme} dismissOnClick={false} className="text-black w-50">
                                        <Dropdown.Item>Late</Dropdown.Item>
                                        <Dropdown.Item>Late</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="dropdown">
                                    <Dropdown label="Minute late" inline={true}  theme={customTheme} dismissOnClick={false} className="text-black w-50">
                                        <Dropdown.Item>Minute late</Dropdown.Item>
                                        <Dropdown.Item>Late</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="dropdown">
                                    <Dropdown label="Late" inline={true}  theme={customTheme} dismissOnClick={false} className="text-black w-50">
                                        <Dropdown.Item>Late</Dropdown.Item>
                                        <Dropdown.Item>Late</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <button className="py-3 w-full bg-burgundy-dark text-white mt-5 rounded-lg">Done</button>
                    </div>
                </DialogBody> 
      </Dialog>
    </>
  );
};

export default AttendanceModal;
