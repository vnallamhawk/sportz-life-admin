import { type Sports } from "@prisma/client";

export const getSportsDictionaryServices = (
  sports?: Sports[]
): Record<Sports["id"], Sports> | undefined => {
  return sports?.length
    ? sports?.reduce((accumulator: Record<Sports["id"], Sports>, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {})
    : {};
};
