import { type Centers } from "@prisma/client";

export const centerDictionaryServices = (center?: Centers[]) => {
  return center?.length
    ? center.reduce((accumulator: Record<Centers["id"], Centers>, current) => {
        accumulator[current.id] = current;
        return accumulator;
      }, {})
    : undefined;
};
