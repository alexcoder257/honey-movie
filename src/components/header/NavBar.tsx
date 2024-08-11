"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routing = [
  {
    label: "Movies",
    href: "movie",
  },
  {
    label: "TV Series",
    href: "tv-series",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[1];
  return (
    <div className="gap-1 lg:gap-4 items-center w-fit whitespace-nowrap min-w-[200px] hidden sm:flex">
      {routing.map((route) => (
        <Link
          key={route.href}
          href={`/${route.href}`}
          className={`${
            currentPath === route.href && "border-b-4 border-primary"
          } cursor-pointer p-2 text-lg text-white font-bold`}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
