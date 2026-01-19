
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Barbora Satranská – portfolio",
  description: "Portfolio of visual artist and illustrator Barbora Satranská.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout-root">
          <Sidebar />
          <main className="layout-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
