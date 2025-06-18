"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is dashboard or core related
  const isAppRoute =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/core");

  return (
    <>
      {!isAppRoute && <Navbar />}
      {children}
      {!isAppRoute && <Footer />}
    </>
  );
}
