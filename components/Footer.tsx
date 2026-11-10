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
    <footer className="bg-[#0b233a] text-slate-300 pt-16 pb-8 border-t-[5px] border-[#eeb012]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid - 3 Column Layout matching Artisan Wear */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-56 sm:w-64">
                <Image
                  src="/logo/logo-white.svg"
                  alt="Fine Stitch Uniforms"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              A fast-growing manufacturing brand specializing in customized apparel, uniforms, and corporate gifting solutions for B2B clients.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>Proprietor: <span className="text-slate-200 font-semibold">{businessInfo.owner}</span></div>
              <div>Domain: <span className="text-slate-200 font-semibold">{businessInfo.domain}</span></div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              QUICK LINKS
            </h3>
            <div className="w-10 h-[3px] bg-[#eeb012] mb-3"></div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/page/About-Us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/page/Our-Products" className="hover:text-white transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/page/Gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/page/Contact-Us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase font-heading">
              CONTACT US
            </h3>
            <div className="w-10 h-[3px] bg-[#eeb012] mb-3"></div>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#eeb012] shrink-0 mt-0.5" />
                <span>
                  {businessInfo.address}, {businessInfo.city}, {businessInfo.state} - {businessInfo.pincode}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#eeb012] shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-white font-mono">
                  {businessInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#eeb012] shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white break-all">
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Fine Stitch Uniforms. Design By: Provisioning Tech</p>
          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 text-xs">
            <span>Proprietor: {businessInfo.owner}</span>
            <span className="hidden sm:inline">•</span>
            <span>Mumbai, Maharashtra</span>
            <span className="hidden sm:inline">•</span>
            <Link href="/page/Contact-Us" className="hover:text-white">Privacy &amp; Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
