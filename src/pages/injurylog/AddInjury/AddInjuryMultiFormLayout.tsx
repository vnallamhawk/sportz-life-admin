/* eslint-disable */
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Card from "~/components/Card";
import { useForm } from "react-hook-form";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { ToastContext } from "~/contexts/Contexts";
import AddGeneralDetails from "~/components/AddAthlete/AddGeneralDetails";
import AddInjury from "~/components/AddInjury/AddInjury";
import { useSearchParams } from "next/navigation";

// const multiFormData: MULTI_FORM_TYPES = {
const multiFormData = {
  phone: "",
  name: "",
  bloodGroup: "",
  email: "",
  about: "",
  dob: undefined,
  payroll: "",
  coachingSports: [],
  certificates: [],
  batchIds: [],
  centerId: undefined,
  isEditMode: false,
  coachId: undefined,
};

const defaultValues = {
  stepData: {
    currentStep: 1,
  },
  multiFormData: {
    formData: multiFormData,
  },
};
export interface FormContextTypes {
  stepData: {
    currentStep: number;
    setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  };
  multiFormData: {
    formData: any;
    setFormData?: React.Dispatch<React.SetStateAction<any>>;
  };
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues);

export default function AddInjuryMultiFormLayout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search :string | null=searchParams.get('search')
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>(
    defaultValues.multiFormData.formData
  );
  const { setOpenToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<(File & { preview: string })[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const uploadImage = api.upload.uploadImage.useMutation();
  const formProviderData = {
    ...methods,
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  };
  const { mutate: createMutate } = api.injuryLog.createInjuryLog.useMutation({
    onSuccess: (response) => {
      setOpenToast(true);
      void router.push(`/injuryLog/${response?.id ?? ""}`);
    },
  });



  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setPreview(
        acceptedFiles.map((upFile: File) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
      const uploadedFile: File | null = acceptedFiles[0]
        ? acceptedFiles[0]
        : null;
      setFile(uploadedFile);
      if (!uploadedFile) {
        alert('Please select a valid file');
        return;
      }else  {
        const fileReader = new FileReader();
        fileReader.onloadend = async () => {
          const base64String = fileReader.result as string;
    

          try {
            const response  = await uploadImage.mutateAsync({
              file: base64String,
              filename: uploadedFile.name,
              mimetype: uploadedFile.type,
            });
            setUploadUrl(response.url);
          } catch (err) {
            console.error("Upload failed:", err);
          }
        };
        fileReader.readAsDataURL(uploadedFile)      
      }
    }
  }, []);

  const finalFormSubmissionHandler = (
    finalForm: any
  ) => {
    if (formData.isEditMode) {
      // editMutate({
      //   name: finalForm.name,
      //   about: finalForm.about,
      //   contactNumber: finalForm.contactNumber,
      //   email: finalForm.email,
      //   designation: finalForm.designation,
      //   gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
      //   certificates: finalForm.certificates.map((certificate) => ({
      //     ...certificate,
      //     startDate: new Date(certificate.startDate),
      //     endDate: new Date(certificate.endDate),
      //   })),
      //   dateOfBirth: new Date(finalForm.dateOfBirth),
      //   sports: finalForm.coachingSports,
      //   trainingLevel: finalForm.trainingLevel
      //     .value as (typeof TRAINING_LEVEL)[number],
      //   experienceLevel: finalForm.experienceLevel
      //     .value as (typeof EXPERIENCE_LEVEL)[number],
      //   batchIds: finalForm.batchIds,
      //   centerIds: finalForm.centerIds,
      //   coachId: finalForm.coachId,
      // });
    } else {
      // eslint-disable-next-line no-console
      // createMutate({
      //   name: finalForm.name,
      //   phone: finalForm.phone,
      //   email: finalForm.email,
      //   bloodGroup: finalForm.bloodGroup,
      //   dob: new Date(finalForm.dob),
      //   height:finalForm.height,
      //   weight:finalForm.weight,
      //   address:finalForm.address,
      //   medicalHistory:finalForm.medicalHistory,
      //   centerId: finalForm.centerId,
      //   fatherName:finalForm.fatherName
      // });
    }
  };

  return (
    <div className="bg-s-gray px-6 pb-7">
      <FormContext.Provider value={formProviderData}>
        <div className="relative grid grid-cols-6 grid-rows-1">
          <Card className="relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10">
            {currentStep === 1 && <AddInjury search={search?search:""}/>}
            {currentStep === 2 && (
              <AddGeneralDetails
                finalFormSubmissionHandler={finalFormSubmissionHandler}
              />
            )}
          </Card>
       



          {/* Injured details-------------------------------------------------------------------------------------- */}
          {/* <Card className="relative col-span-12 h-full !rounded-r-none rounded-l-xl md:bg-white bg-[#FFE5DE] p-0 pt-10">
            <div>
              <div className="text-2xl mb-7 font-medium font-heading uppercase">Injury Details</div>
              <div className="grid grid-cols-12 gap-6">
                <div className="lg:col-span-6 col-span-12">
                  <div className="flex flex-col items-center lg:flex-row ">
                    <div>
                      <Image
                        className="h-[73px] w-[73px] rounded-full object-cover"
                        src={"/images/rugby.jpg"}
                        alt=""
                        width="200"
                        height="150"
                      />
                    </div>

                    <div className="mt-3 w-full lg:mt-0 lg:w-10/12 lg:pl-10">
                      <div className="text-center font-heading text-3xl font-medium uppercase text-black lg:text-start">
                        David Duos
                      </div>
                      <div className="text-center text-base text-black md:text-blush-dark lg:text-start">
                        Rugby
                      </div>
                    </div>
                  </div>
                
                  <div className="mt-5 grid grid-cols-12 md:gap-4">
                    <div className="col-span-12 md:col-span-6">
                      <div className="contact mt-4">
                        <div className="line block bg-[#974062] md:hidden "></div>
                        <div>
                          <div className="mb-1 text-sm text-gray-400">
                            Injury Occurred During
                          </div>
                          <div className="font-bold text-gray-600">
                            Training
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <div className="contact mt-4">
                        <div className="line block bg-[#F3476D] md:hidden "></div>
                        <div>
                          <div className="mb-1 text-sm text-gray-400">
                            Injury Name
                          </div>
                          <div className="font-bold text-gray-600">
                            ACL Tear
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <div className="contact mt-4">
                        <div className="line block bg-[#FF9678] md:hidden "></div>
                        <div>
                          <div className="mb-1 text-sm text-gray-400">
                            Injury Type
                          </div>
                          <div className="font-bold text-gray-600">
                            Ligament Tear
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <div className="contact mt-4">
                        <div className="line block bg-[#FFA500] md:hidden "></div>
                        <div>
                          <div className="mb-1 text-sm text-gray-400">
                            First Aid Given
                          </div>
                          <div className="font-bold text-gray-600">
                            Yes
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="contact mt-4">
                        <div className="line block bg-[#00B65A] md:hidden "></div>
                        <div>
                          <div className="mb-1 text-sm text-gray-400">
                            Injury Description
                          </div>
                          <div className="font-bold text-gray-600">
                            Injury description content goes here lorem ipsum dolor sit, sed do eiummod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="contact mt-4">
                        <div className="line block bg-[#974062] md:hidden "></div>
                        <div>
                          <div className="mb-1 text-sm text-gray-400">
                            Injury Images
                          </div>
                          <div className="font-bold text-gray-600 flex mt-3">
                            <Image width={200} height={200} src={Dummy} alt="" className="mr-6" />
                            <Image width={200} height={200} src={Dummy} alt="" className="mr-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <div className="border border-solid border-gray-300 pl-5 pr-3 py-3 rounded-lg injured-tabs injured-details">
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
          </Card> */}
        </div>
      </FormContext.Provider>
    </div>
  );
}
