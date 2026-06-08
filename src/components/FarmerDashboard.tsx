import React, { useState } from 'react';
import { 
  BadgeCheck, Coins, ShoppingBag, TrendingUp, Inbox, 
  ArrowRight, Sparkles, AlertTriangle, MoreVertical, Plus,
  DollarSign, Image as ImageIcon, Box, Check, X
} from 'lucide-react';
import { FarmerListing, OrderItem, Product } from '../types';

interface FarmerDashboardProps {
  listings: FarmerListing[];
  onAddListing: (newListing: Omit<Product, 'id'>) => void;
  orders: OrderItem[];
  onProcessOrder: (orderId: string) => void;
  onProcessAllOrders: () => void;
}

export default function FarmerDashboard({
  listings,
  onAddListing,
  orders,
  onProcessOrder,
  onProcessAllOrders,
}: FarmerDashboardProps) {
  const [activeOrderTab, setActiveOrderTab] = useState<'New' | 'Processing' | 'Delivered'>('New');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form states for adding new listing
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formUnit, setFormUnit] = useState('kg');
  const [formCategory, setFormCategory] = useState('Vegetables');
  const [formOrganic, setFormOrganic] = useState(true);
  const [formImage, setFormImage] = useState('');

  // Local active listings from state for easy deletion visualization
  const [farmerListings, setFarmerListings] = useState<FarmerListing[]>(listings);

  // Filter orders by tab
  const filteredOrders = orders.filter((o) => o.status === activeOrderTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    const defaultImg = formImage || 'https://images.unsplash.com/photo-1566385101042-1a010c129fa6?w=600&auto=format&fit=crop&q=60';
    
    // Call parent listener to update global catalog list in shop too!
    onAddListing({
      name: formName,
      price: parseFloat(formPrice),
      unit: formUnit,
      category: formCategory,
      organic: formOrganic,
      image: defaultImg,
      farm: 'Johnathan Farms',
      tag: 'Fresh Harvest',
      harvestInfo: 'Harvested Today'
    });

    // Add locally to farmer lists
    const newLocal: FarmerListing = {
      id: Math.random().toString(),
      name: formName,
      harvestDate: 'Oct 28, 2026',
      price: parseFloat(formPrice),
      unit: formUnit,
      image: defaultImg,
      status: 'ACTIVE'
    };
    setFarmerListings((prev) => [newLocal, ...prev]);

    // Reset Form
    setFormName('');
    setFormPrice('');
    setIsAddModalOpen(false);
    
    setSuccessToast(`Successfully added active listing "${formName}"!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleRemoveListing = (id: string) => {
    setFarmerListings((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-background text-on-surface font-sans max-w-[1280px] mx-auto px-4 md:px-16 py-6 space-y-8 reveal-item">
      
      {/* Aadhaar verified verification header status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            Welcome back, Farmer John
          </h2>
          <p className="text-on-surface-variant text-sm md:text-md">
            Your farm performance indicators are up <span className="text-primary font-bold">12%</span> this week.
          </p>
        </div>
        <div className="inline-flex self-start items-center gap-1.5 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full shadow-sm">
          <BadgeCheck className="w-5 h-5 text-on-secondary-container" />
          <span className="font-bold text-xs">Aadhaar Verified Professional</span>
        </div>
      </div>

      {successToast && (
        <div className="bg-primary/20 border border-primary text-primary px-4 py-3 rounded-xl flex items-center justify-between shadow-soft animate-bounce">
          <span className="text-sm font-semibold">{successToast}</span>
          <button onClick={() => setSuccessToast(null)} className="text-primary hover:text-primary-container font-black">X</button>
        </div>
      )}

      {/* Metrics Bento Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 flex flex-col justify-between h-32 hover:border-primary/20 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Total Sales</span>
            <Coins className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-on-surface">₹42,850</div>
            <p className="text-[10px] text-outline font-bold uppercase mt-1">Live Payments</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 flex flex-col justify-between h-32 hover:border-primary/20 transition-all" id="active-orders-summary-card">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Active Orders</span>
            <ShoppingBag className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-on-surface">{orders.filter(o => o.status !== 'Delivered').length}</div>
            <p className="text-[10px] text-outline font-bold uppercase mt-1">Pending Invoices</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 flex flex-col justify-between h-32 hover:border-primary/20 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Net Revenue</span>
            <TrendingUp className="w-5 h-5 text-tertiary" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-on-surface">₹38,200</div>
            <p className="text-[10px] text-outline font-bold uppercase mt-1">Commission Adjusted</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 flex flex-col justify-between h-32 hover:border-primary/20 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-on-surface-variant font-bold text-xs tracking-wider uppercase">Products</span>
            <Inbox className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-display font-black text-2xl text-on-surface">{farmerListings.length}</div>
            <p className="text-[10px] text-outline font-bold uppercase mt-1">Active Catalog Items</p>
          </div>
        </div>
      </section>

      {/* Main Grid: Listings & Forecasting left - Order Management right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Listings and AI insights */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Listings section */}
          <section className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display font-black text-lg text-on-surface">Active Listings</h3>
                <p className="text-xs text-on-surface-variant">Update, edit or delete your currently visible marketplace stock.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1 text-primary font-bold text-sm hover:underline cursor-pointer"
              >
                Add product <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmerListings.map((listing) => (
                <div 
                  key={listing.id}
                  className="bg-surface-container-low/40 rounded-2xl overflow-hidden flex border border-outline-variant/10 hover:border-primary/20 transition-all p-3 group relative"
                >
                  <img 
                    src={listing.image} 
                    alt={listing.name}
                    className="w-24 h-24 rounded-xl object-cover transition-transform group-hover:scale-102 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="ml-4 flex flex-col justify-center w-full">
                    <div className="flex justify-between items-start">
                      <h4 className="font-display font-bold text-on-surface text-sm md:text-base">{listing.name}</h4>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wide uppercase">
                        {listing.status}
                      </span>
                    </div>
                    <p className="text-xs text-outline font-medium mt-1">Harvest: {listing.harvestDate}</p>
                    <div className="mt-2.5 flex justify-between items-end">
                      <span className="font-display font-extrabold text-primary text-md">₹{listing.price}/{listing.unit}</span>
                      <button 
                        onClick={() => handleRemoveListing(listing.id)}
                        className="text-xs text-error hover:underline hover:text-red-700 font-bold cursor-pointer"
                        title="Delete product"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Insights & Forecasting Bento Widget */}
          <section className="bg-secondary-container/10 rounded-3xl p-6 border border-secondary/15 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-secondary fill-secondary/20" />
              <div>
                <h3 className="font-display font-extrabold text-lg text-secondary">AI Insights &amp; Market Forecasting</h3>
                <p className="text-xs text-on-surface-variant font-medium">Predictive local harvest demand algorithms powered by FarmFresh Central</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Custom CSS Demand Chart */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-outline-variant/20">
                <p className="font-display font-bold text-sm text-on-surface mb-4">Projected Demand: Leafy Greens</p>
                <div className="flex items-end justify-between h-32 gap-1 px-2 relative pt-4">
                  <div className="bg-primary/25 w-full rounded-t-lg transition-all hover:bg-primary" style={{ height: '40%' }} title="Mon: 40%"/>
                  <div className="bg-primary/25 w-full rounded-t-lg transition-all hover:bg-primary" style={{ height: '60%' }} title="Tue: 60%"/>
                  <div className="bg-primary/25 w-full rounded-t-lg transition-all hover:bg-primary" style={{ height: '50%' }} title="Wed: 50%"/>
                  <div className="bg-secondary w-full rounded-t-lg transition-all duration-500 shadow-md scale-y-105" style={{ height: '90%' }} title="Thu: 90% (Peak Day)"/>
                  <div className="bg-primary/25 w-full rounded-t-lg transition-all hover:bg-primary" style={{ height: '70%' }} title="Fri: 70%"/>
                  <div className="bg-primary/25 w-full rounded-t-lg transition-all hover:bg-primary" style={{ height: '42%' }} title="Sat: 42%"/>
                  <div className="bg-primary/25 w-full rounded-t-lg transition-all hover:bg-primary" style={{ height: '55%' }} title="Sun: 55%"/>
                </div>
                <div className="flex justify-between text-[9px] text-outline mt-2 font-bold uppercase tracking-wider">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span className="text-secondary font-extrabold">Thu (Peak)</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* Dynamic Actionable Suggestions List */}
              <div className="space-y-3 flex flex-col justify-center">
                <div className="bg-white p-4 rounded-xl shadow-xs border border-outline-variant/15 flex items-center justify-between hover:translate-x-1 transition-all duration-300">
                  <div className="space-y-0.5">
                    <p className="font-display font-bold text-sm text-on-surface">Seasonal Suggestion</p>
                    <p className="text-xs text-on-surface-variant">Switch Spinach retail price target to ₹60/kg</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0" />
                </div>

                <div className="bg-white p-4 rounded-xl shadow-xs border border-outline-variant/15 flex items-center justify-between hover:translate-x-1 transition-all duration-300">
                  <div className="space-y-0.5">
                    <p className="font-display font-bold text-sm text-on-surface">Inventory Alert</p>
                    <p className="text-xs text-on-surface-variant">Low Potato stock in your local pin-code category</p>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-tertiary flex-shrink-0" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right column: Order Management list */}
        <aside className="lg:col-span-4 select-none">
          <div className="bg-white rounded-3xl p-5 shadow-soft border border-outline-variant/10 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-display font-black text-lg text-on-surface mb-4">Order Management</h3>
              
              {/* Tab options menu */}
              <div className="flex border-b border-outline-variant/40 mb-4 text-center">
                {(['New', 'Processing', 'Delivered'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveOrderTab(tab)}
                    className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeOrderTab === tab 
                        ? 'border-b-2 border-primary text-primary' 
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {tab} ({orders.filter(o => o.status === tab).length})
                  </button>
                ))}
              </div>

              {/* Order listing items mapped */}
              <div className="space-y-3 overflow-y-auto custom-scrollbar max-h-[480px] pr-1">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 text-outline text-xs font-medium">
                    No orders in "{activeOrderTab}" category at present.
                  </div>
                ) : (
                  filteredOrders.map((o) => (
                    <div 
                      key={o.id}
                      onClick={() => onProcessOrder(o.id)}
                      className="p-4 rounded-xl bg-surface-container-low/60 hover:bg-surface-container transition-all cursor-pointer border-l-4 border-solid border-primary hover:border-secondary shadow-xs scale-98 active:scale-95"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs font-bold text-primary">{o.id}</span>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          o.tag === 'Urgent' 
                            ? 'bg-error-container text-on-error-container' 
                            : o.tag === 'Pick-up' 
                              ? 'bg-secondary-container text-on-secondary-container' 
                              : 'bg-primary-container/20 text-primary-container'
                        }`}>
                          {o.tag}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-on-surface mb-1">{o.items}</p>
                      
                      <div className="flex justify-between items-baseline mt-3">
                        <span className="text-[11px] text-outline italic font-medium">
                          {o.distance} away • {o.location}
                        </span>
                        <span className="font-display font-extrabold text-sm text-primary">₹{o.price}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {activeOrderTab === 'New' && filteredOrders.length > 0 && (
              <button 
                id="process-all-orders-btn"
                onClick={onProcessAllOrders}
                className="w-full mt-4 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer text-center"
              >
                Process All New Orders
              </button>
            )}
          </div>
        </aside>
      </div>

      {/* Adding Listing Float Action Button (FAB) Trigger */}
      <button 
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-container text-on-primary w-14 h-14 md:w-auto md:px-6 md:h-16 rounded-full flex items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all z-40 cursor-pointer"
        title="Add New Product Listing"
      >
        <Plus className="w-6 h-6 text-on-primary" />
        <span className="hidden md:block font-bold text-sm tracking-wide">Add New Product</span>
      </button>

      {/* Add Product Dialog Modal Backdrop */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-display font-black text-lg text-primary flex items-center gap-1.5">
                <Box className="w-5 h-5 text-primary" /> Create New Active Listing
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Product Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Organic Roma Tomatoes"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Price (INR / ₹)
                  </label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 45"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    Unit Category
                  </label>
                  <select 
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  >
                    <option value="kg">Per Kilogram (kg)</option>
                    <option value="bunch">Per Bunch</option>
                    <option value="box">Per Box</option>
                    <option value="piece">Per Piece</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Category
                </label>
                <select 
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Organic">Organic</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                  Product Image URL (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="Paste URL or leave blank for default"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input 
                  type="checkbox" 
                  id="formOrganic" 
                  checked={formOrganic}
                  onChange={(e) => setFormOrganic(e.target.checked)}
                  className="w-4.5 h-4.5 text-primary border-outline-variant rounded cursor-pointer"
                />
                <label htmlFor="formOrganic" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider cursor-pointer">
                  Aadhaar Organic Certified Crop
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-surface-container hover:bg-surface-container-high py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-on-surface-variant active:scale-98 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-container text-on-primary py-3 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-98 transition-all cursor-pointer"
                >
                  Confirm &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
