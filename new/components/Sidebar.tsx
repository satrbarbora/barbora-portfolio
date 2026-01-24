"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./Sidebar.module.css";

const categories = [
  "documentary drawing",
  "books & comics",
  "illustration",
  "odd design",
  "personal work",
];

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <aside className={styles.sidebar}>
      <div>
        <Link href="/" className={styles.title} prefetch={false}>
          <div>Barbora Satranská</div>
          <div>art & muddling</div>
        </Link>
        <div className={styles.gap52} />
        <nav>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className={
                styles.link +
                (activeCategory === cat ? " " + styles.active : "")
              }
              prefetch={false}
            >
              {cat}
            </Link>
          ))}
          <div className={styles.gap52} />
          <Link
            href="/?category=KVIDO%20pottery"
            className={
              styles.kvido +
              (activeCategory === "KVIDO pottery" ? " " + styles.active : "")
            }
            prefetch={false}
          >
            <span className={styles.kvidoImgWrapper}>
              <Image
                src="/images/kvido.png"
                alt="KVIDO pottery"
                fill
                style={{ objectFit: "contain" }}
                className={styles.kvidoImg}
                sizes="32px"
                priority
              />
            </span>
            <span className={styles.kvidoText}>pottery</span>
          </Link>
        </nav>
        <div className={styles.gap52} />
      </div>
      <div className={styles.bottomLinks}>
        <Link href="/shop" className={styles.link} prefetch={false}>
          shop
        </Link>
        <Link href="/about" className={styles.link} prefetch={false}>
          about
        </Link>
        <Link href="/contact" className={styles.link} prefetch={false}>
          contact
        </Link>
      </div>
    </aside>
  );
}
