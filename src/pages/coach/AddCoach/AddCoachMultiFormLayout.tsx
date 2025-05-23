import React, {useState, useCallback, useEffect} from 'react'
import Card from '~/components/Card'
import ImageWithFallback from '~/components/ImageWithFallback'
import {FormProvider, useForm} from 'react-hook-form'
import AddCoach from '../../../components/AddCoach/AddCoach'
import AddCoachCertificates from '~/components/AddCoach/AddCoachCertificates'
import AssignBatches from '~/components/AddCoach/AssignCenterBatches'
import {type MULTI_FORM_TYPES} from '~/types/coach'
import {api} from '~/utils/api'
import {useRouter} from 'next/router'
import FileUpload from '~/components/FileUpload'
import {useSession} from 'next-auth/react'
import {FormContext} from '~/hooks/useMultiStepFormContext'
import Button from '~/components/Button'
import CardTitle from '~/components/Card/CardTitle'

const multiFormData: MULTI_FORM_TYPES = {
  contactNumber: '',
  name: '',
  designation: '',
  email: '',
  about: '',
  dateOfBirth: '',
  payroll: '',
  coachingSports: [],
  certificates: undefined,
  batchIds: [],
  centerIds: [],
  coachId: undefined,
  CoachQualifications: [],
  Batches: {
    id: 0,
    name: '',
    capacity: 0,
    remainingSeat: 0,
    occupiedSeat: 0,
    academyId: 0,
    sportId: 0,
    coachId: null,
    centerId: 0,
    status: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    feePlanId: 0,
    trainingLevel: 'beginner',
  },
  phone: '',
  image: '',
  batches: [],
  CoachCentersBatches: [],
}

export default function AddCoachMultiFormLayout() {
  const router = useRouter()
  const id = Number(router?.query?.id)
  const methods = useForm({
    defaultValues: multiFormData,
    shouldUnregister: false,
  })
  const [currentStep, setCurrentStep] = useState<number>(1)
  const {data: sessionData} = useSession()
  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId
  const uploadImage = api.upload.uploadImage.useMutation()
  const coachData = id ? api.coach.getCoachById.useQuery({id}) : undefined
  const data = coachData?.data
  const image = data?.image
  const [imageUrl, setImageUrl] = useState(image)
  const [signedS3Url, setSignedS3Url] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (image) {
      setImageUrl(image)
    }
  }, [image])

  const getSignedUrlForImage = async (key: string) => {
    try {
      const response = await fetch(`/api/aws/getAwsSignedURL?key=${encodeURIComponent(key)}`)
      if (!response.ok) throw new Error('Failed to fetch signed URL')

      const data = (await response.json()) as {url: string} // Type assertion here
      setSignedS3Url(data.url)
    } catch (error) {
      console.error('Error fetching signed URL:', error)
    }
  }

  useEffect(() => {
    if (router.asPath.includes('edit') && coachData?.data) {
      methods.reset({
        ...coachData.data,
        batches: coachData?.data?.CoachCentersBatches?.map(({batchId}) => batchId),
        centerId: coachData.data.centerId ?? undefined,
        phone: coachData.data.phone ?? undefined,
        email: coachData.data.email ?? undefined,
        image: coachData.data.image ?? undefined,
        coachingSports: coachData?.data?.CoachSportsMaps?.map(({sportId}) => sportId),
      })
    }
  }, [coachData?.data, methods.getValues('isEditMode')])

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (imageUrl) {
        await getSignedUrlForImage(imageUrl)
      }
    }

    void fetchSignedUrl()
  }, [imageUrl])

  const {mutate: createMutate} = api.coach.createCoach.useMutation({
    onSuccess: async (response) => {
      await router.push('/coach')
      return response
    },
  })

  const {mutate: editMutate} = api.coach.editCoach.useMutation({
    onSuccess: (response) => {
      void router.push(`/coach/${response?.id ?? ''}`).then(() => window.location.reload())
    },
  })

  const onDropCallback = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const uploadedFile: File | null = acceptedFiles[0] ? acceptedFiles[0] : null
      if (!uploadedFile) {
        alert('Please select a valid file')
        return
      } else {
        setPreviewUrl(URL.createObjectURL(uploadedFile))
        const fileReader = new FileReader()
        fileReader.onloadend = async () => {
          let base64String = fileReader.result as string

          if (base64String.startsWith('data:')) {
            base64String = base64String.split(',')[1] as string // Get the part after the comma
          }

          try {
            const response = await uploadImage.mutateAsync({
              file: base64String,
              filename: uploadedFile.name,
              mimetype: uploadedFile.type,
              key: 'coach',
            })
            setImageUrl(response.url)
          } catch (err) {
            console.error('Upload failed:', err)
          }
        }
        fileReader.readAsDataURL(uploadedFile)
      }
    }
  }, [])

  // const {mutate: createMutateCoachSports} = api.coachSports.createCoachSports.useMutation({
  //   onSuccess: (response) => {
  //     return response
  //   },
  // })
  // const {mutate: createMutateCoachCertificates} =
  //   api.coachCertificate.createCoachCertificates.useMutation({
  //     onSuccess: (response) => {
  //       return response
  //     },
  //   })

  // const {mutate: createMutateCoachBatches} = api.coachBatches.createCoachbatches.useMutation({
  //   onSuccess: (response) => {
  //     return response
  //   },
  // })

  const finalFormSubmissionHandler = (finalForm: MULTI_FORM_TYPES) => {
    const {batches, gender, trainingLevel, experience, experienceLevel, centerId, phone, email} =
      finalForm
    if (createdBy && academyId && gender && trainingLevel && experienceLevel && phone && email) {
      if (router.asPath.includes('edit')) {
        const hasCertificatedUpdated =
          finalForm.CoachQualifications.length !== coachData?.data?.CoachQualifications?.length ||
          finalForm.CoachQualifications?.[0]?.certificateType !==
            coachData.data?.CoachQualifications?.[0]?.certificateType

        editMutate({
          name: finalForm.name,
          phone: phone,
          email: email,
          designation: finalForm.designation,
          gender,
          dateOfBirth: new Date(finalForm.dateOfBirth),
          experienceLevel,
          trainingLevel,
          updatedAt: new Date(),
          createdAt: new Date(),
          academyId: Number(academyId),
          image: imageUrl ? imageUrl : undefined,
          coachId: id,
          coachQualifications: hasCertificatedUpdated
            ? finalForm.CoachQualifications.map((coachQualification) => {
                if (!coachQualification.certificateType) {
                  throw new Error('Certificate type is required for all qualifications')
                }
                if (
                  !coachQualification.startDate ||
                  !coachQualification.endDate ||
                  !coachQualification.instituteName
                ) {
                  throw new Error(
                    'Institute Name, Start and end dates are required for all qualifications'
                  )
                }
                return {
                  ...coachQualification,
                  certificateType: coachQualification.certificateType,
                  startDate: coachQualification.startDate,
                  endDate: coachQualification.endDate,
                  instituteName: coachQualification.instituteName,
                  fileUrl: '',
                  fileType: 'link',
                  fileName: null,
                }
              })
            : [],
        })
      } else {
        if (centerId && experience && batches) {
          createMutate({
            name: finalForm.name,
            phone: phone,
            email: email,
            experience,
            designation: finalForm.designation,
            gender,
            dateOfBirth: new Date(finalForm.dateOfBirth),
            trainingLevel,
            createdBy: parseInt(createdBy as string),
            createdAt: new Date(),
            updatedAt: new Date(),
            academyId: Number(academyId),
            image: finalForm.image,
            about: '',
            experienceLevel,
            centerId,
            sports: finalForm.coachingSports?.map((sport) => Number(sport)),
            coachQualifications: finalForm.CoachQualifications.map((coachQualification) => {
              if (!coachQualification.certificateType) {
                throw new Error('Certificate type is required for all qualifications')
              }
              if (
                !coachQualification.startDate ||
                !coachQualification.endDate ||
                !coachQualification.instituteName
              ) {
                throw new Error(
                  'Institute Name, Start and end dates are required for all qualifications'
                )
              }

              return {
                ...coachQualification,
                certificateType: coachQualification.certificateType,
                startDate: coachQualification.startDate,
                endDate: coachQualification.endDate,
                instituteName: coachQualification.instituteName,
                fileUrl: '',
                fileType: 'link',
                fileName: null,
              }
            }),
            batches: batches,
          })
        }
      }
    }
  }
  const totalSteps = 3

  return (
    <FormContext.Provider value={{currentStep, setCurrentStep, totalSteps}}>
      <FormProvider {...methods}>
        <CardTitle
          className='ml-20'
          title={router.asPath.includes('edit') ? 'EDIT COACH' : 'ADD COACH'}
        />

        <div className='grid grid-cols-6 grid-rows-1'>
          <Card className='col-span-4 ml-10 h-full p-0 pl-10 pt-10'>
            {currentStep === 1 && <AddCoach />}
            {currentStep === 2 && <AddCoachCertificates />}
            {currentStep === 3 && <AssignBatches />}

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
            <div className='mb-10 font-heading text-2xl font-medium uppercase'>Coach Image</div>

            <div>
              {previewUrl || signedS3Url ? (
                <div className='previewImage mb-5 flex justify-center rounded-full'>
                  <img
                    className='mx-auto mb-6 rounded-full'
                    src={previewUrl || signedS3Url}
                    alt='preview'
                    height={205}
                    width={205}
                  />
                </div>
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
                <FileUpload onDropCallback={onDropCallback} multiple={false} />
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
        {/* </FormContext.Provider> */}
      </FormProvider>
    </FormContext.Provider>
  )
}
