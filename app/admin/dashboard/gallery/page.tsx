"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Plus, Trash2, X, Loader2, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/models/Gallery';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Corporate',
    image_url: '',
    description: '',
    sort_order: 0,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setFormData({
      title: '',
      category: 'Corporate',
      image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      description: '',
      sort_order: items.length + 1,
    });
    setError('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to add gallery item');
      }

      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}" from the gallery?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">Visual Portfolio</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Gallery</h1>
          <p className="text-xs text-slate-500">
            Upload and display actual photos of uniforms produced for clients across Mumbai.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Gallery Photo</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
          <span className="text-xs">Loading portfolio images...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm group flex flex-col justify-between"
            >
              <div className="relative h-48 w-full bg-slate-100">
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                <span className="absolute top-2 left-2 bg-brand-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white shadow transition-all"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                {item.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.description}</p>
                )}
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
              <h3 className="font-bold text-base">Add Photo to Gallery</h3>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title / Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom Embroidered Corporate Polos"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                >
                  <option value="Corporate">Corporate</option>
                  <option value="School">School</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Security">Security</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Image URL / Upload *</label>
                  <label className="text-[11px] text-brand-700 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                    <span>Browse File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        try {
                          const res = await fetch('/api/upload', { method: 'POST', body: fd });
                          const d = await res.json();
                          if (d.url) setFormData((prev) => ({ ...prev, image_url: d.url }));
                        } catch {}
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  required
                  placeholder="https://... or /uploads/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short note about the client batch or fabric type..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                ></textarea>
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
                  <span>Add Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

