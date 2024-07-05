import CardList from "~/components/Card/CardList";
import Card from "../../components/Card/Card";
import CardStats from "../../components/Card/CardStats";
import BarChart from "~/components/BarChart";
import LineChart from "~/components/LineChart";
import Image from "next/image";
import Toggle from "../../images/toggle.svg";
import LittleBoy from "../../images/little-boy.svg";
import ShortGirl from "../../images/short-girl.svg";
import ArrowRight from "../../images/Vector.png";
import {
  ageWiseCountData,
  centerWiseCountData,
  headCountTrendData,
  sportsWiseCountData,
} from "../../__stubs__/dashboardStubs";

export default function dashboard() {
  return (
    <div className="px-6 bg-s-gray pb-7">
      <div className="py-7 ">
        <div className="flex">
          <div className="block lg:hidden mr-3">
            <Image src={Toggle} className="" alt="" />
          </div>
          <h2 className="text-3xl font-heading font-medium">DASHBOARD</h2> </div></div>
      <div className="text-2xl mb-5 font-medium font-heading"> STATISTICS </div>
      <div className="flex items-start">
        <div className="grid-rows-12 grid w-9/12 grid-cols-6 gap-4 lg:gap-7 mb-5 grow">

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
          <div className="p-6 mt-5 relative shadow-sm rounded-2xl lg:col-start-1 lg:col-end-7 lg:row-start-2 lg:row-end-3 col-start-1 col-end-7  row-start-3 row-end-4 text-white bg-gray-950">
            <div className="flex items-center ">
              <div className="text-2xl font-medium font-heading">GENDER RATIO</div>
              <div className="flex relative grow ml-10">
                <Image src={LittleBoy} className="absolute -bottom-[24px] left-0 " alt="" />
                <div className="pl-36">
                  <div className="text-3xl font-normal font-heading text-white" >70%</div>
                  <div className="text-base text-blush">125 - Male</div>
                </div>
              </div>
              <div className="flex relative grow ml-2">
                <Image src={ShortGirl} className="absolute -bottom-[24px] left-0 " alt="" />
                <div className="pl-36">
                  <div className="text-3xl font-normal font-heading text-white" >30%</div>
                  <div className="text-base text-blush">97-Female</div>
                </div>
              </div>
              <div className="">
                <button
                  className="border-1 mx-3 bg-pink-600 hover:bg-pink-800 p-4 rounded-full"
                  type="button"
                >
                  <Image src={ArrowRight} className="" alt="" />
                </button>
              </div>
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
            <div> Calendar content </div>
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
        <div className="lg:grid-rows-12 lg:grid w-3/12 grid-rows-[repeat(3,minmax(400px,550px))] gap-3 ml-6 lg:block hidden">
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
          <Card className="bg-white" title="UPCOMING TOURNAMENT">Content to be added</Card>
        </div>
      </div>
    </div>
  );
}
