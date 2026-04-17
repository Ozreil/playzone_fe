import { AddFieldPanel } from "../../../_components/owner-workflows";
import { OwnerWorkspace } from "../../../_components/site-shell";
import { dictionary, getLocale, type LocaleSearchParams } from "../../../_lib/i18n";

export default async function AddFieldPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);
  const t = dictionary[locale];

  return (
    <OwnerWorkspace active="Add Field" title={t.owner.addFieldTitle} description={t.owner.addFieldDescription} locale={locale}>
      <AddFieldPanel locale={locale} />
    </OwnerWorkspace>
  );
}
