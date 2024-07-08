import { CENTER_BATCH_TABLE_HEADERS } from "~/constants/coachConstants";

export default function CenterBatchTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {CENTER_BATCH_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
