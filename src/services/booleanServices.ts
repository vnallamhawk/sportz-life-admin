export const isNullOrUndefined = (arg: unknown) => {
  return arg === undefined || arg === null;
};
export const isNullOrUndefinedOrEmptyString = (arg?: string) => {
  return arg === undefined || arg === null || arg === "";
};
export const isNullOrUndefinedOrZero = (arg?: number) => {
  return arg === undefined || arg === null || arg === 0;
};
