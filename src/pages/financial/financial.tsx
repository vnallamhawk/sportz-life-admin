
import Card from "../../components/Card/Card";
import BarChart from "~/components/BarChart";
import LineChart from "~/components/LineChart";
import Image from "next/image";
import ArrowUp from "../../images/arrow-up-green.png";
import { useState } from 'react';

import {
  ageWiseCountData,
  centerWiseCountData,
  headCountTrendData,
  sportsWiseCountData,
} from "../../__stubs__/dashboardStubs";
import TotalRevenue from "./totalrevenue/totalrevenue";

export default function Financial() {
  return (
    <>
    {/* <TotalRevenue /> */}
    <div className=" px-6 pb-10">
      <div className="grid grid-cols-12 gap-4 lg:gap-7">
        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-4 lg:gap-7">
            <div className="col-span-6">
              
              <Card className="bg-[#F6EAEF]">
                <div className="mb-2">
                  <div className="font-bold text-base text-[#404469] mb-4">Total Revenue</div>
                  <div className="text-5xl font-normal font-heading text-[#404469]">$ 35,593</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#974062] uppercase ">From last month 6%</div>
                  <div className="w-6 h-6 rounded-full bg-white inline-flex justify-center items-center">
                    <Image width={0} height={0} src={ArrowUp} alt="arrow" className="w-auto h-auto" />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-6">
              <Card className="bg-[#FCCDD7]">
                <div className="mb-2">
                  <div className="font-bold text-base text-[#404469] mb-4">Total Net figures</div>
                  <div className="text-5xl font-normal font-heading text-[#404469]">$ 95,594</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#F3476D] uppercase ">From last month 6%</div>
                  <div className="w-6 h-6 rounded-full bg-white inline-flex justify-center items-center">
                    <Image width={0} height={0} src={ArrowUp} alt="arrow" className="w-auto h-auto" />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-6">
              <Card className="bg-[#D0D2E2]">
                <div className="mb-2">
                  <div className="font-bold text-base text-[#404469] mb-4">Total Expenditures</div>
                  <div className="text-5xl font-normal font-heading text-[#404469]">$ 15,590</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#007FFF] uppercase ">From last month 6%</div>
                  <div className="w-6 h-6 rounded-full bg-white inline-flex justify-center items-center">
                    <Image width={0} height={0} src={ArrowUp} alt="arrow" className="w-auto h-auto" />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-6">
              <Card className="bg-[#FFE5DE]">
                <div className="mb-2">
                  <div className="font-bold text-base text-[#404469] mb-4">Total Payroll</div>
                  <div className="text-5xl font-normal font-heading text-[#404469]">$ 25,854</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[#FF9678] uppercase ">From last month 6%</div>
                  <div className="w-6 h-6 rounded-full bg-white inline-flex justify-center items-center">
                    <Image width={0} height={0} src={ArrowUp} alt="arrow" className="w-auto h-auto" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <Card
            title="Overall Revenue Analytics"
            className="bg-white"
          >
            <LineChart data={headCountTrendData} />
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 lg:gap-7 mt-7">
        <div className="col-span-4">
          <Card
            title="Center Wise Revenue"
            className="bg-white"
          >
            <BarChart data={centerWiseCountData} />
          </Card>
        </div>
        <div className="col-span-4">
          <Card
            title="Sports Wise Revenue"
            className="bg-white"
          >
            <BarChart data={sportsWiseCountData} />
          </Card>
        </div>
        <div className="col-span-4">
          <Card
            title="Age Wise Revenue"
            className="bg-white"
          >
            <BarChart data={ageWiseCountData} />
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
