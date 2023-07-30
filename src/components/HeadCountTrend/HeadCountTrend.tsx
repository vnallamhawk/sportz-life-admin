import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Monday",
    centerA: 4000,
    centerB: 2400,
    amt: 2400,
  },
  {
    name: "Tuesday",
    centerA: 3000,
    centerB: 1398,
    amt: 2210,
  },
  {
    name: "Wednesday",
    centerA: 2000,
    centerB: 9800,
    amt: 2290,
  },
  {
    name: "Thursday",
    centerA: 2780,
    centerB: 3908,
    amt: 2000,
  },
  {
    name: "Friday",
    centerA: 1890,
    centerB: 4800,
    amt: 2181,
  },
  {
    name: "Saturday",
    centerA: 2390,
    centerB: 3800,
    amt: 2500,
  },
  {
    name: "Sunday",
    centerA: 3490,
    centerB: 4300,
    amt: 2100,
  },
];

export default function HeadCountTrend() {
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <LineChart
      width={1100}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="centerB"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="centerA" stroke="#82ca9d" />
    </LineChart>
    // </ResponsiveContainer>
  );
}
