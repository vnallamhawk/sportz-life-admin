import dynamic from "next/dynamic";
import CardList from "~/components/Card/CardList";
import Card from "../../components/Card/Card";
import CardStats from "../../components/Card/CardStats";
// import BarChart from "~/components/BarChart";
// import LineChart from "~/components/LineChart";
const BarChart = dynamic(import("~/components/BarChart"), { ssr: false });
const LineChart = dynamic(import("~/components/LineChart"), { ssr: false });

import {
  ageWiseCountData,
  centerWiseCountData,
  headCountTrendData,
  sportsWiseCountData,
} from "../../__stubs__/dashboardStubs";

export default function dashboard() {
  return (
    <>
      <div className="mb-7 text-lg font-bold"> DASHBOARD </div>
      <div className="text-md mb-5 font-bold"> STATISTICS </div>
      <div className="flex">
        <div className="grid-rows-12 grid w-9/12 grid-cols-6 gap-2">
          <CardStats
            className="col-start-1 col-end-3"
            imageSrc="/images/batch.jpg"
            title="Total Centers"
            count="25"
            percentChange="3"
          />
          <CardStats
            className="col-start-3 col-end-5"
            imageSrc="/images/centers.jpg"
            title="Total Batches"
            count="32"
            percentChange="3"
          />
          <CardStats
            className="col-start-5 col-end-7"
            imageSrc="/images/staff.jpg"
            title="Total Staff"
            count="66"
            percentChange="3"
          />
          <Card
            title="GENDER RATIO"
            className="col-start-1 col-end-7 row-start-2 row-end-3"
          >
            <div> Gender Ratio Content to be added</div>
          </Card>
          <Card
            title="CENTER WISE HEADCOUNT"
            className="col-start-1 col-end-4 row-start-3 row-end-6"
          >
            <BarChart data={centerWiseCountData} />
          </Card>
          <Card
            title="ACTIVITY CALENDAR"
            className="col-start-4 col-end-7 row-start-3 row-end-6"
          >
            <div> Calendar content </div>
          </Card>
          <Card
            title="HEADCOUNT TREND DATA"
            className="row-end-9 col-start-1 col-end-7 row-start-6"
          >
            <LineChart data={headCountTrendData} />
          </Card>
          <Card
            title="AGE WISE BREAKUP"
            className="row-end-9 row-start-12 col-start-1 col-end-4"
          >
            <BarChart data={ageWiseCountData} />
          </Card>
          <Card
            title="SPORTS WISE COUNT"
            className="row-end-9 row-start-12 col-start-4 col-end-7"
          >
            <BarChart data={sportsWiseCountData} />
          </Card>
        </div>
        <div className="grid-rows-12 grid w-3/12 grid-rows-[repeat(3,minmax(400px,550px))] gap-3 ">
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
          <Card title="UPCOMING TOURNAMENT">Content to be added</Card>
        </div>
      </div>
    </>
  );
}
