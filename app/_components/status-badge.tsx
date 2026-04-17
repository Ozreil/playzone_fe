import type { Booking } from "../_data/sports-field";
import type { Locale } from "../_lib/i18n";
import { dictionary } from "../_lib/i18n";

export function StatusBadge({ status, locale = "en" }: { status: Booking["status"]; locale?: Locale }) {
  const classes = {
    Confirmed: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${classes[status]}`}>
      {dictionary[locale].status[status]}
    </span>
  );
}
