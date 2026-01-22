'use client';

import { useState, useEffect } from 'react';
import { SHOP_PRODUCTS } from '@/lib/shopProducts';
import { useRouter } from 'next/navigation';
import { useInquiry } from '@/context/InquiryContext';
import Link from 'next/link';
import Image from 'next/image';

export default function ShopPage() {
  const router = useRouter();
  const { totalItems } = useInquiry();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Fade body background to #e6ffff when in shop
    const body = document.body;
    const prev = body.style.backgroundColor;
    body.style.transition = 'background-color 1.2s cubic-bezier(.4,0,.2,1)';
    body.style.backgroundColor = '#e6ffff';
    return () => {
      body.style.backgroundColor = prev || '#f3ffe6';
    };
  }, []);

  const handleAddToInquiry = (e: React.MouseEvent, slug: string, title: string, price: number) => {
    e.stopPropagation();
    const { addItem } = useInquiry();
    addItem({ slug, title, price });
    setNotification(`Added to inquiry`);
    setTimeout(() => setNotification(null), 1500);
  };

  const goToProduct = (slug: string) => {
    router.push(`/shop/${slug}`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header with Inquiry Cart Link */}
      {(
        typeof window === 'undefined' ||
        window.location.pathname.startsWith('/shop') ||
        totalItems > 0
      ) && (
        <div style={{ position: 'fixed', top: 24, right: 32, zIndex: 100 }}>
          <Link href="/inquiry" style={{ position: 'relative' }}>
            <div
              style={{
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Image
                src="/images/bag.png"
                alt="Inquiry basket"
                width={32}
                height={32}
                style={{ objectFit: 'contain' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#111',
                  fontFamily: 'Creatura',
                }}
              >
                {totalItems}
              </span>
            </div>
          </Link>
        </div>
      )}

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

      {/* Products Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '18px',
          marginBottom: '64px',
          background: 'none',
          maxWidth: '700px',
          marginRight: 'auto',
        }}
      >
        {SHOP_PRODUCTS.map((product) => (
          <div
            key={product.slug}
            onClick={() => goToProduct(product.slug)}
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              minHeight: '420px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {/* Product Image */}
            <div
              style={{
                background: '#fff',
                aspectRatio: '3 / 4',
                width: '100%',
                minHeight: '320px',
                maxHeight: '480px',
                marginBottom: '0',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              {product.images && product.images[0] && product.images[0].startsWith('/images/') ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'cover', background: 'transparent' }}
                  sizes="(max-width: 700px) 100vw, 350px"
                  priority={true}
                />
              ) : null}
            </div>
            {/* Product Info */}
            <div style={{ padding: '32px 0 0 0', textAlign: 'left' }}>
              <div style={{ fontSize: '20px', fontFamily: 'Creatura', color: '#111', marginBottom: '8px', fontWeight: 400 }}>
                {product.title}
              </div>
              <div style={{ fontSize: '18px', color: '#111', fontWeight: 400, marginBottom: '8px' }}>
                {product.price ? `€${product.price}` : ''}
              </div>
            </div>
          </div>
        ))}
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
