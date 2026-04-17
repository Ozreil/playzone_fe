import { redirect } from "next/navigation";
import { localizedHref, type LocaleSearchParams, getLocale } from "../_lib/i18n";

export default async function OwnerPage({ searchParams }: { searchParams?: LocaleSearchParams }) {
  const locale = await getLocale(searchParams);

  redirect(localizedHref("/owner/dashboard", locale));
}
