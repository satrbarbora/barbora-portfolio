"use client";
import { Product } from "../data/products";
import { useState } from "react";

export default function AddToRequestButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  function addToCart() {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("requestCart") || "[]");
      if (!cart.find((item: any) => item.slug === product.slug)) {
        cart.push({ slug: product.slug, title: product.title, price: product.price });
        localStorage.setItem("requestCart", JSON.stringify(cart));
      }
      setAdded(true);
    }
  }

  return (
    <button
      onClick={addToCart}
      disabled={added}
      style={{
        background: added ? "#eee" : "#40e0d0",
        color: added ? "#888" : "#000",
        border: "none",
        borderRadius: 6,
        padding: "10px 28px",
        fontSize: 18,
        fontWeight: 600,
        cursor: added ? "default" : "pointer",
        marginTop: 8,
        transition: "background 0.2s, color 0.2s"
      }}
    >
      {added ? "Added to request" : "Add to request"}
    </button>
  );
}
