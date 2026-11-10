"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category } from '@/models/Category';

interface SiteContextType {
  businessInfo: {
    name: string;
    owner: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    whatsapp: string;
    domain: string;
  };
  categories: Category[];
  isQuoteModalOpen: boolean;
  selectedProductForQuote: string;
  openQuoteModal: (productName?: string) => void;
  closeQuoteModal: () => void;
}

const defaultBusinessInfo = {
  name: 'Fine Stitch Uniforms',
  owner: 'Aadil Moinuddin Sayyed',
  phone: '+91 9619585005',
  email: 'sayyedaadil35@yahoo.com',
  address: 'Malwani, Malad West',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400095',
  country: 'India',
  whatsapp: '+919619585005',
  domain: 'finestitchuniforms.com',
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, []);

  const openQuoteModal = (productName?: string) => {
    setSelectedProductForQuote(productName || '');
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProductForQuote('');
  };

  return (
    <SiteContext.Provider
      value={{
        businessInfo: defaultBusinessInfo,
        categories,
        isQuoteModalOpen,
        selectedProductForQuote,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
