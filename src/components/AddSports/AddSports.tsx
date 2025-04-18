import React, {useContext, useEffect, useState} from 'react'
import {FormContext} from '~/pages/centers/AddCenter/AddCenterForm'
import {api} from '~/utils/api'
import AddSportModal from './AddSportModal'
import {useSession} from 'next-auth/react'
import AddForm from '~/common/AddForm/AddForm'
import {SPORTS_TABLE_HEADERS} from '~/constants/sportConstants'

interface Options {
  label: string | undefined
  value: string | number | undefined
}

export interface SportDetails {
  name: string
  subTitle: string
  image?: any
  about?: string
}
const AddSports = () => {
  const [sports, setSports] = useState<{[key: string]: any}[]>([])
  const [finalOptions, setFinalOptions] = useState<Options[]>([])
  const [showModal, setShowModal] = useState(false)
  const [sportDetails, setSportDetails] = useState<SportDetails>({
    name: '',
    subTitle: '',
    about: '',
  })
  const {data: sessionData} = useSession()

  const createdBy = sessionData?.token ? sessionData?.token?.id : sessionData?.user?.id
  // const academyId = sessionData?.token
  //   ? sessionData?.token?.academyId
  //   : sessionData?.user?.academyId;

  const {data: allSports} = api.sports.getAllSports.useQuery()

  const {mutate: createMutate} = api.sports.createSports.useMutation({
    onSuccess: (response) => {
      const arr: Options[] = [...finalOptions]
      arr.push({label: response?.name, value: response?.id})
      setFinalOptions(arr)
    },
  })
  useEffect(() => {
    if (allSports && allSports?.length > 0) {
      const arr: Options[] = []
      for (let i = 0; i < allSports.length; i++) {
        const index =
          sports && sports?.length > 0
            ? sports?.findIndex(
                (item: {[key: string]: any}) => item?.name === finalOptions[i]?.value
              )
            : -1
        if (index === -1) {
          arr.push({label: allSports[i]?.name, value: allSports[i]?.id})
        }
      }

      setFinalOptions(arr)
    }
  }, [sports, allSports, finalOptions])

  const {
    stepData: {currentStep, setCurrentStep},
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    multiFormData: {formData, setFormData},
  } = useContext(FormContext)

  const onSaveSports = (currentSportData: {[key: string]: any}) => {
    const arr: {[key: string]: any}[] = [...sports]
    arr.push({
      // eslint-disable-next-line
      name: currentSportData?.name,
      // eslint-disable-next-line
      sportId: parseInt(currentSportData?.value),
    })

    setSports(arr)
  }

  const removeSports = (index: number) => {
    const arr = [...sports]
    arr.splice(index, 1)
    setSports(arr)
  }

  const addNewSport = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (createdBy) {
      createMutate({
        name: sportDetails.name,
        about: sportDetails.name,
        subTitle: sportDetails.subTitle,
        image: '',
        // createdBy: parseInt(createdBy as string),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      setShowModal(false)
    }

    // api for create sport
  }

  return (
    <>
      {/* Modal */}
      {showModal && (
        <AddSportModal
          show={showModal}
          setShow={setShowModal}
          sportDetails={sportDetails}
          setSportDetails={setSportDetails}
          handleSport={addNewSport}
        />
      )}
      <AddForm
        cardTitle='ADD CENTER'
        tableTitle='ADD SPORTS'
        tableDescription={'Hi!First things first'}
        tableFields={[
          {
            type: 'select',
            name: 'name',
            placeholder: 'Select Sports',
            options: finalOptions,
          },
        ]}
        TableHeadings={SPORTS_TABLE_HEADERS}
        tablekey='sports'
        tableData={sports}
        addTableData={onSaveSports}
        buttonItems={{prevNext: true}}
        setFormData={setFormData}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        formData={formData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        addTableButtonText={'Add New Sport'}
        mobileAddButtonText='Add another Sport'
        addTableButton={() => {
          setShowModal(!showModal)
        }}
        onRemoveTableButton={removeSports}
      />
    </>
  )
}

export default AddSports
