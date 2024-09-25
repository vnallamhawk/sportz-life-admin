import React, { useEffect, useContext, useState, useRef } from "react";
import {
  ATHLETE_CONTACT_CONSTANTS,
  ATHLETE_GENRAL_CONSTANTS,
} from "~/constants/athleteConstants";
import { Dropdown, Radio } from "flowbite-react";

import { FormContext } from "~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout";
import {  useForm } from "react-hook-form";
import { api } from "~/utils/api";
import AddForm from "~/common/AddForm";
import type { FormValues } from "~/types/common";
import { Centers, Sports } from "@prisma/client";
import Card from "~/components/Card";
import Image from "next/image";
import Dummy from "../../../images/dummy.jpg";
import AddFile from "../../../images/add-file.svg";
import HumanFront from "../../../images/human-front.svg";
import HumanBack from "../../../images/human-back.svg";
import { Switch, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Textbox from "~/components/Textbox";

export default function AddGeneralDetails({ finalFormSubmissionHandler }: any) {
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const { data: centers } = api.center.getAllCenters.useQuery();
  const [centerId, setCenterId] = useState<number>();

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    ATHLETE_GENRAL_CONSTANTS
  );

  const [formConstantValues1, setFormConstantValues1] = useState<FormValues[]>(
    ATHLETE_CONTACT_CONSTANTS
  );

  useEffect(() => {
    if (centers?.length) {
      const updatedFormConstantValues: FormValues[] = formConstantValues?.map(
        (formConstant:FormValues) => {
          if (formConstant.id === "center") {
            return {
              ...formConstant,
              options: centers.map((center: { name: string; id: number }) => ({
                label: center.name,
                value: center.id.toString(),
              })),
            };
          } else {
            return formConstant;
          }
        }
      );
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, centers, centers?.length]);

  useEffect(() => {
    if (centerId && formConstantValues && formConstantValues.length>0) {
      const center = centers?.find((item) => item?.id == centerId);
      let updatedFormConstantValues: FormValues[]=formConstantValues;
      if (center?.CenterSports && center?.CenterSports?.length>0) {
        updatedFormConstantValues = formConstantValues?.map((formConstant:FormValues) => {
          if (formConstant.id === "sport" ) {
            return {
              ...formConstant,
              options: center.CenterSports.map((CenterSport) => ({
                label: CenterSport?.Sports?.name,
                value: CenterSport?.Sports?.id.toString(),
              })),
            };
          } else {
            return formConstant;
          }
        });
      }
      if (center?.CenterSports &&  center.CenterSports.length>0) {
        updatedFormConstantValues = updatedFormConstantValues?.map(
          (formConstant: FormValues) => {
            if (formConstant.id === "batch") {
              return {
                ...formConstant,
                options: center?.Batches?.map(
                  (batch: { name: string; id: number }) => ({
                    label: batch.name,
                    value: batch.id.toString(),
                  })
                ),
              };
            } else {
              return formConstant;
            }
          }
        );
      }
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [centers, centerId, formConstantValues]);


  return (
    <>
       <Card className="relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10">
            <div>
              <div className="grid grid-cols-12 gap-6">
                <div className="lg:col-span-6 col-span-12 order-2 lg:order-1">
                  <textarea
                    className="min-h-[117px] w-full resize-y rounded-lg border border-solid border-gray-300 px-5 py-2 text-lg focus:ring-0"
                    placeholder="Injury Description"
                  ></textarea>

                  <div className="hidden border border-solid border-gray-300 pl-5 pr-3 py-3 mt-3 rounded-lg lg:flex items-center justify-between">
                    <div className="text-[#5A5A5A] font-medium">Upload Image of Affected Part</div>
                    <label>
                      <input type="file" className="hidden" />
                      <div className="py-0.5 px-5 text-[#FF9678] border border-[#FF9678] rounded-md cursor-pointer">Add</div>
                    </label>
                  </div>
                  {/* mobile */}
                  <label className="col-span-2 mt-5 flex h-48 flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 bg-stone-100 text-center lg:hidden">
                    <div className="mb-3 flex items-center justify-center">
                      <input type="file" className="hidden" />
                      <Image
                        width={0}
                        height={0}
                        src={AddFile}
                        className="h-auto w-auto mr-2"
                        alt=""
                      />
                      <div className="text-base font-medium text-gray-500">
                        Attach Injury Image
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      The file size not more than 10 MB.
                    </div>
                    <div className="text-sm text-gray-300">JPEG, PNG, Video</div>
                  </label>
                  {/* mobile */}
                  <div className="mt-5 flex items-center">
                    <div className="mr-5">
                      <p className="text-xs mb-1">filename.jpg</p>
                      <Image width={70} height={70} src={Dummy} alt="" />
                      <button className="text-xs mt-1 text-[#B8BBC5]">Delete x</button>
                    </div>
                    <div className="mr-5">
                      <p className="text-xs mb-1">filename.jpg</p>
                      <Image width={70} height={70} src={Dummy} alt="" />
                      <button className="text-xs mt-1 text-[#B8BBC5]">Delete x</button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start">
                    <label className="text-[#5A5A5A] font-medium mt-3">First Aid Given</label>
                    <div className="switch mt-1 flex items-center">
                      <Switch color="green" defaultChecked />
                      <p className="ml-5 text-sm mt-3">Yes</p>
                    </div>
                  </div>


                </div>
                <div className="lg:col-span-6 col-span-12 lg:order-2 order-1">
                  <div className="border border-solid border-gray-300 pl-5 pr-3 py-3 rounded-lg injured-tabs">
                    <div className="text-lg text-[#5A5A5A] font-medium lg:text-left text-center lg:mt-3 mt-5">Body Part Injured</div>
                    <div className="mt-4 relative min-h-[500px]">
                      <Tabs value="1">
                        <div className="grid grid-cols-12">
                          <div className="lg:col-span-4 col-span-12">
                            <TabsHeader className="pricing-tabs lg:justify-start justify-center"
                              indicatorProps={{
                                className:
                                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                              }}>
                              <Tab key="1" value="1" activeClassName="active" className="bg-[#EAEAEA] lg:bg-transparent min-w-20 text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl lg:font-medium lg:uppercase">
                                Front
                              </Tab>
                              <Tab key="2" value="2" activeClassName="active" className="bg-[#EAEAEA] lg:bg-transparent min-w-20 text-nowrap lg:w-auto w-1/2 px-0 font-heading text-2xl ml-5 lg:font-medium lg:uppercase">
                                Back
                              </Tab>
                            </TabsHeader>
                          </div>
                          <div className="lg:col-span-8 col-span-12">
                            <TabsBody className="text-center lg:text-left">
                              <TabPanel key="1" value="1">
                                <div className="injured-body relative lg:-ml-5 lg:-mt-7">
                                  <Image width={0} height={0} src={HumanFront} alt="" className="w-auto h-auto" />
                                  <div className="border border-[#EAEAEA] rounded-lg px-4 py-3 injured-part absolute top-[90px] right-0 md:-right-[72px] lg:right-0 xl:-right[30px] 2xl:-right-[72px] bg-white drop-shadow-lg">
                                    <div className="flex items-center py-1">
                                      <Radio
                                        className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                      />
                                      <div className="ml-2 text-[#898989]">Severe</div>
                                    </div>
                                    <div className="flex items-center py-1">
                                      <Radio
                                        className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                      />
                                      <div className="ml-2 text-[#898989]">Moderate</div>
                                    </div>
                                    <div className="flex items-center py-1">
                                      <Radio
                                        className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                      />
                                      <div className="ml-2 text-[#898989]">Mild</div>
                                    </div>
                                  </div>
                                </div>
                              </TabPanel>
                              <TabPanel key="2" value="2">
                                <div className="injured-body relative lg:-ml-5 lg:-mt-7">
                                  <Image width={0} height={0} src={HumanBack} alt="" className="w-auto h-auto" />
                                  <div className="border border-[#EAEAEA] rounded-lg px-4 py-3 injured-part absolute top-[90px] right-0 md:-right-[72px] lg:right-0 xl:-right[30px] 2xl:-right-[72px] bg-white drop-shadow-lg">
                                    <div className="flex items-center py-1">
                                      <Radio
                                        className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                      />
                                      <div className="ml-2 text-[#898989]">Severe</div>
                                    </div>
                                    <div className="flex items-center py-1">
                                      <Radio
                                        className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                      />
                                      <div className="ml-2 text-[#898989]">Moderate</div>
                                    </div>
                                    <div className="flex items-center py-1">
                                      <Radio
                                        className="radio-btn mt-0.5 h-5 w-5 border-[#FF9678] text-[#FF9678] focus:ring-0"
                                      />
                                      <div className="ml-2 text-[#898989]">Mild</div>
                                    </div>
                                  </div>
                                </div>
                              </TabPanel>
                            </TabsBody>
                          </div>
                        </div>
                        <div className="lg:absolute bottom-4 left-2 flex flex-row lg:flex-col justify-center">
                          <div className="flex items-center py-1 mx-2 lg:mx-0">
                            <div
                              className=" mt-0.5 h-4 w-4 bg-[#E92012] rounded-full"></div>
                            <div className="ml-2 text-[#898989]">Severe</div>
                          </div>
                          <div className="flex items-center py-1 mx-2 lg:mx-0">
                            <div
                              className=" mt-0.5 h-4 w-4 bg-[#FF9678] rounded-full"></div>
                            <div className="ml-2 text-[#898989]">Moderate</div>
                          </div>
                          <div className="flex items-center py-1 mx-2 lg:mx-0">
                            <div
                              className=" mt-0.5 h-4 w-4 bg-[#FFA500] rounded-full"></div>
                            <div className="ml-2 text-[#898989]">Mild</div>
                          </div>

                        </div>
                      </Tabs>
                    </div>

                  </div>
                </div>
              </div>
              <div className=" mb-10 mt-5 flex justify-end lg:mb-0">
                <button
                  className="w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5"
                  type="button"

                >
                  Finish
                </button>
              </div>
            </div>
          </Card>
    </>
  );
}
