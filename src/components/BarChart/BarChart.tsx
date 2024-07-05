import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function BarChartComponent({
  data,
  width = 500,
}: {
  width?: number;
  data: unknown[];
}) {
  return (
    <ResponsiveContainer width="95%" height={250}>
    <BarChart
      width={width}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
    </ResponsiveContainer>
  );
}
