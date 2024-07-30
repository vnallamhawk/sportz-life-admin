/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
import { useForm } from "react-hook-form";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";

import {
  FormContext,
  type FormContextTypes,
} from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { dateFormat } from "~/helpers/date";
import AddForm from "~/common/AddForm";

export default function AddCoachCertificates({}) {
  const {
    control,
    reset,
    trigger,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      instituteName: "",
      startDate: "",
      endDate: "",
    },
  });

  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext<FormContextTypes>(FormContext);

  const [certificates, setCertificates] = useState<
    COACH_CERTIFICATE_TABLE_TYPES[]
  >([]);
  const [formConstantValues, setFormConstantValues] = useState(
    COACH_CERTIFICATES_CONSTANTS
  );

  const onAddHandler = (data: any) => {
    const arr:COACH_CERTIFICATE_TABLE_TYPES[]  = [...certificates];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj: COACH_CERTIFICATE_TABLE_TYPES = {
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      startDate: dateFormat(new Date(data.startDate)),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      endDate: dateFormat(new Date(data.endDate)),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      certificateType: data?.certificates?.value,
    };
    arr.push(obj);

    setCertificates(arr);
  };

  useEffect(() => {
    if (formData?.certificates) {
      setCertificates(formData.certificates);
    }
  }, [formData?.certificates]);

  return (
    <>
      <AddForm
        cardTitle="ADD COACH"
        cardSubTitle="ADD CERTIFICATES"
        formConstantValues={formConstantValues}
        buttonItems={{ prevNext: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        tableTitle="Certificates"
        mobileAddButtonText="Add another certificate"
        TableHeadings={[
          { label: "Certificate", id: "certificateType" },
          { label: "Institute", id: "instituteName" },
          { label: "Action", id: "action" },
        ]}
        isFormTable={true}
        // tableFields={formConstantValues}
        tablekey="certificates"
        tableData={certificates}
        addTableData={onAddHandler}
      />
    </>
  );
}
