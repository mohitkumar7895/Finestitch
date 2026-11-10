"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  X, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Eye,
  Sparkles
} from 'lucide-react';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    short_description: '',
    description: '',
    available_sizes: 'S, M, L, XL, XXL, 3XL',
    available_colors: 'Navy Blue, White, Black, Grey',
    customization_details: 'Custom chest pocket embroidery with company logo',
    image_url: '',
    is_featured: false,
    is_active: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products?admin=true'),
        fetch('/api/categories'),
      ]);
      const prods = await prodRes.json();
      const cats = await catRes.json();
      if (Array.isArray(prods)) setProducts(prods);
      if (Array.isArray(cats)) setCategories(cats);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category_id: categories.length ? String(categories[0].id) : '1',
      price: '',
      short_description: '',
      description: '',
      available_sizes: 'S, M, L, XL, XXL, 3XL',
      available_colors: 'Navy Blue, White, Black, Grey',
      customization_details: 'Custom chest pocket embroidery with company logo',
      image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      is_featured: false,
      is_active: true,
    });
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category_id: String(p.category_id),
      price: p.price ? String(p.price) : '',
      short_description: p.short_description || '',
      description: p.description,
      available_sizes: p.available_sizes || '',
      available_colors: p.available_colors || '',
      customization_details: p.customization_details || '',
      image_url: p.image_url,
      is_featured: p.is_featured,
      is_active: p.is_active,
    });
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setErrorMessage('');

    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || 'Failed to update product');
        }
      } else {
        // Create
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || 'Failed to create product');
        }
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      setErrorMessage(err.message || 'Operation failed');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch {}
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_name && p.category_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">Inventory Catalog</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Products</h1>
          <p className="text-xs text-slate-500">
            Add new uniforms, edit pricing, update descriptions, and manage image previews.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 bg-slate-50/50"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
            <span className="text-xs">Loading uniform catalog...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <Image src={p.image_url} alt={p.name} fill className="object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">
                      {p.name}
                      <span className="block text-[11px] font-normal text-slate-500 font-mono">
                        /{p.slug}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {p.category_name || `Category #${p.category_id}`}
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand-900">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3 px-4">
                      {p.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {p.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-brand-800 hover:bg-slate-100 transition-colors"
                        title="Edit product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-brand-950 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Uniform Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {errorMessage && (
                <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Executive Corporate Formal Shirt"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Wholesale Price (₹) (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 850"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <input
                  type="text"
                  placeholder="One sentence summary..."
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Fabric composition, features, durability..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Available Sizes</label>
                  <input
                    type="text"
                    placeholder="S, M, L, XL, XXL"
                    value={formData.available_sizes}
                    onChange={(e) => setFormData({ ...formData, available_sizes: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Available Colors</label>
                  <input
                    type="text"
                    placeholder="Navy Blue, White, Black, Grey"
                    value={formData.available_colors}
                    onChange={(e) => setFormData({ ...formData, available_colors: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customization Details</label>
                <input
                  type="text"
                  placeholder="Chest logo embroidery, engraved buttons, reflective piping..."
                  value={formData.customization_details}
                  onChange={(e) => setFormData({ ...formData, customization_details: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-brand-900 focus:ring-brand-700"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-brand-900 focus:ring-brand-700"
                  />
                  <span>Active (Visible on site)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow"
                >
                  {formSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

