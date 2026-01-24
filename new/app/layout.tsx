import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Barbora Satranská Portfolio",
  description: "Art & muddling by Barbora Satranská.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ background: "#f0fff0" }}>
        <Sidebar />
        <main style={{ marginLeft: 260, minHeight: "100vh" }}>{children}</main>
      </body>
    </html>
  );
}
