"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Lock 
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Footer() {
  const { businessInfo } = useSite();

  return (
    <footer className="bg-[#0b233a] text-slate-300 pt-8 sm:pt-12 pb-5 sm:pb-7 border-t-4 border-[#eeb012]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid - 2 columns on mobile (Aamne-Saamne), 12 columns on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-6 gap-x-4 sm:gap-8 pb-6 sm:pb-8 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Bio (Spans full 2 cols on mobile, 5 cols on md+) */}
          <div className="col-span-2 md:col-span-5 space-y-2.5 sm:space-y-3">
            <Link href="/" className="inline-block" aria-label="Fine Stitch Uniforms Home">
              <div className="relative h-9 w-44 sm:h-11 sm:w-56">
                <Image
                  src="/logo/logo-white.svg"
                  alt="Fine Stitch Uniforms"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-300/90 leading-relaxed max-w-sm">
              Customized apparel, uniforms, and corporate gifting solutions for B2B institutions across Mumbai and pan-India.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs text-slate-400 pt-0.5">
              <span>Proprietor: <strong className="text-slate-200 font-semibold">{businessInfo.owner}</strong></span>
              <span className="text-slate-600 hidden xs:inline">•</span>
              <span className="text-slate-400">Mumbai, Maharashtra</span>
            </div>
          </div>

          {/* Column 2: Quick Links (Col 1 on mobile - Aamne) */}
          <div className="col-span-1 md:col-span-3 space-y-2 sm:space-y-3">
            <div>
              <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase font-heading">
                QUICK LINKS
              </h3>
              <div className="w-8 h-[2px] bg-[#eeb012] mt-1.5 mb-2.5"></div>
            </div>
            <ul className="space-y-1.5 sm:space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#eeb012] transition-colors py-0.5 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/page/About-Us" className="hover:text-[#eeb012] transition-colors py-0.5 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/page/Our-Products" className="hover:text-[#eeb012] transition-colors py-0.5 inline-block">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/page/Gallery" className="hover:text-[#eeb012] transition-colors py-0.5 inline-block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/page/Contact-Us" className="hover:text-[#eeb012] transition-colors py-0.5 inline-block">
                  Contact Us
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]">
                  <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (Col 2 on mobile - Saamne) */}
          <div className="col-span-1 md:col-span-4 space-y-2 sm:space-y-3">
            <div>
              <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase font-heading">
                CONTACT US
              </h3>
              <div className="w-8 h-[2px] bg-[#eeb012] mt-1.5 mb-2.5"></div>
            </div>
            <div className="space-y-2 sm:space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#eeb012] shrink-0 mt-0.5" />
                <span className="leading-snug text-[11px] sm:text-xs">
                  {businessInfo.address}, {businessInfo.city} - {businessInfo.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#eeb012] shrink-0" />
                <a 
                  href={`tel:${businessInfo.phone}`} 
                  className="hover:text-[#eeb012] font-semibold tracking-wide text-[11px] sm:text-xs"
                >
                  {businessInfo.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#eeb012] shrink-0 mt-0.5" />
                <a 
                  href={`mailto:${businessInfo.email}`} 
                  className="hover:text-[#eeb012] text-[11px] sm:text-xs break-all leading-snug"
                >
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar (Compact single/double row) */}
        <div className="pt-4 sm:pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-2 sm:gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Fine Stitch Uniforms. Design By: Provisioning Tech</p>
          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 text-[11px] text-slate-400">
            <span>Proprietor: {businessInfo.owner}</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <Link href="/page/Contact-Us" className="hover:text-white transition-colors">Privacy &amp; Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
