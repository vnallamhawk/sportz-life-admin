import { type Center } from "@prisma/client";

export const centerDictionaryServices = (center?: Center[]) => {
  return center?.length
    ? center.reduce((accumulator: Record<Center["id"], Center>, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {})
    : undefined;
};
