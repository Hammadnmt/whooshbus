import momemt from "moment";
export function toISO(date: Date) {
  const isoDate = momemt(date).startOf("day").utc(5).toISOString();
  return isoDate;
}
