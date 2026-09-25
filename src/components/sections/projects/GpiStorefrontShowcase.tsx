'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  ExternalLink, 
  Lock, 
  Database, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  Server,
  Package,
  Sparkles,
  RefreshCw,
  Globe,
  Heart,
  Share2,
  MessageCircle,
  ChevronDown,
  X,
  Flame,
  Check
} from 'lucide-react';
import { GpiEmblem } from '@/components/ui/GpiEmblem';

interface ProductItem {
  id: string;
  name: string;
  category: 'Salt products' | 'Spices products' | 'Cleaning products';
  brand: 'GTM' | 'GPI';
  sku: string;
  price: string;
  numPrice: number;
  stock: number;
  spec: string;
  badgeColor: string;
  bgGradient: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  { 
    id: '1', 
    name: 'GTM Rock Salt 1kg', 
    category: 'Salt products', 
    brand: 'GTM', 
    sku: 'GTM-RS-1KG', 
    price: '₹99', 
    numPrice: 99, 
    stock: 140, 
    spec: '100% pure Himalayan rock salt · Hand-mined crystals',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgGradient: 'from-emerald-50 via-teal-50 to-white'
  },
  { 
    id: '2', 
    name: 'GTM Rock Salt 200gm', 
    category: 'Salt products', 
    brand: 'GTM', 
    sku: 'GTM-RS-200G', 
    price: '₹25', 
    numPrice: 25, 
    stock: 350, 
    spec: 'Compact culinary pouch · Rich in natural trace minerals',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgGradient: 'from-emerald-50 via-zinc-50 to-white'
  },
  { 
    id: '3', 
    name: 'GTM Himalayan Pink Salt Powder 1kg', 
    category: 'Salt products', 
    brand: 'GTM', 
    sku: 'GTM-PS-1KG', 
    price: '₹99', 
    numPrice: 99, 
    stock: 95, 
    spec: 'Finely ground authentic pink salt for daily kitchen cooking',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgGradient: 'from-pink-50 via-rose-50 to-white'
  },
  { 
    id: '4', 
    name: 'GTM Rock Salt Powder 200gm', 
    category: 'Salt products', 
    brand: 'GTM', 
    sku: 'GTM-PS-200G', 
    price: '₹25', 
    numPrice: 25, 
    stock: 280, 
    spec: 'Unrefined, chemical-free raw Himalayan powder',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgGradient: 'from-amber-50 via-orange-50 to-white'
  },
  { 
    id: '5', 
    name: 'GPI Kashmiri Rogan & Masala Spices', 
    category: 'Spices products', 
    brand: 'GPI', 
    sku: 'GPI-SPC-MAS', 
    price: '₹65', 
    numPrice: 65, 
    stock: 85, 
    spec: 'Traditional slow-roasted aromatic spice blend in authentic packaging',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    bgGradient: 'from-orange-50 via-amber-50 to-white'
  },
  { 
    id: '6', 
    name: 'GPI Super Detergent & Home Care', 
    category: 'Cleaning products', 
    brand: 'GPI', 
    sku: 'GPI-CLN-DET', 
    price: '₹140', 
    numPrice: 140, 
    stock: 60, 
    spec: 'Active enzyme deep-clean formula for modern home care',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    bgGradient: 'from-blue-50 via-indigo-50 to-white'
  }
];

export function GpiStorefrontShowcase() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'admin'>('storefront');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [stockUpdated, setStockUpdated] = useState<string | null>(null);

  const categories = ['All', 'Salt products', 'Spices products', 'Cleaning products'];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleStockChange = (id: string, delta: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStock = Math.max(0, p.stock + delta);
        return { ...p, stock: nextStock };
      }
      return p;
    }));
    setStockUpdated(id);
    setTimeout(() => setStockUpdated(null), 1200);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section 
      id="project-gpi" 
      className="relative w-full py-28 px-4 sm:px-8 lg:px-16 border-b border-zinc-200/80 bg-[#FAFAF8]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header & Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#B84A14] uppercase bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300/60">
                02 / PRODUCTION E-COMMERCE
              </span>
              <span className="text-xs font-mono text-emerald-700 font-semibold inline-flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live in Production · gpipvtltd.com
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold text-zinc-950 tracking-tight">
              GPI Industries: E-Commerce Storefront & Admin
            </h2>

            <p className="mt-2 text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed">
              Full-stack e-commerce web platform for Himalayan mineral salts, spices, and home care products. 
              Featuring JWT authentication, administrative stock reconciliation, and SSR tuned for Google Search & Shopping.
            </p>
          </div>

          {/* SIGNATURE TOGGLE: STOREFRONT ↔ ADMIN */}
          <div className="flex items-center gap-3">
            <div className="p-1 rounded-2xl bg-zinc-200/80 backdrop-blur-md border border-zinc-300/80 shadow-inner flex items-center gap-1">
              <button
                onClick={() => setActiveTab('storefront')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'storefront'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#C85A17]" />
                <span>STOREFRONT</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'admin'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>ADMIN & DATABASE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Action Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-600 bg-white border border-zinc-200/80 rounded-xl px-4 py-2.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C85A17]" />
            <span>
              {activeTab === 'storefront' 
                ? 'Exploring production customer catalog with authentic GTM Himalayan Salt & GPI Spice product lines.'
                : 'Inspecting administrative inventory batching, JWT role authentication, and PostgreSQL database schemas.'}
            </span>
          </div>

          <a
            href="https://gpipvtltd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-zinc-900 hover:text-[#C85A17] transition-colors"
          >
            <span>Visit Live Site (gpipvtltd.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* High-Fidelity Browser Window Frame */}
        <div className="rounded-2xl bg-white border border-zinc-300/80 shadow-2xl overflow-hidden transition-all duration-300 font-sans">
          {/* Top Announcement Bar (From Real Website Screenshot) */}
          <div className="px-4 py-1.5 bg-[#12161A] text-zinc-200 flex items-center justify-between text-[11px] font-mono tracking-wider">
            <div className="flex-1 text-center">
              <span className="text-amber-400 font-bold">WELCOME TO THE STORE</span> · GPI INDUSTRIES PVT. LTD.
            </div>
            <X className="w-3.5 h-3.5 text-zinc-400 hover:text-white cursor-pointer" />
          </div>

          {/* Browser Navigation Chrome Header */}
          <div className="px-4 py-2.5 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 border border-red-500/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/40 inline-block" />
            </div>

            {/* URL Bar */}
            <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-white border border-zinc-200 text-xs font-mono text-zinc-600 shadow-2xs">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span className="text-zinc-400">https://</span>
              <span className="text-zinc-900 font-medium">gpipvtltd.com</span>
              <span className="text-zinc-400">{activeTab === 'storefront' ? '/all-products' : '/admin/inventory-portal'}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="px-2 py-0.5 rounded-md bg-zinc-200/80 text-zinc-700 font-semibold text-[10px]">
                {activeTab === 'storefront' ? 'SSR / SEO' : 'JWT GUARD: SUPER_ADMIN'}
              </span>
            </div>
          </div>

          {/* Storefront Navigation Bar (Matching Screenshot Header) */}
          <div className="px-6 py-3 bg-[#FAF8F5] border-b border-zinc-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Circular GPI Crest */}
              <div className="flex items-center gap-2.5">
                <GpiEmblem className="w-9 h-9" />
                <span className="font-display font-extrabold text-sm tracking-wider text-zinc-950">
                  GPI STORE
                </span>
              </div>

              {/* Main Nav Links */}
              <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-zinc-700">
                <span className="text-zinc-950 font-bold cursor-pointer">Home</span>
                <span className="hover:text-zinc-950 cursor-pointer">All products</span>
                <span className="hover:text-zinc-950 cursor-pointer flex items-center gap-0.5">Salt products <ChevronDown className="w-3 h-3" /></span>
                <span className="hover:text-zinc-950 cursor-pointer flex items-center gap-0.5">Spices products <ChevronDown className="w-3 h-3" /></span>
                <span className="hover:text-zinc-950 cursor-pointer flex items-center gap-0.5">Cleaning products <ChevronDown className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Search Bar + Auth & Cart */}
            <div className="flex items-center gap-3 flex-1 max-w-sm justify-end">
              <div className="relative w-full max-w-[190px]">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search prod..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 rounded-full bg-white border border-zinc-300 text-xs font-mono placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <span className="text-xs font-medium text-zinc-700 hover:text-zinc-950 cursor-pointer hidden sm:inline">Sign in</span>
              
              <button className="px-3.5 py-1 rounded-full bg-[#B84A14] hover:bg-[#A03E10] text-white text-xs font-semibold shadow-xs">
                Sign up
              </button>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-xs font-mono text-zinc-800 shadow-2xs">
                <ShoppingBag className="w-3.5 h-3.5 text-[#B84A14]" />
                <span className="font-bold">{cartCount}</span>
              </div>
            </div>
          </div>

          {/* Storefront Content Area */}
          <div className="p-6 sm:p-8 bg-[#FDFBF7] min-h-[580px]">
            <AnimatePresence mode="wait">
              {activeTab === 'storefront' ? (
                /* STOREFRONT VIEW: MATCHING IMAGE 4 & 5 */
                <motion.div
                  key="storefront"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-10"
                >
                  {/* Hero Showcase (From Image 4: Himalayan Mountain Journey) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border border-amber-200/60 p-6 sm:p-8 shadow-xs">
                    {/* Left: Product Line Highlights */}
                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-5 rounded-xl bg-gradient-to-r from-[#D94F04] to-[#B84A14] text-white shadow-md relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[10px] font-mono tracking-widest uppercase bg-black/20 px-2 py-0.5 rounded">
                            GTM · HIMALAYAN MINERAL LINE
                          </span>
                          <h3 className="text-xl sm:text-2xl font-display font-extrabold mt-1">
                            Himalayan Pink, Rock & Black Salt
                          </h3>
                          <p className="text-xs text-white/90 mt-1">
                            Authentic rock salt crystals hand-mined from ancient mineral belts.
                          </p>
                          <button 
                            onClick={() => setSelectedCategory('Salt products')}
                            className="mt-3 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                          >
                            View all products →
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">Brand Line</span>
                          <h4 className="text-sm font-bold text-zinc-900">GPI Spices & Modern Home Care</h4>
                          <p className="text-xs text-zinc-500">Kashmiri Rogan, Masala blends, and high-efficiency detergents.</p>
                        </div>
                        <button 
                          onClick={() => setSelectedCategory('Spices products')}
                          className="px-3 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold"
                        >
                          Explore
                        </button>
                      </div>
                    </div>

                    {/* Right: Premium Quality Himalayan Salt Feature */}
                    <div className="lg:col-span-6 space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 border border-orange-300 text-[#B84A14] text-[10px] font-mono font-bold tracking-wider uppercase">
                        <Sparkles className="w-3 h-3" />
                        <span>PREMIUM QUALITY</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-950 leading-tight">
                        From Himalayan Mountains to Your Kitchen
                      </h3>

                      <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                        Discover the authentic journey of pure Himalayan pink salt — from ancient mountains directly to your table, 
                        unrefined, additive-free, and rich in natural minerals.
                      </p>

                      <div className="flex items-center gap-3 pt-2">
                        <button 
                          onClick={() => setCartCount(c => c + 1)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D94F04] to-[#B84A14] hover:opacity-95 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Shop Himalayan Salt</span>
                        </button>

                        <span className="text-xs font-mono text-zinc-400">
                          Stage 04 · Pure Direct Sourcing
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Catalog Header (From Image 5) */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-zinc-200">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-950">
                          All Products
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono">
                          Browse every GPI and GTM production product.
                        </p>
                      </div>

                      {/* Category Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                              selectedCategory === cat
                                ? 'bg-zinc-900 text-white font-semibold'
                                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Products Grid (Exact Layout from Image 5) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredProducts.map((prod) => {
                        const isLiked = wishlist[prod.id];
                        return (
                          <div
                            key={prod.id}
                            className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between group"
                          >
                            <div>
                              {/* Top Brand Badge */}
                              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                                <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${prod.badgeColor}`}>
                                  {prod.brand}
                                </span>
                                <span className="text-emerald-700 font-semibold text-[10px]">{prod.stock} in stock</span>
                              </div>

                              {/* Product Visual Container */}
                              <div className={`w-full h-36 rounded-lg bg-gradient-to-br ${prod.bgGradient} border border-zinc-100 flex flex-col items-center justify-center p-3 text-center mb-3 group-hover:scale-[1.01] transition-transform`}>
                                <div className="w-12 h-12 rounded-full bg-white/80 shadow-xs flex items-center justify-center mb-1 text-zinc-700 font-bold text-xs">
                                  {prod.brand === 'GTM' ? 'GTM' : 'GPI'}
                                </div>
                                <span className="text-[10px] font-mono text-zinc-500 uppercase">{prod.category}</span>
                              </div>

                              <h4 className="text-sm font-display font-bold text-zinc-900 leading-snug">
                                {prod.name}
                              </h4>
                              <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 font-sans">
                                {prod.spec}
                              </p>
                            </div>

                            {/* Price & Action Button */}
                            <div className="mt-4 pt-3 border-t border-zinc-100">
                              <div className="text-base font-display font-extrabold text-zinc-950 mb-2">
                                {prod.price}
                              </div>

                              {/* Orange / Green Gradient Add to Cart Button (From Image 5) */}
                              <button
                                onClick={() => setCartCount(c => c + 1)}
                                className="w-full py-2 rounded-lg bg-gradient-to-r from-[#D94F04] via-[#C85A17] to-emerald-600 hover:opacity-95 text-white font-mono font-bold text-xs shadow-xs transition-opacity flex items-center justify-center gap-1.5"
                              >
                                <span>Add to cart</span>
                              </button>

                              {/* Actions Row: Wishlist, Share, Chat */}
                              <div className="flex items-center justify-center gap-4 mt-2.5 pt-2 border-t border-zinc-100 text-zinc-400">
                                <button 
                                  onClick={() => toggleWishlist(prod.id)}
                                  className={`p-1 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}
                                  title="Add to Wishlist"
                                >
                                  <Heart className="w-3.5 h-3.5 fill-current" />
                                </button>
                                <button className="p-1 hover:text-blue-500 transition-colors" title="Share Product">
                                  <Share2 className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1 hover:text-emerald-500 transition-colors" title="Inquire on WhatsApp/Chat">
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ADMIN & DATABASE VIEW */
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Admin Telemetry Header */}
                  <div className="p-4 rounded-xl bg-zinc-950 text-white flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                          Administrative Inventory & Order Engine
                        </h4>
                        <p className="text-xs text-zinc-400 font-mono">
                          Session: JWT Token Valid · Role: SUPER_ADMIN (ayush)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        PostgreSQL Authoritative Storage
                      </span>
                    </div>
                  </div>

                  {/* Real-time Inventory Stock Adjuster */}
                  <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden shadow-2xs">
                    <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between text-xs font-mono font-bold text-zinc-600 uppercase">
                      <span>Real-Time Inventory Stock Level Synchronization</span>
                      <span className="text-[#C85A17]">Click + / - to adjust warehouse quantity:</span>
                    </div>

                    <div className="divide-y divide-zinc-100">
                      {products.map((p) => (
                        <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-zinc-900">{p.sku}</span>
                              <span className="text-xs text-zinc-600">· {p.name}</span>
                              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${p.badgeColor}`}>
                                {p.brand}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-zinc-400">Unit Retail Price: {p.price}</span>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md font-bold ${
                              stockUpdated === p.id 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-zinc-100 text-zinc-800'
                            }`}>
                              {p.stock} units
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleStockChange(p.id, -1)}
                                className="w-7 h-7 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono font-bold text-xs"
                              >
                                -
                              </button>
                              <button
                                onClick={() => handleStockChange(p.id, 1)}
                                className="w-7 h-7 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relational PostgreSQL Schema Architecture */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold mb-2">
                        <Database className="w-3.5 h-3.5 text-[#C85A17]" />
                        <span>products Table</span>
                      </div>
                      <ul className="text-zinc-600 space-y-1">
                        <li>• id (UUID, PK)</li>
                        <li>• sku (VARCHAR, UNIQUE)</li>
                        <li>• name, category, brand (GTM/GPI)</li>
                        <li>• price_inr (DECIMAL)</li>
                        <li>• is_featured (BOOLEAN)</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold mb-2">
                        <Layers className="w-3.5 h-3.5 text-indigo-600" />
                        <span>inventory_batches Table</span>
                      </div>
                      <ul className="text-zinc-600 space-y-1">
                        <li>• batch_id (UUID, PK)</li>
                        <li>• product_id (FK → products)</li>
                        <li>• quantity_on_hand (INT)</li>
                        <li>• mfg_date, expiry_date</li>
                        <li>• warehouse_location (Pune)</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold mb-2">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>jwt_auth & roles</span>
                      </div>
                      <ul className="text-zinc-600 space-y-1">
                        <li>• HTTP-Only Cookie storage</li>
                        <li>• Role-Based Access Control</li>
                        <li>• Admin Audit Log Trail</li>
                        <li>• SSR Google Crawl Optimizer</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Technical Chips & Link */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/80">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-1">STACK:</span>
            {['React', 'Node.js', 'Express', 'JWT Auth', 'PostgreSQL', 'SSR / SEO', 'REST API', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-700 shadow-2xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href="https://gpipvtltd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-800 hover:text-[#C85A17] transition-colors"
          >
            <span>Open Production Site (gpipvtltd.com)</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default GpiStorefrontShowcase;
