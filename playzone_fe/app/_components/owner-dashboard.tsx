import Image from "next/image";
import Link from "next/link";
import { bookingCopy, ownerBookings, ownerStats, venues, venueCopy } from "../_data/sports-field";
import { dictionary, localizedHref, type Locale } from "../_lib/i18n";
import { StatusBadge } from "./status-badge";

export function OwnerDashboard({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <div className="space-y-5">
      <section className="grid gap-3 md:grid-cols-4">
        {ownerStats.map((stat, index) => (
          <div key={stat.label} className="rounded-[8px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-[11px] font-bold text-slate-500">{t.owner.stats[index]}</p>
            <p className="mt-2 text-2xl font-black">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black">{t.owner.bookingsOverview}</h2>
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">32</span>
          </div>
          <div className="mt-6 h-64">
            <div className="relative h-full border-b border-l border-slate-200">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 250" preserveAspectRatio="none">
                {[50, 100, 150, 200].map((y) => (
                  <line key={y} x1="0" x2="420" y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                ))}
                <polyline
                  points="8,210 55,168 88,182 122,126 158,140 194,92 228,106 268,58 310,64 352,46 410,14"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black">{t.owner.recentBookings}</h2>
            <Link className="text-xs font-bold text-emerald-700" href={localizedHref("/owner/bookings", locale)}>
              {t.home.viewAll}
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {ownerBookings.slice(0, 3).map((booking, index) => {
              const copy = bookingCopy(booking, locale);
              const field = venueCopy(venues[index], locale);

              return (
                <div key={`${booking.field}-${booking.date}`} className="flex items-center gap-3 rounded-[8px] bg-slate-50 p-2">
                  <div className="relative h-14 w-20 overflow-hidden rounded-[8px]">
                    <Image src={venues[index].image} alt={field.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{copy.field}</p>
                    <p className="text-[11px] text-slate-500">
                      {copy.date}, {copy.time}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} locale={locale} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-base font-black">{t.owner.recentActivities}</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {t.owner.activities.map((activity, index) => (
              <div key={activity} className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm font-black">{activity}</p>
                  <p className="text-xs text-slate-500">{venueCopy(venues[[3, 0, 2][index]], locale).name}</p>
                </div>
                <span className="text-xs font-bold text-slate-400">{t.owner.times[index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[8px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-base font-black">{t.owner.today}</h2>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {["5:00 PM", "6:00 PM", "7:00 PM"].map((time, index) => (
              <div key={time} className={`rounded-[8px] p-4 ${index === 0 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100"}`}>
                <p className="text-xs font-black">{locale === "ar" ? time.replace("PM", "مساء") : time}</p>
                <p className="mt-1 text-[11px] font-semibold text-slate-500">{index === 0 ? t.owner.open : t.owner.reserved}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
