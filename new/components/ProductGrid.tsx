import Link from "next/link";
import Image from "next/image";
import { products } from "../data/products";

export default function ProductGrid() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 32,
      margin: "0 auto",
      maxWidth: 1200,
      padding: "40px 32px"
    }}>
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/shop/${product.slug}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <div style={{ background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", overflow: "hidden", position: 'relative' }}>
            {product.sold && (
              <div style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: '#eee',
                color: '#888',
                padding: '2px 10px',
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 15,
                zIndex: 2
              }}>SOLD</div>
            )}
            {product.images[0] && (
              <Image
                src={product.images[0]}
                alt={product.title}
                width={400}
                height={260}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
              />
            )}
            <div style={{ padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>{product.title}</div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>{product.description}</div>
              <div style={{ color: "#222", fontWeight: 500, fontSize: 17 }}>
                €{product.price}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
