import { LoginForm } from "../_components/auth-forms";
import { PublicPage } from "../_components/site-shell";
import { getLocale, type LocaleSearchParams } from "../_lib/i18n";

export default async function LoginPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);

  return (
    <PublicPage locale={locale}>
      <main className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl place-items-center px-4 py-10 sm:px-6 lg:px-8">
        <LoginForm locale={locale} />
      </main>
    </PublicPage>
  );
}
