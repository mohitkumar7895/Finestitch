"use client";

import { useState, useEffect } from 'react';
import { Product } from '@/models/Product';

export function useProducts(options?: { categoryId?: number; featuredOnly?: boolean; search?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let url = '/api/products';
    const params = new URLSearchParams();
    if (options?.categoryId) params.set('categoryId', String(options.categoryId));
    if (options?.featuredOnly) params.set('featured', 'true');
    if (options?.search) params.set('search', options.search);

    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load products');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [options?.categoryId, options?.featuredOnly, options?.search]);

  return { products, loading, error };
}

