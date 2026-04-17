import Image from "next/image";
import Link from "next/link";
import { PageHeader, PublicPage } from "../_components/site-shell";
import { StatusBadge } from "../_components/status-badge";
import { bookingCopy, renterBookings, venues } from "../_data/sports-field";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "../_lib/i18n";

export default async function RenterBookingsPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <PublicPage locale={locale}>
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={t.renterBookings.eyebrow}
          title={t.renterBookings.title}
          description={t.renterBookings.description}
          action={
            <Link href={localizedHref("/fields", locale)} className="rounded-[8px] bg-emerald-600 px-5 py-3 text-sm font-black text-white">
              {t.nav.browseFields}
            </Link>
          }
        />

        <section className="mt-6 rounded-[8px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-sm font-black">
            <button className="rounded-[8px] bg-blue-600 py-2 text-white">{t.renterBookings.upcoming}</button>
            <button className="text-slate-500">{t.renterBookings.past}</button>
          </div>

          <div className="mt-5 space-y-3">
            {renterBookings.map((booking, index) => {
              const copy = bookingCopy(booking, locale);

              return (
                <article key={`${booking.field}-${booking.date}`} className="rounded-[8px] bg-slate-50 p-3 ring-1 ring-slate-200">
                  <div className="grid gap-3 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                    <div className="relative h-24 overflow-hidden rounded-[8px] sm:h-20">
                      <Image src={venues[index].image} alt={copy.field} fill sizes="120px" className="object-cover" />
                    </div>
                    <div>
                      <h2 className="text-base font-black">{copy.field}</h2>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {copy.date}, {copy.time}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-500">{copy.renter}</p>
                    </div>
                    <StatusBadge status={booking.status} locale={locale} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
