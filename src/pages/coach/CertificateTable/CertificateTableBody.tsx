import React from "react";
import Button from "~/components/Button";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";
// export const COACH_CERTIFICATE_TABLE_HEADERS = [

export default function CertificateTableBody(
  data: COACH_CERTIFICATE_TABLE_TYPES[]
) {
  return (
    <>
      {data.map(({ instituteName, certificate }) => (
        <tr key={instituteName}>
          <td>{certificate}</td>
          <td>{instituteName}</td>
          <td>
            <Button> Remove </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
