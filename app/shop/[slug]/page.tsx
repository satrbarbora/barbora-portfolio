'use client';

import { SHOP_PRODUCTS } from '@/lib/shopProducts';
import { useRouter, useParams } from 'next/navigation';
import { useInquiry } from '@/context/InquiryContext';
import { useState } from 'react';
import Image from 'next/image';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addItem } = useInquiry();
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);

  const slug = params.slug as string;
  const product = SHOP_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button
          onClick={() => router.back()}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'Creatura',
            marginBottom: '20px',
            padding: 0,
            color: '#111',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#7b68ee';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#111';
          }}
        >
          ← Back
        </button>
        <h1>Product not found</h1>
      </div>
    );
  }

  const handleAddToInquiry = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ slug: product.slug, title: product.title, price: product.price });
    }
    setNotification(`Added ${quantity} item${quantity > 1 ? 's' : ''}`);
    setTimeout(() => setNotification(null), 1500);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '14px',
          cursor: 'pointer',
          fontFamily: 'Creatura',
          marginBottom: '32px',
          padding: 0,
          color: '#111',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#7b68ee';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#111';
        }}
      >
        ← Back to shop
      </button>

      {/* Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#111',
            color: '#fff',
            padding: '8px 12px',
            fontSize: '12px',
            fontFamily: 'Creatura',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          {notification}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          {product.images?.map((img, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: img,
                aspectRatio: '1 / 1',
              }}
            />
          ))}
        </div>

        {/* Details */}
        <div>
          <h1
            style={{
              fontSize: '32px',
              fontFamily: 'Creatura',
              margin: '0 0 24px 0',
              lineHeight: '1.2',
            }}
          >
            {product.title}
          </h1>

          <p
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111',
              margin: '0 0 32px 0',
            }}
          >
            €{product.price}
          </p>

          {product.description && (
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#555',
                marginBottom: '32px',
              }}
            >
              {product.description}
            </p>
          )}

          {/* Quantity Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
            }}
          >
            <label
              style={{
                fontSize: '13px',
                fontFamily: 'Creatura',
                color: '#999',
              }}
            >
              Quantity
            </label>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{
                width: '28px',
                height: '28px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                width: '40px',
                padding: '6px',
                textAlign: 'center',
                border: '1px solid #ddd',
                fontSize: '13px',
              }}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                width: '28px',
                height: '28px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              +
            </button>
          </div>

          {/* Add to Inquiry Button */}
          <button
            onClick={handleAddToInquiry}
            style={{
              width: '100%',
              padding: '14px 24px',
              backgroundColor: '#111',
              color: '#fff',
              border: 'none',
              fontSize: '13px',
              fontFamily: 'Creatura',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111';
            }}
          >
            <Image
              src="/images/bag.png"
              alt="Add to inquiry"
              width={14}
              height={14}
              style={{ objectFit: 'contain', filter: 'invert(1)' }}
            />
            Add to inquiry
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
