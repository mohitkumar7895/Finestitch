"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Archive, 
  Loader2,
  ExternalLink,
  MessageCircle,
  Eye,
  X
} from 'lucide-react';
import { ContactMessage } from '@/models/Contact';

export default function AdminInquiriesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: number, status: 'new' | 'read' | 'replied' | 'archived') => {
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchMessages();
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch {}
  };

  const filtered = messages.filter((m) => {
    if (filter === 'all') return true;
    return m.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">Customer Leads</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Inquiries &amp; Quotations</h1>
          <p className="text-xs text-slate-500">
            Review customer quote requests, reply on WhatsApp, and manage order statuses.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1 rounded-xl">
          {(['all', 'new', 'read', 'replied', 'archived'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === status
                  ? 'bg-white text-brand-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status} {status === 'new' && messages.filter((m) => m.status === 'new').length > 0 && `(${messages.filter((m) => m.status === 'new').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-700" />
            <span className="text-xs">Loading inquiries...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No inquiries found matching &ldquo;{filter}&rdquo; status.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((msg) => {
              const cleanMobile = msg.mobile.replace(/[^0-9]/g, '');
              const waUrl = `https://wa.me/${cleanMobile}?text=${encodeURIComponent(
                `Hello ${msg.name}, thank you for contacting Fine Stitch Uniforms regarding your inquiry for "${msg.subject}". This is Aadil Sayyed.`
              )}`;

              return (
                <div
                  key={msg.id}
                  className={`p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    msg.status === 'new' ? 'bg-amber-50/30' : ''
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-sm text-slate-900">{msg.name}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          msg.status === 'new'
                            ? 'bg-rose-100 text-rose-700'
                            : msg.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-700'
                            : msg.status === 'read'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {msg.status}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(msg.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="font-medium text-slate-800">{msg.subject}</span>
                      {msg.product_name && (
                        <span className="text-[11px] text-accent font-semibold">
                          Product: {msg.product_name}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 max-w-2xl">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {msg.mobile}
                      </span>
                      {msg.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {msg.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === 'new') updateStatus(msg.id, 'read');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => updateStatus(msg.id, 'replied')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${msg.mobile}`}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                      title="Call client"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <select
                      value={msg.status}
                      onChange={(e) => updateStatus(msg.id, e.target.value as any)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-brand-950 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider">
                  Inquiry Details
                </span>
                <h3 className="font-bold text-base">{selectedMessage.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block font-semibold">Client Name:</span>
                  <span className="font-bold text-slate-900">{selectedMessage.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Mobile Phone:</span>
                  <a
                    href={`tel:${selectedMessage.mobile}`}
                    className="font-bold text-brand-700 hover:underline"
                  >
                    {selectedMessage.mobile}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Email:</span>
                  <span className="text-slate-700">{selectedMessage.email || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Submitted On:</span>
                  <span className="text-slate-700">
                    {new Date(selectedMessage.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {selectedMessage.product_name && (
                <div className="text-xs p-3 bg-brand-50 border border-brand-100 rounded-lg text-brand-900 font-medium">
                  <strong>Referenced Product:</strong> {selectedMessage.product_name}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Content:</label>
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-wrap border border-slate-200">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Status:</span>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => updateStatus(selectedMessage.id, e.target.value as any)}
                    className="text-xs border border-slate-300 rounded-lg px-2.5 py-1 bg-white font-medium"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedMessage.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedMessage.name}, thank you for contacting Fine Stitch Uniforms.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

