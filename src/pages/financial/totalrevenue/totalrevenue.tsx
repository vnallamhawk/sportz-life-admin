import React from 'react'
import {CgCalendarDates} from 'react-icons/cg'
// import Button from '~/components/Button'
import Card from '~/components/Card'
import Textbox from '~/components/Textbox'

export default function TotalRevenue() {
  // const [startDate, setStartDate] = React.useState(new Date());
  return (
    <div className='bg-s-gray px-6 pb-7'>
      <Card className='rounded-2xl shadow-sm lg:bg-white lg:p-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='font-heading text-2xl font-medium '>Total Revenue</div>
          <div className='flex items-center'>
            <div className='flex items-center justify-end'>
              <div className='mr-3 text-sm font-bold text-[#5A5A5A]'>Date Range</div>
              <div className='flex w-3/6 items-center'>
                <div>
                  <Textbox
                    placeHolder='From'
                    className='w-full rounded-r-none border-r-0'
                  ></Textbox>
                  <CgCalendarDates className='date-picker-icon'></CgCalendarDates>
                </div>
                <div>
                  <Textbox
                    placeHolder='To'
                    className='w-full rounded-l-none rounded-r-none'
                  ></Textbox>
                  <CgCalendarDates className='date-picker-icon'></CgCalendarDates>
                </div>
                <button className='rounded-r-lg bg-[#F3476D] px-5 py-2 py-2 leading-relaxed text-white focus:outline-none focus:ring focus:ring-0'>
                  Search
                </button>
              </div>
            </div>

            <button className='ml-3 rounded-lg bg-[#404469] px-5 py-2 text-white'>
              Export Statement
            </button>
          </div>
        </div>
        <table className='common-table w-full min-w-max table-auto  border-separate border-spacing-y-3 text-left'>
          <thead>
            <tr>
              <th className='w-20 font-medium text-gray-400'>ID</th>
              <th className='w-20 font-medium text-gray-400'>Center Name</th>
              <th className='w-20 font-medium text-gray-400'>Batch Name</th>
              <th className='w-20 font-medium text-gray-400'>Batch Fee</th>
              <th className='w-20 font-medium text-gray-400'>Payment Date</th>
              <th className='w-20 font-medium text-gray-400'>Mode of Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#10020</td>
              <td>Indoor Stadium</td>
              <td>Soccer Advanced Team</td>
              <td>$99.00</td>
              <td>Mar 01, 2023</td>
              <td>Net Banking</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}
