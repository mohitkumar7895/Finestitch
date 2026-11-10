import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shirt, 
  IndianRupee, 
  Shield, 
  Target, 
  Clock, 
  MessageSquare,
  Briefcase,
  Palette,
  Truck,
  ArrowRight,
  PenTool,
  Check,
  Users,
  ShieldCheck,
  Quote,
  Building,
  Rocket,
  GraduationCap,
  Sparkles,
  Phone
} from 'lucide-react';
import Hero from '@/components/Hero';
import { getGalleryItems, getTestimonials } from '@/lib/queries';

export const revalidate = 60;

export default async function HomePage() {
  const [galleryItems, testimonials] = await Promise.all([
    getGalleryItems(),
    getTestimonials(),
  ]);

  const productRange = [
    {
      title: 'Customized T-Shirts',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      href: '/page/Our-Products',
    },
    {
      title: 'Hoodies & Jackets',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      href: '/page/Our-Products',
    },
    {
      title: 'Customized Caps',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      href: '/page/Our-Products',
    },
    {
      title: 'Corporate Uniforms',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      href: '/page/Our-Products',
    },
    {
      title: 'Corporate & Memorable Gifts',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      href: '/page/Our-Products',
    },
  ];

  return (
    <div className="bg-[#fcfdfd]">
      
      {/* 1. Hero Section (Matching Screenshot 1 & 2) */}
      <Hero />

      {/* 2. Welcome to Fine Stitch Uniforms (Matching Screenshot 3) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-[2px] uppercase text-[#005a6a] block">
                BESPOKE APPAREL SOLUTIONS
              </span>
              <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-slate-500 block">
                PROPRIETOR AADIL SAYYED
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-[#005a6a] leading-tight break-words">
              Welcome to <span className="text-[#f28c28]">Fine Stitch Uniforms</span>
            </h2>
            <div className="w-14 h-1 bg-[#f28c28] rounded-full"></div>

            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase block font-mono">
              MUMBAI, MAHARASHTRA • FINESTITCHUNIFORMS.COM
            </span>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              We specialize in providing high-quality customized apparel and corporate gifting solutions for businesses and organizations. Our mission is to deliver products that combine comfort, durability, and professional branding.
            </p>

            {/* Feature Tags */}
            <div className="flex items-center flex-wrap gap-4 sm:gap-6 pt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f28c28] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Shirt className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#005a6a]">Customized Uniforms</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#005a6a] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#005a6a]">Professional Printing</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 pt-3 flex-wrap">
              <Link
                href="/page/Our-Products"
                className="bg-[#005a6a] hover:bg-[#00434f] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-md shadow-md transition-colors min-h-[44px] flex items-center justify-center"
              >
                Explore Products
              </Link>
              <a
                href="https://wa.me/919619585005?text=Hello%20Fine%20Stitch%20Uniforms,%20I%20want%20to%20chat%20about%20custom%20uniforms."
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#005a6a] text-[#005a6a] hover:bg-[#005a6a] hover:text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-md transition-colors min-h-[44px] flex items-center justify-center"
              >
                Chat With Us
              </a>
            </div>
          </div>

          {/* Right Visual Box (Model & Machinery Collage) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative bg-white rounded-3xl p-2.5 sm:p-3 shadow-xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 h-[320px] sm:h-[400px]">
                {/* Left Sub-Column: 2 Small Photos */}
                <div className="space-y-2.5 sm:space-y-3 flex flex-col">
                  <div className="relative h-1/2 w-full rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80"
                      alt="Tailoring Unit"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-1/2 w-full rounded-2xl overflow-hidden bg-slate-100">
                    <Image
                      src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80"
                      alt="Corporate Blazer Production"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Right Sub-Column: Model Photo */}
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
                    alt="Customized T-Shirt Model"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating Bottom Badge */}
              <div className="absolute bottom-4 inset-x-5 sm:inset-x-8 bg-[#005a6a] text-white py-2 px-3.5 sm:px-4 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-black tracking-wide block">Premium</span>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#eeb012]">
                    QUALITY FINISHING
                  </span>
                </div>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#eeb012]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Clients Choose Fine Stitch Uniforms (Matching Screenshot 4) */}
      <section className="py-10 sm:py-14 bg-[#f8f9fa] border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8 sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
              OUR COMMITMENT
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#005a6a] break-words">
              Why Clients Choose <span className="text-[#f28c28]">Fine Stitch Uniforms</span>
            </h2>
            <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We combine technical expertise with a dedicated focus on quality to deliver apparel that represents your brand with pride.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* 1. Specialized Apparel */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shadow-sm">
                <Shirt className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Specialized Apparel</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Experts in customized T-shirts, hoodies, caps, and uniforms tailored to your brand.
                </p>
              </div>
            </div>

            {/* 2. Competitive B2B Pricing */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shadow-sm">
                <IndianRupee className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Competitive B2B Pricing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Providing cost-effective solutions for corporate orders and wholesale requirements.
                </p>
              </div>
            </div>

            {/* 3. Professional Finishing */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Professional Finishing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Premium quality fabric combined with high-standard uniform stitching and printing.
                </p>
              </div>
            </div>

            {/* 4. Accurate Brand Matching */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Accurate Brand Matching</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ensuring your logo and brand colors are reproduced with 100% accuracy.
                </p>
              </div>
            </div>

            {/* 5. Reliable Delivery */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Reliable Delivery</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Strict adherence to production and dispatch timelines for every client order.
                </p>
              </div>
            </div>

            {/* 6. Dedicated Support */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Dedicated Support</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  One-on-one client coordination for a smooth customization experience from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Counter Section (Matching Screenshot 5) */}
      <section 
        className="relative py-12 sm:py-16 bg-cover bg-center bg-fixed text-white overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#003b5c]/95 to-[#00738b]/90 z-10"></div>

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {/* Stat 1: 50+ */}
            <div className="bg-white/5 backdrop-blur-md border border-[#eeb012]/30 rounded-2xl p-5 sm:p-7 text-center hover:border-[#eeb012] transition-all duration-300">
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-[#eeb012] mx-auto mb-2 sm:mb-3" />
              <div className="font-heading font-bold text-3xl sm:text-5xl text-white mb-1">
                50 <span className="text-[#eeb012]">+</span>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-slate-200">
                CORPORATE CLIENTS
              </p>
            </div>

            {/* Stat 2: 10k+ */}
            <div className="bg-white/5 backdrop-blur-md border border-[#eeb012]/30 rounded-2xl p-5 sm:p-7 text-center hover:border-[#eeb012] transition-all duration-300">
              <Shirt className="w-8 h-8 sm:w-10 sm:h-10 text-[#eeb012] mx-auto mb-2 sm:mb-3" />
              <div className="font-heading font-bold text-3xl sm:text-5xl text-white mb-1">
                10k <span className="text-[#eeb012]">+</span>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-slate-200">
                UNITS DELIVERED
              </p>
            </div>

            {/* Stat 3: 100% */}
            <div className="bg-white/5 backdrop-blur-md border border-[#eeb012]/30 rounded-2xl p-5 sm:p-7 text-center hover:border-[#eeb012] transition-all duration-300">
              <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-[#eeb012] mx-auto mb-2 sm:mb-3" />
              <div className="font-heading font-bold text-3xl sm:text-5xl text-white mb-1">
                100 <span className="text-[#eeb012]">%</span>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-slate-200">
                CUSTOMIZABLE
              </p>
            </div>

            {/* Stat 4: 99% */}
            <div className="bg-white/5 backdrop-blur-md border border-[#eeb012]/30 rounded-2xl p-5 sm:p-7 text-center hover:border-[#eeb012] transition-all duration-300">
              <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-[#eeb012] mx-auto mb-2 sm:mb-3" />
              <div className="font-heading font-bold text-3xl sm:text-5xl text-white mb-1">
                99 <span className="text-[#eeb012]">%</span>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[1.5px] sm:tracking-[2px] font-semibold text-slate-200">
                ON-TIME EXECUTION
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Product Range (Matching Screenshot 6) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
            YOUR BRAND, OUR CANVAS
          </p>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#005a6a] break-words">
            Our Product <span className="text-[#f28c28]">Range</span>
          </h2>
          <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explore our diverse range of customized apparel and corporate gifts designed to elevate your brand&apos;s presence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {productRange.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 block"
            >
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 text-center">
                <h3 className="font-heading font-bold text-base text-[#005a6a] group-hover:text-[#f28c28] transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Our Custom Branding Gallery Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
            RECENT DISPATCHES
          </p>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#005a6a] break-words">
            Our Custom <span className="text-[#f28c28]">Branding Gallery</span>
          </h2>
          <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Real finished orders delivered to corporate clients, hospitals, and institutions across Mumbai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] cursor-pointer aspect-square border border-slate-100"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-[#003b5c]/85 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-6 z-10 backdrop-blur-[1px]">
                <h3 className="font-heading font-black text-[#eeb012] text-xl uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white text-xs font-normal mb-4 leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                )}
                <a
                  href={`https://wa.me/919619585005?text=I%20saw%20${encodeURIComponent(item.title)}%20in%20your%20gallery%20and%20want%20to%20enquire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#eeb012] hover:bg-white text-[#003b5c] hover:text-[#25D366] text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-md transition-all shadow-md min-h-[44px]"
                >
                  <span>Enquire</span>
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6 sm:pt-8">
          <Link
            href="/page/Gallery"
            className="inline-flex items-center justify-center gap-2 bg-[#003b5c] hover:bg-[#00283f] text-white text-xs font-bold uppercase tracking-wider py-3.5 px-8 rounded-lg shadow-md transition-colors min-h-[44px]"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. Our Process Section */}
      <section className="py-10 sm:py-14 bg-[#f8f9fa] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8 sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
              HOW WE WORK
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#005a6a] break-words">
              Our <span className="text-[#f28c28]">Process</span>
            </h2>
            <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              A structured approach ensures every custom order meets our high standards of quality and professional finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-2">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-7 pt-8 sm:pt-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2.5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                1
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Requirement Discussion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Understanding your brand needs for customized apparel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-7 pt-8 sm:pt-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2.5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                2
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f28c28] text-white flex items-center justify-center mx-auto shadow-sm">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Design Finalization</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Accurate logo and color matching for your brand look.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-7 pt-8 sm:pt-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2.5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                3
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Sample Approval</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reviewing the prototype before full-scale production begins.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-7 pt-8 sm:pt-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2.5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                4
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f28c28] text-white flex items-center justify-center mx-auto shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Production Coordination</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Managing uniform stitching and printing gifts across units.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-7 pt-8 sm:pt-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2.5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                5
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Quality Inspection</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strict quality checks to ensure professional finishing.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative bg-white rounded-2xl p-5 sm:p-7 pt-8 sm:pt-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-2.5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c5a059] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md">
                6
              </span>
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f28c28] text-white flex items-center justify-center mx-auto shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Dispatch &amp; Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reliable delivery timeline to your preferred destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Client Success Stories / What Our B2B Partners Say (Exact User Request) */}
      <section className="py-10 sm:py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8 sm:mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a] block">
              Client Success Stories
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#003b5c] break-words">
              What Our <span className="text-[#f28c28]">B2B Partners</span> Say
            </h2>
            <div className="w-14 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.slice(0, 3).map((item, index) => {
              const icons = [Building, Rocket, GraduationCap];
              const AvatarIcon = icons[index % icons.length];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-100 shadow-[0_8px_25px_rgba(0,59,92,0.04)] hover:shadow-xl hover:border-[#eeb012] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-7 h-7 text-[#eeb012]/40 mb-3" />
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic mb-5">
                      &ldquo;{item.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#005a6a] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <AvatarIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-[#003b5c] uppercase">
                        {item.role || item.client_name}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#f28c28] uppercase tracking-wide block">
                        {item.company_name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Bottom CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-12 sm:pb-16">
        <div className="bg-gradient-to-r from-[#003b5c] to-[#00738b] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#eeb012]">
              Ready to Upgrade Your Uniforms?
            </span>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white">
              Consult With Aadil Sayyed For Free Samples &amp; Quotes
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              Minimum order starts at 20 pieces. We prepare physical fabric swatches, digital embroidery simulations, and an all-inclusive wholesale quote for your organization.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/page/Contact-Us"
              className="w-full sm:w-auto bg-[#eeb012] hover:bg-white text-slate-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              Get Free Consultation
            </Link>
            <a
              href="tel:+919619585005"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#eeb012]" />
              <span>+91 9619585005</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
