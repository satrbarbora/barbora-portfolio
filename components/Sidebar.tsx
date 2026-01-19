
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LanguageSwitch from "./LanguageSwitch";

const filters = [
  "documentary drawing",
  "books & comics",
  "illustration",
  "odd design",
  "personal work",
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isCZ = pathname.startsWith("/(cz)");

  const base = isCZ ? "/(cz)" : "/(en)";

  // In a real app, filter state would live in context or search params.
  // Here we keep the sidebar purely presentational – filtering is handled in ProjectGrid via URLSearchParams.

  return (
    <aside
      style={{
        width: "260px",
        padding: "24px 20px",
        borderRight: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontFamily: "Creatura Press1, system-ui", fontSize: "20px", lineHeight: 1.2 }}>
          Barbora Satranská
        </div>
        <div style={{ marginTop: "4px", fontSize: "13px" }}>art & muddling</div>
      </div>

      <nav style={{ fontSize: "14px", lineHeight: 1.7 }}>
        <div style={{ marginBottom: "8px" }}>––––––––</div>
        {filters.map((label) => (
          <div key={label}>
            <Link href={`${base}?category=${encodeURIComponent(label)}`}>{label}</Link>
          </div>
        ))}
        <div style={{ margin: "12px 0 4px" }}>*KVIDO pottery</div>
        <div>
          <Link href={`${base}?category=${encodeURIComponent("KVIDO pottery")}`}>
            KVIDO pottery
          </Link>
        </div>
        <div style={{ margin: "12px 0 4px" }}>––––––––</div>
        <div>
          <Link href={`${base}/shop`}>shop</Link>
        </div>
        <div>
          <Link href={`${base}/about`}>about</Link>
        </div>
        <div>
          <Link href={`${base}/contact`}>contact</Link>
        </div>
      </nav>

      <div style={{ marginTop: "24px" }}>
        <LanguageSwitch />
      </div>
    </aside>
  );
}
