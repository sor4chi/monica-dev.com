interface RelativeDateProps {
  date: string | Date;
  format: "year" | "month" | "day";
  add?: number;
  timeZone?: string;
}

export const RelativeDate = ({ date, format, add = 0, timeZone = "Asia/Tokyo" }: RelativeDateProps) => {
  const now = new Date();
  const actualDate = new Date(date);

  const nowInTimeZone = new Date(now.toLocaleString("en-US", { timeZone }));
  const actualDateInTimeZone = new Date(actualDate.toLocaleString("en-US", { timeZone }));

  const diff = Math.abs(nowInTimeZone.getTime() - actualDateInTimeZone.getTime());
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  switch (format) {
    case "year":
      return diffYears + add;
    case "month":
      return diffMonths + add;
    case "day":
      return diffDays + add;
    default:
      throw new Error(format satisfies never);
  }
};