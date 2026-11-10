import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Scissors,
  Truck,
  Phone,
  MessageSquare,
  ArrowRight,
  Plus,
  Image as ImageIcon,
  CircleDot,
  Layers,
  CloudDownload,
  Zap,
  Shirt,
  IndianRupee,
  Shield,
  Target,
  Clock,
  Check,
  PenTool,
  Users
} from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, getCategories } from '@/lib/queries';

export const metadata: Metadata = {
  title: "Our Products & B2B Solutions | Fine Stitch Uniforms Mumbai",
  description: "Browse our complete catalog of corporate uniforms, custom t-shirts, hoodies, school uniforms, industrial workwear, and promotional apparel in Mumbai.",
};

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const categoryId = searchParams.category ? parseInt(searchParams.category, 10) : undefined;

  const [products, categories] = await Promise.all([
    getProducts({ search: searchParams.search }),
    getCategories(),
  ]);

  return (
    <div className="bg-[#f4f7f9] min-h-screen">
      {/* 1. Header Banner - Exact Match to Artisan Wear */}
      <header className="bg-gradient-to-r from-[#003b5c] to-[#00738b] py-14 sm:py-20 text-center text-white border-b-[5px] border-[#eeb012]">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-2xl sm:text-5xl font-black uppercase tracking-[2px] mb-3 text-white drop-shadow-sm break-words">
            Our B2B Solutions
          </h1>
          <p className="text-sm sm:text-lg text-white/90 font-normal">
            Premium Customized Apparel &amp; Corporate Gifting
          </p>
        </div>
      </header>

      {/* 2. Interactive Product Catalog Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <ProductGrid
          products={products}
          categories={categories}
          initialCategoryId={categoryId}
        />
      </section>

      {/* 3. Section 1: Customization Options (Matching User Screenshot 2) */}
      <section className="py-14 sm:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10 sm:mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
              TECHNICAL EXPERTISE
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#005a6a] break-words">
              Customization <span className="text-[#f28c28]">Options</span>
            </h2>
            <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We use state-of-the-art printing and embroidery technology to ensure your brand&apos;s logo is reproduced with perfect accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Screen Printing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Screen Printing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ideal for bulk orders with vibrant, long-lasting colors.
                </p>
              </div>
            </div>

            {/* 2. HD Digital Printing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">HD Digital Printing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  High-definition prints for complex, multi-color logos.
                </p>
              </div>
            </div>

            {/* 3. Puff Printing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shrink-0 shadow-sm">
                <CircleDot className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Puff Printing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  3D raised texture for a premium, tactile feel.
                </p>
              </div>
            </div>

            {/* 4. Embroidery */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Embroidery</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Classic uniform stitching &amp; printing for high-end corporate identity.
                </p>
              </div>
            </div>

            {/* 5. Sublimation Printing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shrink-0 shadow-sm">
                <CloudDownload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Sublimation Printing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Best for all-over prints on polyester fabrics.
                </p>
              </div>
            </div>

            {/* 6. Heat Transfer Printing */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Heat Transfer Printing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Perfect for precise names, numbers, and small batch logos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 2: Why Clients Choose Fine Stitch Uniforms (Matching User Screenshot 2) */}
      <section className="py-16 bg-[#f8f9fa] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
              OUR COMMITMENT
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#005a6a]">
              Why Clients Choose <span className="text-[#f28c28]">Fine Stitch Uniforms</span>
            </h2>
            <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              We combine technical expertise with a dedicated focus on quality to deliver apparel that represents your brand with pride.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Specialized Apparel */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shadow-sm">
                <Shirt className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Specialized Apparel</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Experts in customized T-shirts, hoodies, caps, and uniforms tailored to your brand.
                </p>
              </div>
            </div>

            {/* 2. Competitive B2B Pricing */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shadow-sm">
                <IndianRupee className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Competitive B2B Pricing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Providing cost-effective solutions for corporate orders and wholesale requirements.
                </p>
              </div>
            </div>

            {/* 3. Professional Finishing */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shadow-sm">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Professional Finishing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Premium quality fabric combined with high-standard uniform stitching and printing.
                </p>
              </div>
            </div>

            {/* 4. Accurate Brand Matching */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Accurate Brand Matching</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ensuring your logo and brand colors are reproduced with 100% accuracy.
                </p>
              </div>
            </div>

            {/* 5. Reliable Delivery */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center shadow-sm">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Reliable Delivery</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Strict adherence to production and dispatch timelines for every client order.
                </p>
              </div>
            </div>

            {/* 6. Dedicated Support */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-base text-[#005a6a]">Dedicated Support</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  One-on-one client coordination for a smooth customization experience from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 3: Our Process (Matching User Screenshot 3) */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10 sm:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#005a6a]">
              HOW WE WORK
            </p>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#005a6a] break-words">
              Our <span className="text-[#f28c28]">Process</span>
            </h2>
            <div className="w-12 h-1 bg-[#f28c28] mx-auto mt-2 mb-3 rounded-full"></div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              A structured approach ensures every custom order meets our high standards of quality and professional finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 pt-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center space-y-3 hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-white font-bold text-sm flex items-center justify-center shadow-md">
                1
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Requirement Discussion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Understanding your brand needs for customized apparel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 pt-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center space-y-3 hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-white font-bold text-sm flex items-center justify-center shadow-md">
                2
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center mx-auto shadow-sm">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Design Finalization</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Accurate logo and color matching for your brand look.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 pt-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center space-y-3 hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-white font-bold text-sm flex items-center justify-center shadow-md">
                3
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Sample Approval</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reviewing the prototype before full-scale production begins.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative bg-white rounded-2xl p-8 pt-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center space-y-3 hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-white font-bold text-sm flex items-center justify-center shadow-md">
                4
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center mx-auto shadow-sm">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Production Coordination</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Managing uniform stitching and printing gifts across units.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative bg-white rounded-2xl p-8 pt-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center space-y-3 hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-white font-bold text-sm flex items-center justify-center shadow-md">
                5
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#005a6a] text-white flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Quality Inspection</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strict quality checks to ensure professional finishing.
              </p>
            </div>

            {/* Step 6 */}
            <div className="relative bg-white rounded-2xl p-8 pt-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-center space-y-3 hover:shadow-md transition-shadow">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-white font-bold text-sm flex items-center justify-center shadow-md">
                6
              </span>
              <div className="w-12 h-12 rounded-xl bg-[#f28c28] text-white flex items-center justify-center mx-auto shadow-sm">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#005a6a]">Dispatch &amp; Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reliable delivery timeline to your preferred destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Callout: Custom Inquiry */}
      <section className="py-14 bg-[#f8f9fa] border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#e67e22]">
                Need Custom Sizing or Special Fabric?
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
                Have a Specific Uniform Design or Fabric Specification?
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                We manufacture bespoke apparel based on your exact pantone shades, embroidery files, and measurement sets. Connect with Aadil Sayyed for sample swatches.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/page/Contact-Us"
                className="w-full sm:w-auto bg-[#003b5c] hover:bg-[#00283f] text-white font-semibold text-xs px-6 py-3.5 rounded-xl shadow-sm transition-colors text-center"
              >
                Request Custom Quotation
              </Link>
              <a
                href="https://wa.me/919619585005?text=Hello%20Aadil%20Sayyed,%20I%20am%20looking%20for%20customized%20uniforms%20for%20my%20organization."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs px-6 py-3.5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
