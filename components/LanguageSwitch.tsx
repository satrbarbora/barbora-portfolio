
"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const isCZ = pathname.startsWith("/(cz)");

  const switchTo = (target: "en" | "cz") => {
    if (target === "en") {
      // naive switch: just replace /(cz) with /(en)
      const next = pathname.replace("/(cz)", "/(en)");
      router.push(next);
    } else {
      const next = pathname.replace("/(en)", "/(cz)");
      router.push(next);
    }
  };

  return (
    <div style={{ fontSize: "13px" }}>
      <button
        type="button"
        onClick={() => switchTo("en")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          marginRight: "8px",
          cursor: "pointer",
          fontWeight: !isCZ ? "600" : "400",
          textDecoration: !isCZ ? "underline" : "none",
        }}
      >
        EN
      </button>
      <span>|</span>
      <button
        type="button"
        onClick={() => switchTo("cz")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          marginLeft: "8px",
          cursor: "pointer",
          fontWeight: isCZ ? "600" : "400",
          textDecoration: isCZ ? "underline" : "none",
        }}
      >
        CZ
      </button>
    </div>
  );
}
