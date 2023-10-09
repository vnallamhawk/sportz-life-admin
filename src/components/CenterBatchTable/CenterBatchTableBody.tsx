import React from "react";
import Button from "~/components/Button";
import { type BatchData } from "~/types/coach";

export default function CenterBatchTableBody({ data }: { data?: BatchData[] }) {
  return (
    <>
      {data?.map(({ centerName, batchName }, index) => (
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
