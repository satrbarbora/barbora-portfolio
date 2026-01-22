"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const filters = [
  "documentary drawing",
  "books & comics",
  "illustration",
  "odd design",
  "personal work",
];

type AnchorEvent = MouseEvent<HTMLAnchorElement>;

const BASE_COLOR = "#111";
const HOVER_COLOR = "#7b68ee";
const ACTIVE_COLOR = "#40e0d0";

function makeHoverHandlers(baseColor: string) {
  return {
    onMouseEnter(e: AnchorEvent) {
      e.currentTarget.style.color = HOVER_COLOR;
    },
    onMouseLeave(e: AnchorEvent) {
      e.currentTarget.style.color = baseColor;
    },
  };
}

export default function Sidebar() {
  return (
    <Suspense fallback={<div style={{ width: "260px" }} />}>
      <SidebarContent />
      <style>{`
        @media (max-width: 700px) {
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
        @media (max-width: 500px) {
          aside {
            font-size: 13px !important;
            padding: 8px 4px !important;
          }
        }
      `}</style>
    </Suspense>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  useEffect(() => {
    const aside = document.querySelector("aside");
    if (!aside) return;
    aside.style.transition = "background-color 1.2s cubic-bezier(.4,0,.2,1)";
    if (pathname === "/shop") {
      aside.style.backgroundColor = "#e6ffff";
    } else {
      aside.style.backgroundColor = "#f3ffe6";
    }
    return () => {
      aside.style.backgroundColor = "#f3ffe6";
    };
  }, [pathname]);

  const mediumGap = "10px";
  const bigGap = "52px";

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
      {/* TOP BLOCK: jméno */}
      <div>
        {/* Jméno + art & muddling jako odkaz na homepage */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            lineHeight: 1.1,
            transition: "color 0.2s",
            marginBottom: bigGap,
          }}
          {...makeHoverHandlers(BASE_COLOR)}
        >
          <div style={{ marginBottom: mediumGap }}>Barbora Satranská</div>
          <div>art &amp; muddling</div>
        </Link>
      </div>

      {/* CATEGORIES BLOCK: between headline and logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: 1,
          paddingTop: "40px",
        }}
      >
        {/* FILTRY */}
        {filters.map((label) => {
          const isActive = activeCategory === label;
          const baseColor = isActive ? ACTIVE_COLOR : BASE_COLOR;
          const { onEnter, onLeave } = makeHoverHandlers(baseColor);

          return (
            <div
              key={label}
              style={{
                marginBottom:
                  label === "personal work" ? bigGap : mediumGap,
              }}
            >
              <Link
                href={`/?category=${encodeURIComponent(label)}`}
                style={{
                  transition: "color 0.2s",
                  color: baseColor,
                }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </div>

      {/* MIDDLE BLOCK: KVIDO logo - fixed vertical center, horizontally aligned with links */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "20px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div style={{ pointerEvents: "auto" }}>
          <Link
            href={`/?category=${encodeURIComponent("KVIDO pottery")}`}
            style={{ transition: "transform 0.2s", display: "inline-block" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
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
        {/* SHOP link */}
        {(() => {
          const isActive = pathname === "/shop";
          const baseColor = isActive ? ACTIVE_COLOR : BASE_COLOR;
          const { onEnter, onLeave } = makeHoverHandlers(baseColor);
          return (
            <div style={{ marginBottom: mediumGap }}>
              <Link
                href="/shop"
                style={{ transition: "color 0.2s", color: baseColor }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                shop
              </Link>
            </div>
          );
        })()}
        {/* ABOUT link */}
        {(() => {
          const isActive = pathname === "/about";
          const baseColor = isActive ? ACTIVE_COLOR : BASE_COLOR;
          const { onEnter, onLeave } = makeHoverHandlers(baseColor);
          return (
            <div style={{ marginBottom: mediumGap }}>
              <Link
                href="/about"
                style={{ transition: "color 0.2s", color: baseColor }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                about
              </Link>
            </div>
          );
        })()}
        {/* CONTACT link */}
        {(() => {
          const isActive = pathname === "/contact";
          const baseColor = isActive ? ACTIVE_COLOR : BASE_COLOR;
          const { onEnter, onLeave } = makeHoverHandlers(baseColor);
          return (
            <div style={{ marginBottom: mediumGap }}>
              <Link
                href="/contact"
                style={{ transition: "color 0.2s", color: baseColor }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                contact
              </Link>
            </div>
          );
        })()}
      </div>
    </aside>
  );
}
