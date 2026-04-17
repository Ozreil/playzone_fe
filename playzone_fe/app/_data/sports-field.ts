export type Venue = {
  slug: string;
  name: string;
  sport: string;
  type: string;
  location: string;
  distance: string;
  rating: string;
  reviews: string;
  price: string;
  image: string;
  description: string;
  amenities: string[];
  slots: string[];
  ar: {
    name: string;
    sport: string;
    type: string;
    location: string;
    distance: string;
    price: string;
    description: string;
    amenities: string[];
    slots: string[];
  };
};

export type Booking = {
  date: string;
  time: string;
  field: string;
  renter: string;
  status: "Confirmed" | "Pending" | "Cancelled";
};

export const sports = ["Football", "Basketball", "Tennis", "Badminton", "Volleyball", "All"] as const;

export const venues: Venue[] = [
  {
    slug: "green-park-football-field",
    name: "Green Park Football Field",
    sport: "Football",
    type: "Outdoor field",
    location: "Riyadh",
    distance: "2 km",
    rating: "4.8",
    reviews: "120",
    price: "200 SAR",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    description:
      "A professional football field with artificial grass, flood lighting, clean locker rooms, and space for full 11-player matches.",
    amenities: ["Football", "11 Players", "Lights", "Parking"],
    slots: ["6-8 PM", "8-10 PM", "10-12 PM"],
    ar: {
      name: "ملعب جرين بارك لكرة القدم",
      sport: "كرة القدم",
      type: "ملعب خارجي",
      location: "الرياض",
      distance: "2 كم",
      price: "200 ر.س",
      description:
        "ملعب كرة قدم احترافي بعشب صناعي وإضاءة قوية وغرف تبديل نظيفة ومساحة مناسبة لمباريات 11 لاعبا.",
      amenities: ["كرة القدم", "11 لاعبا", "إضاءة", "مواقف"],
      slots: ["6-8 مساء", "8-10 مساء", "10-12 مساء"],
    },
  },
  {
    slug: "victory-sports-hall",
    name: "Victory Sports Hall",
    sport: "Basketball",
    type: "Indoor hall",
    location: "Jeddah",
    distance: "4 km",
    rating: "4.6",
    reviews: "84",
    price: "150 SAR",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
    description:
      "An indoor sports hall with polished court flooring, air conditioning, spectator seating, and evening booking availability.",
    amenities: ["Basketball", "Indoor", "AC", "Changing Rooms"],
    slots: ["5-7 PM", "7-9 PM", "9-11 PM"],
    ar: {
      name: "قاعة فيكتوري الرياضية",
      sport: "كرة السلة",
      type: "قاعة داخلية",
      location: "جدة",
      distance: "4 كم",
      price: "150 ر.س",
      description:
        "قاعة رياضية داخلية بأرضية مصقولة وتكييف ومقاعد للمتفرجين وأوقات حجز مسائية.",
      amenities: ["كرة السلة", "داخلي", "تكييف", "غرف تبديل"],
      slots: ["5-7 مساء", "7-9 مساء", "9-11 مساء"],
    },
  },
  {
    slug: "city-tennis-court",
    name: "City Tennis Court",
    sport: "Tennis",
    type: "Outdoor court",
    location: "Riyadh",
    distance: "5 km",
    rating: "4.7",
    reviews: "62",
    price: "120 SAR",
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
    description:
      "A well-maintained tennis court with synthetic surface, night lighting, seating, and quick hourly reservation options.",
    amenities: ["Tennis", "Lighting", "Seating", "Equipment Rental"],
    slots: ["4-5 PM", "5-6 PM", "6-7 PM"],
    ar: {
      name: "ملعب سيتي للتنس",
      sport: "تنس",
      type: "ملعب خارجي",
      location: "الرياض",
      distance: "5 كم",
      price: "120 ر.س",
      description:
        "ملعب تنس مجهز بسطح صناعي وإضاءة ليلية ومقاعد وخيارات حجز سريعة بالساعة.",
      amenities: ["تنس", "إضاءة", "مقاعد", "تأجير معدات"],
      slots: ["4-5 مساء", "5-6 مساء", "6-7 مساء"],
    },
  },
  {
    slug: "elite-sports-hall",
    name: "Elite Sports Hall",
    sport: "Football",
    type: "Indoor turf",
    location: "Dammam",
    distance: "6 km",
    rating: "4.9",
    reviews: "96",
    price: "230 SAR",
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1200&q=80",
    description:
      "A premium covered turf hall for evening football matches, team sessions, and private sports events.",
    amenities: ["Indoor Turf", "Showers", "Scoreboard", "Parking"],
    slots: ["6-7 PM", "7-8 PM", "8-9 PM"],
    ar: {
      name: "قاعة إيليت الرياضية",
      sport: "كرة القدم",
      type: "عشب داخلي",
      location: "الدمام",
      distance: "6 كم",
      price: "230 ر.س",
      description:
        "قاعة عشب مغطاة ومميزة لمباريات كرة القدم المسائية وتدريبات الفرق والفعاليات الرياضية الخاصة.",
      amenities: ["عشب داخلي", "دش", "لوحة نتائج", "مواقف"],
      slots: ["6-7 مساء", "7-8 مساء", "8-9 مساء"],
    },
  },
];

export const ownerBookings: Booking[] = [
  {
    date: "Feb 10",
    time: "6-8 PM",
    field: "Green Park",
    renter: "Omar Hassan",
    status: "Confirmed",
  },
  {
    date: "Feb 11",
    time: "7-9 PM",
    field: "Victory Hall",
    renter: "Ali Ahmed",
    status: "Pending",
  },
  {
    date: "Feb 12",
    time: "5-7 PM",
    field: "Green Park",
    renter: "Khalid Mohamed",
    status: "Confirmed",
  },
  {
    date: "Feb 13",
    time: "8-10 PM",
    field: "City Sports Hall",
    renter: "Yousef Ali",
    status: "Cancelled",
  },
];

export const ownerStats = [
  { label: "Total Fields", value: "4" },
  { label: "Upcoming", value: "12" },
  { label: "This Month", value: "1,240 SAR" },
  { label: "Rating", value: "4.8" },
];

export const renterBookings: Booking[] = [
  {
    date: "Feb 10",
    time: "6-8 PM",
    field: "Green Park",
    renter: "Sara Ahmad",
    status: "Confirmed",
  },
  {
    date: "Feb 14",
    time: "8-10 PM",
    field: "Victory Hall",
    renter: "Sara Ahmad",
    status: "Pending",
  },
  {
    date: "Feb 19",
    time: "5-6 PM",
    field: "City Tennis Court",
    renter: "Sara Ahmad",
    status: "Confirmed",
  },
];

export const renterSteps = [
  {
    title: "Create Account",
    text: "Sign up as a renter or owner.",
  },
  {
    title: "Browse Fields",
    text: "Search by sport, location, and time.",
  },
  {
    title: "Check Availability",
    text: "View open slots instantly.",
  },
  {
    title: "Book & Play",
    text: "Reserve, pay, and enjoy your game.",
  },
];

export const calendarDays = [
  "4",
  "",
  "",
  "6-10 PM",
  "",
  "6-10 PM",
  "Booked",
  "",
  "12",
  "3",
  "",
  "",
  "",
  "6-10 PM",
  "",
  "16",
  "",
  "5-11 PM",
  "",
  "",
  "",
  "",
  "6-10 PM",
  "",
  "",
  "",
  "",
  "",
];

export function venueCopy(venue: Venue, locale: "en" | "ar") {
  if (locale === "ar") {
    return {
      ...venue,
      name: venue.ar.name,
      sport: venue.ar.sport,
      type: venue.ar.type,
      location: venue.ar.location,
      distance: venue.ar.distance,
      price: venue.ar.price,
      description: venue.ar.description,
      amenities: venue.ar.amenities,
      slots: venue.ar.slots,
    };
  }

  return venue;
}

export function bookingCopy(booking: Booking, locale: "en" | "ar") {
  if (locale === "en") {
    return booking;
  }

  const fields: Record<string, string> = {
    "Green Park": "جرين بارك",
    "Victory Hall": "قاعة فيكتوري",
    "City Sports Hall": "قاعة سيتي الرياضية",
    "City Tennis Court": "ملعب سيتي للتنس",
  };

  const renters: Record<string, string> = {
    "Omar Hassan": "عمر حسن",
    "Ali Ahmed": "علي أحمد",
    "Khalid Mohamed": "خالد محمد",
    "Yousef Ali": "يوسف علي",
    "Sara Ahmad": "سارة أحمد",
  };

  const dates: Record<string, string> = {
    "Feb 10": "10 فبراير",
    "Feb 11": "11 فبراير",
    "Feb 12": "12 فبراير",
    "Feb 13": "13 فبراير",
    "Feb 14": "14 فبراير",
    "Feb 19": "19 فبراير",
  };

  return {
    ...booking,
    date: dates[booking.date] ?? booking.date,
    time: booking.time.replace("PM", "مساء"),
    field: fields[booking.field] ?? booking.field,
    renter: renters[booking.renter] ?? booking.renter,
  };
}

export function calendarLabel(day: string, locale: "en" | "ar") {
  if (locale === "en") {
    return day;
  }

  if (day === "Booked") {
    return "محجوز";
  }

  return day.replace("PM", "مساء");
}
