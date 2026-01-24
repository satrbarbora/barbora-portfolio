"use client";
import { useEffect, useState } from "react";

function getCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("requestCart") || "[]");
  } catch {
    return [];
  }
}

export default function RequestPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    // Here you would send the email (e.g. via API route or service)
    setSubmitted(true);
    localStorage.removeItem("requestCart");
    setCart([]);
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: 600, margin: '60px auto', fontSize: 20 }}>
        <h1>Request sent</h1>
        <p>Thank you for your inquiry! I will get back to you soon.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', fontSize: 20 }}>
      <h1>Request</h1>
      {cart.length === 0 ? (
        <p>Your request cart is empty.</p>
      ) : (
        <>
          <ul style={{ marginBottom: 24 }}>
            {cart.map((item) => (
              <li key={item.slug} style={{ marginBottom: 8 }}>
                {item.title} — €{item.price}
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 600, marginBottom: 24 }}>
            Total: €{cart.reduce((sum, item) => sum + item.price, 0)}
          </div>
        </>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label>
          Name (required)
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ fontSize: 18, padding: 8, marginTop: 4 }}
          />
        </label>
        <label>
          Email (required)
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ fontSize: 18, padding: 8, marginTop: 4 }}
          />
        </label>
        <label>
          Message (optional)
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            style={{ fontSize: 18, padding: 8, marginTop: 4 }}
          />
        </label>
        <button
          type="submit"
          style={{
            background: "#40e0d0",
            color: "#000",
            border: "none",
            borderRadius: 6,
            padding: "10px 28px",
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 8,
            transition: "background 0.2s, color 0.2s"
          }}
        >
          Send request
        </button>
      </form>
    </div>
  );
}
