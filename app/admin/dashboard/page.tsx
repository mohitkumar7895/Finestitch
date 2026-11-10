import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  FolderTree, 
  Image as ImageIcon, 
  MessageSquare, 
  Star, 
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Database,
  Globe
} from 'lucide-react';
import { 
  getAllProductsAdmin, 
  getCategories, 
  getContactMessages, 
  getGalleryItems, 
  getTestimonials 
} from '@/lib/queries';

export const revalidate = 0; // Dynamic

export default async function AdminDashboardOverview() {
  const [products, categories, messages, gallery, testimonials] = await Promise.all([
    getAllProductsAdmin(),
    getCategories(),
    getContactMessages(),
    getGalleryItems(),
    getTestimonials(),
  ]);

  const newMessagesCount = messages.filter((m) => m.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-accent">
            Control Center
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Welcome back, Aadil Sayyed. Manage your uniform catalog, inquiries, and website settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/dashboard/products"
            className="bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/dashboard/inquiries"
            className="bg-accent hover:bg-accent-hover text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>View Inquiries ({newMessagesCount})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Link
          href="/admin/dashboard/products"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-brand-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{products.length}</div>
          <div className="text-[11px] text-slate-400">Uniform designs cataloged</div>
        </Link>

        {/* Metric 2 */}
        <Link
          href="/admin/dashboard/categories"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-brand-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Categories</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{categories.length}</div>
          <div className="text-[11px] text-slate-400">Industries &amp; Apparel types</div>
        </Link>

        {/* Metric 3 */}
        <Link
          href="/admin/dashboard/inquiries"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-brand-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <span>{messages.length}</span>
            {newMessagesCount > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                {newMessagesCount} New
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400">Lead submissions</div>
        </Link>

        {/* Metric 4 */}
        <Link
          href="/admin/dashboard/gallery"
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-brand-300 transition-all space-y-2"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Gallery</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{gallery.length}</div>
          <div className="text-[11px] text-slate-400">Portfolio showcase images</div>
        </Link>
      </div>

      {/* Database & System Info Banner */}
      <div className="bg-brand-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-800 flex items-center justify-center text-accent">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-2">
              <span>MySQL Database:</span>
              <span className="text-emerald-400 font-mono bg-brand-950 px-2 py-0.5 rounded text-xs">
                artisan
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Tables: admins, products, categories, product_images, gallery, contact_messages, site_settings, testimonials
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
          <Globe className="w-4 h-4 text-accent" />
          <span>Domain: finestitchuniforms.com</span>
        </div>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Customer Inquiries</h3>
            <p className="text-xs text-slate-500">Direct quote requests and inquiries submitted through the website</p>
          </div>
          <Link
            href="/admin/dashboard/inquiries"
            className="text-xs font-semibold text-brand-700 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Mobile</th>
                <th className="py-3 px-4">Subject / Product</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messages.slice(0, 5).map((msg) => (
                <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{msg.name}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">{msg.mobile}</td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <div className="font-medium truncate max-w-xs">{msg.subject}</div>
                    {msg.product_name && (
                      <span className="text-[10px] text-accent font-semibold">{msg.product_name}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        msg.status === 'new'
                          ? 'bg-rose-100 text-rose-700'
                          : msg.status === 'replied'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {new Date(msg.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href="/admin/dashboard/inquiries"
                      className="text-brand-700 font-semibold hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

