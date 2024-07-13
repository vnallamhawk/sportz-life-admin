import CardList from "~/components/Card/CardList";
import Card from "../../components/Card/Card";
import CardStats from "../../components/Card/CardStats";
import BarChart from "~/components/BarChart";
import LineChart from "~/components/LineChart";
import Image from "next/image";
import LittleBoy from "../../images/little-boy.svg";
import ShortGirl from "../../images/short-girl.svg";
import ArrowRight from "../../images/Vector.png";
import { useState } from 'react';
import Calendar from 'react-calendar';
import Bollyball from "../../images/bollyball.svg";
import ArrowLeft from "../../images/arrow-left-gray.svg"
import DashboardHeader from "~/components/DashboardHeader";

import {
  ageWiseCountData,
  centerWiseCountData,
  headCountTrendData,
  sportsWiseCountData,
} from "../../__stubs__/dashboardStubs";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function dashboard() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div >
 
      
      
      <div className="flex items-start">
        <div className="flex flex-col grow" >
      <div className="mb-5 grow flex justify-between"> 
        <div className="text-2xl font-medium font-heading ">STATISTICS</div>
        <div className="flex items-center">
            <button className="h-2 ml-2 rounded-lg bg-theme-light w-4"></button>
            <button className="h-2 ml-2 bg-gray-300 rounded w-2"></button>
            <button className="h-2 ml-2 bg-gray-300 rounded w-2"></button>
        </div>
       </div>
      {/* w-9/12 */}
        <div className="grid-rows-12 grid w-full grid-cols-6 gap-4 lg:gap-7 mb-5 grow">

          <CardStats
            className="lg:col-start-1 lg:col-end-3 bg-white col-start-1 col-end-7 row-start-1 row-end-2"
            imageSrc="/images/total-centers.png"
            title="Total Centers"
            count="25"
            percentChange="3"
          />
          <CardStats
            className="lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-2 bg-white col-start-1 col-end-4 row-start-2 row-end-3"
            imageSrc="/images/total-batches.png"
            title="Total Batches"
            count="32"
            percentChange="3"
          />
          <CardStats
            className="lg:col-start-5 lg:col-end-7 lg:row-start-1 lg:row-end-2 bg-white col-start-4 col-end-7 row-start-2 row-end-3"
            imageSrc="/images/total-staffs.png"
            title="Total Staff"
            count="66"
            percentChange="3"
          />
          {/* <Card
            title="GENDER RATIO"
            className="lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3 col-start-1 col-end-7  row-start-3 row-end-4 text-white bg-gray-950"
          >
            <div className="flex items-center"> Gender Ratio Content to be added</div>
          </Card> */}
          <div className="lg:p-6 py-4 lg:hidden block relative lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3 col-start-1 col-end-7  row-start-3 row-end-4 ">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-medium font-heading lg:hidden block">GENDER RATIO</div>
              {/* <button
                className="border-1 mx-3 bg-pink-600 hover:bg-pink-800 p-4 rounded-full"
                type="button"
              >
                <Image src={ArrowRight} className="" alt="" />
              </button> */}
            </div>

          </div>
          <div className="lg:mt-0 mt-20 lg:mt-8 lg:p-6 px-2 py-4  lg:mt-5 relative shadow-sm rounded-2xl lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3 col-start-1 col-end-7  row-start-3 row-end-4 text-white bg-gray-950">
            <div className="flex items-center ">
              <div className="text-2xl font-medium font-heading lg:block hidden lg:mr-5">GENDER RATIO</div>
              <div className="flex relative grow lg:ml-10 ml-0">
                <Image src={LittleBoy} className="absolute -bottom-[16px] lg:-bottom-[24px] left-0 lg:w-auto lg:max-w-none max-w-[85px]" alt="" />
                <div className="lg:pl-36 pl-24 lg:text-left text-center">
                  <div className="text-lg lg:text-3xl font-normal font-heading text-white" >70%</div>
                  <div className="text-xs lg:text-base text-blush-light">125 - Male</div>
                </div>
              </div>
              <div className="flex relative grow lg:ml-2">
                <Image src={ShortGirl} className="absolute -bottom-[16px] lg:-bottom-[24px] left-0 transform lg:scale-x-[1] scale-x-[-1] lg:w-auto lg:max-w-none max-w-[85px]" alt="" />
                <div className="lg:pl-36 pl-24 lg:text-left text-center">
                  <div className="text-lg lg:text-3xl font-normal font-heading text-white" >30%</div>
                  <div className="text-xs lg:text-base text-pink-600">97-Female</div>
                </div>
              </div>
              {/* <div className="lg:block hidden">
                <button
                  className="border-1 mx-3 bg-pink-600 hover:bg-pink-800 p-4 rounded-full"
                  type="button"
                >
                  <Image src={ArrowRight} className="" alt="" />
                </button>
              </div> */}
            </div>
          </div>
          <Card
            title="CENTER WISE HEADCOUNT"
            className="lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:row-end-6 bg-white col-start-1 col-end-7  row-start-4 row-end-6"
          >
            <BarChart data={centerWiseCountData} />
          </Card>
          <Card
            title="ACTIVITY CALENDAR"
            className="lg:col-start-4 lg:col-end-7 lg:row-start-3 lg:row-end-6 bg-white col-start-1 col-end-7  row-start-6 row-end-8"
          >
            <Calendar onChange={onChange} value={value} />
          </Card>
          <Card
            title="HEADCOUNT TREND DATA"
            className="lg:row-end-9 lg:col-start-1 lg:col-end-7 lg:row-start-6 bg-white col-start-1 col-end-7  row-start-9 row-end-10"
          >
            <LineChart data={headCountTrendData} />
          </Card>
          <Card
            title="AGE WISE BREAKUP"
            className="lg:row-end-9 lg:row-start-12 lg:col-start-1 lg:col-end-4 bg-white col-start-1 col-end-7  row-start-9 row-end-10"
          >
            <BarChart data={ageWiseCountData} />
          </Card>
          <Card
            title="SPORTS WISE COUNT"
            className="lg:row-end-9 lg:row-start-12 lg:col-start-4 lg:col-end-7 bg-white col-start-1 col-end-7  row-start-9 row-end-10"
          >
            <BarChart data={sportsWiseCountData} />
          </Card>
        </div>
        </div>
        <div className="lg:grid-rows-12 lg:grid 2xl:w-3/12 grid-rows-[repeat(3,minmax(400px,550px))] gap-3 ml-6 lg:block hidden">
          <CardList
            title="TOP PERFORMER"
            peoples={[
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports1.jpg",
              },
              {
                name: "Joe H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports2.jpg",
              },
              {
                name: "Norton H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports3.jpg",
              },
              {
                name: "Sanjay H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports4.jpg",
              },
              {
                name: "Valentine H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports5.jpg",
              },
              {
                name: "Mal H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Yohan H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Prakash H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports1.jpg",
              },
              {
                name: "Joe H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports2.jpg",
              },
              {
                name: "Norton H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports3.jpg",
              },
              {
                name: "Sanjay H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports4.jpg",
              },
              {
                name: "Valentine H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports5.jpg",
              },
              {
                name: "Mal H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Yohan H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Prakash H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
            ]}
            navRoute="/athletes"
          />
          <CardList
            title="TOP COACHES"
            peoples={[
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports1.jpg",
              },
              {
                name: "Rak",
                subtitle: "Volleyball",
                src: "/images/sports2.jpg",
              },
              {
                name: "Rev",
                subtitle: "Volleyball",
                src: "/images/sports3.jpg",
              },
              {
                name: "Laxman Geeda",
                subtitle: "Volleyball",
                src: "/images/sports4.jpg",
              },
              {
                name: "Priyanka K",
                subtitle: "Volleyball",
                src: "/images/sports5.jpg",
              },
              {
                name: "Kaviya N",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Suma Manthena",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Maneesh P",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Bhanu Kumar",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: " Alena Camford",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports1.jpg",
              },
              {
                name: "Rak",
                subtitle: "Volleyball",
                src: "/images/sports2.jpg",
              },
              {
                name: "Rev",
                subtitle: "Volleyball",
                src: "/images/sports3.jpg",
              },
              {
                name: "Laxman Geeda",
                subtitle: "Volleyball",
                src: "/images/sports4.jpg",
              },
              {
                name: "Priyanka K",
                subtitle: "Volleyball",
                src: "/images/sports5.jpg",
              },
              {
                name: "Kaviya N",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Suma Manthena",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Maneesh P",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: "Bhanu Kumar",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
              {
                name: " Alena Camford",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
            ]}
            navRoute="/coaches"
          />
          <Card className="bg-white h-fit relative" title="UPCOMING TOURNAMENT">
            <div className="absolute top-7 right-4">
              <button className="">
                <Image src={ArrowLeft} className="filter  contrast-0 " alt="" />
              </button>
              <button className="ml-1 rotate-180">
                <Image src={ArrowLeft} className="text-black filter brightness-200 contrast-200" alt="" />
              </button>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-900 w-[95px] h-[185px] relative rounded-lg">
                <Image src={Bollyball} alt="" className="absolute min-w-[95px] top-2/4 -right-7 -translate-y-1/2" />
              </div>
              <div className="ml-8 ">
                <div className="text-xl font-heading font-medium leading-5">Annual Volleyball League2023</div>
                <div className="text-sm text-gray-500 mt-2">Hosted by <span className="text-blue-700">Emille</span></div>
                <div className="mt-4">
                  <div className="text-xs">From 15 Aug, 2023</div>
                  <div className="text-xs mt-2">From 15 Aug, 2023</div>
                </div>
                {/* <button className="mt-3 text-blue-700 font-bold">Register Now! </button> */}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
