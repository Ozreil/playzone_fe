import { CompactFieldRow, FieldCard } from "../_components/field-card";
import { SearchIcon } from "../_components/icons";
import { PageHeader, PublicPage } from "../_components/site-shell";
import { sports, venues } from "../_data/sports-field";
import { dictionary, getLocale, type LocaleSearchParams } from "../_lib/i18n";

export default async function FieldsPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <PublicPage locale={locale}>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader eyebrow={t.fields.eyebrow} title={t.fields.title} description={t.fields.description} />

        <section className="mt-6 rounded-[8px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-2 rounded-[8px] border border-slate-200 px-3 py-3 text-sm text-slate-500">
              <SearchIcon className="h-4 w-4" />
              {t.fields.searchPlaceholder}
            </div>
            <button className="rounded-[8px] bg-emerald-600 px-5 py-3 text-sm font-black text-white">{t.home.search}</button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {sports.map((sport) => (
              <button
                key={sport}
                className="whitespace-nowrap rounded-[8px] bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 first:bg-emerald-100 first:text-emerald-700"
              >
                {t.sports[sport]}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 hidden grid-cols-2 gap-4 lg:grid xl:grid-cols-4">
          {venues.map((venue) => (
            <FieldCard key={venue.slug} venue={venue} locale={locale} />
          ))}
        </section>

        <section className="mt-6 space-y-3 lg:hidden">
          {venues.map((venue) => (
            <CompactFieldRow key={venue.slug} venue={venue} locale={locale} />
          ))}
        </section>
      </main>
    </PublicPage>
  );
}
