export const isNullOrUndefined = (arg: unknown) => {
  return arg === undefined || arg === null;
};

export const isNullOrUndefinedOrZero = (arg?: number) => {
  return arg === undefined || arg === null || arg === 0;
};

export const isNullOrUndefinedOrEmptyString = (
  arg: string | null | undefined
): arg is string | null | undefined => {
  return arg === undefined || arg === null || arg === "";
};
export const isNotNullOrUndefinedOrEmptyString = (
  arg?: string
): arg is NonNullable<string> => {
  return arg !== undefined && arg !== null && arg !== "";
};
