import React, { useEffect, useContext, useState, useRef } from "react";
import type {
  CENTER_TYPES} from "~/types/coach";

import { FormContext } from "~/pages/staffPayroll/AddPayroll/AddPayrollForm";
import {  useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { STAFF_DETAILS_CONSTANT } from "~/constants/staffPayrollConstants";
import { useRouter } from "next/router";
import AddDesignationModal from "./AddDesignationModal";
import { useSession } from "next-auth/react";
import AddForm from "~/common/AddForm";
import type { StaffDesignation, TaxSlabs } from "@prisma/client";

export default function AddPayroll(props: any) {
  const {
    stepData: { currentStep, setCurrentStep },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);
  const router = useRouter();

  const {
    control,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CENTER_TYPES>({ mode: "onSubmit" });
  const currentFormValues = getValues();
  const hasExecuted = useRef(true);
  const [showDesignationModal, setShowDesignationModal] = useState(false);
  const [designation, setDesignation] = useState<string>('');
  const { data: sessionData, status } = useSession();
  const { data: staffDesignation } =
    api.staffDesignation.getAllDesignation.useQuery();
  const [designations, setDesignations] = useState<StaffDesignation[]>([]);

  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_DETAILS_CONSTANT
  );

  const  createdBy= sessionData?.token?.id
  const  academyId= sessionData?.token?.academyId



  const { mutate: createMutate } =
    api.staffDesignation.createStaffDesignation.useMutation({
      onSuccess: (response) => {
        setShowDesignationModal(!showDesignationModal);
      },
    });

  useEffect(() => {
    if (staffDesignation && staffDesignation.length > 0) {
      setDesignations(staffDesignation);
    }
  }, [staffDesignation]);

  useEffect(() => {
    if (designations?.length && hasExecuted.current) {
      const updatedFormConstantValues = formConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "designationId") {
            return {
              ...formConstant,
              options: designations.map(
                (designation: { designation: string; id: number }) => ({
                  label: designation.designation,
                  value: designation.id.toString(),
                })
              ),
            };
          } else {
            return formConstant;
          }
        }
      );
      hasExecuted.current = false;
      setFormConstantValues(updatedFormConstantValues);
    }
  }, [formConstantValues, designations, designations?.length]);

  const onSubmit = (data: {[key:string]:any}) => {
    const obj:{[key:string]:any} = { ...data, taxable: formData?.taxable };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    obj.grossSalary = parseInt(data.grossSalary);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    obj.designationId = parseInt(data?.designationId?.value);
    if (obj && obj?.taxable) {
      if (obj?.taxable && obj.grossSalary) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const tax = props?.taxslabs?.find(
          (item: TaxSlabs) =>
            obj.grossSalary >= item?.fromAmount &&
            obj.grossSalary <= item?.toAmount
        );
        if (tax) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          obj.tax_percent = tax.percentage;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          obj.tax = (tax.percentage * obj.grossSalary) / 100;
          obj.netSalary = obj.grossSalary - obj.tax;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          obj.slabId = tax.id;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setFormData(obj);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    props?.finalFormSubmissionHandler(obj);
  };

  const submitDesignation = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();
    if(createdBy){
      createMutate({
        designation: designation,
        createdBy
      });
    }
   
  };

  return (
    <>
      {showDesignationModal && (
        <AddDesignationModal
          show={showDesignationModal}
          setShow={setShowDesignationModal}
          setDesignation={setDesignation}
          submitDesignation={submitDesignation}
          designation={designation}
        />
      )}
      <AddForm
        cardTitle="ADD PAYROLL"
        cardSubTitle="PAYROLL DETAILS"
        formConstantValues={formConstantValues}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setFormData={setFormData}
        formData={formData}
        buttonItems={{ prevFinish: true }}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        prevButtonText={"Add New Designation"}
        finishButtonText={"Add Payroll"}
        prevButtonClick={() => setShowDesignationModal(!showDesignationModal)}
        finalFormSubmissionHandler={(data: {[key:string]:any}) => onSubmit(data)}
      />
    </>
  );
}
