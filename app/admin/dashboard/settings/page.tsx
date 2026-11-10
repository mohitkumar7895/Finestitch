"use client";

import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2, Loader2, Building, Globe, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    business_name: 'Fine Stitch Uniforms',
    owner_name: 'Aadil Moinuddin Sayyed',
    phone: '+91 9619585005',
    email: 'sayyedaadil35@yahoo.com',
    address: 'Malwani, Malad West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400095',
    country: 'India',
    domain: 'finestitchuniforms.com',
    homepage_headline: 'Premium Uniforms & Custom Apparel Tailored For Perfection',
    homepage_subheadline: 'Mumbai’s leading manufacturer and wholesale supplier of corporate, school, industrial, hospitality, and healthcare uniforms.',
    experience_years: '15+',
    happy_clients: '1,200+',
    uniforms_delivered: '500,000+',
    about_hero_title: 'Crafting Excellence in Every Stitch',
    about_description: 'Fine Stitch Uniforms is dedicated to providing high-quality customized uniforms and apparel solutions for businesses, institutions, organizations, and individuals. We focus on delivering comfortable, durable, and professionally designed uniforms that represent your brand identity.',
    about_goal: 'Our goal is to provide customized apparel solutions that combine style, comfort, quality, and affordability.',
    seo_keywords: 'Uniform Manufacturer in Mumbai, Customized Uniform Supplier Mumbai, Corporate Uniforms Mumbai, School Uniform Manufacturer Mumbai, Industrial Uniform Supplier Mumbai, Customized T-Shirts Mumbai',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch {}
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
        <span className="text-xs">Loading site settings...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">Configuration</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Website &amp; SEO Settings</h1>
          <p className="text-xs text-slate-500">
            Update business profile, homepage headlines, company story, and Mumbai local SEO meta.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow flex items-center gap-2 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Website settings successfully saved to MySQL database table <code>site_settings</code>!</span>
        </div>
      )}

      {/* Section 1: Business Details */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-accent" />
          <span>Core Business &amp; Contact Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
            <input
              type="text"
              value={settings.business_name || ''}
              onChange={(e) => handleChange('business_name', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Owner Name</label>
            <input
              type="text"
              value={settings.owner_name || ''}
              onChange={(e) => handleChange('owner_name', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
            <input
              type="text"
              value={settings.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Address / Street</label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={settings.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={settings.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                value={settings.pincode || ''}
                onChange={(e) => handleChange('pincode', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Homepage Content & Stats */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Homepage Headlines &amp; Impact Counters</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Homepage Headline</label>
            <input
              type="text"
              value={settings.homepage_headline || ''}
              onChange={(e) => handleChange('homepage_headline', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Homepage Sub-headline</label>
            <textarea
              rows={2}
              value={settings.homepage_subheadline || ''}
              onChange={(e) => handleChange('homepage_subheadline', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Years Stat</label>
              <input
                type="text"
                value={settings.experience_years || ''}
                onChange={(e) => handleChange('experience_years', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Uniforms Delivered Stat</label>
              <input
                type="text"
                value={settings.uniforms_delivered || ''}
                onChange={(e) => handleChange('uniforms_delivered', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Happy Clients Stat</label>
              <input
                type="text"
                value={settings.happy_clients || ''}
                onChange={(e) => handleChange('happy_clients', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: About Us Content */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent" />
          <span>About Us Brand Messaging</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Hero Title</label>
            <input
              type="text"
              value={settings.about_hero_title || ''}
              onChange={(e) => handleChange('about_hero_title', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Us Description</label>
            <textarea
              rows={3}
              value={settings.about_description || ''}
              onChange={(e) => handleChange('about_description', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Our Goal / Mission</label>
            <textarea
              rows={2}
              value={settings.about_goal || ''}
              onChange={(e) => handleChange('about_goal', e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Section 4: SEO Settings */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent" />
          <span>SEO &amp; Mumbai Regional Optimization</span>
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Keywords</label>
          <input
            type="text"
            value={settings.seo_keywords || ''}
            onChange={(e) => handleChange('seo_keywords', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Target phrases: Uniform Manufacturer in Mumbai, Customized Uniform Supplier Mumbai, Corporate Uniforms Mumbai, School Uniform Manufacturer Mumbai, Industrial Uniform Supplier Mumbai, Customized T-Shirts Mumbai
          </p>
        </div>
      </div>
    </form>
  );
}

