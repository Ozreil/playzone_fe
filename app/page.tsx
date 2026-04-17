import Image from "next/image";
import Link from "next/link";
import { FieldCard } from "./_components/field-card";
import { SearchIcon } from "./_components/icons";
import { PublicPage } from "./_components/site-shell";
import { renterSteps, venues } from "./_data/sports-field";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "./_lib/i18n";

export default async function Home({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];
  const gradientClass =
    locale === "ar"
      ? "bg-gradient-to-l from-slate-950 via-slate-950/75 to-slate-950/20"
      : "bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20";

  return (
    <PublicPage locale={locale}>
      <main>
        <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1800&q=80"
            alt={t.home.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className={`absolute inset-0 ${gradientClass}`} />
          <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-center px-4 py-12 text-white sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase text-emerald-300">{t.home.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-none sm:text-7xl">{t.home.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/85">{t.home.subtitle}</p>
            <div className="mt-8 grid max-w-3xl gap-2 rounded-[8px] bg-white p-2 text-slate-500 shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto]">
              {t.home.searchPlaceholders.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-[8px] bg-slate-50 px-3 py-3 text-sm">
                  <SearchIcon className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
              <Link
                href={localizedHref("/fields", locale)}
                className="rounded-[8px] bg-emerald-600 px-6 py-3 text-center text-sm font-black text-white"
              >
                {t.home.search}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase text-emerald-700">{t.home.renterFlow}</p>
              <h2 className="mt-2 text-3xl font-black">{t.home.popularFields}</h2>
            </div>
            <Link href={localizedHref("/fields", locale)} className="text-sm font-black text-emerald-700">
              {t.home.viewAll}
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {venues.map((venue) => (
              <FieldCard key={venue.slug} venue={venue} locale={locale} />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-black uppercase text-emerald-700">{t.home.howItWorks}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {renterSteps.map((step, index) => (
                <article key={step.title} className="rounded-[8px] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-black">{locale === "ar" ? ["إنشاء حساب", "تصفح الملاعب", "تحقق من الأوقات", "احجز والعب"][index] : step.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {locale === "ar" ? ["سجل كمستأجر أو مالك ملعب.", "ابحث حسب الرياضة والموقع والوقت.", "شاهد الأوقات المتاحة مباشرة.", "احجز وادفع واستمتع بالمباراة."][index] : step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase text-blue-700">{t.home.ownerFlow}</p>
            <h2 className="mt-2 max-w-2xl text-4xl font-black">{t.home.ownerTitle}</h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:items-end">
            <Link
              href={localizedHref("/owner/dashboard", locale)}
              className="rounded-[8px] bg-blue-600 px-5 py-3 text-sm font-black text-white"
            >
              {t.home.ownerDashboard}
            </Link>
            <Link
              href={localizedHref("/owner/fields/new", locale)}
              className="rounded-[8px] border border-slate-300 bg-white px-5 py-3 text-sm font-black"
            >
              {t.home.addField}
            </Link>
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
