import CardList from "~/components/Card/CardList";
import Card from "../../components/Card/Card";
import CardStats from "../../components/Card/CardStats";
// import CardList from "../../components/Card/CardList";

export default function dashboard() {
  return (
    <>
      <div className="mb-7 text-lg font-bold"> DASHBOARD </div>
      <div className="text-md mb-5 font-bold"> STATISTICS </div>
      <div className="flex">
        <div className="grid w-9/12 grid-cols-6 grid-rows-4 gap-2">
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
          <Card className="col-start-1 col-end-7 row-start-2 row-end-3">
            <div> Gender Ratio</div>
          </Card>
          <Card className="col-start-1 col-end-4 row-start-3 row-end-5">
            <div> CENTER WISE HEAD COUNT </div>
          </Card>
          <Card className="col-start-4 col-end-7 row-start-3 row-end-5">
            <div> ACTIVITY CALENDAR </div>
          </Card>
        </div>
        <div className="grid w-3/12 gap-3">
          <CardList
            title="TOP PERFORMER"
            peoples={[
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports1.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports2.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports3.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports4.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports5.jpg",
              },
              {
                name: "John H.Martin",
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
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports2.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports3.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports4.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports5.jpg",
              },
              {
                name: "John H.Martin",
                subtitle: "Volleyball",
                src: "/images/sports6.jpg",
              },
            ]}
            navRoute="/coaches"
          />
        </div>
      </div>
    </>
  );
}
