// import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import MultiTabComp from '~/common/MultiTabComp'
import {
  ATHLETE_SETTINGS_TABLE_HEADER,
  COACH_SETTINGS_TABLE_HEADER,
  STAFF_SETTINGS_TABLE_HEADER,
} from '~/constants/settingsConstants'
import {api} from '~/utils/api'

interface AthleteSettings {
  id: number
  name: string
  batchName: string
  centerName: string
  sportName: string
  trainingLevel: string
}

interface CoachSettings {
  id: number
  name: string
  experience: string
  centerName: string
  sportName: string
  trainingLevel: string
}

interface StaffSettings {
  id: number
  email: string
  name: string
  phone: string
}

export default function Setting() {
  const [activeKey, setActiveKey] = useState('0')
  const [athleteSettingsData, setAthleteSettingsData] = useState<AthleteSettings[]>()
  const [coachSettingsData] = useState<CoachSettings[]>()
  const [staffSettingsData, setStaffSettingsData] = useState<StaffSettings[]>()

  const {data: athletesData} = api.athlete.getAthletesDataByAcademyId.useQuery()
  //   const {data: coachesData} = api.coach.getCoachesDataByAcademyId.useQuery()
  const {data: staffsData} = api.staff.getAllStaffsData.useQuery()

  useEffect(() => {
    if (athletesData && athletesData.length > 0) {
      const extractedData = athletesData.flatMap(
        (athlete: {AthleteSportsMaps: any[]; name: string; id: number}) =>
          athlete.AthleteSportsMaps.map(
            (sportMap: {
              Centers: {name: string}
              trainingLevel: string
              Sports: {name: string}
              Batches: {name: string}
            }) => ({
              id: athlete.id,
              name: athlete.name,
              centerName: sportMap.Centers.name,
              trainingLevel: sportMap.trainingLevel,
              sportName: sportMap.Sports.name,
              batchName: sportMap.Batches.name,
            })
          )
      )

      setAthleteSettingsData(extractedData)
    }
  }, [athletesData])

  //   useEffect(() => {
  //     if (coachesData && coachesData.length > 0) {
  //       const extractedData = coachesData.flatMap(
  //         (coach: {
  //           CoachSportsMaps: any[]
  //           name: string
  //           Centers: {name: string}
  //           trainingLevel: string
  //           experience: string
  //           id: number
  //         }) =>
  //           coach.CoachSportsMaps.map((sportMap) => ({
  //             id: coach.id,
  //             name: coach.name,
  //             centerName: coach?.Centers?.name || '',
  //             trainingLevel: coach.trainingLevel,
  //             experience: coach.experience,
  //             sportName: sportMap.Sports.name,
  //           }))
  //       )

  //       setCoachSettingsData(extractedData)
  //     }
  //   }, [coachesData])

  useEffect(() => {
    // @ts-expect-error need to fix this
    setStaffSettingsData(staffsData)
  }, [staffsData])

  // const router = useRouter();
  return (
    <>
      {/* <Checkout /> */}
      <MultiTabComp
        tab1label='Athlete'
        tab2label='Coach'
        tab3label='Staff'
        dropdownItems={{}}
        table1show={true}
        table2show={true}
        table3show={true}
        TABLE1_HEAD={ATHLETE_SETTINGS_TABLE_HEADER}
        TABLE2_HEAD={COACH_SETTINGS_TABLE_HEADER}
        TABLE3_HEAD={STAFF_SETTINGS_TABLE_HEADER}
        TABLE1_ROWS={athleteSettingsData ?? []}
        TABLE2_ROWS={coachSettingsData ?? []}
        TABLE3_ROWS={staffSettingsData ?? []}
        filters={[]}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      />
    </>
  )
}
