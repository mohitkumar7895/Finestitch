"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Gem, 
  Boxes, 
  Truck, 
  Tag, 
  Package, 
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Hero() {
  const { businessInfo, openQuoteModal } = useSite();

  const rawPhone = businessInfo.whatsapp || businessInfo.phone || '919619585005';
  const phone = rawPhone.replace(/[^0-9]/g, '');

  return (
    <div className="relative">
      {/* 1. Fullscreen Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center bg-slate-900 overflow-hidden py-10 xs:py-14 sm:py-20 px-3 sm:px-6">
        {/* Background Image with Fixed/Cover styling */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558191053-8edcb01e1da3?auto=format&fit=crop&w=1600&q=80')",
          }}
        ></div>

        {/* Dark Gradient Overlay matching Artisan Wear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-[#005a6a]/70 z-10"></div>

        {/* Hero Content Center */}
        <div className="relative z-20 max-w-4xl mx-auto text-center text-white space-y-3.5 sm:space-y-6 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Badge Group with lines on left & right */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-2">
            <span className="hidden xs:block w-4 sm:w-12 h-0.5 bg-[#eeb012] shrink-0"></span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[1px] sm:tracking-[2px] text-[#eeb012] text-center">
              Customized T-Shirts &amp; Corporate Apparel Solutions
            </span>
            <span className="hidden xs:block w-4 sm:w-12 h-0.5 bg-[#eeb012] shrink-0"></span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.2] break-words px-1">
            Customized Apparel That Builds Your <br className="hidden sm:inline" />
            <span className="text-[#eeb012]">Brand Identity</span>
          </h1>

          {/* Subheadline Paragraph */}
          <p className="text-xs sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal px-2">
            Premium customized T-shirts, hoodies, jackets, caps, uniforms, and corporate gifting solutions for corporates, institutions, and events.
          </p>

          {/* Offer Badges (₹150 & 20 Pieces) */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 pt-1 sm:pt-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm bg-white/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-white/20 text-white shadow-xs">
              <Tag className="w-3.5 h-3.5 text-[#eeb012] shrink-0" />
              <span>Starting from <strong className="text-[#eeb012] font-bold">₹150</strong> / pc</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm bg-white/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-white/20 text-white shadow-xs">
              <Package className="w-3.5 h-3.5 text-[#eeb012] shrink-0" />
              <span>Min. Order: <strong className="text-[#eeb012] font-bold">20 Pieces</strong></span>
            </div>
          </div>

          {/* CTA Buttons (Order Now & Get A Quote) */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 pt-3 sm:pt-4 flex-col sm:flex-row w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hello Fine Stitch Uniforms, I would like to place an order for customized apparel.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-[#eeb012] hover:bg-white text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 sm:py-4 px-7 sm:px-8 rounded-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              Order Now
            </a>

            <button
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto text-center border-2 border-white hover:bg-white hover:text-[#005a6a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-7 sm:px-8 rounded-xl backdrop-blur-sm active:scale-95 transition-all duration-300 min-h-[44px] flex items-center justify-center"
            >
              Get A Quote
            </button>
          </div>
        </div>
      </section>

      {/* 2. Three Feature Cards Section directly below Hero */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Premium Quality */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 space-y-2.5">
            <div className="w-11 h-11 rounded-xl bg-[#005a6a]/10 text-[#005a6a] flex items-center justify-center">
              <Gem className="w-5 h-5 text-[#005a6a]" />
            </div>
            <h3 className="font-heading font-black text-base sm:text-lg text-[#005a6a]">
              Premium Quality
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Durable customization and fabrics designed for professional standards.
            </p>
          </div>

          {/* Card 2: Bulk Production */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 space-y-2.5">
            <div className="w-11 h-11 rounded-xl bg-[#e67e22]/10 text-[#e67e22] flex items-center justify-center">
              <Boxes className="w-5 h-5 text-[#e67e22]" />
            </div>
            <h3 className="font-heading font-black text-base sm:text-lg text-[#005a6a]">
              Bulk Production
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Cost-effective solutions for schools, colleges, and corporations.
            </p>
          </div>

          {/* Card 3: Reliable Delivery */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 space-y-2.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Truck className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-heading font-black text-base sm:text-lg text-[#005a6a]">
              Reliable Delivery
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Timely fulfillment across Mumbai and pan-India destinations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
