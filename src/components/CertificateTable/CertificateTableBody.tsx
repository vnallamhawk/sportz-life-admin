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
      {data.map(({ institute, certificate }, index) => (
        <tr key={`${institute}-${index}`}>
          <td>{certificate}</td>
          <td>{institute}</td>
          <td>
            <Button> Remove </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
