import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AddForm from "~/common/AddForm";
import { INJURY_DETAILS_CONSTANTS } from "~/constants/injuryLog";
import { FormContext } from "~/pages/injurylog/AddInjury/AddInjuryMultiFormLayout";
import type { FormValues } from "~/types/common";
import { api } from "~/utils/api";
import Image from "next/image";
import Dummy from "../../images/dummy.jpg";
import HumanFront from "../../images/human-front.svg";
import HumanBack from "../../images/human-back.svg";
import { Switch, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { Dropdown, Radio } from "flowbite-react";

export default function AddInjury() {
  let inputElement;
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  const [medicalHistoryData, setMedicalHistoryData] = useState([]);

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const { data: athletes } = api.athlete.getAllAthletes.useQuery();

  const [formConstantValues, setFormConstantValues] = useState<FormValues[]>(
    INJURY_DETAILS_CONSTANTS
  );
  const customTheme = {
    inlineWrapper:
      "text-gray-500 font-medium text-lg bg-white rounded-r-md border-gray-200 border-l w-full  focus:outline-none  font-medium px-5 py-2 justify-between inline-flex items-center ",
  };

  useEffect(() => {
    if (athletes?.length && hasExecuted.current) {
      const updatedFormConstantValues: FormValues[] = formConstantValues.map(
        (formConstant: FormValues) => {
          if (formConstant.id === "selectedId") {
            return {
              ...formConstant,
              options: athletes.map((sport: { name: string; id: number }) => ({
                label: sport.name,
                value: sport.id.toString(),
              })),
            };
          } else {
            return formConstant;
          }
        }
      );
      hasExecuted.current = false;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, athletes, athletes?.length]);

  useEffect(() => {
    // if (!isEditMode) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    reset({
      ...currentFormValues,
      ...formData,
    });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  //test commit


  return (
    <>
      <AddForm
        cardTitle="ADD INJURY LOG"
        cardSubTitle="Injured Information"
        formConstantValues={formConstantValues}
        tableData={medicalHistoryData}
        buttonItems={{ next: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="mt-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <textarea
              className="min-h-[117px] w-full resize-y rounded-lg border border-solid border-gray-300 px-5 py-2 text-lg focus:ring-0"
              placeholder="Injury Description"
            ></textarea>
            
            <div className="border border-solid border-gray-300 pl-5 pr-3 py-3 mt-3 rounded-lg flex items-center justify-between">
              <div className="text-[#5A5A5A] font-medium">Upload Image of Affected Part</div>
              <label>
                <input type="file" className="hidden" />
                <div className="py-0.5 px-5 text-[#FF9678] border border-[#FF9678] rounded-md cursor-pointer">Add</div>
              </label>
            </div>
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
            <div className="mt-7">
              <label className="text-[#5A5A5A] font-medium">First Aid Given</label>
              <div className="switch mt-1 flex items-center">
                <Switch color="green" defaultChecked />
                <p className="ml-5 text-sm mt-3">Yes</p>
              </div>
            </div>


          </div>
          <div className="col-span-6">
            <div className="border border-solid border-gray-300 pl-5 pr-3 py-3 rounded-lg">
              <div className="text-lg text-[#5A5A5A] font-medium">Body Part Injured</div>
              <div className="mt-4 relative min-h-[500px]">
                <Tabs value="1">
                  <div className="grid grid-cols-12">
                    <div className="col-span-4">
                      <TabsHeader className="pricing-tabs"
                        indicatorProps={{
                          className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}>
                        <Tab key="1" value="1" activeClassName="active" className="min-w-20 text-nowrap w-auto px-0 font-heading text-2xl font-medium uppercase">
                          Front
                        </Tab>
                        <Tab key="2" value="2" activeClassName="active" className="min-w-20 text-nowrap w-auto px-0 font-heading text-2xl ml-5 font-medium uppercase">
                          Back
                        </Tab>
                      </TabsHeader>
                    </div>
                    <div className="col-span-8">
                      <TabsBody>
                        <TabPanel key="1" value="1">
                          <div className="injured-body relative -ml-5 -mt-7">
                            <Image width={0} height={0} src={HumanFront} alt="" className="w-auto h-auto" />
                            <div className="border border-[#EAEAEA] rounded-lg px-4 py-3 injured-part absolute top-[90px] -right-[72px] bg-white drop-shadow-lg">
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
                          <div className="injured-body relative -ml-5 -mt-7">
                            <Image width={0} height={0} src={HumanBack} alt="" className="w-auto h-auto" />
                            <div className="border border-[#EAEAEA] rounded-lg px-4 py-3 injured-part absolute top-[90px] -right-[72px] bg-white drop-shadow-lg">
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
                  <div className="absolute bottom-4 left-2">
                    <div className="flex items-center py-1">
                      <div
                        className=" mt-0.5 h-4 w-4 bg-[#E92012] rounded-full"></div>
                      <div className="ml-2 text-[#898989]">Severe</div>
                    </div>
                    <div className="flex items-center py-1">
                      <div
                        className=" mt-0.5 h-4 w-4 bg-[#FF9678] rounded-full"></div>
                      <div className="ml-2 text-[#898989]">Moderate</div>
                    </div>
                    <div className="flex items-center py-1">
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
      </div>
    </>
  );
}
