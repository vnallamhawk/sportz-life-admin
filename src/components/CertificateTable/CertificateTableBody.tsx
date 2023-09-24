import React from "react";
import Button from "~/components/Button";
import { DATE_TIME_FORMAT, NO_DATA } from "~/globals/globals";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";

export default function CertificateTableBody({
  data,
}: {
  data: COACH_CERTIFICATE_TABLE_TYPES[];
}) {
  console.log(data);
  return (
    <>
      {data.map(({ instituteName, name, startDate, endDate }, index) => (
        <tr key={`${instituteName}-${index}`}>
          <td>{instituteName}</td>
          <td>{name}</td>
          <td>
            {startDate ? DATE_TIME_FORMAT.format(new Date(startDate)) : NO_DATA}
          </td>
          <td>
            {endDate ? DATE_TIME_FORMAT.format(new Date(endDate)) : NO_DATA}
          </td>
          <td>
            <Button> Remove </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
