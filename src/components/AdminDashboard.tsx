import React, { useState } from 'react';
import { 
  Building2, Users, Flame, Percent, Activity, Sliders, ListFilter,
  CheckCircle, HelpCircle, ShieldAlert, Award, ArrowUpRight,
  Sparkles, Check, RefreshCw
} from 'lucide-react';
import { VerificationRequest } from '../types';

interface AdminDashboardProps {
  verifications: VerificationRequest[];
  onVerifyFarmer: (id: string) => void;
  onRejectFarmer: (id: string) => void;
}

export default function AdminDashboard({
  verifications,
  onVerifyFarmer,
  onRejectFarmer
}: AdminDashboardProps) {
  const [commissionEnabled, setCommissionEnabled] = useState(true);
  const [featuredEnabled, setFeaturedEnabled] = useState(true);
  const [deliveryFeesEnabled, setDeliveryFeesEnabled] = useState(false);
  
  const [commissionRate, setCommissionRate] = useState(5.0);
  const [selectedChartMode, setSelectedChartMode] = useState<'Month' | 'Week'>('Month');
  const [localRequests, setLocalRequests] = useState<VerificationRequest[]>(verifications);
  
  const [notification, setNotification] = useState<string | null>(null);

  const handleUpdateStrategy = () => {
    setNotification('System pricing strategy updated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleVerifyAction = (id: string) => {
    onVerifyFarmer(id);
    setLocalRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: 'Verified' };
      }
      return req;
    }));
    setNotification('Farmer approved & certificate generated!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="bg-background text-on-surface font-sans max-w-[1440px] px-4 md:px-16 py-6 pb-24 space-y-8 reveal-item">
      
      {/* Alert Banner */}
      {notification && (
        <div className="bg-primary/20 border border-primary text-primary px-4 py-3 rounded-xl flex items-center justify-between shadow-soft animate-pulse">
          <span className="text-xs md:text-sm font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5" /> {notification}
          </span>
          <button onClick={() => setNotification(null)} className="text-primary font-black text-xs hover:underline cursor-pointer">OK</button>
        </div>
      )}

      {/* Executive Metrics Grid (4 items) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 hover:border-primary/10 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">Total GMV</span>
            <span className="text-secondary font-bold text-[10px] bg-secondary-container px-2 py-0.5 rounded-full">+12.4%</span>
          </div>
          <div className="font-display font-black text-xl md:text-2xl text-primary">$482,950.00</div>
          <p className="text-[10px] text-outline font-bold mt-1 uppercase tracking-wider">Past 30 days active</p>
        </div>

        {/* Revenue */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 hover:border-primary/10 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">Net Rev ({commissionRate.toFixed(1)}%)</span>
            <span className="text-secondary font-bold text-[10px] bg-secondary-container px-2 py-0.5 rounded-full">+8.1%</span>
          </div>
          <div className="font-display font-black text-xl md:text-2xl text-primary">$24,147.50</div>
          <p className="text-[10px] text-outline font-bold mt-1 uppercase tracking-wider">Platform commission</p>
        </div>

        {/* Active Users */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 hover:border-primary/10 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">Active Users</span>
            <span className="text-secondary font-bold text-[10px] bg-secondary-container px-2 py-0.5 rounded-full">+18.5%</span>
          </div>
          <div className="font-display font-black text-xl md:text-2xl text-primary">12,402</div>
          <p className="text-[10px] text-outline font-bold mt-1 uppercase tracking-wider">Consumers &amp; Farmers</p>
        </div>

        {/* Avg Delivery speed */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-soft border border-outline-variant/10 hover:border-primary/10 transition-all">
          <div className="flex justify-between items-start mb-2">
            <span className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">Avg. Delivery</span>
            <span className="text-tertiary font-bold text-[10px] bg-tertiary-fixed px-2 py-0.5 rounded-full">-2m</span>
          </div>
          <div className="font-display font-black text-xl md:text-2xl text-primary">42m 12s</div>
          <p className="text-[10px] text-outline font-bold mt-1 uppercase tracking-wider">Farm to doorstep</p>
        </div>
      </section>

      {/* Grid: Line Chart on Left - Revenue Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Growth Line Chart Panel */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-3xl shadow-soft border border-outline-variant/10 flex flex-col justify-between">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              <h3 className="font-display font-black text-lg text-on-surface">Order Growth</h3>
              <p className="text-xs text-on-surface-variant font-medium">Daily transaction volume across all regions</p>
            </div>
            {/* Week/Month buttons container */}
            <div className="flex gap-1.5 p-1 bg-surface-container-high rounded-xl">
              {(['Month', 'Week'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedChartMode(mode)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedChartMode === mode 
                      ? 'bg-primary text-on-primary shadow-sm' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="h-64 relative w-full pt-4">
            <svg viewBox="0 0 1000 240" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d631b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0d631b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="1000" y2="40" stroke="#f0f5f0" strokeWidth="1" />
              <line x1="0" y1="100" x2="1000" y2="100" stroke="#f0f5f0" strokeWidth="1" />
              <line x1="0" y1="160" x2="1000" y2="160" stroke="#f0f5f0" strokeWidth="1" />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#f0f5f0" strokeWidth="1" />
              
              {/* Ambient Gradient Area */}
              <path 
                d="M 0,220 C 120,200 240,225 300,150 C 380,50 480,210 600,120 C 720,40 840,95 900,35 L 1000,15 L 1000,240 L 0,240 Z" 
                fill="url(#chartGrad)" 
              />
              {/* Main Line path */}
              <path 
                d="M 0,220 C 120,200 240,225 300,150 C 380,50 480,210 600,120 C 720,40 840,95 900,35 L 1000,15" 
                fill="none" 
                stroke="#0d631b" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
              
              {/* Highlight Datapoints */}
              <circle cx="300" cy="150" r="6" fill="#0d631b" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
              <circle cx="600" cy="120" r="6" fill="#0d631b" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
              <circle cx="900" cy="35" r="6" fill="#0d631b" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[9px] text-outline font-extrabold uppercase tracking-wider">
              <span>01 Oct</span>
              <span>07 Oct</span>
              <span>14 Oct</span>
              <span>21 Oct</span>
              <span>28 Oct</span>
            </div>
          </div>
        </div>

        {/* Revenue Controls panel */}
        <div className="bg-surface-container-high p-6 rounded-3xl border border-outline-variant/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sliders className="w-5 h-5 text-primary" />
              <h3 className="font-display font-black text-md text-on-surface">Revenue Controls</h3>
            </div>
            
            <div className="space-y-4">
              {/* Control rate commissions */}
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between shadow-xs border border-outline-variant/15">
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-on-surface">Marketplace Commission</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs text-outline font-medium">Rate:</span>
                    <input 
                      type="number" 
                      step="0.5" 
                      min="1" 
                      max="20" 
                      className="w-12 text-xs font-bold text-primary bg-surface-container rounded border border-outline-variant/50 px-1 py-0.5 text-center"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(Math.max(1, parseFloat(e.target.value) || 1))}
                    />
                    <span className="text-xs text-outline font-bold">%</span>
                  </div>
                </div>
                <div 
                  onClick={() => setCommissionEnabled(!commissionEnabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${commissionEnabled ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${commissionEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Control Featured ads */}
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between shadow-xs border border-outline-variant/15">
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-on-surface">Featured Ad Listings</h4>
                  <p className="text-[10px] text-outline mt-0.5 font-medium">Top-row farm crop placement ads</p>
                </div>
                <div 
                  onClick={() => setFeaturedEnabled(!featuredEnabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${featuredEnabled ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${featuredEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>

              {/* Dynamic Delivery fee control */}
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between shadow-xs border border-outline-variant/15">
                <div>
                  <h4 className="font-bold text-xs md:text-sm text-on-surface">Dynamic Delivery Fees</h4>
                  <p className="text-[10px] text-outline mt-0.5 font-medium">Distance and load weight rates</p>
                </div>
                <div 
                  onClick={() => setDeliveryFeesEnabled(!deliveryFeesEnabled)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${deliveryFeesEnabled ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${deliveryFeesEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleUpdateStrategy}
            className="w-full mt-6 py-3.5 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
          >
            Update Strategy
          </button>
        </div>
      </div>

      {/* Farmer Verification queue table layout */}
      <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-display font-black text-lg text-on-surface">Farmer Verification Queue</h3>
            <p className="text-xs text-on-surface-variant">New agricultural farm registrations awaiting background inspection and certificate upload</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-outline rounded-xl text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant">
              <ListFilter className="w-4 h-4" /> Filter
            </button>
            <button 
              onClick={() => {
                localRequests.forEach(req => handleVerifyAction(req.id));
              }}
              className="flex-1 md:flex-none bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all cursor-pointer"
            >
              Verify All
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-bold text-[10px] uppercase tracking-wider border-b border-outline-variant/20">
                <th className="px-6 py-4">Farmer Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Verification Check</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {localRequests.map((req) => (
                <tr key={req.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={req.image} 
                        alt={req.farmName} 
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-display font-extrabold text-sm text-on-surface">{req.farmName}</div>
                        <div className="font-mono text-[10px] text-outline">UID: {req.uid}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">
                    {req.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-surface-container-high rounded-full text-xs font-semibold text-on-surface-variant text-[11px]">
                      {req.specialty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {req.status === 'Verified' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                          <Check className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : req.status === 'License Expiring' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-bold">
                          <ShieldAlert className="w-3.5 h-3.5" /> License Expiring
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold animate-pulse">
                          <Activity className="w-3.5 h-3.5" /> Pending Docs
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'Verified' ? (
                      <span className="text-xs text-outline font-semibold">Approved</span>
                    ) : (
                      <button 
                        onClick={() => handleVerifyAction(req.id)}
                        className="text-primary hover:underline font-bold text-xs cursor-pointer"
                      >
                        Verify Docs
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-surface-container-low flex justify-center border-t border-outline-variant/10 select-none">
          <button className="text-xs text-primary font-bold hover:underline cursor-pointer">
            View All 142 Registered Growers
          </button>
        </div>
      </section>

    </div>
  );
}
