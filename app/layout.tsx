import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { InquiryProvider } from "@/context/InquiryContext";

export const metadata = {
  title: "Barbora Satranská – art & muddling",
  description: "Illustration, comics and documentary drawing portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <InquiryProvider>
          <div
            style={{
              display: "flex",
              minHeight: "100vh",
            }}
          >
            <Sidebar />
            <main
              style={{
                flex: 1,
                padding: "24px",
                marginLeft: "260px",
              }}
            >
              {children}
            </main>
          </div>
        </InquiryProvider>
      </body>
    </html>
  );
}
