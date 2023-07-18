import Card from "../../components/Card";

export default function dashboard() {
  return (
    <>
      <div className="mb-7 text-lg font-bold"> DASHBOARD </div>
      <div className="text-md mb-5 font-bold"> STATISTICS </div>
      <div className="flex max-w-3xl justify-between">
        <Card
          imageSrc="/images/batch.jpg"
          title="Total Centers"
          count="25"
          percentChange="3"
        />
        <Card
          imageSrc="/images/centers.jpg"
          title="Total Batches"
          count="32"
          percentChange="3"
        />
        <Card
          imageSrc="/images/staff.jpg"
          title="Total Staff"
          count="66"
          percentChange="3"
        />
      </div>
    </>
  );
}
