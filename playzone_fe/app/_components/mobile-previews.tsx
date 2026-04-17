import Image from "next/image";
import { ownerBookings, venues } from "../_data/sports-field";
import { BellIcon, LogoIcon, SearchIcon, StarIcon } from "./icons";
import { PhoneFrame } from "./ui-shells";
import { StatusBadge } from "./status-badge";

export function MobilePreviews() {
  return (
    <div id="mobile" className="grid gap-6 lg:grid-cols-3">
      <PhoneFrame title="Mobile login">
        <div className="grid min-h-[520px] place-items-center px-5 text-center">
          <div className="w-full">
            <LogoIcon className="mx-auto h-16 w-16 text-emerald-600" />
            <h3 className="mt-4 text-2xl font-black">SPORT FIELD</h3>
            <p className="mt-1 text-sm text-slate-500">Find. Book. Play.</p>
            <div className="mt-10 grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-sm font-bold">
              <button className="rounded-[8px] bg-white py-2 text-emerald-700 shadow-sm">Login</button>
              <button className="py-2 text-slate-500">Register</button>
            </div>
            <label className="mt-6 block text-left text-xs font-bold text-slate-500">
              Email
              <input
                value="user@email.com"
                readOnly
                className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900"
              />
            </label>
            <label className="mt-3 block text-left text-xs font-bold text-slate-500">
              Password
              <input
                value="password"
                type="password"
                readOnly
                className="mt-1 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900"
              />
            </label>
            <button className="mt-8 w-full rounded-[8px] bg-emerald-700 py-3 text-sm font-black text-white">
              Login
            </button>
          </div>
        </div>
      </PhoneFrame>

      <PhoneFrame title="Browse fields">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black">Hello, Sara!</h3>
            <BellIcon className="h-5 w-5" />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-3 text-xs text-slate-400">
            <SearchIcon className="h-4 w-4" />
            Search fields, sports, or location
          </div>
          <div className="mt-3 flex gap-2 text-xs font-bold">
            {["Football", "Basketball", "Tennis"].map((sport) => (
              <button key={sport} className="rounded-[8px] bg-slate-100 px-3 py-2 first:bg-emerald-100 first:text-emerald-700">
                {sport}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {venues.map((venue) => (
              <article key={venue.name} className="grid grid-cols-[92px_1fr] gap-3 rounded-[8px] bg-white p-2 shadow-sm">
                <div className="relative h-24 overflow-hidden rounded-[8px]">
                  <Image src={venue.image} alt={venue.name} fill sizes="92px" className="object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-black">{venue.name}</h4>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {venue.location} · {venue.distance}
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-[11px] font-bold text-amber-500">
                    <StarIcon className="h-3 w-3" /> {venue.rating} ({venue.reviews})
                  </p>
                  <p className="mt-2 text-xs font-black text-blue-700">{venue.price} / hour</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </PhoneFrame>

      <PhoneFrame title="Owner bookings">
        <div className="px-4 py-4">
          <h3 className="text-xl font-black">My Bookings</h3>
          <div className="mt-4 grid grid-cols-2 rounded-[8px] bg-slate-100 p-1 text-xs font-black">
            <button className="rounded-[8px] bg-blue-600 py-2 text-white">Upcoming</button>
            <button className="text-slate-500">Past</button>
          </div>
          <div className="mt-5 space-y-3">
            {ownerBookings.slice(0, 3).map((booking, index) => (
              <article key={booking.field + booking.date} className="rounded-[8px] bg-white p-3 shadow-sm">
                <div className="flex gap-3">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[8px]">
                    <Image src={venues[index].image} alt={booking.field} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black">{booking.field}</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {booking.date}, {booking.time}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-500">{booking.renter}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <StatusBadge status={booking.status} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
