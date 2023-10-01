import { type Staff } from "@prisma/client";

export const staffDictionaryServices = (staff?: Staff[]) => {
  return (
    staff?.length &&
    staff.reduce((accumulator: Record<number, Staff>, current) => {
      accumulator[current.id] = current;
      return accumulator;
    }, {})
  );
};
