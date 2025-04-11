/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useEffect, useContext, useState, useRef} from 'react'
import {ATHLETE_CONTACT_CONSTANTS, ATHLETE_GENRAL_CONSTANTS} from '~/constants/athleteConstants'

import {FormContext} from '~/pages/athlete/AddAthlete/AddAthleteMultiFormLayout'
import {useFormContext} from 'react-hook-form'
import {api} from '~/utils/api'
import AddForm from '~/common/AddForm/AddForm'
import type {FormValues} from '~/types/common'
import {Centers, Sports, Batches} from '@prisma/client'
import type {ATHLETE_TYPES} from '~/types/athlete'

interface AddGeneralDetailsProps {
  finalFormSubmissionHandler: (data: any) => void
}

export default function AddGeneralDetails({finalFormSubmissionHandler}: AddGeneralDetailsProps) {
  const {
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useFormContext<ATHLETE_TYPES>()
  const {data: sports} = api.sports.getAllSports.useQuery()
  const {data: centers} = api.center.getAllCenters.useQuery()
  const [selectedSport, setSelectedSport] = useState<number | null>(null)
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null)
  const [batches, setBatches] = useState<Batches[]>([])

  const {data: allBatches, isLoading} = api.batches.getAllBatches.useQuery()

  const watchSport = watch('sport')
  const watchCenter = watch('center')

  useEffect(() => {
    if (watchSport) {
      const sportValue =
        typeof watchSport === 'object' && 'value' in watchSport
          ? Number(watchSport.value)
          : typeof watchSport === 'number'
          ? watchSport
          : null
      setSelectedSport(sportValue)
      // Reset batch when sport changes
      setValue('batch', null)
    }
  }, [watchSport, setValue])

  useEffect(() => {
    if (watchCenter) {
      const centerValue =
        typeof watchCenter === 'object' && 'value' in watchCenter
          ? Number(watchCenter.value)
          : typeof watchCenter === 'number'
          ? watchCenter
          : null
      setSelectedCenter(centerValue)
      // Reset batch when center changes
      setValue('batch', null)
    }
  }, [watchCenter, setValue])

  useEffect(() => {
    if (allBatches && selectedSport && selectedCenter) {
      const filteredBatches = allBatches.filter(
        (batch) => batch.sportId === selectedSport && batch.centerId === selectedCenter
      )
      setBatches(filteredBatches)
        } else {
      setBatches([]) // Reset batches when sport or center is not selected
    }
  }, [allBatches, selectedSport, selectedCenter])

  useEffect(() => {
    if (formData && formData.isEditMode) {
      const {phone, email, fatherName, address} = formData

      // Set the form values from edit data
      if (phone) setValue('phone', phone)
      if (email) setValue('email', email)
      if (fatherName) setValue('fatherName', fatherName)
      if (address) setValue('address', address)

      // Set sport, center, batch, training level if they exist in the edit data
      if (formData.AthleteSportsMaps?.length > 0) {
        const sportMap = formData.AthleteSportsMaps[0]
        if (sportMap.Sports) {
          setValue('sport', {value: sportMap.sportId, label: sportMap.Sports.name})
          setSelectedSport(sportMap.sportId)
        }

        if (sportMap.Centers) {
          setValue('center', {value: sportMap.centerId, label: sportMap.Centers.name})
          setSelectedCenter(sportMap.centerId)
        }

        if (sportMap.trainingLevel) {
          setValue('trainingLevel', {
            value: sportMap.trainingLevel,
            label: sportMap.trainingLevel.charAt(0).toUpperCase() + sportMap.trainingLevel.slice(1),
          })
        }
      }

      if (formData.AthleteBatchesMaps?.length > 0) {
        const batchMap = formData.AthleteBatchesMaps[0]
        if (batchMap.Batches) {
          setValue('batch', {value: batchMap.batchId, label: batchMap.Batches.name})
        }
      }
    }
  }, [formData, setValue])

  const handlePrev = () => {
    if (setCurrentStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: any) => {
    finalFormSubmissionHandler(data)
  }

  return (
    <div className='px-10'>
      <div className='mb-8 text-center font-heading text-3xl font-medium uppercase lg:text-left'>
        {formData.isEditMode ? 'EDIT ATHLETE' : 'ADD ATHLETE'}
      </div>

      <div className='mb-6 text-xl font-medium'>ATHLETE GENERAL DETAILS</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Sport</label>
            <select
              {...register('sport', {required: 'Sport is required'})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
            >
              <option value=''>Select Sport</option>
              {sports?.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
            {errors.sport && (
              <p className='mt-1 text-xs text-red-500'>{errors.sport.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Training Level</label>
            <select
              {...register('trainingLevel', {required: 'Training level is required'})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
            >
              <option value=''>Select Training Level</option>
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
            </select>
            {errors.trainingLevel && (
              <p className='mt-1 text-xs text-red-500'>
                {errors.trainingLevel.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Father's Name</label>
            <input
              type='text'
              {...register('fatherName', {required: "Father's name is required"})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              placeholder="Father's Name"
            />
            {errors.fatherName && (
              <p className='mt-1 text-xs text-red-500'>{errors.fatherName.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Center</label>
            <select
              {...register('center', {required: 'Center is required'})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
            >
              <option value=''>Select Center</option>
              {centers?.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
            {errors.center && (
              <p className='mt-1 text-xs text-red-500'>{errors.center.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Batch</label>
            <select
              {...register('batch', {required: 'Batch is required'})}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              disabled={!selectedSport || !selectedCenter || isLoading}
            >
              <option value=''>Select Batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
            {!selectedSport || !selectedCenter ? (
              <p className='mt-1 text-xs text-gray-500'>Please select sport and center first</p>
            ) : batches.length === 0 && !isLoading ? (
              <p className='mt-1 text-xs text-gray-500'>
                No batches available for selected sport and center
              </p>
            ) : null}
            {errors.batch && (
              <p className='mt-1 text-xs text-red-500'>{errors.batch.message?.toString()}</p>
            )}
          </div>
        </div>

        <div className='mb-4 mt-8 text-xl font-medium'>CONTACT DETAILS</div>

        <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              placeholder='Email'
            />
            {errors.email && (
              <p className='mt-1 text-xs text-red-500'>{errors.email.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>Phone Number</label>
            <input
              type='tel'
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
              className='w-full rounded-md border border-gray-300 px-3 py-2'
              placeholder='Phone Number'
            />
            {errors.phone && (
              <p className='mt-1 text-xs text-red-500'>{errors.phone.message?.toString()}</p>
            )}
          </div>
        </div>

        <div className='mb-8'>
          <label className='mb-1 block text-sm font-medium text-gray-700'>
            Residential Address
          </label>
          <textarea
            {...register('address', {required: 'Address is required'})}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
            rows={4}
            placeholder='Residential Address'
          />
          {errors.address && (
            <p className='mt-1 text-xs text-red-500'>{errors.address.message?.toString()}</p>
          )}
        </div>

        <div className='flex justify-between'>
          <button
            type='button'
            className='rounded border border-gray-300 bg-white px-6 py-2 text-gray-700'
            onClick={handlePrev}
          >
            Prev
          </button>

          <div>
            <button
              type='button'
              className='mr-2 rounded border border-gray-300 bg-white px-6 py-2 text-gray-700'
            >
              Preview
            </button>
            <button type='submit' className='rounded bg-green-600 px-6 py-2 text-white'>
              Finish
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
