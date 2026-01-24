"use client";


import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [open, setOpen] = useState(false);

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

  // Responsive: show sidebar on desktop, hamburger on mobile
  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile { display: block !important; }
        }
        @media (min-width: 901px) {
          .sidebar-desktop { display: flex !important; }
          .sidebar-mobile { display: none !important; }
        }
        .sidebar-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #f3ffe6;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 32px 20px 20px 20px;
          font-size: 20px;
          font-family: Creatura, sans-serif;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          transform: translateX(${open ? "0" : "-100vw"});
        }
        .sidebar-drawer .close-btn {
          align-self: flex-end;
          font-size: 32px;
          background: none;
          border: none;
          cursor: pointer;
          margin-bottom: 24px;
        }
        .sidebar-mobile-topbar {
          width: 100vw;
          height: 56px;
          background: #f3ffe6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1001;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .sidebar-mobile-hamburger {
          font-size: 32px;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
      {/* Desktop sidebar */}
      <aside className="sidebar-desktop"
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
        {/* ...existing sidebar content... */}
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

      {/* Mobile/Tablet: Topbar and Drawer */}
      <div className="sidebar-mobile">
        <div className="sidebar-mobile-topbar">
          <span style={{ fontWeight: 700, fontFamily: 'Creatura, sans-serif', fontSize: 18 }}>Barbora Satranská</span>
          <button className="sidebar-mobile-hamburger" aria-label="Open menu" onClick={() => setOpen(true)}>
            &#9776;
          </button>
        </div>
        <div className="sidebar-drawer" style={{ pointerEvents: open ? 'auto' : 'none' }}>
          <button className="close-btn" aria-label="Close menu" onClick={() => setOpen(false)}>&times;</button>
          <div style={{ marginBottom: bigGap }}>
            <Link
              href="/"
              style={{ display: "inline-block", lineHeight: 1.1, transition: "color 0.2s", fontSize: 22, fontWeight: 700 }}
              onClick={() => setOpen(false)}
            >
              Barbora Satranská
            </Link>
            <div style={{ fontSize: 14, color: '#666' }}>art &amp; muddling</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: bigGap }}>
            {navLinks.filter(l => l.type === "category").map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ fontSize: 18, color: getLinkColor(pathname, label, "category", activeCategory), padding: '8px 0', textDecoration: 'none' }}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <div style={{ marginBottom: bigGap }}>
            <Link
              href={`/?category=${encodeURIComponent("KVIDO pottery")}`}
              style={{ display: "inline-block", marginBottom: 16 }}
              onClick={() => setOpen(false)}
            >
              <Image
                src="/images/kvidojo.png"
                alt="KVIDO pottery"
                width={120}
                height={40}
                style={{ objectFit: "contain", maxWidth: "90vw", height: "auto", display: "block" }}
                sizes="(max-width: 700px) 60vw, 120px"
                priority={true}
              />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {navLinks.filter(l => l.type === "bottom").map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ fontSize: 18, color: getLinkColor(pathname, label, "bottom", activeCategory), padding: '8px 0', textDecoration: 'none' }}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
