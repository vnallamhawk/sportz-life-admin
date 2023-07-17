import Card from "../../components/Card";

export default function dashboard() {
  return (
    <div className="flex">
      <Card title="Total Center" count="25" percentChange="3" />
      <Card title="Total Batches" count="32" percentChange="3" />
      <Card title="Total Staff" count="66" percentChange="3" />
    </div>
  );
}
