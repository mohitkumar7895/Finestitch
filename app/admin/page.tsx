"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-brand-950 p-8 text-center text-white space-y-2">
          <div className="relative h-10 w-48 mx-auto">
            <Image
              src="/logo/logo-white.svg"
              alt="Fine Stitch Uniforms"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white pt-2">
            Administrator Portal
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to manage catalog, inquiries, gallery, and site settings.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Username or Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin or sayyedaadil35@yahoo.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-700 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl text-[11px] text-slate-600">
            <span className="font-bold text-brand-900">Demo Credentials:</span>
            <div>Username: <code className="bg-white px-1.5 py-0.5 rounded text-brand-950 font-semibold">admin</code></div>
            <div>Password: <code className="bg-white px-1.5 py-0.5 rounded text-brand-950 font-semibold">Admin@123</code></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-900 hover:bg-brand-800 text-white font-semibold py-3 rounded-xl shadow flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

