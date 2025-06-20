import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { auth } from "@/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Honey Movies",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <link rel="icon" href="/images/logo-icon.png" sizes="any" />
        </head>
        <body
          className={`${poppins.className} bg-black bg-no-repeat bg-cover h-screen w-screen overflow-hidden`}
          style={{
            backgroundImage: "url(/images/background.png)",
          }}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
