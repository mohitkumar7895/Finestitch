"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Plus, Trash2, X, Loader2, Sparkles } from 'lucide-react';
import { Testimonial } from '@/models/Testimonial';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    role: '',
    rating: 5,
    feedback: '',
    image_url: '',
    sort_order: 0,
    is_active: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials?admin=true');
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAdd = () => {
    setFormData({
      client_name: '',
      company_name: '',
      role: '',
      rating: 5,
      feedback: '',
      image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      sort_order: testimonials.length + 1,
      is_active: true,
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create testimonial');

      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete testimonial from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTestimonials();
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">Social Proof</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Testimonials</h1>
          <p className="text-xs text-slate-500">
            Showcase reviews from corporate HRs, school principals, and hospital administrators.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
          <span className="text-xs">Loading reviews...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <button
                    onClick={() => handleDelete(t.id, t.client_name)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;{t.feedback}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                {t.image_url ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <Image src={t.image_url} alt={t.client_name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-900 font-bold flex items-center justify-center text-xs shrink-0">
                    {t.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.client_name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {t.role ? `${t.role}, ` : ''}{t.company_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-brand-950 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">Add Client Testimonial</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / School</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Hospital"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Procurement Head"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rating (1-5)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                >
                  <option value={5}>5 Stars - Outstanding</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback Quote *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Review comment about quality, fit, and on-time delivery..."
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Avatar / Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

