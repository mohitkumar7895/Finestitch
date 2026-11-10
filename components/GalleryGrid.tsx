"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageSquare, X } from 'lucide-react';
import { GalleryItem } from '@/models/Gallery';
import { useSite } from '@/context/SiteContext';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const { businessInfo } = useSite();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const getWhatsAppLink = (title: string) => {
    const rawPhone = businessInfo.whatsapp || businessInfo.phone || '919619585005';
    const phone = rawPhone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(`I saw ${title} in your gallery and want to enquire.`);
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <>
      {/* 3-Column Responsive Grid matching Artisan Wear layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-400 cursor-pointer aspect-square border border-slate-100/80"
            onClick={() => setActiveItem(item)}
          >
            {/* Gallery Image with Smooth Zoom on Hover */}
            <div className="relative w-full h-full">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>

            {/* Navy Backdrop Overlay on Hover matching Artisan Wear */}
            <div className="absolute inset-0 bg-[#003b5c]/85 backdrop-blur-[1px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6 z-10">
              <h3 className="font-heading font-black text-[#eeb012] text-xl sm:text-2xl uppercase tracking-wider mb-2 drop-shadow-sm">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-white text-xs sm:text-sm font-normal mb-5 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              )}
              <a
                href={getWhatsAppLink(item.title)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 bg-[#eeb012] hover:bg-white text-[#003b5c] hover:text-[#25D366] text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-md transition-all duration-200 shadow-md"
              >
                <span>Enquire</span>
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Preview */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 max-h-[92dvh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[48vh] sm:h-[60vh] w-full bg-slate-950 shrink-0">
              <Image
                src={activeItem.image_url}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-100 overflow-y-auto">
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{activeItem.title}</h3>
                {activeItem.description && (
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">{activeItem.description}</p>
                )}
              </div>
              <a
                href={getWhatsAppLink(activeItem.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto shrink-0 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
