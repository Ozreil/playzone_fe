import Image from "next/image";
import Link from "next/link";
import { dictionary, direction, localizedHref, type Locale } from "../_lib/i18n";
import { BellIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import { BrandMark } from "./ui-shells";

function publicNav(locale: Locale) {
  const t = dictionary[locale];

  return [
    { href: "/", label: t.nav.home },
    { href: "/fields", label: t.nav.fields },
    { href: "/bookings", label: t.nav.bookings },
    { href: "/owner/dashboard", label: t.nav.owner },
  ];
}

function ownerNav(locale: Locale) {
  const t = dictionary[locale];

  return [
    { href: "/owner/dashboard", label: t.owner.dashboard, active: "Dashboard" },
    { href: "/owner/fields", label: t.owner.myFields, active: "My Fields" },
    { href: "/owner/fields/new", label: t.nav.addNewField, active: "Add Field" },
    { href: "/owner/bookings", label: t.owner.bookings, active: "Bookings" },
    { href: "/owner/calendar", label: t.owner.calendar, active: "Calendar" },
  ];
}

export function PublicHeader({ locale }: { locale: Locale }) {
  const t = dictionary[locale];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href={localizedHref("/", locale)} aria-label="SportsBook home">
          <BrandMark label={t.brand} />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
          {publicNav(locale).map((item) => (
            <Link key={item.href} href={localizedHref(item.href, locale)} className="hover:text-emerald-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Link
            href={localizedHref("/login", locale)}
            className="rounded-[8px] border border-slate-200 px-4 py-2 text-sm font-black text-slate-900"
          >
            {t.nav.login}
          </Link>
          <Link
            href={localizedHref("/fields", locale)}
            className="hidden rounded-[8px] bg-emerald-600 px-4 py-2 text-sm font-black text-white sm:block"
          >
            {t.nav.bookNow}
          </Link>
        </div>
      </div>
    </header>
  );
}

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-xs font-black uppercase text-emerald-700">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}

type OwnerWorkspaceProps = {
  active: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  locale: Locale;
};

export function OwnerWorkspace({ active, title, description, action, children, locale }: OwnerWorkspaceProps) {
  const t = dictionary[locale];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 lg:grid lg:grid-cols-[240px_1fr]" dir={direction(locale)} lang={locale}>
      <aside className="border-b border-slate-200 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between gap-3 px-4 lg:h-auto lg:block lg:p-6">
          <Link href={localizedHref("/", locale)} aria-label="SportsBook home">
            <BrandMark label={t.brand} />
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher locale={locale} />
            <Link href={localizedHref("/login", locale)} className="text-sm font-black text-slate-500">
              {t.nav.logout}
            </Link>
          </div>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:px-4 lg:pb-0">
          {ownerNav(locale).map((item) => (
            <Link
              key={item.href}
              href={localizedHref(item.href, locale)}
              className={`block whitespace-nowrap rounded-[8px] px-4 py-3 text-sm font-black ${
                item.active === active ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mx-4 mt-16 hidden space-y-2 lg:block">
          <LanguageSwitcher locale={locale} />
          <Link href={localizedHref("/login", locale)} className="block rounded-[8px] px-4 py-3 text-sm font-black text-slate-500">
            {t.nav.logout}
          </Link>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase text-emerald-700">{t.owner.workspace}</p>
            <p className="text-sm font-semibold text-slate-500">{t.owner.account}</p>
          </div>
          <div className="flex items-center gap-3">
            <BellIcon className="h-5 w-5 text-slate-500" />
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                alt={t.owner.account}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
          </div>
        </header>
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <PageHeader title={title} description={description} action={action} />
          <div className="mt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}

export function PublicPage({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-950" dir={direction(locale)} lang={locale}>
      <PublicHeader locale={locale} />
      {children}
    </div>
  );
}
