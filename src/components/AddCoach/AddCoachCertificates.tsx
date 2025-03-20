/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from "react";
// import { COACH_CERTIFICATES_CONSTANTS } from "~/constants/coachConstants";
// import { useForm } from "react-hook-form";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";
import type { CoachQualifications } from "@prisma/client";
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

  // const qualificationOptions = Object.keys(
  //   CoachQualifications_certificateType
  // ).map((key) => ({
  //   label: key,
  //   value:
  //     CoachQualifications_certificateType[
  //       key as keyof typeof CoachQualifications_certificateType
  //     ],
  // }));

  type CoachQualificationsUpdated = Pick<
    CoachQualifications,
    "id" | "instituteName" | "startDate" | "endDate"
  > & {
    certificateTypeLabel: string;
  };

  const [certificates, setCertificates] = useState<
    CoachQualificationsUpdated[]
  >([]);

  const onAddHandler = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setCertificates(arr);
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
