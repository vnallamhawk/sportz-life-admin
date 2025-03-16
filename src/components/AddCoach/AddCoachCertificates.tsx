/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
// import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
// import { useForm } from "react-hook-form";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";

import {
  FormContext,
  type FormContextTypes,
} from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { dateFormat } from "~/helpers/date";
import AddForm from "~/common/AddForm";

export default function AddCoachCertificates({}) {
  // const {
  //   control,
  //   reset,
  //   trigger,
  //   formState: { errors },
  //   getValues,
  // } = useForm({
  //   defaultValues: {
  //     name: "",
  //     instituteName: "",
  //     startDate: "",
  //     endDate: "",
  //   },
  // });

  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext<FormContextTypes>(FormContext);

  const [certificates, setCertificates] = useState<
    COACH_CERTIFICATE_TABLE_TYPES[]
  >([]);
  // const [formConstantValues, setFormConstantValues] = useState(
  //   COACH_CERTIFICATES_CONSTANTS
  // );

  const onAddHandler = (data: any) => {
    const arr: COACH_CERTIFICATE_TABLE_TYPES[] = [...certificates];

    // eslint-disable-next-line
    const obj: COACH_CERTIFICATE_TABLE_TYPES = {
      ...data,
      // eslint-disable-next-line
      startDate: dateFormat(new Date(data.startDate)),
      // eslint-disable-next-line
      endDate: dateFormat(new Date(data.endDate)),
      // eslint-disable-next-line
      certificateType: data?.certificates?.value,
      // eslint-disable-next-line
      certificateTypeLabel: data?.certificates?.label,
    };
    arr.push(obj);
    setCertificates(arr);
  };

  const removeCertificate = (index: number) => {
    const arr = [...certificates];
    arr.splice(index, 1);
    setCertificates(arr);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (formData?.certificates) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setCertificates(formData.certificates);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  }, [formData?.certificates]);

  return (
    <>
      <AddForm
        cardTitle="ADD COACH"
        cardSubTitle="ADD CERTIFICATES"
        // formConstantValues={formConstantValues}
        buttonItems={{ prevNext: true }}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tableTitle="Certificates"
        mobileAddButtonText="Add another certificate"
        TableHeadings={[
          { label: "Certificate", id: "certificateTypeLabel" },
          { label: "Institute", id: "instituteName" },
          { label: "Action", id: "action" },
        ]}
        isFormTable={true}
        // tableFields={formConstantValues}
        tablekey="certificates"
        tableData={certificates}
        addTableData={onAddHandler}
        onRemoveTableButton={removeCertificate}
      />
    </>
  );
}
