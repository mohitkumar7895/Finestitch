import React from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: "Contact Us | Fine Stitch Uniforms Mumbai",
  description: "Connect with Fine Stitch Uniforms in Malwani, Malad West, Mumbai. Call +91 9619585005 or submit an inquiry for custom uniforms and apparel.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/919619585005?text=${encodeURIComponent(
    'Hello Fine Stitch Uniforms, I would like to inquire about customized apparel and uniform orders.'
  )}`;

  return (
    <div className="bg-[#f8f9fa] py-10 sm:py-14 pb-14 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* Centered Page Header (Matching Artisan Wear) */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <p className="text-[11px] uppercase tracking-widest font-bold text-[#0d5c75]">
            CUSTOMIZED APPAREL SPECIALISTS
          </p>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#0f2e3d] break-words">
            Connect With <span className="text-[#e67e22]">Fine Stitch Uniforms</span>
          </h1>
          <div className="w-12 h-0.5 bg-[#e67e22] mx-auto mt-2 mb-3"></div>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Let&apos;s create customized apparel that represents your brand professionally. Reach out to us for bespoke uniforms, hoodies, and corporate gifts.
          </p>
        </div>

        {/* Main Grid: Left Contact Info Card + Right Inquiry Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Card: Contact Information */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#0f2e3d]">
              Contact Information
            </h2>

            <div className="space-y-6 pt-1">
              {/* Item 1: Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0d5c75] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold tracking-wider text-[#e67e22] uppercase block">
                    OFFICE ADDRESS
                  </span>
                  <div className="font-bold text-sm text-[#0f2e3d]">
                    Malwani, Malad West, Mumbai
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    (Office &amp; client coordination only. Manufacturing at associated units.)
                  </p>
                </div>
              </div>

              {/* Item 2: Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0d5c75] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold tracking-wider text-[#e67e22] uppercase block">
                    PHONE / WHATSAPP
                  </span>
                  <a
                    href="tel:+919619585005"
                    className="font-bold text-base text-[#0f2e3d] hover:text-[#e67e22] transition-colors block font-mono"
                  >
                    +91 9619585005
                  </a>
                </div>
              </div>

              {/* Item 3: Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0d5c75] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold tracking-wider text-[#e67e22] uppercase block">
                    EMAIL
                  </span>
                  <a
                    href="mailto:sayyedaadil35@yahoo.com"
                    className="font-bold text-xs sm:text-sm text-[#0f2e3d] hover:text-[#e67e22] transition-colors block break-all"
                  >
                    sayyedaadil35@yahoo.com
                  </a>
                </div>
              </div>
            </div>

            {/* Chat on WhatsApp Button (Matching Artisan Wear full width bright green button) */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
              >
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Card: Send an Inquiry */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* Map Section (Full Width Rounded Card Matching Artisan Wear) */}
        <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
          <iframe
            title="Fine Stitch Uniforms Location"
            src="https://maps.google.com/maps?q=Malwani,+Malad+West,+Mumbai,+Maharashtra+400095&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs">
            <div className="font-bold text-slate-900">Malwani, Malad West</div>
            <div className="text-[11px] text-slate-500">Mumbai, Maharashtra, India</div>
            <a
              href="https://maps.google.com/?q=Malwani+Malad+West+Mumbai+400095"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-[#1e70bf] hover:underline flex items-center gap-1 mt-1"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
