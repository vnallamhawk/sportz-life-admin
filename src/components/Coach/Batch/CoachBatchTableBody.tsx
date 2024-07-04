import { DATE_TIME_FORMAT, NO_DATA } from "~/globals/globals";
import type { Coach } from "~/pages/coach/[id]";

export default function CoachCertificateTableBody({ coach }: { coach: Coach }) {
  const tableItems = coach.Batches?.map((batch) => (
    <tr className="h-14 w-full font-bold text-gray-600" key={batch.id}>
      <td className="rounded-l-lg border-y-2 border-l-2 border-solid pl-5">
        {batch.name}
      </td>
      <td className="border-y-2 border-solid">{batch.sportId}</td>
      <td className="border-y-2 border-solid">{batch.capacity}</td>
      <td className="border-y-2 border-solid">
        {DATE_TIME_FORMAT.format(new Date(batch.createdAt.toString()))}
      </td>
      <td className="rounded-r-lg border-y-2 border-r-2 border-solid">...</td>
    </tr>
  ));

  return <tbody>{tableItems ?? NO_DATA}</tbody>;
}
