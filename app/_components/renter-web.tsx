import Image from "next/image";
import { renterSteps, venues } from "../_data/sports-field";
import { BrandMark } from "./ui-shells";
import { SearchIcon, StarIcon } from "./icons";

const sports = ["Football", "Basketball", "Tennis", "Badminton", "Volleyball", "All"];

export function RenterWeb() {
  return (
    <div className="bg-white">
      <header className="flex items-center justify-between px-5 py-4">
        <BrandMark />
        <nav className="hidden items-center gap-6 text-xs font-semibold text-slate-600 md:flex">
          <a href="#fields">Home</a>
          <a href="#fields">Fields</a>
          <a href="#process">How It Works</a>
          <a href="#owner">Owners</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-[8px] border border-slate-200 px-4 py-2 text-xs font-bold text-slate-900">
            Login
          </button>
          <button className="rounded-[8px] bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
            Sign Up
          </button>
        </div>
      </header>

      <section className="relative min-h-[310px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=80"
          alt="Night football field with players"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
        <div className="relative max-w-xl px-7 py-10 text-white">
          <h1 className="max-w-md text-4xl font-black leading-tight md:text-5xl">
            Find & Book Your Perfect Sports Field
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
            Discover sports halls, football fields, tennis courts, and more near you.
          </p>
          <div className="mt-7 grid gap-2 rounded-[8px] bg-white p-2 text-slate-500 shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto]">
            {["Sport", "Location", "Date"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-[8px] bg-slate-50 px-3 py-3 text-xs">
                <SearchIcon className="h-3.5 w-3.5" />
                <span>{item}</span>
              </div>
            ))}
            <button className="rounded-[8px] bg-emerald-600 px-6 py-3 text-xs font-bold text-white">
              Search
            </button>
          </div>
        </div>
      </section>

      <section id="fields" className="px-5 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {sports.map((sport) => (
            <button
              key={sport}
              className="min-w-24 rounded-[8px] border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 first:border-emerald-600 first:text-emerald-700"
            >
              {sport}
            </button>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">Popular Fields</h2>
          <a className="text-sm font-bold text-emerald-700" href="#mobile">
            View all
          </a>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {venues.map((venue) => (
            <article
              key={venue.name}
              className="overflow-hidden rounded-[8px] border border-slate-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
            >
              <div className="relative h-28">
                <Image src={venue.image} alt={venue.name} fill sizes="240px" className="object-cover" />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-black text-slate-950">{venue.name}</h3>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                    <StarIcon className="h-3 w-3" /> {venue.rating}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">{venue.location}</p>
                <p className="mt-2 text-xs font-black text-slate-950">{venue.price}/hr</p>
                <button className="mt-3 w-full rounded-[8px] bg-emerald-600 py-2 text-xs font-bold text-white">
                  Book Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="border-t border-slate-100 bg-slate-50 px-5 py-7">
        <h2 className="text-center text-2xl font-black text-slate-950">How It Works</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {renterSteps.map((step, index) => (
            <div key={step.title} className="rounded-[8px] bg-white p-4 shadow-sm">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-600 text-xs font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 text-sm font-black text-slate-950">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
