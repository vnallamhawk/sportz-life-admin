import { type MultiSelectOption } from "~/types/coach";

export const formatBatchesTableData = (data: {
  centerName?: MultiSelectOption;
  batchName?: MultiSelectOption[];
}) => {
  return {
    centerName: data.centerName ? data?.centerName.label : "",
    batchName: data.batchName
      ? data.batchName.map(({ label }) => label).join(",")
      : "",
    batchIds: data.batchName
      ? data.batchName.map(({ value }) => Number(value))
      : [],
  };
};
