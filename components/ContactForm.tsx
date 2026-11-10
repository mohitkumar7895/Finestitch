"use client";

import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function ContactForm() {
  const { businessInfo } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    contact_number: '',
    address: '',
    email_id: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const targetPhone = '919619585005';
    const waText = `*New Website Inquiry - Fine Stitch Uniforms*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Contact:* ${formData.contact_number}\n` +
      `*Address:* ${formData.address}\n` +
      `*Email:* ${formData.email_id || 'Not provided'}\n` +
      `*Message:* ${formData.message}\n\n` +
      `Please provide catalog, samples, and wholesale quote.`;
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waText)}`;
    setLastWaUrl(waUrl);

    try {
      // 1. Save to Database
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.contact_number,
          address: formData.address,
          email: formData.email_id,
          message: formData.message,
          subject: formData.address ? `Inquiry from ${formData.address}` : 'Website Inquiry',
        }),
      });

      setSubmitted(true);
      // 2. Open WhatsApp directly to 9619585005
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
      setFormData({
        name: '',
        contact_number: '',
        address: '',
        email_id: '',
        message: '',
      });
    } catch (err: any) {
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0f2e3d]">
          Send an Inquiry
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Fill out the form below. Your requirement will be sent directly to our WhatsApp (+91 9619585005) &amp; saved in our system.
        </p>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-800">Thank You! Inquiry Sent</h4>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Your inquiry has been submitted and forwarded directly to WhatsApp (+91 9619585005). Aadil Sayyed will respond promptly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {lastWaUrl && (
              <a
                href={lastWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Open WhatsApp (+91 9619585005)</span>
              </a>
            )}
            <button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto text-xs text-slate-600 font-semibold hover:text-slate-900 px-4 py-2 border border-slate-200 rounded-xl"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Row 1: Name & Contact Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1e70bf] focus:border-[#1e70bf]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1e70bf] focus:border-[#1e70bf]"
              />
            </div>
          </div>

          {/* Row 2: Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1e70bf] focus:border-[#1e70bf]"
            />
          </div>

          {/* Row 3: Email Id */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Id <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email_id}
              onChange={(e) => setFormData({ ...formData, email_id: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1e70bf] focus:border-[#1e70bf]"
            />
          </div>

          {/* Row 4: Your message */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1e70bf] focus:border-[#1e70bf]"
            ></textarea>
          </div>

          {/* Submit Button (Matching Artisan Wear blue button on left) */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1e70bf] hover:bg-[#165a9e] text-white font-medium text-sm py-3 px-8 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 min-h-[44px]"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Submit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
