import Link from "next/link";
import { OwnerDashboard } from "../../_components/owner-dashboard";
import { OwnerWorkspace } from "../../_components/site-shell";
import { dictionary, getLocale, localizedHref, type LocaleSearchParams } from "../../_lib/i18n";

export default async function OwnerDashboardPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <OwnerWorkspace
      active="Dashboard"
      title={t.owner.dashboardTitle}
      description={t.owner.dashboardDescription}
      locale={locale}
      action={
        <Link href={localizedHref("/owner/fields/new", locale)} className="rounded-[8px] bg-emerald-600 px-5 py-3 text-sm font-black text-white">
          {t.nav.addNewField}
        </Link>
      }
    >
      <OwnerDashboard locale={locale} />
    </OwnerWorkspace>
  );
}
