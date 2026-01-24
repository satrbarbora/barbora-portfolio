"use client";


import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const BASE_COLOR = "#111";
const HOVER_COLOR = "#7b68ee";
const ACTIVE_COLOR = "#40e0d0";
const mediumGap = "10px";
const bigGap = "52px";

const navLinks = [
  { label: "documentary drawing", href: "/?category=documentary%20drawing", type: "category" },
  { label: "books & comics", href: "/?category=books%20%26%20comics", type: "category" },
  { label: "illustration", href: "/?category=illustration", type: "category" },
  { label: "odd design", href: "/?category=odd%20design", type: "category" },
  { label: "personal work", href: "/?category=personal%20work", type: "category" },
  { label: "shop", href: "/shop", type: "bottom" },
  { label: "about", href: "/about", type: "bottom" },
  { label: "contact", href: "/contact", type: "bottom" },
];

function getLinkColor(pathname, label, type, activeCategory) {
  if (type === "category") {
    return activeCategory === label ? ACTIVE_COLOR : BASE_COLOR;
  }
  return pathname === `/${label}` ? ACTIVE_COLOR : BASE_COLOR;
}

function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  useEffect(() => {
    const aside = document.querySelector("aside");
    if (!aside) return;
    aside.style.transition = "background-color 1.2s cubic-bezier(.4,0,.2,1)";
    aside.style.backgroundColor = pathname === "/shop" ? "#e6ffff" : "#f3ffe6";
    return () => {
      aside.style.backgroundColor = "#f3ffe6";
    };
  }, [pathname]);

  const handleHover = (baseColor) => ({
    onMouseEnter: (e) => (e.currentTarget.style.color = HOVER_COLOR),
    onMouseLeave: (e) => (e.currentTarget.style.color = baseColor),
  });

  return (
    <aside
      style={{
        width: "260px",
        minWidth: "200px",
        maxWidth: "100vw",
        padding: "24px 20px",
        fontFamily: "Creatura, sans-serif",
        fontSize: "21px",
        lineHeight: 1.15,
        color: BASE_COLOR,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        flexShrink: 0,
        backgroundColor: "#f3ffe6",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          aside {
            width: 100vw !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            padding: 16px 8px !important;
            font-size: 16px !important;
            position: static !important;
            height: auto !important;
          }
        }
        @media (max-width: 700px) {
          aside {
            font-size: 13px !important;
            padding: 8px 4px !important;
          }
          aside > div[style*='position: absolute'] {
            top: 44%;
            padding-left: 8px !important;
          }
          aside > div[style*='position: absolute'] img {
            width: 90vw !important;
            max-width: 90vw !important;
          }
        }
        @media (max-width: 500px) {
          aside {
            font-size: 11px !important;
            padding: 4px 2px !important;
          }
          aside > div[style*='position: absolute'] {
            top: 40%;
            padding-left: 4px !important;
          }
        }
      `}</style>
      {/* TOP BLOCK: jméno */}
      <div>
        <Link
          href="/"
          style={{
            display: "inline-block",
            lineHeight: 1.1,
            transition: "color 0.2s",
            marginBottom: bigGap,
          }}
          {...handleHover(BASE_COLOR)}
        >
          <div style={{ marginBottom: mediumGap }}>Barbora Satranská</div>
          <div>art &amp; muddling</div>
        </Link>
      </div>

      {/* CATEGORIES BLOCK */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", flex: 1, paddingTop: "40px" }}>
        {navLinks.filter(l => l.type === "category").map(({ label, href }) => {
          const color = getLinkColor(pathname, label, "category", activeCategory);
          return (
            <div key={label} style={{ marginBottom: label === "personal work" ? bigGap : mediumGap }}>
              <Link
                href={href}
                style={{ transition: "color 0.2s", color }}
                {...handleHover(color)}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </div>

      {/* MIDDLE BLOCK: KVIDO logo */}
      <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "20px", pointerEvents: "none", zIndex: 2 }}>
        <div style={{ pointerEvents: "auto" }}>
          <Link
            href={`/?category=${encodeURIComponent("KVIDO pottery")}`}
            style={{ transition: "transform 0.2s", display: "inline-block" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Image
              src="/images/kvidojo.png"
              alt="KVIDO pottery"
              width={135}
              height={47}
              style={{ objectFit: "contain", maxWidth: "90vw", height: "auto", display: "block" }}
              sizes="(max-width: 700px) 60vw, 135px"
              priority={true}
            />
          </Link>
          <style>{`
            @media (max-width: 900px) {
              aside > div[style*='position: absolute'] {
                width: 100vw !important;
                left: 0 !important;
                padding-left: 12px !important;
              }
            }
            @media (max-width: 700px) {
              aside > div[style*='position: absolute'] {
                top: 44%;
                padding-left: 8px !important;
              }
              aside > div[style*='position: absolute'] img {
                width: 90vw !important;
                max-width: 90vw !important;
              }
            }
            @media (max-width: 500px) {
              aside > div[style*='position: absolute'] {
                top: 40%;
                padding-left: 4px !important;
              }
            }
          `}</style>
        </div>
      </div>

      {/* BOTTOM BLOCK: shop + about + contact */}
      <div>
        {navLinks.filter(l => l.type === "bottom").map(({ label, href }) => {
          const color = getLinkColor(pathname, label, "bottom", activeCategory);
          return (
            <div key={label} style={{ marginBottom: mediumGap }}>
              <Link
                href={href}
                style={{ transition: "color 0.2s", color }}
                {...handleHover(color)}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
