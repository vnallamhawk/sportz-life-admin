import React, {useState, useEffect} from 'react'
import Card from '~/components/Card'
import CardTitle from '~/components/Card/CardTitle'
import Select from 'react-select'
import {ChevronDownIcon} from '@radix-ui/react-icons'
import {Dropdown} from 'flowbite-react'
import {Switch} from '@material-tailwind/react'
import {useSession} from 'next-auth/react'
import {api} from '~/utils/api'
import {useRouter} from 'next/router'
import type {SingleValue} from 'react-select' // Ensure this import exists
import {
  PLANNING_FEE_TYPE_OPTIONS,
  PLANNING_RECURRING_OPTIONS,
  LATE_FEE_TYPE_OPTION,
} from '~/constants/pricingConstant'
import type {FeePlans} from '@prisma/client'
import {zodResolver} from '@hookform/resolvers/zod'

import {z} from 'zod'
import {useForm} from 'react-hook-form'

// Define enums that match your Prisma enums
const FeeType = z.enum(['free', 'one_time', 'recurring'])
const RecurringType = z.enum(['Monthly', 'Quarterly', 'Yearly', 'Bi_Monthly'])
const LateFeeType = z.enum(['amount', 'percentage'])
const Currency = z.enum(['USD', 'INR', 'GBP'])

// Base schema for fee plans
export const FeePlanSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, 'Name is required').max(100),
    amount: z.number().min(0, 'Amount must be positive').optional(),
    feeType: FeeType.nullable(),
    currency: Currency.default('INR'),
    lateFee: z.number().min(0, 'Late fee must be positive').nullable().optional(),
    lateFeeType: LateFeeType.nullable().optional(),
    isLateFee: z.boolean().nullable().optional(),
    isFractionalFee: z.boolean().nullable().optional(),
    recurringType: RecurringType.nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    status: z.boolean().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    // Custom validation for amount when feeType is not free
    if (data.feeType !== 'free' && (data.amount === undefined || data.amount === null)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Amount is required for non-free plans',
        path: ['amount'],
      })
    }

    // Custom validation for late fee fields
    if (data.isLateFee) {
      if (!data.lateFeeType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Late fee type is required when late fee is enabled',
          path: ['lateFeeType'],
        })
      }
      if (data.lateFee === undefined || data.lateFee === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Late fee amount is required when late fee is enabled',
          path: ['lateFee'],
        })
      }
    }

    // Custom validation for recurring type
    if (data.feeType === 'recurring' && !data.recurringType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Recurring type is required for recurring plans',
        path: ['recurringType'],
      })
    }
  })

export type FeePlanFormData = z.infer<typeof FeePlanSchema>

export default function AddPlans() {
  const router = useRouter()
  const id = Number(router?.query?.id)
  const {data: sessionData} = useSession()
  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id

  // Initialize form with react-hook-form and Zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
    setError,
  } = useForm<FeePlanFormData>()

  // Watch form values
  const formData = watch()

  // Fetch Fee Plan details if ID exists
  const {data: feePlanData} = api.feePlan.getFeePlanById.useQuery({id}, {enabled: !!id})

  // useEffect(() => {
  //   if (createdBy) {
  //     setValue('createdBy', createdBy)
  //   }
  // }, [createdBy, setValue])

  useEffect(() => {
    if (id && feePlanData) {
      // Set form values from fetched data
      const defaultValues = {
        name: feePlanData.name || '',
        amount: feePlanData.amount || undefined,
        currency: (feePlanData.currency as 'USD' | 'INR' | 'GBP') || 'USD',
        feeType: feePlanData.feeType,
        recurringType: feePlanData.recurringType,
        isFractionalFee: feePlanData.isFractionalFee ?? false,
        isLateFee: feePlanData.isLateFee ?? false,
        lateFeeType: feePlanData.lateFeeType,
        lateFee: feePlanData.lateFee || undefined,
      }

      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof FeePlanFormData, value)
      })
    }
  }, [id, feePlanData, setValue])

  const {mutate: createFeePlanMutate} = api.feePlan.createFeePlan.useMutation({
    onSuccess: () => router.push(`/feePlans`),
    onError: (error) => console.error('Error creating fee plan:', error),
  })

  const {mutate: updateFeePlanMutate} = api.feePlan.editFeePlan.useMutation({
    onSuccess: () => router.push(`/feePlans`),
    onError: (error) => console.error('Error updating fee plan:', error),
  })

  const onSubmit = (data: FeePlanFormData) => {
    const submissionData = {
      ...data,
      amount: data.feeType === 'free' ? 0 : data.amount,
      // Add other transformations if needed
    }
    console.log(submissionData)

    const result = FeePlanSchema.safeParse(data)

    if (!result.success) {
      console.log(result.errors)
      result.error.errors.forEach((err) => {
        if (err.path?.[0]) return setError(err.path[0], {message: err.message})
      })
      return
    } else {
      if (id) {
        updateFeePlanMutate({feePlanId: id, ...submissionData})
      } else {
        createFeePlanMutate(submissionData)
      }
    }
  }

  const handleFeeTypeChange = (selectedOption: any) => {
    setValue('feeType', selectedOption.value)
    if (selectedOption.value === 'free') {
      setValue('amount', 0)
      setValue('recurringType', null)
    }
  }

  const handleRecurringPeriodChange = (
    selectedOption: SingleValue<{value: string; label: string}>
  ) => {
    console.log(selectedOption?.value)
    setValue('recurringType', selectedOption?.value as any)
  }

  const handleCurrencyChange = (currency: 'USD' | 'INR' | 'GBP') => {
    setValue('currency', currency)
  }

  const handleSwitchToggle = (field: 'isFractionalFee' | 'isLateFee') => {
    setValue(field, !formData[field])
    if (field === 'isLateFee' && !formData.isLateFee) {
      setValue('lateFeeType', null)
      setValue('lateFee', null)
    }
  }

  console.log({formData})
  return (
    <div className='bg-s-gray px-6 pb-7'>
      <Card className='relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4'>
        <CardTitle title={id ? 'EDIT FEE PLAN' : 'ADD FEE PLAN'} />
        <div className='text-center font-heading text-3xl font-medium uppercase lg:text-left'>
          Fee Plan Details
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid-col-1 mt-8 grid gap-x-8 gap-y-4 lg:grid-cols-2 lg:gap-y-8'
        >
          <div>
            <input
              type='text'
              placeholder='Fee Plan Name'
              className='border-1 h-12 w-full rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
              {...register('name')}
            />
            {errors.name && <div className='text-sm text-red-500'>{errors.name.message}</div>}
          </div>
          <div>
            <Select
              options={PLANNING_FEE_TYPE_OPTIONS}
              value={PLANNING_FEE_TYPE_OPTIONS.find((option) => option.value === formData.feeType)}
              onChange={handleFeeTypeChange}
              placeholder='Fee Type'
              className='border-1 c-select w-full border-gray-300'
              classNamePrefix='react-select'
            />
            {errors.feeType && <div className='text-sm text-red-500'>{errors.feeType.message}</div>}
          </div>
          {formData.feeType === 'recurring' && (
            <div>
              <Select
                options={PLANNING_RECURRING_OPTIONS}
                value={PLANNING_RECURRING_OPTIONS.find(
                  (option) => option.value === formData.recurringType
                )}
                onChange={handleRecurringPeriodChange}
                placeholder='Select Recurring Period'
                className='border-1 c-select w-full border-gray-300'
                classNamePrefix='react-select'
              />
              {errors.recurringType && (
                <div className='text-sm text-red-500'>{errors.recurringType.message}</div>
              )}
            </div>
          )}
          {(formData.feeType === 'recurring' || formData.feeType === 'one_time') && (
            <div className='relative'>
              <input
                type='number'
                placeholder='Fee Amount'
                className='border-1 h-12 w-full rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
                {...register('amount', {valueAsNumber: true})}
                step='0.01'
              />
              <div className='dropdown absolute right-0 top-0 h-12 border-l border-[#d1d5db] px-3'>
                <Dropdown
                  label=''
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <button className='inline-flex h-full items-center'>
                      <span className='mr-2 grow'>{formData.currency || 'Select Currency'}</span>
                      <ChevronDownIcon width='20px' height='20px' />
                    </button>
                  )}
                  className='rounded-lg'
                >
                  <Dropdown.Item className='text-start' onClick={() => handleCurrencyChange('USD')}>
                    US Dollar
                  </Dropdown.Item>
                  <Dropdown.Item className='text-start' onClick={() => handleCurrencyChange('INR')}>
                    Indian Rupees
                  </Dropdown.Item>
                  <Dropdown.Item className='text-start' onClick={() => handleCurrencyChange('GBP')}>
                    UK Pound
                  </Dropdown.Item>
                </Dropdown>
              </div>
              {errors.amount && <div className='text-sm text-red-500'>{errors.amount.message}</div>}
            </div>
          )}
          <div>
            <label>IsFractional Fee</label>
            <div className='switch mt-1'>
              <Switch
                color='green'
                checked={!!formData.isFractionalFee}
                onChange={() => handleSwitchToggle('isFractionalFee')}
              />
              <span className='ml-5 text-sm'>{formData.isFractionalFee ? 'On' : 'Off'}</span>
            </div>
          </div>
          <div>
            <label>Late Fee</label>
            <div className='switch mt-1'>
              <Switch
                color='red'
                checked={!!formData.isLateFee}
                onChange={() => handleSwitchToggle('isLateFee')}
              />
              <span className='ml-5 text-sm'>{formData.isLateFee ? 'On' : 'Off'}</span>
            </div>
            {formData.isLateFee && (
              <div className='mt-4'>
                <Select
                  options={[
                    {value: 'amount', label: 'Amount'},
                    {value: 'percentage', label: 'Percentage'},
                  ]}
                  value={LATE_FEE_TYPE_OPTION.find(
                    (feeType) => feeType.value === formData.lateFeeType
                  )}
                  onChange={(option: any) => setValue('lateFeeType', option.value)}
                  placeholder='Select Late Fee Type'
                  className='border-1 c-select w-full border-gray-300'
                  classNamePrefix='react-select'
                />
                {errors.lateFeeType && (
                  <div className='text-sm text-red-500'>{errors.lateFeeType.message}</div>
                )}
                <input
                  type='number'
                  placeholder='Enter Value'
                  className='border-1 mt-2 h-12 w-full rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
                  {...register('lateFee', {valueAsNumber: true})}
                  step='0.01'
                />
                {errors.lateFee && (
                  <div className='text-sm text-red-500'>{errors.lateFee.message}</div>
                )}
              </div>
            )}
          </div>
          <div className='mt-10 text-end lg:col-span-2'>
            <button
              className='w-full rounded-full !border-0 bg-mandy-dark px-5 py-3 text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring-0 lg:w-auto lg:rounded lg:py-1.5'
              type='submit'
            >
              {id ? 'Update Fee Plan' : 'Add Fee Plan'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
