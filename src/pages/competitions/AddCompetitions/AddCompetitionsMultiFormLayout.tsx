import React, {useState, useContext} from 'react'
import Card from '~/components/Card'
// import ImageWithFallback from '~/components/ImageWithFallback'
import {useForm} from 'react-hook-form'
// import { type MULTI_FORM_TYPES } from "~/types/coach";
// import FileUpload from '~/components/FileUpload'
import AddPaymentDetails from '~/components/AddCompetition/AddPaymentDetails'
// import AddStaff from '~/components/AddStaff/AddStaff'
import {useRouter} from 'next/router'
import {api} from '~/utils/api'
import {ToastContext} from '~/contexts/Contexts'
import {useSession} from 'next-auth/react'
import type {GENDER_VALUES} from '~/types/coach'
import AddCompetition from '~/components/AddCompetition/AddCompetition'

const multiFormData = {
  name: '',
  designation: '',
  contactNumber: '',
  email: '',
  dateOfBirth: '',
  gender: '',
  payroll: '',
  center: '',
  isEditMode: false,
}

const defaultValues = {
  stepData: {
    currentStep: 1,
  },
  multiFormData: {
    formData: multiFormData,
  },
}
export interface FormContextTypes {
  stepData: {
    currentStep: number
    setCurrentStep?: React.Dispatch<React.SetStateAction<number>>
  }
  multiFormData: {
    formData?: any
    // setFormData?: React.Dispatch<React.SetStateAction<{}>>;
    setFormData?: any
  }
}
export const FormContext = React.createContext<FormContextTypes>(defaultValues)

export default function AddCompetitionMultiFormLayout() {
  const methods = useForm()
  const router = useRouter()
  // const id = Number(router?.query?.id)
  const {data: sessionData} = useSession()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState(defaultValues.multiFormData.formData)

  // const [staffId, setStaffId] = useState<number>()

  const {setOpenToast} = useContext(ToastContext)

  const formProviderData = {
    ...methods,
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  }

  // create staff api method
  const {mutate: createMutate} = api.staff.createStaff.useMutation({
    onSuccess: (response) => {
      setOpenToast(true)
      // setStaffId(response?.id)
      return response?.id
    },
  })

  // const {mutate: createMutateStaffTimings} = api.staffTimings.createStaffTiming.useMutation({
  //   onSuccess: (response) => {
  //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  //     void router.push(`/staff/${staffId}`)
  //     return response
  //   },
  // })
  const {mutate: editMutate} = api.staff.editStaff.useMutation({
    onSuccess: (response) => {
      setOpenToast(true)
      void router.push(`/staffs/${response?.id ?? ''}`)
    },
  })

  // useEffect(() => {
  //   if (
  //     formData &&
  //     Object.keys(formData)?.length > 0 &&
  //     formData?.staffShiftDetails &&
  //     staffId
  //   ) {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     const finalStaffTimings = formData?.staffShiftDetails?.map((v: unknown) => ({
  //       ...v,
  //       staffId: staffId,
  //     }));

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     createMutateStaffTimings(finalStaffTimings);
  //   }
  // }, [staffId, formData, createMutateStaffTimings]);

  //final Form

  //Todo APIs
  const finalFormSubmissionHandler = (
    // finalForm: Required<MULTI_FORM_TYPES>
    finalForm: any
  ) => {
    if (formData.isEditMode) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      editMutate({
        ...finalForm,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        designationId: parseInt(finalForm?.designation?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        centerId: parseInt(finalForm?.center?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        payrollId: parseInt(finalForm?.payroll?.value),
        image: '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        dateOfBirth: new Date(finalForm.dateOfBirth),
      })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setFormData(finalForm)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      createMutate({
        ...finalForm,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        designationId: parseInt(finalForm?.designation?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        centerId: parseInt(finalForm?.center?.value),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        payrollId: parseInt(finalForm?.payroll?.value),
        image: '',
        createdBy: sessionData?.token?.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        dateOfBirth: new Date(finalForm.dateOfBirth),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  return (
    <FormContext.Provider value={formProviderData}>
      <div className='grid grid-cols-6 grid-rows-1'>
        <Card className='col-span-4 ml-10 h-full p-0 pl-10 pt-10'>
          {currentStep === 1 && <AddCompetition />}
          {currentStep === 2 && (
            <AddPaymentDetails finalFormSubmission={finalFormSubmissionHandler} />
          )}
        </Card>
      </div>
    </FormContext.Provider>
  )
}
