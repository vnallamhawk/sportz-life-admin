import React from "react";
import Button from "~/components/Button";
import { type ASSIGN_BATCHES_TYPES } from "~/types/coach";

export default function CenterBatchTableBody({
  data,
}: {
  data: ASSIGN_BATCHES_TYPES[];
}) {
  return (
    <>
      {data.map(({ centerName, batchName }, index) => (
        <tr key={`${centerName}-${index}`}>
          <td>{centerName}</td>
          <td>{batchName}</td>
          <td>
            <Button> Remove </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
