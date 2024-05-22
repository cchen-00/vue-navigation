import type { MenuItem } from "@/types/menuTypes";

export const HEADER_MENU: MenuItem[] = [
  {
    title: "Welcome",
    url: "/welcome",
    items: [],
  },
  {
    title: "Things to do",
    url: "/things-to-do",
    items: [
      { title: "Art & Culture", url: "/art-culture" },
      { title: "Attractions", url: "/attractions" },
      { title: "Nightlife", url: "/nightlife" },
      { title: "History", url: "/history" },
      { title: "Music", url: "/music" },
      { title: "Outdoor", url: "/outdoor" },
      { title: "Shopping", url: "/shopping" },
      { title: "Sports", url: "/sports" },
    ],
  },
  {
    title: "Eat & Drink",
    url: "/food",
    items: [
      { title: "Restaurants", url: "/restaurants" },
      { title: "Bars & Pubs", url: "/bars-pubs" },
      { title: "Cafes", url: "/cafes" },
    ],
  },
  {
    title: "Where to stay",
    url: "/stay",
    items: [
      { title: "Hotels", url: "/hotels" },
      { title: "Bed & Breakfast", url: "/bed-breakfast" },
      { title: "Apartments", url: "/apartments" },
    ],
  },
  {
    title: "Plan your trip",
    url: "/plan",
    items: [],
  },
];
