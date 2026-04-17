"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "../_lib/i18n";
import { dictionary } from "../_lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nextLocale: Locale = locale === "ar" ? "en" : "ar";
  const params = new URLSearchParams(searchParams.toString());

  if (nextLocale === "en") {
    params.delete("lang");
  } else {
    params.set("lang", "ar");
  }

  const href = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

  return (
    <Link
      href={href}
      className="rounded-[8px] border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700"
    >
      {dictionary[locale].language}
    </Link>
  );
}
