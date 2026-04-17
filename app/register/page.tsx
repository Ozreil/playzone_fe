import Link from "next/link";
import { LogoIcon } from "../_components/icons";
import { PublicPage } from "../_components/site-shell";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "../_lib/i18n";

export default async function RegisterPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <PublicPage locale={locale}>
      <main className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="w-full max-w-md rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <LogoIcon className="mx-auto h-16 w-16 text-emerald-600" />
          <h1 className="mt-4 text-center text-3xl font-black">{t.auth.createAccount}</h1>
          <p className="mt-1 text-center text-sm font-semibold text-slate-500">{t.auth.chooseAccess}</p>

          <div className="mt-8 grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-sm font-black">
            <Link href={localizedHref("/login", locale)} className="py-2 text-center text-slate-500">
              {t.nav.login}
            </Link>
            <button className="rounded-[8px] bg-white py-2 text-emerald-700 shadow-sm">{t.nav.register}</button>
          </div>

          <form className="mt-6 space-y-4">
            <label className="block text-xs font-bold text-slate-500">
              {t.auth.fullName}
              <input
                placeholder={locale === "ar" ? "سارة أحمد" : "Sara Ahmad"}
                className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
              />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              {t.auth.email}
              <input
                type="email"
                placeholder="user@email.com"
                className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
              />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              {t.auth.accountType}
              <select className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600">
                <option>{t.auth.renter}</option>
                <option>{t.auth.owner}</option>
              </select>
            </label>
            <Link
              href={localizedHref("/fields", locale)}
              className="block w-full rounded-[8px] bg-emerald-700 py-3 text-center text-sm font-black text-white"
            >
              {t.auth.createAccount}
            </Link>
          </form>
        </section>
      </main>
    </PublicPage>
  );
}
