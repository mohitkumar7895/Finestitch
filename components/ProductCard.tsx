"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, MessageSquare, ExternalLink } from 'lucide-react';
import { Product } from '@/models/Product';
import { formatPrice } from '@/lib/utils';
import { useSite } from '@/context/SiteContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { businessInfo, openQuoteModal } = useSite();

  const rawPhone = businessInfo.whatsapp || businessInfo.phone || '919619585005';
  const phone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hello Fine Stitch Uniforms, I want to enquire about ${product.name}.`
  )}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#eeb012] shadow-[0_5px_18px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container (aw-img-box matching Artisan Wear) */}
      <Link href={`/products/${product.slug}`} className="relative h-64 w-full overflow-hidden bg-slate-100 block">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        {product.category_name && (
          <span className="absolute top-3 left-3 bg-[#003b5c]/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
            {product.category_name}
          </span>
        )}

        {/* Featured Tag */}
        {product.is_featured && (
          <span className="absolute top-3 right-3 bg-[#e67e22] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        )}
      </Link>

      {/* Content Container (aw-content matching Artisan Wear) */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4 text-center">
        <div className="space-y-2">
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-heading font-black text-lg sm:text-xl text-[#003b5c] group-hover:text-[#e67e22] uppercase tracking-wide transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
            {product.short_description || product.description}
          </p>

          {/* Sizes Preview if available */}
          {product.available_sizes && (
            <div className="text-[11px] text-slate-400 font-medium pt-1">
              Sizes: <span className="text-slate-600">{product.available_sizes}</span>
            </div>
          )}
        </div>

        {/* WhatsApp Enquire Button matching Artisan Wear aw-wa-btn */}
        <div className="pt-2 space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-5 rounded-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 min-h-[44px]"
          >
            <span>Enquire on WhatsApp</span>
            <MessageSquare className="w-4 h-4 fill-white shrink-0" />
          </a>

          <div className="flex items-center justify-between pt-1 px-1 text-xs">
            <button
              onClick={() => openQuoteModal(product.name)}
              className="text-[#005a6a] hover:text-[#e67e22] font-semibold transition-colors py-1.5 min-h-[36px] flex items-center"
            >
              Get Custom Quote
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="text-slate-400 hover:text-[#003b5c] font-medium flex items-center gap-1 transition-colors py-1.5 min-h-[36px]"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
