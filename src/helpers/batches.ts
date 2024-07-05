import { type BatchTableData } from "~/types/batch";
import { type MultiSelectOption } from "~/types/select";

export const formatBatchesTableData = (data: {
  centerName?: MultiSelectOption;
  batchName?: MultiSelectOption[];
}): BatchTableData => {
  return {
    centerName: data.centerName ? data?.centerName.label : "",
    centerId: data?.centerName?.value
      ? Number(data?.centerName.value)
      : undefined,
    batchName: data.batchName
      ? data.batchName.map(({ label }) => label).join(",")
      : "",
    batchIds: data.batchName
      ? data.batchName.map(({ value }) => Number(value))
      : [],
  };
};
