import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Shirt, Target, Gift, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: "About Us | Fine Stitch Uniforms Mumbai",
  description: "Learn about Fine Stitch Uniforms in Malad West, Mumbai. Dedicated to high-quality customized uniforms, durable fabrics, and superior craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#fcfdfd] min-h-screen py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* 1. Centered Header Section (Exact Artisan Wear About Us header) */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-widest font-bold text-[#0d5c75]">
            EXCELLENCE IN APPAREL
          </p>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#0f2e3d] break-words">
            About <span className="text-[#e67e22]">Fine Stitch Uniforms</span>
          </h1>
          <div className="w-12 h-0.5 bg-[#e67e22] mx-auto mt-2 mb-3"></div>
          
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase block pb-1 font-mono">
            MUMBAI, MAHARASHTRA • FINESTITCHUNIFORMS.COM
          </span>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pt-1">
            Fine Stitch Uniforms specializes in providing high-quality customized apparel and corporate gifting solutions for businesses and organizations. We deliver products that combine comfort, durability, and professional branding.
          </p>
        </div>

        {/* 2. Middle Identity Area: Circular Brand Badge (Left) + Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center pt-2">
          {/* Left Column: Brand Emblem Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-52 h-52 sm:w-80 sm:h-80 transition-transform duration-300 hover:scale-[1.02] drop-shadow-xl">
              <Image
                src="/logo/circular-emblem.svg"
                alt="Fine Stitch Uniforms Circular Emblem"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column: Professional Branding Solutions */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#0f2e3d] break-words">
              Professional Branding <span className="text-[#e67e22]">Solutions</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We are proud to have served prestigious clients across corporate offices, healthcare facilities, educational institutions, hospitality chains, and industrial units, delivering quality uniforms and customized apparel solutions.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We ensure your team and brand are represented in the best way by focusing on high-quality materials and professional finishing.
            </p>

            {/* Checklist with Orange Checkmarks matching reference */}
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#e67e22] stroke-[3] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#0f2e3d]">
                  Specialized Uniform Stitching
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#e67e22] stroke-[3] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#0f2e3d]">
                  Bespoke T-Shirt Printing
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#e67e22] stroke-[3] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#0f2e3d]">
                  Corporate Gifting Expertise
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom 3 Value Cards (Exact Artisan Wear layout & icons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-10">
          {/* Card 1: Premium Comfort */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#0f2e3d]">
              Premium Comfort
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed for daily professional use with durable fabric.
            </p>
          </div>

          {/* Card 2: Logo Accuracy */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#0f2e3d]">
              Logo Accuracy
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ensuring accurate brand representation across all apparel.
            </p>
          </div>

          {/* Card 3: Memorable Gifts */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#0f2e3d]">
              Memorable Gifts
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-quality corporate gifts that leave a lasting impression.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
