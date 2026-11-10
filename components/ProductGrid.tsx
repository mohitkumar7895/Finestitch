"use client";

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  initialCategoryId?: number;
}

export default function ProductGrid({
  products,
  categories,
  initialCategoryId,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>(
    initialCategoryId || 'all'
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category_id === selectedCategory;
      const matchesSearch =
        searchTerm.trim() === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.short_description &&
          p.short_description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.description &&
          p.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-brand-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Uniforms ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search uniform types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-3">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <PackageOpen className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-slate-800">No uniforms found</h4>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or switch categories to explore available uniforms.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="text-xs font-semibold text-brand-700 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

