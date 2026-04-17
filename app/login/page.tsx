import Link from "next/link";
import { LogoIcon } from "../_components/icons";
import { PublicPage } from "../_components/site-shell";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "../_lib/i18n";

export default async function LoginPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <PublicPage locale={locale}>
      <main className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="w-full max-w-md rounded-[8px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <LogoIcon className="mx-auto h-16 w-16 text-emerald-600" />
          <h1 className="mt-4 text-center text-3xl font-black">{t.auth.appName}</h1>
          <p className="mt-1 text-center text-sm font-semibold text-slate-500">{t.auth.tagline}</p>

          <div className="mt-8 grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-sm font-black">
            <button className="rounded-[8px] bg-white py-2 text-emerald-700 shadow-sm">{t.nav.login}</button>
            <Link href={localizedHref("/register", locale)} className="py-2 text-center text-slate-500">
              {t.nav.register}
            </Link>
          </div>

          <form className="mt-6 space-y-4">
            <label className="block text-xs font-bold text-slate-500">
              {t.auth.email}
              <input
                type="email"
                placeholder="user@email.com"
                className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
              />
            </label>
            <label className="block text-xs font-bold text-slate-500">
              {t.auth.password}
              <input
                type="password"
                placeholder={t.auth.password}
                className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-emerald-600"
              />
            </label>
            <div className="flex justify-end">
              <a href="#" className="text-xs font-bold text-blue-700">
                {t.auth.forgotPassword}
              </a>
            </div>
            <Link
              href={localizedHref("/fields", locale)}
              className="block w-full rounded-[8px] bg-emerald-700 py-3 text-center text-sm font-black text-white"
            >
              {t.nav.login}
            </Link>
          </form>
        </section>
      </main>
    </PublicPage>
  );
}
