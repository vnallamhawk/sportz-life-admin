import React, {useEffect, useMemo, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import type {COACH_CENTER_BATCHES} from '~/types/coach'
import {type MULTI_FORM_TYPES} from '~/types/coach'
import {api} from '~/utils/api'
import AddForm from '~/common/AddForm/AddForm'
import {COACH_BATCH_CONSTANTS} from '~/constants/coachConstants'
import CenterBatchTable from './CenterBatchTable'
import Button from '../Button'

export default function AssignBatches() {
  const [formConstantValues, setFormConstantValues] = useState<COACH_CENTER_BATCHES[] | undefined>(
    COACH_BATCH_CONSTANTS
  )
  const {watch, setValue} = useFormContext<MULTI_FORM_TYPES>()
  const CoachCentersBatches = watch('CoachCentersBatches')
  const centerId = watch('centerId')
  const {data: centers} = api.center.getAllCenters.useQuery()
  const {data: batches} = api.batches.getAllBatches.useQuery()
  const selectedBatches = watch('batches')
  const batchIds = useMemo(
    () => CoachCentersBatches?.map((centerBatch) => centerBatch?.batchId),
    [CoachCentersBatches]
  )

  useEffect(() => {
    if (centers?.length && batches?.length && batchIds) {
      setFormConstantValues((prevValues) =>
        prevValues?.map((formConstant) => {
          if (formConstant.id === 'centerId') {
            return {
              ...formConstant,
              isDisabled: centerId ? true : false,
              options: centers.map((center: {name: string; id: number}) => ({
                label: center.name,
                value: center.id,
              })),
            }
          } else if (formConstant.id === 'batches') {
            return {
              ...formConstant,
              options: batches
                // .filter(({id}) => !batchIds.includes(id))
                .map((batch) => ({
                  label: batch.name,
                  value: batch.id,
                })),
            }
          } else {
            return formConstant
          }
        })
      )
    }
  }, [centers, batches, batchIds]) // No need for formConstantValues in dependencies

  useEffect(() => {
    if (selectedBatches?.length === 0 || !selectedBatches) {
      setValue('CoachCentersBatches', [])
    } else if (selectedBatches.length && batches?.length && centers?.length) {
      const updatedBatches = selectedBatches?.map((id) => ({
        batchId: id,
        batchName: batches?.find((batch) => batch.id === id)?.name,
        centerId: centerId,
        centerName: centers?.find((center) => center.id === centerId)?.name,
      }))

      setValue('CoachCentersBatches', updatedBatches)
    }
  }, [selectedBatches])

  const handleRemoveCenterBatches = (index: number) => {
    const filteredBatchId = CoachCentersBatches.find((_, i) => i === index)?.batchId
    setValue(
      'batches',
      selectedBatches?.filter((id) => id !== filteredBatchId)
    )
    setValue(
      'CoachCentersBatches',
      CoachCentersBatches.filter((_, i) => i !== index)
    )
  }

  return (
    <div>
      <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
        ASSIGN BATCHES
      </div>
      <AddForm
        // cardTitle='ADD COACH'
        // cardSubTitle='ASSIGN BATCHES'
        formConstantValues={formConstantValues}
      />
      {/* <Button
        className='border-1 ml-7 hidden rounded-md border-blush-light px-8 py-3 text-lg font-bold text-[#FF9678] hover:border-blush-dark hover:text-blush-dark lg:block'
        type='button'
        onClick={() => onAddHandler()}
      >
        Add
      </Button> */}
      <CenterBatchTable tableData={CoachCentersBatches} onRemove={handleRemoveCenterBatches} />
    </div>
  )
}
