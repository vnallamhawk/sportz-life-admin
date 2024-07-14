import { CENTER_DASH_BATCH_TABLE_HEADERS } from "~/constants/centerDashTables";

export default function CenterDashBatchTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {CENTER_DASH_BATCH_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
