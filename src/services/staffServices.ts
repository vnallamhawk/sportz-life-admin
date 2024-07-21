import { type Staffs } from "@prisma/client";

export const staffDictionaryServices = (staff?: Staffs[]) => {
  return (
    staff?.length &&
    staff.reduce((accumulator: Record<number, Staffs>, current) => {
      accumulator[current.id] = current;
      return accumulator;
    }, {})
  );
};
