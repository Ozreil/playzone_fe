import Image from "next/image";
import { bookingCopy, calendarDays, calendarLabel, ownerBookings, venues, venueCopy } from "../_data/sports-field";
import { dictionary, type Locale } from "../_lib/i18n";
import { StatusBadge } from "./status-badge";

export function AddFieldPanel({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const field = venueCopy(venues[0], locale);
  const values = [field.name, field.sport, locale === "ar" ? "الرياض، السعودية" : "Riyadh, Saudi Arabia", locale === "ar" ? "200" : "200"];

  return (
    <div className="grid gap-5 rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-[1fr_0.9fr]">
      <form className="space-y-3">
        <h3 className="text-xl font-black">{t.owner.addFieldTitle}</h3>
        {t.owner.labels.map((label, index) => (
          <label key={label} className="block text-xs font-bold text-slate-600">
            {label}
            <input
              value={values[index]}
              readOnly
              className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900"
            />
          </label>
        ))}
        <label className="block text-xs font-bold text-slate-600">
          {t.owner.descriptionLabel}
          <textarea
            value={field.description}
            readOnly
            rows={3}
            className="mt-1 w-full resize-none rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900"
          />
        </label>
        <button className="rounded-[8px] bg-blue-600 px-5 py-2.5 text-xs font-black text-white">{t.owner.saveField}</button>
      </form>
      <div>
        <p className="mb-2 text-xs font-bold text-slate-600">{t.owner.uploadPhotos}</p>
        <div className="grid grid-cols-2 gap-3">
          {venues.map((venue) => (
            <div key={venue.name} className="relative h-28 overflow-hidden rounded-[8px]">
              <Image src={venue.image} alt={venueCopy(venue, locale).name} fill sizes="180px" className="object-cover" />
            </div>
          ))}
          <button className="grid h-28 place-items-center rounded-[8px] border border-dashed border-slate-300 text-3xl text-blue-600">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookingsTable({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <div id="bookings" className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black">{t.owner.bookingsTitle}</h3>
        <button className="rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-bold">{t.owner.filter}</button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="py-3">{t.owner.dateTime}</th>
              <th>{t.owner.field}</th>
              <th>{t.owner.renter}</th>
              <th>{t.owner.status}</th>
            </tr>
          </thead>
          <tbody>
            {ownerBookings.map((booking) => {
              const copy = bookingCopy(booking, locale);

              return (
                <tr key={`${booking.date}-${booking.field}`} className="border-b border-slate-100">
                  <td className="py-4 font-semibold">
                    {copy.date}, {copy.time}
                  </td>
                  <td>{copy.field}</td>
                  <td>{copy.renter}</td>
                  <td>
                    <StatusBadge status={booking.status} locale={locale} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AvailabilityCalendar({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const weekdays = locale === "ar" ? ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black">{t.owner.calendarTitle}</h3>
        <button className="rounded-[8px] border border-slate-200 px-3 py-2 text-xs font-bold">{t.owner.today}</button>
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{t.owner.month}</p>
      <div className="mt-4 grid grid-cols-7 overflow-hidden rounded-[8px] border border-slate-200 text-center text-xs">
        {weekdays.map((day) => (
          <div key={day} className="bg-slate-50 px-2 py-2 font-black text-slate-500">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const isBooked = day === "Booked";
          const isSlot = day.includes("PM");
          return (
            <div key={`${day}-${index}`} className="min-h-16 border-t border-slate-100 p-2">
              <span
                className={
                  isBooked
                    ? "rounded bg-blue-600 px-2 py-1 font-bold text-white"
                    : isSlot
                      ? "rounded bg-emerald-600 px-2 py-1 font-bold text-white"
                      : "text-slate-600"
                }
              >
                {calendarLabel(day, locale) || index + 1}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-5 text-xs font-bold text-slate-500">
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> {t.owner.available}
        </span>
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full bg-blue-600" /> {t.owner.booked}
        </span>
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {t.owner.partial}
        </span>
      </div>
    </div>
  );
}
