import React from 'react';
import { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { getGalleryItems } from '@/lib/queries';

export const metadata: Metadata = {
  title: "Gallery | Our Custom Work | Fine Stitch Uniforms Mumbai",
  description: "Showcasing premium customized apparel, corporate uniforms, hoodies, caps, and branding solutions by Fine Stitch Uniforms Mumbai.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-[#f4f7f9] min-h-screen">
      {/* Header Banner - Exact 1-to-1 Match to Artisan Wear */}
      <header className="bg-gradient-to-r from-[#003b5c] to-[#00738b] py-16 sm:py-20 text-center text-white border-b-[5px] border-[#eeb012]">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-[2px] mb-3 text-white drop-shadow-sm">
            Our Custom Work
          </h1>
          <p className="text-base sm:text-lg text-white/90 font-normal">
            Showcasing premium apparel and corporate branding solutions.
          </p>
        </div>
      </header>

      {/* Gallery Section - 3 Column Layout matching Reference */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <GalleryGrid items={items} />
      </main>
    </div>
  );
}
