/* eslint-disable */
import React, {useState, useContext, useCallback, useEffect, useRef} from 'react'
import Card from '~/components/Card'
import ImageWithFallback from '~/components/ImageWithFallback'
import {useForm, FormProvider} from 'react-hook-form'
import {
  type TRAINING_LEVEL,
  type GENDER_VALUES,
  type MULTI_FORM_TYPES,
  type EXPERIENCE_LEVEL,
} from '~/types/coach'
import {api} from '~/utils/api'
import {useRouter} from 'next/router'
import {ToastContext} from '~/contexts/Contexts'
import FileUpload from '~/components/FileUpload'
import {getSportsDictionaryServices} from '~/services/sportServices'

import AddAthlete from '../../../components/AddAthlete/AddAthlete'
import DashboardHeader from '~/components/DashboardHeader'
import AddGeneralDetails from '~/components/AddAthlete/AddGeneralDetails'
import {useSession} from 'next-auth/react'
import type {ATHLETE_TYPES} from '~/types/athlete'

// const multiFormData: MULTI_FORM_TYPES = {
const multiFormData = {
  phone: '',
  name: '',
  bloodGroup: '',
  email: '',
  about: '',
  dob: undefined,
  payroll: '',
  coachingSports: [],
  certificates: [],
  batchIds: [],
  centerId: undefined,
  isEditMode: false,
  coachId: undefined,
  height: '',
  weight: '',
  address: '',
  medicalHistory: [],
  fatherName: '',
  athleteId: undefined,
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
    formData: any
    setFormData?: React.Dispatch<React.SetStateAction<any>>
  }
}

export const FormContext = React.createContext<FormContextTypes>(defaultValues)

export default function AddAthleteMultiFormLayout() {
  const router = useRouter()
  const id = Number(router?.query?.id)
  const hasRun = useRef(false)

  const methods = useForm<ATHLETE_TYPES>({mode: 'onSubmit'})
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formData, setFormData] = useState<any>(defaultValues.multiFormData.formData)
  const {data: sessionData} = useSession()
  const [athleteId, setAthleteId] = useState<number>()
  const [preview, setPreview] = useState<(File & {preview: string})[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const uploadImage = api.upload.uploadImage.useMutation()
  const athleteData = id && api.athlete.getAthleteById.useQuery({id})
  const hasUseEffectRun = useRef(false)

  const {setOpenToast} = useContext(ToastContext)
  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId

  useEffect(() => {
    if (athleteData?.data && !hasUseEffectRun.current) {
      const obj = {...athleteData.data}
      obj.isEditMode = true
      setFormData(obj)
      hasUseEffectRun.current = true
    }
  }, [athleteData?.data])

  const formProviderData = {
    stepData: {currentStep, setCurrentStep},
    multiFormData: {formData, setFormData},
  }

  const {mutate: createMutate} = api.athlete.createAthlete.useMutation({
    onSuccess: (response) => {
      setOpenToast(true)
      setAthleteId(response?.id)
      return response
    },
  })

  const {mutate: editMutate} = api.athlete.editAthlete.useMutation({
    onSuccess: (response) => {
      setOpenToast(true)
      setAthleteId(response?.id)
      void router.push(`/athlete/${response?.id}`).then(() => window.location.reload())
    },
  })

  const {mutate: createMutateAthleteSports} = api.athleteSports.createAthleteSports.useMutation({
    onSuccess: (response) => {
      console.log('response data in athelete sports ', response)
      return response
    },
  })

  const {mutate: createMutateAthleteBatches} = api.athleteBatches.createAthletebatches.useMutation({
    onSuccess: (response) => {
      console.log('response data in athelete batches ', response)
      router.push('/athlete').then(() => window.location.reload())
      return response
    },
  })

  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setPreview(
        acceptedFiles.map((upFile: File) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      )
      const uploadedFile: File | null = acceptedFiles[0] ? acceptedFiles[0] : null
      setFile(uploadedFile)
      if (!uploadedFile) {
        alert('Please select a valid file')
        return
      } else {
        const fileReader = new FileReader()
        fileReader.onloadend = async () => {
          const base64String = fileReader.result as string

          try {
            const response = await uploadImage.mutateAsync({
              file: base64String,
              filename: uploadedFile.name,
              mimetype: uploadedFile.type,
            })
            setUploadUrl(response.url)
          } catch (err) {
            console.error('Upload failed:', err)
          }
        }
        fileReader.readAsDataURL(uploadedFile)
      }
    }
  }, [])

  useEffect(() => {
    if (
      !hasRun.current &&
      formData &&
      Object.keys(formData)?.length > 0 &&
      formData?.sportId &&
      formData?.batch &&
      athleteId
    ) {
      const finalCoachSports = [
        {
          sportsId: parseInt(formData.sportId),
          batchId: parseInt(formData.batch),
          athleteId: athleteId,
          centerId: parseInt(formData.centerId),
          trainingLevel: formData.training_level,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const finalAtheleteBatches = [
        {
          sportId: parseInt(formData.sportId),
          batchId: parseInt(formData.batch),
          athleteId: athleteId,
          centerId: parseInt(formData.centerId),
          trainingLevel: formData.training_level,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      createMutateAthleteSports(finalCoachSports)
      createMutateAthleteBatches(finalAtheleteBatches)

      hasRun.current = true
    }
  }, [athleteId, JSON.stringify(formData)])

  const finalFormSubmissionHandler = (finalForm: any) => {
    if (academyId) {
      if (formData.isEditMode) {
        editMutate({
          name: finalForm.name,
          phone: finalForm.phone,
          email: finalForm.email,
          bloodGroup: finalForm.bloodGroup.value,
          gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
          dob: new Date(finalForm.dob),
          height: parseInt(finalForm.height),
          weight: parseInt(finalForm.weight),
          address: finalForm.address,
          medicalHistory: finalForm.medicalHistory,
          fatherName: finalForm.fatherName,
          heightUnit: 'cm',
          weightUnit: 'kg',
          image: uploadUrl || formData.image,
          updatedAt: new Date(),
          athleteId: id,
        })
      } else {
        createMutate({
          name: finalForm.name,
          phone: finalForm.phone,
          email: finalForm.email,
          bloodGroup: finalForm.bloodGroup.value,
          gender: finalForm.gender.value as (typeof GENDER_VALUES)[number],
          dob: new Date(finalForm.dob),
          height: parseInt(finalForm.height),
          weight: parseInt(finalForm.weight),
          address: finalForm.address,
          medicalHistory: finalForm.medicalHistory,
          fatherName: finalForm.fatherName,
          heightUnit: 'cm',
          weightUnit: 'kg',
          image: uploadUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
          academyCode: parseInt(academyId as string),
        })
      }
    }
  }

  return (
    <div className='bg-s-gray px-6 pb-7'>
      <FormContext.Provider value={formProviderData}>
        <FormProvider {...methods}>
          <div className='relative grid grid-cols-6 grid-rows-1'>
            <Card className='relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4'>
              {currentStep === 1 && <AddAthlete />}
              {currentStep === 2 && (
                <AddGeneralDetails finalFormSubmissionHandler={finalFormSubmissionHandler} />
              )}
            </Card>
            <Card className='col-span-2 hidden !rounded-l-none rounded-r-xl bg-stone-100 px-7 lg:block'>
              <div className='mb-10 font-heading text-2xl font-medium uppercase'>Athlete Image</div>

              <div>
                {preview.length ? (
                  preview.map((upFile, index) => {
                    return (
                      <div
                        className='previewImage mb-5 flex justify-center rounded-full'
                        key={index}
                      >
                        <ImageWithFallback
                          className='mx-auto mb-6 rounded-full'
                          src={upFile.preview}
                          alt='preview'
                          height={205}
                          width={205}
                          fallbackSrc='/images/fallback-1.png'
                        />
                      </div>
                    )
                  })
                ) : (
                  <div className='previewImage'>
                    <ImageWithFallback
                      src={formData.image || ''}
                      alt='preview'
                      height={205}
                      width={205}
                      className='mx-auto mb-6 rounded-full'
                      fallbackSrc='/images/fallback-1.png'
                    />
                  </div>
                )}
              </div>
              <div className='mb-14 flex justify-center'>
                <FileUpload onDrop={onDropCallback} />
              </div>
            </Card>
          </div>
        </FormProvider>
      </FormContext.Provider>
    </div>
  )
}
