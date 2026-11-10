"use client";

import React, { useState } from 'react';
import { X, Send, MessageCircle, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { useSite } from '@/context/SiteContext';

export default function InquiryModal() {
  const { isQuoteModalOpen, closeQuoteModal, selectedProductForQuote, businessInfo } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isQuoteModalOpen) return null;

  const [lastWaUrl, setLastWaUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const targetPhone = '919619585005';
    const waText = `*Uniform Quote Request - Fine Stitch Uniforms*\n\n` +
      `*Product:* ${selectedProductForQuote || 'Custom Uniforms / Bulk Order'}\n` +
      `*Name:* ${formData.name}\n` +
      `*Mobile / WhatsApp:* ${formData.mobile}\n` +
      `*Email:* ${formData.email || 'Not provided'}\n` +
      `*Requirement:* ${formData.message || 'Need wholesale pricing & sample fabric swatches'}\n\n` +
      `Please connect with wholesale quotation.`;
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waText)}`;
    setLastWaUrl(waUrl);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          subject: selectedProductForQuote ? `Inquiry for ${selectedProductForQuote}` : 'Uniform Quote Request',
          message: formData.message || `Interested in uniform pricing and catalog${selectedProductForQuote ? ` for ${selectedProductForQuote}` : ''}.`,
          product_name: selectedProductForQuote || undefined,
        }),
      });

      setSubmitted(true);
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
    } catch (err: any) {
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', mobile: '', message: '' });
    setLastWaUrl('');
    closeQuoteModal();
  };

  const cleanPhone = businessInfo.whatsapp.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Fine Stitch Uniforms, I would like to inquire about ${selectedProductForQuote || 'custom uniforms'}.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-brand-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-brand-900 text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-brand-800 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-1">
            Fast Response Guaranteed
          </span>
          <h3 className="text-lg sm:text-xl font-bold pr-8">
            {selectedProductForQuote ? `Inquire: ${selectedProductForQuote}` : 'Request Bulk Uniform Quote'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Direct factory wholesale pricing • Custom embroidery &amp; sizing
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Thank You! Inquiry Received</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Aadil Sayyed and our sales team will review your requirement and reach out to you within a few hours.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={lastWaUrl || directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 9619585005)</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement / Quantity Details</label>
                <textarea
                  rows={3}
                  placeholder="Estimated quantity, preferred colors, custom logo requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-800 hover:bg-brand-900 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>

                <div className="relative text-center my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-2 text-xs text-slate-400">or connect directly</span>
                </div>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 9619585005)</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

