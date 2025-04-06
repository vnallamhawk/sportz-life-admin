// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck TODO: use TS generics and fix all ts errors
import React, {useContext, useEffect, useState, useCallback, useMemo} from 'react'

import Datepicker from '~/components/DatePicker/DatePickerWrapper'
import Textbox from '~/components/Textbox'
import Timepicker from '~/components/TimePicker/TimePickerWrapper'
import CardTitle from '~/components/Card/CardTitle'
import Image from 'next/image'
import Plus from '../../images/plus.svg'
import Remove from '../../images/remove.svg'
import {Switch} from '@material-tailwind/react'
import AddFile from '../../images/add-file.svg'
import {Controller, useForm} from 'react-hook-form'
// import type { ActionMeta, MultiValue, SingleValue } from "react-select";
import Select from 'react-select'
import Button from '~/components/Button'
import {Dropdown, Textarea} from 'flowbite-react'
import type {FormValues, TableFields} from '~/types/common'
import {useFormContext} from 'react-hook-form'

import type {MULTI_FORM_TYPES} from '~/types/coach'
import {useRef} from 'react'
import isEqual from 'lodash/isEqual'
import {defaultValues, FormContext} from '~/hooks/useMultiStepFormContext'

// import {FormContext} from 'pages/addcoach'

interface AddForm {
  cardTitle?: string
  cardSubTitle?: string
  formConstantValues?: FormValues[]
  imageTitle?: string
  tableTitle?: string
  tableDescription?: string
  // mobileAddButtonText?: string
  // TableHeadings?: {label: string; id: string}[]
  // addTableData?: any
  // tableData?: {[key: string]: any}[]
  // tablekey?: string
  // buttonItems?: {
  //   prevNext?: boolean
  //   prevFinish?: boolean
  //   next?: boolean
  //   finish?: boolean
  // }
  // setFormData?: MULTI_FORM_TYPES
  // formData: MULTI_FORM_TYPES
  // setCurrentStep?: any
  // currentStep?: number
  // finalFormSubmissionHandler?: any
  // tableFields?: TableFields[]
  // addTableButtonText?: string
  // addTableButton?: any
  // onRemoveTableButton?: any
  // isFormTable?: boolean
  // prevButtonText?: string
  // finishButtonText?: string
  // prevButtonClick?: any
  // dependentKey?: string
  // setDependentKey?: any
  // shouldDisableAddTableButton?: boolean
  // dependentKey1?: string
  // setDependentKey1?: any
  onDropCallback?: (files: Array<File>) => void
  uploadUrl?: string
}
const AddForm = ({
  cardTitle,
  cardSubTitle,
  formConstantValues,
  imageTitle,
  onDropCallback,
  uploadUrl,
}: AddForm) => {
  let inputElement

  const {
    control,
    formState: {errors},
  } = useFormContext()

  const handleChangeTime = (value: string | boolean | unknown, name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj: {[key: string]: string | boolean | unknown} = {...formData}
    obj[name] = value
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setFormData(obj)
  }

  const getInputElement = (props: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      rules,
      id,
      pattern,
      placeHolder,
      dropdownKey,
      dropdownLabel,
      options,
      isDisabled,
    } = props

    switch (type) {
      case 'select':
        inputElement = (
          <Controller
            control={control}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
            render={({field: {onChange, value, ...rest}}) => {
              // console.log(id)
              // console.log(value)
              // console.log(JSON.stringify(options))
              // console.log({
              //   options: options?.filter((option) =>
              //     Array.isArray(value) ? value.includes(option.value) : value === option.value
              //   ),
              // })
              return (
                <Select
                  {...rest}
                  isMulti={props?.isMulti ?? false}
                  isDisabled={isDisabled}
                  options={options}
                  value={options?.filter((option) =>
                    Array.isArray(value) ? value.includes(option.value) : value === option.value
                  )}
                  placeholder={placeHolder}
                  className='border-1 c-select w-full border-gray-300'
                  classNamePrefix='react-select'
                  onChange={(newValue) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const value = Array.isArray(newValue)
                      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
                        newValue.map((option) => option.value)
                      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        newValue?.value
                    onChange(value)

                    // if (id === 'centerId' || id === 'batchIds') {
                    //   if (id === 'centerId') {
                    //     if (!newValue) return // Ensure newValue is not null

                    //     if (!Array.isArray(newValue) && 'value' in newValue) {
                    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    //       setDependentKey?.(newValue.value) // Single value
                    //     } else if (Array.isArray(newValue)) {
                    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
                    //       setDependentKey?.(newValue.map((item) => item.value)) // Multi select
                    //     }
                    //   }
                    // }
                  }}
                />
              )
            }}
          />
        )
        break

      case 'inputDropdown':
        inputElement = (
          <Controller
            control={control}
            render={({field: {onChange, value, ...rest}}) => {
              return (
                <div className='relative'>
                  <Textbox
                    {...rest}
                    className='h-12 w-full'
                    placeHolder={placeHolder}
                    onChangeHandler={onChange}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    value={value}
                  />
                  <div className='dropdown absolute right-0.5 top-2/4 inline-flex h-12 -translate-y-2/4 items-center justify-center border-l p-3'>
                    <Dropdown
                      label={dropdownLabel}
                      inline={true}
                      dismissOnClick={false}
                      className='text-black'
                    >
                      {dropdownKey &&
                        options?.map((item) => {
                          // eslint-disable-next-line react/jsx-key
                          return (
                            // eslint-disable-next-line react/jsx-key
                            <Dropdown.Item
                              onClick={() => handleChangeTime(item.value, dropdownKey)}
                            >
                              {item.label}
                            </Dropdown.Item>
                          )
                        })}
                    </Dropdown>
                  </div>
                </div>
              )
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
          />
        )
        break
      case 'switch':
        inputElement = (
          <Controller
            control={control}
            render={({field: {value}, ...rest}) => {
              return (
                <Switch
                  {...rest}
                  // @ts-expect-error TODO: FIX THIS ERROR
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value={value}
                  onChange={(e) => handleChangeTime(e.target.checked, 'taxable')}
                />
              )
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
          />
        )
        break
      case 'time':
        inputElement = (
          <Controller
            control={control}
            render={() => {
              return (
                <Timepicker
                  placeHolder={props.placeHolder}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  // @ts-expect-error TODO: FIX THIS TS ERROR
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value={formData[id] ? formData[id] : undefined}
                  className='h-12 '
                  onChangeHandler={(value) => handleChangeTime(value, id)}
                />
              )
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
          />
        )
        break
      case 'calendar':
        inputElement = (
          <Controller
            control={control}
            render={({field: {onChange, value, ...rest}}) => {
              return (
                <Datepicker
                  {...rest}
                  placeHolder={props.placeHolder}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  value={value ? new Date(value as string) : null}
                  className='h-12'
                  onChangeHandler={onChange}
                />
              )
            }}
            name={id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
          />
        )
        break
      case 'textarea':
        inputElement = (
          <Controller
            control={control}
            name={id}
            render={({field: {onChange, value, ...rest}}) => (
              <Textarea
                {...rest}
                className='h-20 w-full'
                placeholder={placeHolder}
                onChange={onChange}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                value={value || formData[id]}
              />
            )}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
            {...(pattern ? {pattern} : {})}
          />
        )
        break
      default:
        inputElement = (
          <Controller
            control={control}
            name={id}
            render={({field: {onChange, value, ...rest}}) => (
              <Textbox
                {...rest}
                className='h-12 w-full'
                placeHolder={placeHolder}
                onChangeHandler={onChange}
                // TODO: FIX THIS TS ERROR
                // @ts-expect-error // FIX THIS TS ERROR
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                value={value}
              />
            )}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            rules={rules}
            {...(pattern ? {pattern} : {})}
          />
        )
    }

    return inputElement
  }

  return (
    <>
      {cardTitle && <CardTitle title={cardTitle} />}
      {cardSubTitle && (
        <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
          {cardSubTitle}
        </div>
      )}
      {formConstantValues && formConstantValues.length > 0 && (
        <div
          className={`grid-col-1 mt-8 grid gap-x-8 gap-y-4 lg:grid-cols-2
          lg:gap-y-8 `}
        >
          {formConstantValues?.map((formValues: FormValues) => (
            <div key={formValues.id}>
              {getInputElement(formValues)}

              <span className='text-red-800'>
                {errors[formValues.id as keyof MULTI_FORM_TYPES]?.type === 'required' && (
                  <div>This field is required</div>
                )}
                {errors[formValues.id as keyof MULTI_FORM_TYPES]?.type === 'pattern' && (
                  <div> This field is not matching the pattern</div>
                )}
                {errors[formValues.id as keyof MULTI_FORM_TYPES]?.type === 'maxLength' && (
                  <div>{`This field is exceeding the max. character limit`}</div>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
      {imageTitle && (
        <label className='col-span-2 mt-5 flex h-48 flex-col justify-center rounded-lg border-2 border-dashed border-gray-300 bg-stone-100 text-center lg:hidden'>
          <div className='mb-3 flex items-center justify-center'>
            <input
              type='file'
              className='hidden'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (imageTitle && onDropCallback && e.target.files) {
                  const uploadedFile: File | null | undefined =
                    e.target.files.length > 0 ? e.target.files[0] : null
                  if (uploadedFile) {
                    onDropCallback([uploadedFile])
                  }
                }
              }}
            />
            <Image
              width={0}
              height={0}
              src={uploadUrl ? uploadUrl : AddFile}
              className='mr-2 h-auto w-auto'
              alt=''
            />
            <div className='text-base font-medium text-gray-500'>{imageTitle}</div>
          </div>
          <div className='text-sm text-gray-300'>The file size not more than 10 MB.</div>
          <div className='text-sm text-gray-300'>JPEG, PNG, Video</div>
        </label>
      )}
    </>
  )
}

export default AddForm
