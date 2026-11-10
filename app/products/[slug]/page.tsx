import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  ArrowLeft, 
  Truck, 
  Scissors, 
  Tag, 
  Palette, 
  Ruler
} from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/queries';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found | Fine Stitch Uniforms' };
  }

  return {
    title: `${product.name} | Fine Stitch Uniforms Mumbai`,
    description: product.short_description || product.description,
    openGraph: {
      title: `${product.name} | Fine Stitch Uniforms`,
      description: product.short_description || product.description,
      images: [{ url: product.image_url }],
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  // Related products from same category
  const relatedProducts = (await getProducts({ categoryId: product.category_id }))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const whatsappMessage = `Hello Aadil Sayyed, I am interested in purchasing/getting a quote for "${product.name}" from Fine Stitch Uniforms.`;
  const whatsappUrl = `https://wa.me/919619585005?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="space-y-12 py-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-900">Home</Link>
        <span>/</span>
        <Link href="/page/Our-Products" className="hover:text-brand-900">Our Products</Link>
        <span>/</span>
        {product.category_name && (
          <>
            <Link href={`/page/Our-Products?category=${product.category_id}`} className="hover:text-brand-900">
              {product.category_name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        {/* Left Column: Product Imagery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.is_featured && (
              <span className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Featured Design
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Details & Buying Actions */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {product.category_name && (
              <span className="inline-block bg-brand-50 text-brand-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                {product.category_name}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Price indicator */}
            <div className="flex items-baseline gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="text-xs font-bold uppercase text-slate-400">Wholesale Price:</span>
              <span className="text-2xl font-extrabold text-brand-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ unit (Volume discounts apply)</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <Ruler className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Available Sizes:</span>
                  <span className="text-slate-600">{product.available_sizes || 'All Standard & Custom Sizes'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <Palette className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Available Colors:</span>
                  <span className="text-slate-600">{product.available_colors || 'Multiple Colorways Available'}</span>
                </div>
              </div>

              {product.customization_details && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2 flex items-start gap-2.5">
                  <Scissors className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">Customization Options:</span>
                    <span className="text-slate-600">{product.customization_details}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quality Checklist */}
            <div className="space-y-1.5 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pre-washed, anti-shrinkage and color-fast fabric grade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Computerized embroidery &amp; screen printing for your brand logo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom doorstep measurement camps available for Mumbai bulk orders</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl text-center flex items-center justify-center gap-2 text-sm shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href="tel:+919619585005"
                className="bg-brand-900 hover:bg-brand-800 text-white font-semibold py-3.5 px-4 rounded-xl text-center flex items-center justify-center gap-2 text-sm shadow-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 9619585005</span>
              </a>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Talk directly with Aadil Moinuddin Sayyed for bulk quantity pricing &amp; sample fabrics.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products from same category */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              More In This Category
            </h3>
            <Link
              href={`/page/Our-Products?category=${product.category_id}`}
              className="text-xs font-semibold text-brand-700 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

