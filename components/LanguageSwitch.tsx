
"use client";
import { usePathname, useRouter } from "next/navigation";

const BASE_COLOR = "#111";
const HOVER_COLOR = "#7b68ee";
const ACTIVE_COLOR = "#40e0d0";

type LangButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function LangButton({ active, label, onClick }: LangButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.color = HOVER_COLOR)}
      onMouseLeave={e => (e.currentTarget.style.color = active ? ACTIVE_COLOR : BASE_COLOR)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
        color: active ? ACTIVE_COLOR : BASE_COLOR,
        textDecoration: "none",
        transition: "color 0.2s",
      }}
    >
      {label}
    </button>
  );
}

export default function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const isCZ = pathname.startsWith("/(cz)");

  const switchTo = (target) => {
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
        marginTop: 0,
        fontFamily: "Creatura, sans-serif",
        fontSize: "21px",
        lineHeight: 1.15,
        color: BASE_COLOR,
      }}
    >
      <LangButton active={!isCZ} label="EN" onClick={() => switchTo("en")} />
      <span>/</span>
      <LangButton active={isCZ} label="CZ" onClick={() => switchTo("cz")} />
    </div>
  );
}
