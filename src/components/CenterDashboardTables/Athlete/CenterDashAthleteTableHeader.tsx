import { CENTER_DASH_ATHLETE_TABLE_HEADERS } from "~/constants/centerDashTables";

export default function CenterDashAthleteTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {CENTER_DASH_ATHLETE_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
