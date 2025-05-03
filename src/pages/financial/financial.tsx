import Card from '../../components/Card/Card'
import BarChart from '~/components/BarChart'
import LineChart from '~/components/LineChart'
import Image from 'next/image'
import ArrowUp from '../../images/arrow-up-green.png'
// import {useState} from 'react'

import {
  ageWiseCountData,
  centerWiseCountData,
  headCountTrendData,
  sportsWiseCountData,
} from '../../__stubs__/dashboardStubs'
// import TotalRevenue from "./totalrevenue/totalrevenue";

export default function Financial() {
  return (
    <>
      {/* <TotalRevenue /> */}
      <div className=' px-6 pb-10'>
        <div className='grid grid-cols-12 gap-4 lg:gap-7'>
          <div className='col-span-6'>
            <div className='grid grid-cols-12 gap-4 lg:gap-7'>
              <div className='col-span-6'>
                <Card className='bg-[#F6EAEF]'>
                  <div className='mb-2'>
                    <div className='mb-4 text-base font-bold text-[#404469]'>Total Revenue</div>
                    <div className='font-heading text-5xl font-normal text-[#404469]'>$ 35,593</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-xs uppercase text-[#974062] '>From last month 6%</div>
                    <div className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                      <Image
                        width={0}
                        height={0}
                        src={ArrowUp}
                        alt='arrow'
                        className='h-auto w-auto'
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-span-6'>
                <Card className='bg-[#FCCDD7]'>
                  <div className='mb-2'>
                    <div className='mb-4 text-base font-bold text-[#404469]'>Total Net figures</div>
                    <div className='font-heading text-5xl font-normal text-[#404469]'>$ 95,594</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-xs uppercase text-[#F3476D] '>From last month 6%</div>
                    <div className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                      <Image
                        width={0}
                        height={0}
                        src={ArrowUp}
                        alt='arrow'
                        className='h-auto w-auto'
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-span-6'>
                <Card className='bg-[#D0D2E2]'>
                  <div className='mb-2'>
                    <div className='mb-4 text-base font-bold text-[#404469]'>
                      Total Expenditures
                    </div>
                    <div className='font-heading text-5xl font-normal text-[#404469]'>$ 15,590</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-xs uppercase text-[#007FFF] '>From last month 6%</div>
                    <div className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                      <Image
                        width={0}
                        height={0}
                        src={ArrowUp}
                        alt='arrow'
                        className='h-auto w-auto'
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <div className='col-span-6'>
                <Card className='bg-[#FFE5DE]'>
                  <div className='mb-2'>
                    <div className='mb-4 text-base font-bold text-[#404469]'>Total Payroll</div>
                    <div className='font-heading text-5xl font-normal text-[#404469]'>$ 25,854</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-xs uppercase text-[#FF9678] '>From last month 6%</div>
                    <div className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-white'>
                      <Image
                        width={0}
                        height={0}
                        src={ArrowUp}
                        alt='arrow'
                        className='h-auto w-auto'
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className='col-span-6'>
            <Card title='Overall Revenue Analytics' className='bg-white'>
              <LineChart data={headCountTrendData} />
            </Card>
          </div>
        </div>
        <div className='mt-7 grid grid-cols-12 gap-4 lg:gap-7'>
          <div className='col-span-4'>
            <Card title='Center Wise Revenue' className='bg-white'>
              <BarChart data={centerWiseCountData} />
            </Card>
          </div>
          <div className='col-span-4'>
            <Card title='Sports Wise Revenue' className='bg-white'>
              <BarChart data={sportsWiseCountData} />
            </Card>
          </div>
          <div className='col-span-4'>
            <Card title='Age Wise Revenue' className='bg-white'>
              <BarChart data={ageWiseCountData} />
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
