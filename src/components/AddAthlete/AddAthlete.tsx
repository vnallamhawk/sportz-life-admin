import {useContext, useEffect, useRef, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import AddForm from '~/common/AddForm/AddForm'
import {ATHLETE_DETAILS_CONSTANTS} from '~/constants/athleteConstants'
import {FormContext} from '~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout'
import type {ATHLETE_TYPES} from '~/types/athlete'
import type {FormValues} from '~/types/common'
import {api} from '~/utils/api'

export default function AddAthlete() {
  const {
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)
  const [medicalHistoryData, setMedicalHistoryData] = useState([])

  const {
    control,
    formState: {errors},
    register,
    getValues,
    setValue,
  } = useFormContext()

  const currentFormValues = getValues()
  const hasExecuted = useRef(true)
  const {data: sports} = api.sports.getAllSports.useQuery()

  const [formConstantValues, setFormConstantValues] =
    useState<FormValues[]>(ATHLETE_DETAILS_CONSTANTS)

  useEffect(() => {
    if (sports?.length && hasExecuted.current) {
      const updatedFormConstantValues: FormValues[] = formConstantValues.map(
        (formConstant: FormValues) => {
          if (formConstant.id === 'coachingSports') {
            return {
              ...formConstant,
              options: sports.map((sport: {name: string; id: number}) => ({
                label: sport.name,
                value: sport.id.toString(),
              })),
            }
          } else {
            return formConstant
          }
        }
      )
      hasExecuted.current = false
      setFormConstantValues(updatedFormConstantValues)
    }
  }, [formConstantValues, sports, sports?.length])

  useEffect(() => {
    if (formData.isEditMode) {
      const {name, dob, gender, height, weight, bloodGroup} = formData

      if (name) setValue('name', name)
      if (dob) setValue('dob', new Date(dob))
      if (gender)
        setValue('gender', {value: gender, label: gender.charAt(0).toUpperCase() + gender.slice(1)})
      if (height) setValue('height', height.toString())
      if (weight) setValue('weight', weight.toString())
      if (bloodGroup) setValue('bloodGroup', {value: bloodGroup, label: bloodGroup})
    }
  }, [formData, setValue])

  const addTableData = (currentData: any) => {
    const arr: any = [...medicalHistoryData]
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access
    const obj = {...currentData, ['No.']: arr.length + 1}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    arr.push(obj)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setMedicalHistoryData(arr)
  }

  const handleNext = () => {
    if (setCurrentStep) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className='px-10'>
      <div className='mb-8 text-center font-heading text-3xl font-medium uppercase lg:text-left'>
        {formData.isEditMode ? 'EDIT ATHLETE' : 'ADD ATHLETE'}
      </div>

      <div className='mb-6 text-xl font-medium'>ATHLETE PERSONAL DETAILS</div>

      <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>Athlete Name</label>
          <input
            {...register('name', {required: 'Athlete name is required'})}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
            placeholder='Athlete Name'
          />
          {errors.name && (
            <p className='mt-1 text-xs text-red-500'>{errors.name.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>Date of Birth</label>
          <input
            type='date'
            {...register('dob', {required: 'Date of birth is required'})}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
          />
          {errors.dob && (
            <p className='mt-1 text-xs text-red-500'>{errors.dob.message?.toString()}</p>
          )}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>Gender</label>
          <select
            {...register('gender', {required: 'Gender is required'})}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
          >
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          {errors.gender && (
            <p className='mt-1 text-xs text-red-500'>{errors.gender.message?.toString()}</p>
          )}
        </div>

        <div className='flex gap-2'>
          <div className='flex-grow'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Height</label>
            <input
              type='number'
              {...register('height', {required: 'Height is required'})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              placeholder='Height'
            />
            {errors.height && (
              <p className='mt-1 text-xs text-red-500'>{errors.height.message?.toString()}</p>
            )}
          </div>
          <div className='w-24'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>&nbsp;</label>
            <select
              {...register('heightUnit')}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              defaultValue='cm'
            >
              <option value='cm'>CM</option>
              <option value='feet'>FEET</option>
            </select>
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='flex-grow'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Weight</label>
            <input
              type='number'
              {...register('weight', {required: 'Weight is required'})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              placeholder='Weight'
            />
            {errors.weight && (
              <p className='mt-1 text-xs text-red-500'>{errors.weight.message?.toString()}</p>
            )}
          </div>
          <div className='w-24'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>&nbsp;</label>
            <select
              {...register('weightUnit')}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              defaultValue='kg'
            >
              <option value='kg'>KG</option>
              <option value='pounds'>LBS</option>
            </select>
          </div>
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-gray-700'>Blood Group</label>
          <select
            {...register('bloodGroup', {required: 'Blood group is required'})}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
          >
            <option value=''>Select Blood Group</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
          </select>
          {errors.bloodGroup && (
            <p className='mt-1 text-xs text-red-500'>{errors.bloodGroup.message?.toString()}</p>
          )}
        </div>
      </div>

      <div className='mb-8'>
        <div className='mb-3 text-lg font-medium'>MEDICAL HISTORY</div>
        <div className='mb-3 text-sm text-gray-500'>
          Kindly let us know if you have any allergies, major injuries, chronic diseases, physical
          disabilities etc. Children with special needs (CWSN)
        </div>

        <div className='mb-4'>
          <input
            type='text'
            {...register('medicalPreHistory')}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
            placeholder='Medical Pre-History'
          />
        </div>

        {/* Medical history items display would go here */}
      </div>

      <div className='flex justify-end'>
        <button className='rounded bg-mandy-dark px-6 py-2 text-white' onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}
