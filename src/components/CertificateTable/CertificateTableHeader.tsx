import { COACH_CERTIFICATE_TABLE_HEADERS } from "~/constants/coachConstants";

export default function CertificateTableHeader() {
  return (
    <tr className="text-sm uppercase leading-normal text-gray-600">
      {COACH_CERTIFICATE_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
