"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fcfdfd] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Something Went Wrong</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#003b5c]">
            An Error Occurred
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            We encountered a temporary issue while loading this page. Please try refreshing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#003b5c] hover:bg-[#00283f] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

