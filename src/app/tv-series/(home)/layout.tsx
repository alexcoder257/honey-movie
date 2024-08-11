import SideBar from "@/components/SideBar";
import HeaderBar from "@/components/header/HeaderBar";
import "../../globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex md:justify-end">
      <div className="hidden md:block">
        <SideBar />
      </div>
      <div className="flex flex-col justify-end md:w-calc-sidebar w-full">
        <HeaderBar />
        <div
          className="px-4 overflow-y-auto"
          style={{ height: "calc(100% - 120px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
