import { AvailabilityCalendar } from "../../_components/owner-workflows";
import { OwnerWorkspace } from "../../_components/site-shell";
import { dictionary, getLocale, type LocaleSearchParams } from "../../_lib/i18n";

export default async function OwnerCalendarPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <OwnerWorkspace active="Calendar" title={t.owner.calendarTitle} description={t.owner.calendarDescription} locale={locale}>
      <AvailabilityCalendar locale={locale} />
    </OwnerWorkspace>
  );
}
