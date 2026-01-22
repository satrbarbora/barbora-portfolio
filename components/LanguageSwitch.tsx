"use client";

import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

type ButtonEvent = MouseEvent<HTMLButtonElement>;

const BASE_COLOR = "#111";
const HOVER_COLOR = "#7b68ee";
const ACTIVE_COLOR = "#40e0d0";

function handleHover(on: boolean, e: ButtonEvent) {
  e.currentTarget.style.color = on ? HOVER_COLOR : BASE_COLOR;
}

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const isCZ = pathname.startsWith("/(cz)");

  const switchTo = (target: "en" | "cz") => {
    if (target === "en") {
      const next = pathname.replace("/(cz)", "/(en)") || "/(en)";
      router.push(next);
    } else {
      const next = pathname.replace("/(en)", "/(cz)") || "/(cz)/about";
      router.push(next);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginTop: 0, // spacing is controlled by Sidebar
        fontFamily: "Creatura, sans-serif",
        fontSize: "21px",
        lineHeight: 1.15,
        color: BASE_COLOR,
      }}
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        onMouseEnter={(e) => handleHover(true, e)}
        onMouseLeave={(e) => handleHover(false, e)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "inherit",
          color: isCZ ? BASE_COLOR : ACTIVE_COLOR,
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        EN
      </button>
      <span>/</span>
      <button
        type="button"
        onClick={() => switchTo("cz")}
        onMouseEnter={(e) => handleHover(true, e)}
        onMouseLeave={(e) => handleHover(false, e)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "inherit",
          color: isCZ ? ACTIVE_COLOR : BASE_COLOR,
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        CZ
      </button>
    </div>
  );
}
