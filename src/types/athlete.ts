import type {MultiSelectOption} from './select'
import type {Athletes_bloodGroup, Athletes_gender} from '@prisma/client'

export interface ATHLETE_TYPES {
  name: string
  phone: string
  email: string
  bloodGroup: MultiSelectOption | {value: string; label: string} | string
  gender: MultiSelectOption | {value: string; label: string} | string
  dob: Date | string
  height: string | number
  weight: string | number
  heightUnit: string
  weightUnit: string
  address: string
  medicalHistory: Array<{message: string}>
  fatherName: string
  sport: MultiSelectOption | {value: number | string; label: string} | number
  trainingLevel: MultiSelectOption | {value: string; label: string} | string
  center: MultiSelectOption | {value: number | string; label: string} | number
  batch: MultiSelectOption | {value: number | string; label: string} | number
  medicalPreHistory?: string
}

export type MedicalHistoryItem = {
  id?: number
  message: string
}
