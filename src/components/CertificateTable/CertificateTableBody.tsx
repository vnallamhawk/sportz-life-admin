import React from "react";
import Button from "~/components/Button";
import { DATE_TIME_FORMAT, NO_DATA } from "~/globals/globals";
import { type COACH_CERTIFICATE_TABLE_TYPES } from "~/types/coach";

export default function CertificateTableBody({
  data,
  setData,
}: {
  data: COACH_CERTIFICATE_TABLE_TYPES[];
  setData: () => COACH_CERTIFICATE_TABLE_TYPES[];
}) {
  const onDeleteHandler = (index: number) => {
    if (data?.length) {
      setData(data.filter((v: object, i: number) => i !== index));
    }
  };

  return (
    <>
      {data.map(({ instituteName, name, startEnd, endDate }, index) => (
        <tr
          key={`${instituteName}-${index}`}
          className="rounded-l-lg border-b border-l-2 border-solid border-gray-200 hover:bg-gray-100"
        >
          <td className="rounded-l-xl border-y-2 border-l-2 border-solid pl-5">
            {instituteName}
          </td>
          <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
            {name}
          </td>
          <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
            <Button
              onClick={() => onDeleteHandler(index)}
              className=" border-none"
            >
              {" "}
              Remove{" "}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
