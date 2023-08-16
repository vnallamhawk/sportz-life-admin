const timeZone = "Asia/Kolkata";

export const DATE_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
  dateStyle: "short",
  timeZone,
});
