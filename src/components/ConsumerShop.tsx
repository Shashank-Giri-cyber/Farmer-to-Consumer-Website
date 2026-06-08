import React, { useState } from 'react';
import { Search, ShoppingCart, Tractor, CheckCircle, Tag, Filter, Check, Star } from 'lucide-react';
import { Product, BoxPlan } from '../types';

interface ConsumerShopProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
  boxPlans: BoxPlan[];
  onSelectBoxPlan: (planId: string) => void;
  selectedBoxId: string | null;
}

export default function ConsumerShop({
  products,
  onAddToCart,
  boxPlans,
  onSelectBoxPlan,
  selectedBoxId,
}: ConsumerShopProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortByPrice, setSortByPrice] = useState<null | 'asc' | 'desc'>(null);
  const [addedStates, setAddedStates] = useState<Record<string, boolean>>({});

  const handleAddWithFeedback = (productId: string) => {
    onAddToCart(productId);
    setAddedStates((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [productId]: false }));
    }, 1800);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.farm.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesOrganic = !organicOnly || p.organic;
    return matchesSearch && matchesCategory && matchesOrganic;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortByPrice === 'asc') return a.price - b.price;
    if (sortByPrice === 'desc') return b.price - a.price;
    return 0; // standard original order
  });

  const categories = ['All', 'Vegetables', 'Fruits', 'Organic', 'Seasonal'];

  return (
    <div className="bg-background text-on-background font-sans max-w-[1280px] mx-auto px-4 md:px-16 py-6 pb-20 reveal-item">
      {/* Mobile Search Input */}
      <div className="md:hidden mb-6">
        <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
          <Search className="w-5 h-5 text-outline mr-2" />
          <input 
            type="text" 
            placeholder="What's fresh today?"
            className="bg-transparent border-none text-on-surface text-sm w-full outline-none focus:ring-0 placeholder:text-outline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Banner & Search Info */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-baseline gap-2">
        <div>
          <h2 className="font-display text-xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            Shop Fresh Local Produce
          </h2>
          <p className="text-sm text-on-surface-variant font-medium">
            Sourced direct from verified growers in your region
          </p>
        </div>
        {/* Toggle Grid controls */}
        <div className="hidden md:flex items-center gap-2 bg-surface-container rounded-full px-4 py-2 border border-outline-variant/30 w-72 focus-within:ring-2 focus-within:ring-primary/40 transition-all">
          <Search className="w-4 h-4 text-outline" />
          <input 
            type="text" 
            placeholder="Search fresh produce..."
            className="bg-transparent border-none text-xs w-full outline-none focus:ring-0 placeholder:text-outline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2 border-b border-outline-variant/10 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95 cursor-pointer ${
              activeCategory === cat 
                ? 'bg-primary text-on-primary shadow-md scale-102' 
                : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters & Sorting */}
      <section className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Price Sorting Toggle Button */}
          <button 
            onClick={() => {
              if (sortByPrice === null) setSortByPrice('asc');
              else if (sortByPrice === 'asc') setSortByPrice('desc');
              else setSortByPrice(null);
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 border border-outline-variant rounded-lg text-xs font-semibold text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors ${sortByPrice ? 'bg-secondary/10 border-secondary text-secondary' : ''}`}
          >
            Price: {sortByPrice === 'asc' ? 'Low-high' : sortByPrice === 'desc' ? 'High-low' : 'Default'}
          </button>

          {/* District Organic Filter Chip */}
          <button 
            onClick={() => setOrganicOnly((prev) => !prev)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              organicOnly 
                ? 'bg-secondary-container text-on-secondary-container border border-secondary shadow-sm'
                : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Organic Certified {organicOnly ? <Check className="w-3.5 h-3.5" /> : null}
          </button>

          {/* Clean Filters Button */}
          {(searchQuery || activeCategory !== 'All' || organicOnly || sortByPrice) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setOrganicOnly(false);
                setSortByPrice(null);
              }}
              className="text-primary text-xs font-bold hover:underline py-1.5 px-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="text-xs text-on-surface-variant font-bold">
          Showing {sortedProducts.length} items
        </div>
      </section>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-surface-container-low rounded-2xl p-12 text-center border border-outline-variant/20 mb-12">
          <p className="text-on-surface-variant font-medium text-lg mb-2">No fresh products match your filters.</p>
          <p className="text-outline text-sm">Please try relaxing your search queries or category filters!</p>
        </div>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {sortedProducts.map((p) => {
            const isAdded = addedStates[p.id];
            return (
              <div 
                key={p.id}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden ambient-card border border-outline-variant/10 flex flex-col group justify-between"
              >
                <div className="aspect-square bg-surface-container-low overflow-hidden relative">
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {p.organic && (
                    <span className="absolute top-2.5 right-2.5 bg-secondary text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Organic
                    </span>
                  )}
                  {p.tag && (
                    <span className="absolute bottom-2.5 left-2.5 bg-tertiary-fixed text-on-tertiary-fixed text-[9px] font-bold px-2 py-0.5 rounded">
                      {p.tag}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-on-surface text-sm md:text-md mb-1 leading-snug group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-outline font-medium flex items-center gap-1 mb-3">
                      <Tractor className="w-3.5 h-3.5 text-primary" /> {p.farm}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="font-display font-extrabold text-lg md:text-xl text-primary">${p.price.toFixed(2)}</span>
                        <span className="text-xs text-outline font-medium">/{p.unit}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
                        {p.harvestInfo}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddWithFeedback(p.id)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs md:text-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded 
                          ? 'bg-primary text-on-primary shadow-inner scale-98'
                          : 'bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary shadow-sm'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isAdded ? 'Added ✓' : 'Add to Basket'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Subscription Plans: Bento Style */}
      <section className="bg-surface-bright/50 rounded-3xl p-6 md:p-10 border border-outline-variant/20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
            <Tag className="w-3.5 h-3.5" /> Seasonal Shares
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface mb-2">
            Weekly Harvest Boxes
          </h2>
          <p className="text-sm md:text-md text-on-surface-variant leading-relaxed max-w-lg">
            The best of the season's handpicked organic vegetables and fresh fruits, delivered safely straight to your gate every Tuesday morning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {boxPlans.map((plan) => {
            const isSelected = selectedBoxId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => onSelectBoxPlan(plan.id)}
                className={`bg-white border-2 p-6 rounded-2xl flex flex-col transition-all cursor-pointer relative hover:shadow-xl ${
                  plan.featured 
                    ? 'bg-primary-container text-on-primary-container border-primary shadow-lg scale-102 ring-2 ring-primary/40' 
                    : isSelected 
                      ? 'border-primary ring-2 ring-primary/20 bg-surface-container-low shadow-md'
                      : 'border-outline-variant/60 hover:border-primary/40'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    Most Popular
                  </span>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-display font-extrabold text-lg ${plan.featured ? 'text-on-primary-container' : 'text-on-surface'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs ${plan.featured ? 'text-white/80' : 'text-outline font-medium'}`}>
                      {plan.tagline}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    plan.featured 
                      ? 'bg-primary-fixed-dim text-on-primary-fixed-variant' 
                      : 'bg-surface-container-high text-on-surface-variant animate-pulse'
                  }`}>
                    {plan.itemCountLabel}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-8 flex-grow">
                  {plan.properties.map((prop, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs md:text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.featured ? 'text-on-primary-container' : 'text-primary'}`} />
                      <span className={plan.featured ? 'text-white/95' : 'text-on-surface-variant font-medium'}>
                        {prop}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-auto pt-4 border-t flex items-center justify-between ${plan.featured ? 'border-white/10' : 'border-outline-variant/30'}`}>
                  <div>
                    <span className={`font-display text-2xl font-black ${plan.featured ? 'text-white' : 'text-primary'}`}>
                      ${plan.price}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${plan.featured ? 'text-white/80' : 'text-outline'}`}>
                      /wk
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBoxPlan(plan.id);
                    }}
                    className={`px-5 py-2 rounded-xl font-bold text-xs hover:scale-103 active:scale-95 transition-all cursor-pointer ${
                      plan.featured 
                        ? 'bg-white text-primary hover:bg-surface-bright shadow-md' 
                        : isSelected 
                          ? 'bg-primary text-on-primary'
                          : 'bg-primary text-on-primary hover:opacity-90'
                    }`}
                  >
                    {isSelected ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
