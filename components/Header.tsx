"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X, 
  MessageSquare,
  Clock,
  Sparkles,
  Home,
  Info,
  Shirt,
  Image as ImageIcon,
  ArrowRight
} from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function Header() {
  const pathname = usePathname();
  const { businessInfo, categories, openQuoteModal } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle sticky scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductDropdownOpen(false);
    setIsMobileProductsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsProductDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setIsProductDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 150);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/page/About-Us' },
    { 
      name: 'Our Products', 
      href: '/page/Our-Products',
      hasDropdown: true,
    },
    { name: 'Gallery', href: '/page/Gallery' },
    { name: 'Contact Us', href: '/page/Contact-Us' },
  ];

  const whatsappCleanNumber = businessInfo.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent('Hello Fine Stitch Uniforms, I would like to inquire about uniforms.')}`;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. TOP CONTACT BAR (Clean, non-wrapping single-row on mobile, full details on desktop) */}
      <div className="bg-[#e67e22] text-white text-xs py-1.5 sm:py-2 px-3 sm:px-6 shadow-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left Group: Phone (Mobile/Desktop) + Email & Location (Tablet/Desktop) */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-medium min-w-0">
            {/* Phone (Always visible, tap-to-call) */}
            <a 
              href={`tel:${businessInfo.phone}`}
              className="flex items-center gap-1.5 hover:text-white/80 active:scale-95 transition-all shrink-0 py-0.5"
              title="Click to call Fine Stitch Uniforms"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Phone className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="font-semibold tracking-wide whitespace-nowrap">{businessInfo.phone}</span>
            </a>

            {/* Email (Hidden on small mobile < 640px to prevent awkward wrapping) */}
            <span className="text-white/40 hidden sm:inline">|</span>
            <a 
              href={`mailto:${businessInfo.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white/80 transition-colors py-0.5 truncate"
              title="Click to email Fine Stitch Uniforms"
            >
              <Mail className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span className="truncate max-w-[200px] md:max-w-none">{businessInfo.email}</span>
            </a>

            {/* Location (Hidden on mobile/tablet < 1024px) */}
            <span className="text-white/40 hidden lg:inline">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-white/90 py-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span className="truncate">{businessInfo.address}, {businessInfo.city}</span>
            </div>
          </div>

          {/* Right Group: Business Hours (Desktop) + WhatsApp Button (All devices) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Business Hours (Hidden on < 1024px) */}
            <span className="hidden lg:flex items-center gap-1.5 text-white/90 text-[11px] xl:text-xs">
              <Clock className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span>Mon - Sat: 9:30 AM - 8:30 PM</span>
            </span>

            {/* WhatsApp Quick Chat Badge */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-xs"
              title="Chat with us on WhatsApp"
            >
              <MessageSquare className="w-3 h-3 fill-white shrink-0" />
              <span className="leading-none">WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav 
        className={`bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300 ${
          isScrolled ? 'py-2 sm:py-2.5 shadow-md' : 'py-2.5 sm:py-3.5 shadow-xs'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Logo (Responsive aspect-ratio preserving container) */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group shrink-0"
            aria-label="Fine Stitch Uniforms Home"
          >
            <div className="relative h-9 w-40 xs:w-44 sm:h-11 sm:w-52 md:h-12 md:w-60 transition-transform group-hover:scale-[1.02]">
              <Image 
                src="/logo/logo.svg" 
                alt="Fine Stitch Uniforms" 
                fill 
                sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Hidden on < 1024px) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.name} 
                    className="relative group py-2"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-[13px] xl:text-sm font-semibold tracking-wide transition-colors ${
                        isActive ? 'text-[#005a6a] font-bold' : 'text-slate-700 hover:text-[#005a6a]'
                      }`}
                      aria-expanded={isProductDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isProductDropdownOpen ? 'rotate-180 text-[#005a6a]' : 'text-slate-400'
                      }`} />
                    </Link>

                    {/* Mega Dropdown for Categories */}
                    {isProductDropdownOpen && (
                      <div 
                        className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 px-2 transition-all animate-in fade-in-50 slide-in-from-top-2 z-50"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="px-3 py-1.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Uniform Categories</span>
                          <Link 
                            href="/page/Our-Products" 
                            className="text-xs text-[#005a6a] font-bold hover:underline flex items-center gap-1"
                          >
                            <span>View All</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        <div className="max-h-80 overflow-y-auto space-y-1 scrollbar-none">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/page/Our-Products?category=${cat.id}`}
                              className="block px-3 py-2 text-xs sm:text-sm text-slate-700 hover:text-[#005a6a] hover:bg-brand-50 rounded-xl transition-colors"
                            >
                              <div className="font-semibold text-slate-800">{cat.name}</div>
                              {cat.description && (
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{cat.description}</p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] xl:text-sm font-semibold tracking-wide transition-colors py-2 relative ${
                    isActive ? 'text-[#005a6a] font-bold' : 'text-slate-700 hover:text-[#005a6a]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#005a6a] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions CTA (Get Free Quote) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => openQuoteModal()}
              className="bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#d35400] hover:to-[#b84600] text-white text-xs xl:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile / Tablet Actions (Quick Call, Quick Quote, Hamburger Toggle) */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Call Icon (Visible on small mobile < 640px) */}
            <a
              href={`tel:${businessInfo.phone}`}
              className="sm:hidden w-9 h-9 rounded-xl bg-brand-50 text-[#005a6a] hover:bg-brand-100 active:scale-95 flex items-center justify-center transition-colors shrink-0"
              aria-label="Call Fine Stitch Uniforms"
              title="Call us directly"
            >
              <Phone className="w-4 h-4 text-[#005a6a]" />
            </a>

            {/* Quick Get Quote Pill Button (Visible on screens >= 375px) */}
            <button
              onClick={() => openQuoteModal()}
              className="hidden min-[375px]:flex items-center gap-1.5 bg-[#e67e22] hover:bg-[#d35400] active:scale-95 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quote</span>
            </button>

            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-[#005a6a] rounded-xl hover:bg-slate-100 active:bg-slate-200 focus:outline-none transition-colors shrink-0"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800 transition-transform duration-200" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800 transition-transform duration-200" />
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* 3. MOBILE FULL-SCREEN NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Drawer Header (Logo + Close X) */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-white shrink-0">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative h-9 w-44"
              aria-label="Fine Stitch Uniforms Home"
            >
              <Image 
                src="/logo/logo.svg" 
                alt="Fine Stitch Uniforms" 
                fill 
                className="object-contain object-left"
                priority
              />
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Quick Contact Action Chips */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#005a6a] font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#005a6a]" />
                <span>Call Us</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/' ? 'bg-[#005a6a]/10 text-[#005a6a] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className={`w-4 h-4 ${pathname === '/' ? 'text-[#005a6a]' : 'text-slate-400'}`} />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              {/* About Us */}
              <Link
                href="/page/About-Us"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/page/About-Us' ? 'bg-[#005a6a]/10 text-[#005a6a] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className={`w-4 h-4 ${pathname === '/page/About-Us' ? 'text-[#005a6a]' : 'text-slate-400'}`} />
                  <span>About Us</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              {/* Our Products with Expandable Accordion */}
              <div className="rounded-xl border border-slate-100 overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shirt className="w-4 h-4 text-[#005a6a]" />
                    <span>Our Products</span>
                    {categories.length > 0 && (
                      <span className="text-[10px] bg-[#005a6a]/10 text-[#005a6a] px-2 py-0.5 rounded-full font-bold">
                        {categories.length} Categories
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isMobileProductsOpen ? 'rotate-180 text-[#005a6a]' : ''
                  }`} />
                </button>

                {isMobileProductsOpen && (
                  <div className="px-3 pb-3 pt-1 space-y-1 bg-white border-t border-slate-100 animate-in fade-in-50 duration-150">
                    <Link
                      href="/page/Our-Products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#005a6a] bg-brand-50"
                    >
                      <span>Explore All Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/page/Our-Products?category=${cat.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-[#005a6a] hover:bg-slate-50 transition-colors"
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery */}
              <Link
                href="/page/Gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/page/Gallery' ? 'bg-[#005a6a]/10 text-[#005a6a] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className={`w-4 h-4 ${pathname === '/page/Gallery' ? 'text-[#005a6a]' : 'text-slate-400'}`} />
                  <span>Gallery</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              {/* Contact Us */}
              <Link
                href="/page/Contact-Us"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === '/page/Contact-Us' ? 'bg-[#005a6a]/10 text-[#005a6a] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Phone className={`w-4 h-4 ${pathname === '/page/Contact-Us' ? 'text-[#005a6a]' : 'text-slate-400'}`} />
                  <span>Contact Us</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>
            </nav>

            {/* Request Free Quote Primary Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full min-h-[48px] bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#d35400] hover:to-[#b84600] active:scale-98 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Custom Quote</span>
              </button>
            </div>

            {/* Company Info & Timings Card */}
            <div className="pt-3 pb-6 border-t border-slate-100 text-xs text-slate-500 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {businessInfo.address}, {businessInfo.city}, {businessInfo.state} - {businessInfo.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Mon - Sat: 9:30 AM - 8:30 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="text-[#005a6a] font-medium hover:underline truncate">
                  {businessInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
