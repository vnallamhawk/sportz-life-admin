import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import Cross from "../../images/cross.svg";
import Calendar from "react-calendar";
import { Dropdown } from "flowbite-react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const Modal =()=> {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [value, onChange] = useState<Value>(new Date());
  const customTheme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg bg-white border-gray-200 border w-full  focus:outline-none  font-medium rounded-lg  px-5 py-2.5 justify-between inline-flex items-center ",
  };
  const Theme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg relative bg-white border-gray-200 border w-full  focus:outline-none  font-medium rounded-lg  px-5 py-2.5 justify-between inline-flex items-center ",
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-6 py-3 2xl:min-w-[30%] 2xl:max-w-[30%]"
      >
        {/* Attendee----------------------------------------------------------------------- */}
        {/* <DialogHeader className="flex justify-between items-center pb-0 px-0">
                    <div className="text-2xl font-medium font-heading uppercase">Attendance</div>
                    <button onClick={handleOpen}><Image fill src={Cross} alt="" /></button>
                </DialogHeader>
                <DialogBody className="px-0 pt-2">
                    <div>
                        <Calendar onChange={onChange} value={value} className="w-full text-base mb-4" />

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
                </DialogBody> */}
        {/* Attendee----------------------------------------------------------------------- */}

        {/* send reminder----------------------------------------------------------------------- */}
        {/* <DialogHeader className="flex justify-between items-center pb-0 px-0">
                    <div className="text-2xl font-medium font-heading uppercase">Send Reminder</div>
                    <button onClick={handleOpen}><Image fill src={Cross} alt="" /></button>
                </DialogHeader>
                <DialogBody className="px-0">
                    <div>
                        <div className="dropdown">
                            <Dropdown label="Select Reminder" inline={true}  theme={customTheme} dismissOnClick={false} className="text-black w-50">
                                <Dropdown.Item>Present</Dropdown.Item>
                                <Dropdown.Item>Present</Dropdown.Item>
                            </Dropdown>
                        </div>
                        <button className="py-3 w-full bg-burgundy-dark text-white mt-6 rounded-lg">Done</button>
                    </div>
                </DialogBody> */}
        {/* send reminder----------------------------------------------------------------------- */}

        {/* send reminder----------------------------------------------------------------------- */}
        {/* <DialogHeader className="flex justify-between items-center pb-0 px-0">
                    <div className="text-2xl font-medium font-heading uppercase">Change Center</div>
                    <button onClick={handleOpen}><Image fill src={Cross} alt="" /></button>
                </DialogHeader>
                <DialogBody className="px-0">
                    <div>
                        <Dropdown label="Centers" inline={true} theme={Theme} dismissOnClick={false} className="border-0 text-black w-50 !relative top-0 !translate-y-0 !transform transition-all ease-in duration-300  mt-2 drop-shadow-[0_12px_16px_-4px_rgba(16, 24, 40, 0.08)]">
                            <div className="rounded-b-lg px-4 max-h-[117px] overflow-auto scroll" >
                                <div className="my-3">
                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                    <span className="ml-3 text-gray-500 font-medium text-lg">Biswa Bharati Stadium</span>
                                </div>
                                <div className="my-3">
                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                    <span className="ml-3 text-gray-500 font-medium text-lg">Netaji Indoor Stadium</span>
                                </div>
                                <div className="my-3">
                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                    <span className="ml-3 text-gray-500 font-medium text-lg">Bijoygorh Sports Ground</span>
                                </div>
                                <div className="my-3">
                                    <input type="checkbox" className="w-5 h-5 rounded border-orange-light border-opacity-30 border-2 text-orange-light focus:ring-0 " />
                                    <span className="ml-3 text-gray-500 font-medium text-lg">Bijoygorh Sports Ground</span>
                                </div>
                            </div>
                        </Dropdown>
                   
                        <button className="py-3 w-full bg-burgundy-dark text-white mt-6 rounded-lg">Save Changes</button>
                    </div>
                </DialogBody> */}
        {/* send reminder----------------------------------------------------------------------- */}

        {/* freeze----------------------------------------------------------------------- */}
        <DialogHeader className="flex items-center justify-between px-0 pb-0">
          <div className="font-heading text-2xl font-medium uppercase">
            Freeze
          </div>
          <button onClick={handleOpen}>
            <Image fill src={Cross} alt="" />
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

        {/* freeze----------------------------------------------------------------------- */}
      </Dialog>
    </>
  );
}

export default Modal
