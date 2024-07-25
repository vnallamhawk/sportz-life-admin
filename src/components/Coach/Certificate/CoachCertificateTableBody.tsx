// import { type Certificates } from "@prisma/client";

export default function CoachCertificateTableBody({
  certificates,
}: {
  // certificates: Certificates[];
  certificates: any[];
}) {
  const tableItems = certificates?.map((cert) => (
    <tr className="h-14 w-full font-bold text-gray-600" key={cert.id}>
      <td className="rounded-l-lg border-y-2 border-l-2 border-solid pl-5">
        {cert.name}
      </td>
      <td className="border-y-2 border-solid">{cert.instituteName}</td>
      <td className="border-y-2 border-solid">{cert.startDate?.toString()}</td>
      <td className="rounded-r-lg border-y-2 border-r-2 border-solid">
        {cert.endDate?.toString()}
      </td>
    </tr>
  ));

  return <tbody>{tableItems}</tbody>;
}
