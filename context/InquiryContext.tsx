'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type InquiryItem = {
  slug: string;
  title: string;
  price: number;
  quantity: number;
};

type InquiryContextType = {
  items: InquiryItem[];
  addItem: (item: Omit<InquiryItem, 'quantity'>) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearInquiry: () => void;
  totalPrice: number;
  totalItems: number;
};

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);

  const addItem = (item: Omit<InquiryItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.slug === item.slug);
      if (existingItem) {
        return prevItems.map((i) =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug);
    } else {
      setItems((prevItems) =>
        prevItems.map((i) => (i.slug === slug ? { ...i, quantity } : i))
      );
    }
  };

  const clearInquiry = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <InquiryContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearInquiry,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
