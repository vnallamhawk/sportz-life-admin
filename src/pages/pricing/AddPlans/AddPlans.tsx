/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import {PLANNING_FEE_TYPE_OPTIONS, PLANNING_RECURRING_OPTIONS} from '~/constants/pricingConstant'
import type {FeePlans} from '@prisma/client'

export default function AddPlans() {
  const router = useRouter()
  const id = Number(router?.query?.id) // Extract ID from query

  const {data: sessionData} = useSession()
  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id

  const [formData, setFormData] = useState<Partial<FeePlans>>({
    currency: 'USD',
    feeType: null,
    recurringType: null,
    isFractionalFee: true,
    isLate: false,
    lateFeeType: null,
    lateFee: null,
    createdBy: null,
  })

  const [errors, setErrors] = useState<any>({})

  // Fetch Fee Plan details if ID exists
  const {data: feePlanData} = api.feePlan.getFeePlanById.useQuery(
    {id}, // Pass as an object
    {
      enabled: !!id, // Fetch only if ID exists
    }
  )

  useEffect(() => {
    if (createdBy) {
      // eslint-disable-next-line
      setFormData((prev: any) => ({
        ...prev,
        createdBy: createdBy,
      }))
    }
  }, [createdBy])

  useEffect(() => {
    if (id && feePlanData) {
      setFormData({
        name: feePlanData.name || '',
        amount: feePlanData.amount?.toString() || '',
        currency: feePlanData.currency || 'USD',
        feeType: feePlanData.feeType || null,
        recurringType: feePlanData.recurringType || null,
        // isProrata: feePlanData.isProrata ?? true,
        // isLate: feePlanData.isLate ?? false,
        lateFeeType: feePlanData.lateFeeType || null,
        lateFee: feePlanData.lateFee?.toString() || '',
        // createdBy: feePlanData.createdBy || createdBy,
        createdAt: feePlanData.createdAt || new Date(),
        updatedAt: new Date(),
      })
    }
  }, [id, feePlanData])

  const {mutate: createFeePlanMutate} = api.feePlan.createFeePlan.useMutation({
    onSuccess: () => router.push(`/pricing`),
    onError: (error: any) => setErrors(error.data.zodError.fieldErrors || {}),
  })

  const {mutate: updateFeePlanMutate} = api.feePlan.editFeePlan.useMutation({
    onSuccess: () => router.push(`/pricing`),
    onError: (error: any) => setErrors(error.data.zodError.fieldErrors || {}),
  })

  const handleInputChange = (e: any) => {
    // eslint-disable-next-line
    const {name, value} = e.target
    // eslint-disable-next-line
    if (name === 'name' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      // eslint-disable-next-line
      setFormData((prev: any) => ({...prev, [name]: value}))
    }
  }

  const handleCurrencyChange = (currency: any) => {
    // eslint-disable-next-line
    setFormData((prev: any) => ({...prev, currency}))
  }

  const handleFeeTypeChange = (selectedOption: any) => {
    // eslint-disable-next-line
    setFormData((prev: any) => ({
      ...prev,
      // eslint-disable-next-line
      feeType: selectedOption.value,
      // eslint-disable-next-line
      amount: selectedOption.value === 'free' ? '0' : prev.amount,
      // eslint-disable-next-line
      recurringType: selectedOption.value === 'recurring' ? null : prev.recurringType,
    }))
  }

  const handleRecurringPeriodChange = (
    selectedOption: SingleValue<{value: string; label: string}>
  ) => {
    // eslint-disable-next-line
    setFormData((prev: any) => ({
      ...prev,
      recurringType: selectedOption ? selectedOption.value : '', // Handle null case
    }))
  }

  const handleSwitchToggle = () => {
    // eslint-disable-next-line
    setFormData((prev: any) => ({...prev, isProrata: !prev.isProrata}))
  }

  const handleLateFeeToggle = () => {
    // eslint-disable-next-line
    setFormData((prev: any) => ({...prev, isLate: !prev.isLate}))
  }

  const handleSubmit = () => {
    const finalForm: any = {
      // eslint-disable-next-line
      name: formData.name,
      // eslint-disable-next-line
      amount: Number(formData.amount), // Ensuring number type for amount
      // eslint-disable-next-line
      feeType: formData.feeType,
      // eslint-disable-next-line
      createdBy: Number(formData.createdBy), // Ensuring createdBy is a number
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add optional fields only if they are not null
    // eslint-disable-next-line
    if (formData.isProrata !== null) finalForm.isProrata = formData.isProrata
    // eslint-disable-next-line
    if (formData.recurringType !== null)
      // eslint-disable-next-line
      finalForm.recurringType = formData.recurringType
    // eslint-disable-next-line
    if (formData.isLate !== null) finalForm.isLate = formData.isLate
    // eslint-disable-next-line
    if (formData.lateFeeType !== null)
      // eslint-disable-next-line
      finalForm.lateFeeType = formData.lateFeeType
    // eslint-disable-next-line
    if (formData.lateFee !== null) finalForm.lateFee = Number(formData.lateFee) // Ensure lateFee is a number
    // eslint-disable-next-line
    if (formData.currency !== null) finalForm.currency = formData.currency

    if (id) {
      // eslint-disable-next-line
      finalForm.feePlanId = id
    }

    // Send the finalForm to the mutation
    id
      ? // eslint-disable-next-line
        updateFeePlanMutate({id, ...finalForm})
      : // eslint-disable-next-line
        createFeePlanMutate(finalForm)
  }

  return (
    <div className='bg-s-gray px-6 pb-7'>
      <Card className='relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4'>
        <CardTitle title={id ? 'EDIT FEE PLAN' : 'ADD FEE PLAN'} />
        <div className='text-center font-heading text-3xl font-medium uppercase lg:text-left'>
          Fee Plan Details
        </div>
        <div className='grid-col-1 mt-8 grid gap-x-8 gap-y-4 lg:grid-cols-2 lg:gap-y-8'>
          <div>
            <input
              type='text'
              name='name'
              placeholder='Fee Plan Name'
              className='border-1 h-12 w-full rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
              // eslint-disable-next-line
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors?.name && <div className='text-sm text-red-500'>{errors?.name}</div>}
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
            {errors.feeType && <div className='text-sm text-red-500'>{errors.feeType}</div>}
          </div>
          {formData.feeType === 'recurring' && (
            <div>
              <Select
                options={PLANNING_RECURRING_OPTIONS}
                value={
                  PLANNING_RECURRING_OPTIONS.find(
                    (option) => option.value === formData.recurringType
                  ) || null
                } // Ensure null safety
                onChange={handleRecurringPeriodChange}
                placeholder='Select Recurring Period'
                className='border-1 c-select w-full border-gray-300'
                classNamePrefix='react-select'
              />
              {errors.recurringType && (
                <div className='text-sm text-red-500'>{errors.recurringType}</div>
              )}
            </div>
          )}
          {(formData.feeType === 'recurring' || formData.feeType === 'one_time') && (
            <div className='relative'>
              <input
                type='text'
                name='amount'
                placeholder='Fee Amount'
                className='border-1 h-12 w-full rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
                // eslint-disable-next-line
                value={formData.amount}
                onChange={handleInputChange}
                onInput={(e: any) =>
                  // eslint-disable-next-line
                  (e.target.value = e.target.value.replace(/[^0-9.]/g, ''))
                }
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
              {errors.amount && <div className='text-sm text-red-500'>{errors.amount}</div>}
            </div>
          )}
          <div>
            <label>Prorata (Per Class)</label>
            <div className='switch mt-1'>
              <Switch
                color='green'
                // eslint-disable-next-line
                checked={formData.isProrata}
                onChange={handleSwitchToggle}
              />
              <span className='ml-5 text-sm'>{formData.isProrata ? 'On' : 'Off'}</span>
            </div>
          </div>
          <div>
            <label>Late Fee</label>
            <div className='switch mt-1'>
              <Switch
                color='red'
                // eslint-disable-next-line
                checked={formData.isLate}
                onChange={handleLateFeeToggle}
              />
              <span className='ml-5 text-sm'>{formData.isLate ? 'On' : 'Off'}</span>
            </div>
            {formData.isLate && (
              <div className='mt-4'>
                <Select
                  options={[
                    {value: 'amount', label: 'Amount'},
                    {value: 'percentage', label: 'Percentage'},
                  ]}
                  value={{
                    // eslint-disable-next-line
                    value: formData.lateFeeType,
                    // eslint-disable-next-line
                    label: formData.lateFeeType,
                  }}
                  onChange={(option: any) =>
                    // eslint-disable-next-line
                    setFormData({...formData, lateFeeType: option.value})
                  }
                  placeholder='Select Late Fee Type'
                  className='border-1 c-select w-full border-gray-300'
                  classNamePrefix='react-select'
                />
                {errors.lateFeeType && (
                  <div className='text-sm text-red-500'>{errors.lateFeeType}</div>
                )}
                <input
                  type='text'
                  name='lateFee'
                  placeholder='Enter Value'
                  className='border-1 mt-2 h-12 w-full rounded-lg border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
                  // eslint-disable-next-line
                  value={formData.lateFee}
                  onChange={handleInputChange}
                  onInput={(e: any) =>
                    // eslint-disable-next-line
                    (e.target.value = e.target.value.replace(/[^0-9.]/g, ''))
                  }
                />
                {errors.lateFee && <div className='text-sm text-red-500'>{errors.lateFee}</div>}
              </div>
            )}
          </div>
        </div>
        <div className='mt-10 text-end'>
          <button
            className='w-full rounded-full !border-0 bg-mandy-dark px-5 py-3 text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring-0 lg:w-auto lg:rounded lg:py-1.5'
            type='button'
            onClick={handleSubmit}
          >
            {id ? 'Update Fee Plan' : 'Add Fee Plan'}
          </button>
        </div>
      </Card>
    </div>
  )
}
