import CardList from '~/components/Card/CardList'
import Card from '../../components/Card/Card'
import CardStats from '../../components/Card/CardStats'
import BarChart from '~/components/BarChart'
import LineChart from '~/components/LineChart'
import Image from 'next/image'
import LittleBoy from '../../images/little-boy.svg'
import ShortGirl from '../../images/short-girl.svg'
import {useState} from 'react'
import Calendar from 'react-calendar'
import Bollyball from '../../images/bollyball.svg'
import ArrowLeft from '../../images/arrow-left-gray.svg'
// import { api } from "~/utils/api";

import {
  ageWiseCountData,
  centerWiseCountData,
  headCountTrendData,
  sportsWiseCountData,
} from '../../__stubs__/dashboardStubs'
type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function Dashboard() {
  const [value, onChange] = useState<Value>(new Date())
  // const { mutate: createMutate } = api.assessment.createAssessment.useMutation({
  //   onSuccess: (response) => {
  //     return response?.id;
  //   },
  // });
  // const { data: assessments } = api.assessment.getAllAssessments.useQuery({
  //   page: 1,
  //   limit: 1,
  //   sports: [1],
  //   levels: ["beginner"],
  //   assessmentStatuses: ["ongoing"],
  // });

  // useEffect(() => {
  //   createMutate({
  //     testBanks: [1],
  //     status: true,
  //     name: "assessment 1",
  //     academyId: 1,
  //     centerId: 1,
  //     sportId: 1,
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     description: "description",
  //     level: "beginner",
  //     isAthleteAssess: true,
  //     isCoachAssess: true,
  //     isStrengthAdded: true,
  //     isWeaknessAdded: true,
  //     isCommentsAdded: true,
  //     mode: "recurring",
  //     interval: "weekly",
  //     participants: [
  //       {
  //         centerId: 1,
  //         sportId: 1,
  //         batchId: 1,
  //         athleteId: 1,
  //       },
  //     ],
  //     assessmentStatus: "ongoing",
  //   });
  // }, []);

  return (
    <div className='px-6'>
      <div className='flex items-start'>
        <div className='flex grow flex-col'>
          <div className='mb-5 flex grow justify-between'>
            <div className='font-heading text-2xl font-medium '>STATISTICS</div>
            <div className='flex items-center'>
              <button className='ml-2 h-2 w-4 rounded-lg bg-theme-light'></button>
              <button className='ml-2 h-2 w-2 rounded bg-gray-300'></button>
              <button className='ml-2 h-2 w-2 rounded bg-gray-300'></button>
            </div>
          </div>
          {/* w-9/12 */}
          <div className='grid-rows-12 mb-5 grid w-full grow grid-cols-6 gap-4 lg:gap-7'>
            <CardStats
              className='col-start-1 col-end-7 row-start-1 row-end-2 bg-white lg:col-start-1 lg:col-end-3'
              imageSrc='/images/total-centers.png'
              title='Total Centers'
              count='25'
              percentChange='3'
            />
            <CardStats
              className='col-start-1 col-end-4 row-start-2 row-end-3 bg-white lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2'
              imageSrc='/images/total-batches.png'
              title='Total Batches'
              count='32'
              percentChange='3'
            />
            <CardStats
              className='col-start-4 col-end-7 row-start-2 row-end-3 bg-white lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-2'
              imageSrc='/images/total-staffs.png'
              title='Total Staff'
              count='66'
              percentChange='3'
            />
            {/* <Card
            title="GENDER RATIO"
            className="lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3 col-start-1 col-end-7  row-start-3 row-end-4 text-white bg-gray-950"
          >
            <div className="flex items-center"> Gender Ratio Content to be added</div>
          </Card> */}
            <div className='relative col-start-1 col-end-7 row-start-3 row-end-4 block py-4 lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3  lg:hidden lg:p-6 '>
              <div className='flex items-center justify-between'>
                <div className='block font-heading text-2xl font-medium lg:hidden'>
                  GENDER RATIO
                </div>
                {/* <button
                className="border-1 mx-3 bg-pink-600 hover:bg-pink-800 p-4 rounded-full"
                type="button"
              >
                <Image width={0} height={0} src={ArrowRight} className="w-auto h-auto" alt="" />
              </button> */}
              </div>
            </div>
            <div className='relative col-start-1 col-end-7 row-start-3 row-end-4 mt-20  rounded-2xl bg-gray-950 px-2 py-4 text-white shadow-sm lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3  lg:mt-0 lg:mt-5 lg:mt-8 lg:p-6'>
              <div className='flex items-center '>
                <div className='hidden font-heading text-2xl font-medium lg:mr-5 lg:block'>
                  GENDER RATIO
                </div>
                <div className='relative ml-0 flex grow lg:ml-10'>
                  <Image
                    width={0}
                    height={0}
                    src={LittleBoy}
                    className='absolute -bottom-[16px] left-0 max-w-[85px] lg:-bottom-[24px] lg:w-auto lg:max-w-none'
                    alt=''
                  />
                  <div className='pl-24 text-center lg:pl-36 lg:text-left'>
                    <div className='font-heading text-lg font-normal text-white lg:text-3xl'>
                      70%
                    </div>
                    <div className='text-xs text-blush-light lg:text-base'>125 - Male</div>
                  </div>
                </div>
                <div className='relative flex grow lg:ml-2'>
                  <Image
                    width={0}
                    height={0}
                    src={ShortGirl}
                    className='absolute -bottom-[16px] left-0 max-w-[85px] scale-x-[-1] transform lg:-bottom-[24px] lg:w-auto lg:max-w-none lg:scale-x-[1]'
                    alt=''
                  />
                  <div className='pl-24 text-center lg:pl-36 lg:text-left'>
                    <div className='font-heading text-lg font-normal text-white lg:text-3xl'>
                      30%
                    </div>
                    <div className='text-xs text-pink-600 lg:text-base'>97-Female</div>
                  </div>
                </div>
                {/* <div className="lg:block hidden">
                <button
                  className="border-1 mx-3 bg-pink-600 hover:bg-pink-800 p-4 rounded-full"
                  type="button"
                >
                  <Image width={0} height={0} src={ArrowRight} className="w-auto h-auto" alt="" />
                </button>
              </div> */}
              </div>
            </div>
            <Card
              title='CENTER WISE HEADCOUNT'
              className='col-start-1 col-end-7 row-start-4 row-end-6 bg-white lg:col-start-1 lg:col-end-4  lg:row-start-3 lg:row-end-6'
            >
              <BarChart data={centerWiseCountData} />
            </Card>
            <Card
              title='ACTIVITY CALENDAR'
              className='row-end-8 col-start-1 col-end-7 row-start-6 bg-white lg:col-start-4 lg:col-end-7  lg:row-start-3 lg:row-end-6'
            >
              <Calendar onChange={onChange} value={value} />
            </Card>
            <Card
              title='HEADCOUNT TREND DATA'
              className='lg:row-end-9 row-start-9 row-end-10 col-start-1 col-end-7 bg-white lg:col-start-1  lg:col-end-7 lg:row-start-6'
            >
              <LineChart data={headCountTrendData} />
            </Card>
            <Card
              title='AGE WISE BREAKUP'
              className='lg:row-end-9 lg:row-start-12 row-start-9 row-end-10 col-start-1 col-end-7 bg-white  lg:col-start-1 lg:col-end-4'
            >
              <BarChart data={ageWiseCountData} />
            </Card>
            <Card
              title='SPORTS WISE COUNT'
              className='lg:row-end-9 lg:row-start-12 row-start-9 row-end-10 col-start-1 col-end-7 bg-white  lg:col-start-4 lg:col-end-7'
            >
              <BarChart data={sportsWiseCountData} />
            </Card>
          </div>
        </div>
        <div className='lg:grid-rows-12 ml-6 hidden grid-rows-[repeat(3,minmax(400px,550px))] gap-3 lg:block lg:grid 2xl:w-3/12'>
          <CardList
            title='TOP PERFORMER'
            peoples={[
              {
                name: 'John H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports1.jpg',
              },
              {
                name: 'Joe H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports2.jpg',
              },
              {
                name: 'Norton H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports3.jpg',
              },
              {
                name: 'Sanjay H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports4.jpg',
              },
              {
                name: 'Valentine H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports5.jpg',
              },
              {
                name: 'Mal H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Yohan H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Prakash H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'John H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports1.jpg',
              },
              {
                name: 'Joe H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports2.jpg',
              },
              {
                name: 'Norton H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports3.jpg',
              },
              {
                name: 'Sanjay H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports4.jpg',
              },
              {
                name: 'Valentine H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports5.jpg',
              },
              {
                name: 'Mal H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Yohan H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Prakash H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
            ]}
            navRoute='/athletes'
          />
          <CardList
            title='TOP COACHES'
            peoples={[
              {
                name: 'John H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports1.jpg',
              },
              {
                name: 'Rak',
                subtitle: 'Volleyball',
                src: '/images/sports2.jpg',
              },
              {
                name: 'Rev',
                subtitle: 'Volleyball',
                src: '/images/sports3.jpg',
              },
              {
                name: 'Laxman Geeda',
                subtitle: 'Volleyball',
                src: '/images/sports4.jpg',
              },
              {
                name: 'Priyanka K',
                subtitle: 'Volleyball',
                src: '/images/sports5.jpg',
              },
              {
                name: 'Kaviya N',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Suma Manthena',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Maneesh P',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Bhanu Kumar',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: ' Alena Camford',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'John H.Martin',
                subtitle: 'Volleyball',
                src: '/images/sports1.jpg',
              },
              {
                name: 'Rak',
                subtitle: 'Volleyball',
                src: '/images/sports2.jpg',
              },
              {
                name: 'Rev',
                subtitle: 'Volleyball',
                src: '/images/sports3.jpg',
              },
              {
                name: 'Laxman Geeda',
                subtitle: 'Volleyball',
                src: '/images/sports4.jpg',
              },
              {
                name: 'Priyanka K',
                subtitle: 'Volleyball',
                src: '/images/sports5.jpg',
              },
              {
                name: 'Kaviya N',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Suma Manthena',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Maneesh P',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: 'Bhanu Kumar',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
              {
                name: ' Alena Camford',
                subtitle: 'Volleyball',
                src: '/images/sports6.jpg',
              },
            ]}
            navRoute='/coaches'
          />
          <Card className='relative h-fit bg-white' title='UPCOMING TOURNAMENT'>
            <div className='absolute right-4 top-7'>
              <button className=''>
                <Image
                  width={0}
                  height={0}
                  src={ArrowLeft}
                  className='h-auto w-auto contrast-0  filter '
                  alt=''
                />
              </button>
              <button className='ml-1 rotate-180'>
                <Image
                  width={0}
                  height={0}
                  src={ArrowLeft}
                  className='h-auto w-auto text-black brightness-200 contrast-200 filter'
                  alt=''
                />
              </button>
            </div>
            <div className='flex items-center'>
              <div className='relative h-[185px] w-[95px] rounded-lg bg-purple-900'>
                <Image
                  width={0}
                  height={0}
                  src={Bollyball}
                  alt=''
                  className='absolute -right-7 top-2/4 h-auto w-auto min-w-[95px] -translate-y-1/2'
                />
              </div>
              <div className='ml-8 '>
                <div className='font-heading text-xl font-medium leading-5'>
                  Annual Volleyball League2023
                </div>
                <div className='mt-2 text-sm text-gray-500'>
                  Hosted by <span className='text-blue-700'>Emille</span>
                </div>
                <div className='mt-4'>
                  <div className='text-xs'>From 15 Aug, 2023</div>
                  <div className='mt-2 text-xs'>From 15 Aug, 2023</div>
                </div>
                {/* <button className="mt-3 text-blue-700 font-bold">Register Now! </button> */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
