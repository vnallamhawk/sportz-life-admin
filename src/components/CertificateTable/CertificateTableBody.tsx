import React from "react";
import Button from "~/components/Button";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";

export default function CertificateTableBody({
  data,
}: {
  data: COACH_CERTIFICATE_TABLE_TYPES[];
}) {
  return (
    <>
      {data.map(({ instituteName, name }, index) => (
        <tr key={`${instituteName}-${index}`}>
          <td>{instituteName}</td>
          <td>{name}</td>
          <td>
            <Button> Remove </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
