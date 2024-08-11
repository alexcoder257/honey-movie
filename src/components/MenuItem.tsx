import Link from "next/link";
import React from "react";
import { HiOutlineTemplate } from "react-icons/hi";

type Props = {
  data: {
    icon: React.ReactNode;
    name: string;
    href: string;
  }[];
  title: string;
};
export default function MenuItem({ data, title }: Props) {
  return (
    <div className="text-white flex flex-col gap-8 font-light">
      <div className="text-lg font-semibold text-gray-400">{title}</div>
      {data.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex gap-4 item-center hover:text-primary"
        >
          <div className="w-6 h-6 flex items-center">{item.icon}</div>
          <div className="whitespace-nowrap font-normal">{item.name}</div>
        </Link>
      ))}
    </div>
  );
}
