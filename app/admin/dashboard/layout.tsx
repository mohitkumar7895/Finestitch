"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Image as ImageIcon, 
  MessageSquare, 
  Sliders, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  Star,
  ShieldAlert
} from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/dashboard/products', icon: Package },
    { name: 'Categories', href: '/admin/dashboard/categories', icon: FolderTree },
    { name: 'Gallery', href: '/admin/dashboard/gallery', icon: ImageIcon },
    { name: 'Inquiries', href: '/admin/dashboard/inquiries', icon: MessageSquare },
    { name: 'Testimonials', href: '/admin/dashboard/testimonials', icon: Star },
    { name: 'Site & SEO Settings', href: '/admin/dashboard/settings', icon: Sliders },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
      router.refresh();
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-brand-950 text-white p-4 flex items-center justify-between">
        <div className="relative h-8 w-40">
          <Image
            src="/logo/logo-white.svg"
            alt="Fine Stitch Uniforms"
            fill
            className="object-contain"
          />
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg bg-brand-900 text-slate-200"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-brand-950 text-slate-300 p-5 flex flex-col justify-between shrink-0 shadow-xl z-30`}
      >
        <div className="space-y-6">
          {/* Logo */}
          <div className="hidden md:block py-2">
            <Link href="/" target="_blank" className="block relative h-10 w-48">
              <Image
                src="/logo/logo-white.svg"
                alt="Fine Stitch Uniforms"
                fill
                className="object-contain"
              />
            </Link>
            <div className="mt-2 text-[10px] uppercase font-bold tracking-widest text-accent">
              Control Panel
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-800 text-white shadow-sm'
                      : 'hover:bg-brand-900/80 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="pt-6 border-t border-brand-900 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs px-3.5 py-2 rounded-lg bg-brand-900 hover:bg-brand-800 text-white font-medium transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between px-3 text-xs">
            <div>
              <span className="font-bold text-white block">Aadil Sayyed</span>
              <span className="text-[10px] text-slate-400">Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-brand-900 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}

