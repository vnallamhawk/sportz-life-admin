/* eslint-disable */
import React, {useState, useContext, useCallback, useEffect, useRef} from 'react'
import Card from '~/components/Card'
import ImageWithFallback from '~/components/ImageWithFallback'
import {FormProvider, useForm} from 'react-hook-form'
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
import {FormContext} from '~/hooks/useMultiStepFormContext'

import AddAthlete from '../../../components/AddAthlete/AddAthlete'
import DashboardHeader from '~/components/DashboardHeader'
import AddGeneralDetails from '~/components/AddAthlete/AddGeneralDetails'
import {useSession} from 'next-auth/react'
import {Athletes} from '@prisma/client'
import Button from '~/components/Button'

export default function AddAthleteMultiFormLayout() {
  const router = useRouter()
  console.log(router)
  const id = Number(router?.query?.id)
  const {data: sessionData} = useSession()
  const [athleteId, setAthleteId] = useState<number>()

  const {setOpenToast} = useContext(ToastContext)
  const [preview, setPreview] = useState<(File & {preview: string})[]>([])
  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId
  const [file, setFile] = useState<File | null>(null)
  const [uploadUrl, setUploadUrl] = useState<string>('')
  const uploadImage = api.upload.uploadImage.useMutation()
  const athleteData = id && api.athlete.getAthleteById.useQuery({id})
  console.log({athleteData})
  const [currentStep, setCurrentStep] = useState<number>(1)
  const totalSteps = 3
  const methods = useForm({
    shouldUnregister: false,
  })
  const data = athleteData?.data
  const image = data?.image
  const [imageUrl, setImageUrl] = useState(image)
  const [signedS3Url, setSignedS3Url] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (router.asPath.includes('edit') && athleteData?.data) {
      methods.reset({
        ...athleteData.data,
        // batches: coachData?.data?.CoachCentersBatches?.map(({batchId}) => batchId),
        // centerId: coachData.data.centerId ?? undefined,
        // phone: coachData.data.phone ?? undefined,
        // email: coachData.data.email ?? undefined,
        // image: coachData.data.image ?? undefined,
        // coachingSports: coachData?.data?.CoachSportsMaps?.map(({sportId}) => sportId),
      })
    }
  }, [athleteData?.data])

  //  useEffect(() => {
  //     if (router.asPath.includes('edit') && coachData?.data) {
  //       methods.reset({
  //         ...coachData.data,
  //         batches: coachData?.data?.CoachCentersBatches?.map(({batchId}) => batchId),
  //         centerId: coachData.data.centerId ?? undefined,
  //         phone: coachData.data.phone ?? undefined,
  //         email: coachData.data.email ?? undefined,
  //         image: coachData.data.image ?? undefined,
  //         coachingSports: coachData?.data?.CoachSportsMaps?.map(({sportId}) => sportId),
  //       })
  //     }
  //   }, [coachData?.data, methods.getValues('isEditMode')])

  // const formProviderData = {
  //   ...methods,
  //   stepData: {currentStep, setCurrentStep},
  //   multiFormData: {formData, setFormData},
  // }

  const {mutate: createMutate} = api.athlete.createAthlete.useMutation({
    onSuccess: (response) => {
      console.log('response data is ', response)
      setOpenToast(true)
      setAthleteId(response?.id)

      return response
    },
  })

  const {mutate: editMutate} = api.athlete.editAthlete.useMutation({
    onSuccess: (response) => {
      console.log('response data is ', response)
      setOpenToast(true)
      setAthleteId(response?.id)
      return response
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

  // useEffect(() => {
  //   if (
  //     !hasRun.current && // Ensure it runs only once
  //     formData &&
  //     Object.keys(formData)?.length > 0 &&
  //     formData?.sportId &&
  //     formData?.batch &&
  //     athleteId
  //   ) {
  //     const finalCoachSports = [
  //       {
  //         sportsId: parseInt(formData.sportId),
  //         batchId: parseInt(formData.batch),
  //         athleteId: athleteId,
  //         centerId: parseInt(formData.centerId),
  //         trainingLevel: formData.training_level,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ]

  //     const finalAtheleteBatches = [
  //       {
  //         sportId: parseInt(formData.sportId),
  //         batchId: parseInt(formData.batch),
  //         athleteId: athleteId,
  //         centerId: parseInt(formData.centerId),
  //         trainingLevel: formData.training_level,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ]

  //     createMutateAthleteSports(finalCoachSports)
  //     createMutateAthleteBatches(finalAtheleteBatches)

  //     hasRun.current = true // Prevent further executions
  //   }
  // }, [athleteId, JSON.stringify(formData)])

  const finalFormSubmissionHandler = (finalForm: any) => {
    if (academyId) {
      // @ts-expect-error
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
          // centerId: parseInt(finalForm.centerId.value),
          fatherName: finalForm.fatherName,
          heightUnit: 'cm',
          weightUnit: 'kg',
          image: uploadUrl,
          updatedAt: new Date(),
          athleteId: id,
        })
      } else {
        // eslint-disable-next-line no-console
        createMutate({
          name: finalForm.name,
          phone: finalForm.phone,
          email: finalForm.email,
          bloodGroup: finalForm.bloodGroup,
          gender: finalForm.gender,
          dob: new Date(finalForm.dob),
          height: parseInt(finalForm.height),
          weight: parseInt(finalForm.weight),
          address: finalForm.address,
          medicalHistory: finalForm.medicalHistory,
          // centerId: parseInt(finalForm.centerId.value),
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
      {/* <FormContext.Provider value={{currentStep, setCurrentStep, totalSteps}}> */}
      <FormContext.Provider value={{currentStep, setCurrentStep, totalSteps}}>
        <FormProvider {...methods}>
          <div className='relative grid grid-cols-6 grid-rows-1'>
            <Card className='relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4'>
              <div className=' text-center font-heading text-3xl font-medium uppercase lg:text-left'>
                {router?.asPath?.includes('edit') ? 'EDIT ATHLETE' : 'ADD ATHLETE'}
              </div>
              {currentStep === 1 && <AddAthlete />}
              {currentStep === 2 && (
                <AddGeneralDetails
                // finalFormSubmissionHandler={finalFormSubmissionHandler}
                />
              )}
              <div className='flex justify-end'>
                {currentStep > 1 && (
                  <Button
                    type='button'
                    className='ml-3 mt-10 w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5'
                    onClick={() => setCurrentStep?.(currentStep - 1)}
                  >
                    Prev
                  </Button>
                )}
                {currentStep && totalSteps && currentStep < totalSteps && (
                  <Button
                    type='button'
                    className='ml-3 mt-10 w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5'
                    onClick={() => {
                      setCurrentStep(currentStep + 1)
                    }}
                  >
                    Next
                  </Button>
                )}
                {currentStep === totalSteps && (
                  <Button
                    type='button'
                    className='ml-3 mt-10 w-full rounded-full !border-0 bg-mandy-dark px-5 py-3   text-white outline-0 hover:bg-mandy-dark focus:outline-none focus:ring focus:ring-0 lg:w-auto lg:rounded lg:py-1.5'
                    onClick={() => finalFormSubmissionHandler(methods.getValues())}
                  >
                    Finish
                  </Button>
                )}
              </div>
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
                      src={''}
                      alt='preview'
                      height={205}
                      width={205}
                      className='mx-auto mb-6 rounded-full'
                      fallbackSrc='/images/fallback-1.png'
                    />
                  </div>
                )}
                <div className='mb-14 flex justify-center'>
                  <FileUpload onDropCallback={onDropCallback} />{' '}
                </div>
              </div>
              <div>
                <div className='mb-5 font-bold'>Note</div>
                <ul className='list-disc pl-5 text-gray-500'>
                  <li>Please upload jpg, png, .tiff file formats only</li>
                  <li>Maximum Size 100 MB</li>
                  <li>Minimum dimension 500px width by 500px height</li>
                </ul>
              </div>
            </Card>
          </div>
        </FormProvider>
      </FormContext.Provider>
    </div>
  )
}
