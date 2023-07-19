import CardStats from "../../components/Card";
import Card from "../../components/Card/Card";

export default function dashboard() {
  return (
    <>
      <div className="mb-7 text-lg font-bold"> DASHBOARD </div>
      <div className="text-md mb-5 font-bold"> STATISTICS </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-3">
        <CardStats
          imageSrc="/images/batch.jpg"
          title="Total Centers"
          count="25"
          percentChange="3"
        />
        <CardStats
          imageSrc="/images/centers.jpg"
          title="Total Batches"
          count="32"
          percentChange="3"
        />
        <CardStats
          className=""
          imageSrc="/images/staff.jpg"
          title="Total Staff"
          count="66"
          percentChange="3"
        />
        <Card
          className="col-start-4 col-end-4 row-start-1 row-end-3"
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
        />
      </div>
    </>
  );
}
