import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarIcon } from "../../_components/icons";
import { PublicPage } from "../../_components/site-shell";
import { venueCopy, venues } from "../../_data/sports-field";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "../../_lib/i18n";

export function generateStaticParams() {
  return venues.map((venue) => ({ slug: venue.slug }));
}

export default async function FieldDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: LocaleSearchParams;
}) {
  const [{ slug }, locale] = await Promise.all([params, getLocale(searchParams)]);
  const venue = venues.find((item) => item.slug === slug);

  if (!venue) {
    notFound();
  }

  const copy = venueCopy(venue, locale);
  const t = dictionary[locale];

  return (
    <PublicPage locale={locale}>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href={localizedHref("/fields", locale)} className="text-sm font-black text-slate-500">
          {t.fields.back}
        </Link>

        <section className="mt-5 overflow-hidden rounded-[8px] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="relative h-[320px]">
            <Image src={venue.image} alt={copy.name} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute bottom-4 right-4 rounded-[8px] bg-slate-950/80 px-3 py-1 text-xs font-black text-white">
              1/12
            </div>
          </div>
          <div className="grid gap-6 p-5 lg:grid-cols-[1fr_330px]">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-3xl font-black">{copy.name}</h1>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {copy.location} · {copy.distance}
                  </p>
                </div>
                <p className="flex items-center gap-1 text-sm font-black text-amber-500">
                  <StarIcon className="h-4 w-4" /> {venue.rating} ({venue.reviews} {t.fields.reviews})
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {copy.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-[8px] bg-slate-100 px-3 py-2 text-xs font-black text-slate-600">
                    {amenity}
                  </span>
                ))}
              </div>

              <h2 className="mt-7 text-lg font-black">{t.fields.about}</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-7 text-slate-600">{copy.description}</p>
            </div>

            <aside className="rounded-[8px] bg-slate-50 p-4 ring-1 ring-slate-200">
              <h2 className="text-lg font-black">{t.fields.selectTime}</h2>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs font-black">
                {["20", "22", "23", "24"].map((day, index) => (
                  <button key={day} className={`rounded-[8px] py-3 ${index === 3 ? "bg-emerald-600 text-white" : "bg-white"}`}>
                    {day}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-black">
                {copy.slots.map((slot, index) => (
                  <button key={slot} className={`rounded-[8px] py-3 ${index === 0 ? "bg-emerald-100 text-emerald-700" : "bg-white"}`}>
                    {slot}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-2xl font-black">
                {copy.price} / {t.fields.hour}
              </p>
              <Link
                href={localizedHref("/bookings", locale)}
                className="mt-4 block rounded-[8px] bg-emerald-600 py-3 text-center text-sm font-black text-white"
              >
                {t.nav.bookNow}
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
