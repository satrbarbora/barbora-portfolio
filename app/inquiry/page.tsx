'use client';

import { useInquiry } from '@/context/InquiryContext';
import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function InquiryPage() {
  const { items, removeItem, updateQuantity, clearInquiry, totalPrice } = useInquiry();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || items.length === 0) {
      alert('Please fill in your name, email, and add items to your inquiry.');
      return;
    }
    // ...form submission logic here...
  }
  if (items.length === 0 && !submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontFamily: 'Creatura', marginBottom: '16px' }}>
          Your Inquiry
        </h1>
        <p style={{ fontSize: '14px', color: '#999', marginBottom: '32px' }}>
          Your inquiry is empty.
        </p>
        <Link href="/shop">
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#111',
              color: '#fff',
              border: 'none',
              fontSize: '13px',
              fontFamily: 'Creatura',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111';
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#f3ffe6',
            padding: '32px',
            textAlign: 'center',
            borderTop: '2px solid #111',
            borderBottom: '2px solid #111',
          }}
        >
          <h1
            style={{
              fontSize: '28px',
              fontFamily: 'Creatura',
              marginBottom: '16px',
              color: '#111',
            }}
          >
            ✓ Inquiry Sent
          </h1>
          <p style={{ fontSize: '13px', color: '#555', marginBottom: '24px', lineHeight: '1.6' }}>
            Thank you, {formData.name}! Your inquiry has been sent to {formData.email}. We'll get back to you shortly with a formal proposal.
          </p>
          <Link href="/shop">
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                fontSize: '13px',
                fontFamily: 'Creatura',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111';
              }}
            >
              Back to Shop
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* ...existing inquiry and form layout... */}
    </div>
  );
}
