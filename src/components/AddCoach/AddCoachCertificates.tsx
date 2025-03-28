/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
// import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
// import { useForm } from "react-hook-form";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";
import { type CoachQualifications } from "@prisma/client";
// import { CoachQualifications_certificateType } from "@prisma/client";

import {
  FormContext,
  type FormContextTypes,
} from "~/pages/coach/AddCoach/AddCoachMultiFormLayout";
import { dateFormat } from "~/helpers/date";
import AddForm from "~/common/AddForm";
import {
  COACH_CERTIFICATES_CONSTANTS,
  COACH_QUALIFICATION_CERTIFICATE_TYPE,
} from "~/constants/coachConstants";

export default function AddCoachCertificates({}) {
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext<FormContextTypes>(FormContext);

  // type CoachQualificationsUpdated = Pick<
  //   CoachQualifications,
  //   "id" | "instituteName" | "startDate" | "endDate"
  // > & {
  //   certificateTypeLabel: string;
  // };

  const [certificates, setCertificates] = useState<
    COACH_CERTIFICATE_TABLE_TYPES[]
  >([]);

  const onAddHandler = (data: any) => {
    const arr: COACH_CERTIFICATE_TABLE_TYPES[] = [...certificates];
    const obj: COACH_CERTIFICATE_TABLE_TYPES = {
      // eslint-disable-next-line
      startDate: dateFormat(new Date(data.startDate)),
      // eslint-disable-next-line
      endDate: dateFormat(new Date(data.endDate)),
      // eslint-disable-next-line
      certificateType: data.certificates,
      // eslint-disable-next-line
      certificateTypeLabel:
        // @ts-expect-error must fix this error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        COACH_QUALIFICATION_CERTIFICATE_TYPE[data?.certificates],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      instituteName: data?.instituteName,
    };
    arr.push(obj);
    setCertificates(arr);
    // @ts-expect-error // TODO: FIX THIS TS ERROR
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setFormData?.((prevFormData) => ({
      ...prevFormData,
      instituteName: "",
      CoachQualifications: arr,
    }));
  };

  const removeCertificate = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const arr = [...certificates];
    arr.splice(index, 1);
    setCertificates(arr);
  };

  useEffect(() => {
    if (formData?.CoachQualifications) {
      setCertificates(
        // @ts-expect-error TODO: fix this error
        formData?.CoachQualifications.map(
          (qualification: CoachQualifications) => ({
            ...qualification,
            certificateTypeLabel:
              COACH_QUALIFICATION_CERTIFICATE_TYPE[
                qualification.certificateType
              ],
          })
        )
      );
    }
  }, [formData?.certificates, formData?.CoachQualifications]);

  return (
    <>
      <AddForm
        cardTitle="ADD COACH"
        cardSubTitle="ADD CERTIFICATES"
        formConstantValues={COACH_CERTIFICATES_CONSTANTS}
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
