import { BookingsTable } from "../../_components/owner-workflows";
import { OwnerWorkspace } from "../../_components/site-shell";
import { dictionary, getLocale, type LocaleSearchParams } from "../../_lib/i18n";

export default async function OwnerBookingsPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <OwnerWorkspace active="Bookings" title={t.owner.bookingsTitle} description={t.owner.bookingsDescription} locale={locale}>
      <BookingsTable locale={locale} />
    </OwnerWorkspace>
  );
}
