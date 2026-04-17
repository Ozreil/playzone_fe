import Image from "next/image";
import Link from "next/link";
import { OwnerWorkspace } from "../../_components/site-shell";
import { venues, venueCopy } from "../../_data/sports-field";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "../../_lib/i18n";

export default async function OwnerFieldsPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <OwnerWorkspace
      active="My Fields"
      title={t.owner.fieldsTitle}
      description={t.owner.fieldsDescription}
      locale={locale}
      action={
        <Link href={localizedHref("/owner/fields/new", locale)} className="rounded-[8px] bg-blue-600 px-5 py-3 text-sm font-black text-white">
          {t.nav.addNew}
        </Link>
      }
    >
      <section className="rounded-[8px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-3">
          {venues.map((venue) => {
            const copy = venueCopy(venue, locale);

            return (
              <article key={venue.slug} className="grid gap-4 rounded-[8px] bg-slate-50 p-3 ring-1 ring-slate-200 sm:grid-cols-[140px_1fr_auto] sm:items-center">
                <div className="relative h-28 overflow-hidden rounded-[8px] sm:h-24">
                  <Image src={venue.image} alt={copy.name} fill sizes="140px" className="object-cover" />
                </div>
                <div>
                  <h2 className="text-lg font-black">{copy.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {copy.sport} · {copy.price}/{t.fields.hour} · {copy.location}
                  </p>
                </div>
                <Link
                  href={localizedHref("/owner/calendar", locale)}
                  className="rounded-[8px] bg-white px-4 py-3 text-center text-sm font-black text-slate-700 ring-1 ring-slate-200"
                >
                  {t.nav.availability}
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </OwnerWorkspace>
  );
}
