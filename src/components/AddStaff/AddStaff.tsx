import React, { useContext, useEffect, useRef, useState } from "react";
import { STAFF_DETAILS_CONSTANTS } from "~/constants/staffConstants";
import type { STAFF_TYPES } from "~/types/staff";
import { useForm } from "react-hook-form";
import { FormContext } from "~/pages/staff/AddStaff/AddStaffMultiFormLayout";
import { api } from "~/utils/api";

import AddForm from "~/common/AddForm";

const AddStaff = () => {
  const {
    stepData: { currentStep, setCurrentStep },
    multiFormData: { formData, setFormData },
  } = useContext(FormContext);

  const {
    getValues,

  } = useForm<STAFF_TYPES>({ mode: "onSubmit" });

  const { data: payroll } = api.staffPayroll.getAllPayroll.useQuery();
  const { data: designation } =
    api.staffDesignation.getAllDesignation.useQuery();
  const { data: centers } = api.center.getAllCenters.useQuery();

  const [formConstantValues, setFormConstantValues] = useState(
    STAFF_DETAILS_CONSTANTS
  );
  useEffect(() => {
    let updatedFormConstantValues=formConstantValues
    if (payroll?.length>0) {
       updatedFormConstantValues = formConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "payroll") {
            // console.log("payroll", payroll);
            return {
              ...formConstant,
              options: payroll.map(
                (payroll, index) => ({
                  label: payroll?.StaffDesignation?.designation,
                  value: payroll.id.toString(),
                })
              ),
            };
          } else {
            return formConstant;
          }
        }
      );
    }
    if (designation?.length>0) {
       updatedFormConstantValues = updatedFormConstantValues.map(
        (formConstant) => {
          if (formConstant.id === "designation") {
            return {
              ...formConstant,
              options: designation.map(
                (desig: { designation: string; id: number }) => ({
                  label: desig.designation,
                  value: desig.id.toString(),
                })
              ),
            };
          } else {
            return formConstant;
          }
        }
      );
    }
       if (centers?.length>0) {
           updatedFormConstantValues = updatedFormConstantValues.map(
            (formConstant) => {
                // Todo staff center
              if (formConstant.id === "center") {
                return {
                  ...formConstant,
                  options: centers?.map(
                    (center: { name: string; id: number }) => ({
                      label: center.name,
                      value: center.id.toString(),
                    })
                  ),
                };
              }
              else {
                return formConstant;
              }
            }
          );
        }
    setFormConstantValues(updatedFormConstantValues);

  }, [centers, designation, formConstantValues, payroll]);


  // useEffect(() => {
  //   // if (!isEditMode) {
  //   // eslint-disable-next-line no-console
  //   reset({
  //     ...currentFormValues,
  //     ...formData,
  //   });
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formData]);
  
  return (
    <>
    <AddForm
        cardTitle="ADD STAFFS"
        cardSubTitle="STAFF DETAILS"
        formConstantValues={formConstantValues}
        imageTitle="Staff Image"
        buttonItems={{ next: true }}
        setFormData={setFormData}
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    
    </>
  );
};

export default AddStaff;
