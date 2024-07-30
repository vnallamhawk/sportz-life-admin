
export default function CoachCertificateTableBody({
  coach,
}: {
  // coach: CoachWithRelations;
  coach: any;
}) {
  const tableItems = coach.batches.map((batch: any) => (
    <tr className="h-14 w-full font-bold text-gray-600" key={batch.batchId}>
      <td className="rounded-l-lg border-y-2 border-l-2 border-solid pl-5">
        {batch.batch.name}
      </td>
      <td className="border-y-2 border-solid">{batch.center.name}</td>
      <td className="border-y-2 border-solid">0</td>
      <td className="border-y-2 border-solid">{batch.assignedAt.toString()}</td>
      <td className="rounded-r-lg border-y-2 border-r-2 border-solid">...</td>
    </tr>
  ));

  return <tbody>{tableItems}</tbody>;
}
