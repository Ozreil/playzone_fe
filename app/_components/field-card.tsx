import Image from "next/image";
import Link from "next/link";
import type { Locale } from "../_lib/i18n";
import { dictionary, localizedHref } from "../_lib/i18n";
import type { Venue } from "../_data/sports-field";
import { venueCopy } from "../_data/sports-field";
import { StarIcon } from "./icons";

export function FieldCard({ venue, locale }: { venue: Venue; locale: Locale }) {
  const copy = venueCopy(venue, locale);
  const t = dictionary[locale];

  return (
    <article className="overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-sm">
      <Link href={localizedHref(`/fields/${venue.slug}`, locale)} className="block">
        <div className="relative h-44">
          <Image src={venue.image} alt={copy.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-950">{copy.name}</h2>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {copy.type} · {copy.location} · {copy.distance}
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs font-black text-amber-500">
              <StarIcon className="h-3.5 w-3.5" /> {venue.rating}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-black text-slate-950">
              {copy.price} / {t.fields.hour}
            </p>
            <span className="rounded-[8px] bg-emerald-600 px-3 py-2 text-xs font-black text-white">{t.fields.view}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function CompactFieldRow({ venue, locale }: { venue: Venue; locale: Locale }) {
  const copy = venueCopy(venue, locale);

  return (
    <Link
      href={localizedHref(`/fields/${venue.slug}`, locale)}
      className="grid grid-cols-[96px_1fr] gap-3 rounded-[8px] bg-white p-2 shadow-sm ring-1 ring-slate-200"
    >
      <div className="relative h-24 overflow-hidden rounded-[8px]">
        <Image src={venue.image} alt={copy.name} fill sizes="96px" className="object-cover" />
      </div>
      <div className="min-w-0 py-1">
        <h2 className="truncate text-sm font-black">{copy.name}</h2>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          {copy.location} · {copy.distance}
        </p>
        <p className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-500">
          <StarIcon className="h-3 w-3" /> {venue.rating} ({venue.reviews})
        </p>
        <p className="mt-2 text-xs font-black text-blue-700">
          {copy.price} / {dictionary[locale].fields.hour}
        </p>
      </div>
    </Link>
  );
}
