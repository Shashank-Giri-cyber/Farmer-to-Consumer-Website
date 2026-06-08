import React from 'react';
import { Sprout, CreditCard, Truck, ShieldCheck, Lock, Award, ArrowRight, UserCheck, Star, AppWindow, Play, Sparkles } from 'lucide-react';
import { PortalMode } from '../types';

interface ConsumerHomeProps {
  onNavigate: (mode: PortalMode) => void;
}

export default function ConsumerHome({ onNavigate }: ConsumerHomeProps) {
  return (
    <div className="bg-background text-on-background font-sans reveal-item">
      {/* Hero Section */}
      <section className="relative w-full h-[640px] md:h-[720px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-[0.80] contrast-[1.05]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi9g-TRq73jMNpMzA8E80DhVyPPwRz2GB4RRzf1uID9QZwIGlAr3BaG6ym2zAKbXftBcBYetMQ9wb7WB0Fs_kyPZit3EBpt-wX47-EvfYo6U7bFFiGM4ySMVZoNcD_qYnItCbbitfGYLsCNFNo24ssHTJ-32oRtA-YYzyq7nH2s54uwIhw0l8IumAPKPgmRtEHhYL2tOvxu6hNmMHrOPYNjS2hBjsoZjR_TrWHKXc9jBc-5ejEbG6Mq4McWLB3EIp5PEncDtHuc0Yi"
            alt="Organic farming morning harvest display banner"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </div>
        <div className="max-w-[1280px] w-full mx-auto px-4 md:px-16 container relative z-10">
          <div className="max-w-2xl bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/20 shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/25 border border-primary-container text-primary font-medium text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Direct Farmer-to-Door Delivery
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-on-background tracking-tight leading-[1.1] mb-4">
              Fresh Vegetables Direct From Farmers
            </h2>
            <p className="body-lg text-on-surface-variant font-medium text-md md:text-lg leading-relaxed mb-6">
              No Middlemen. Better Prices. Fresher Produce. Experience the taste of honesty, harvested today and delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                id="hero-shop-now"
                onClick={() => onNavigate('buyer-shop')}
                className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-semibold text-md hover:bg-primary-container active:scale-95 transition-all shadow-lg text-center cursor-pointer"
              >
                Shop Now
              </button>
              <button 
                id="hero-partner-dash"
                onClick={() => onNavigate('farmer')}
                className="bg-white/95 text-primary border border-primary/20 hover:bg-surface-container-low px-8 py-3.5 rounded-full font-semibold text-md active:scale-95 transition-all text-center cursor-pointer"
              >
                Become a Farmer Partner
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FarmFresh Direct Bento Section */}
      <section className="py-16 md:py-24 px-4 md:px-16 bg-surface-bright" id="features">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-primary mb-3">
              Why Choose FarmFresh Direct?
            </h2>
            <p className="text-md md:text-lg text-on-surface-variant max-w-2xl mx-auto">
              We bridge the gap between rural growers and urban consumers with technology and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-primary/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <Sprout className="w-6 h-6 text-on-secondary-container" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Farm Fresh Produce</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Vibrant, nutrient-dense vegetables harvested at the peak of ripeness just for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-primary/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <CreditCard className="w-6 h-6 text-on-secondary-container" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Direct Farmer Pricing</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Fair pricing for you and better earnings for farmers by removing costly intermediaries.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-primary/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <Truck className="w-6 h-6 text-on-secondary-container" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Same Day Delivery</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                From field to your kitchen in under 24 hours. Peak freshness guaranteed every time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-primary/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <ShieldCheck className="w-6 h-6 text-on-secondary-container" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Organic &amp; Chemical-Free</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Rigorous quality checks ensure only the cleanest, natural produce reaches your family.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-primary/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <Lock className="w-6 h-6 text-on-secondary-container" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Secure Payments</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Encrypted, multi-channel payment options for a safe and hassle-free shopping experience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-soft border border-primary/5 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                <Award className="w-6 h-6 text-on-secondary-container" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface mb-2">Verified Farmers</h3>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                We partner only with vetted local farmers who share our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-primary mb-3">
              How It Works
            </h2>
            <p className="text-md text-on-surface-variant font-medium">
              Transparent from the seed to your basket.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-start justify-between relative">
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 bg-secondary-container z-0" />

            {/* Step 1 */}
            <div className="flex-1 text-center relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 font-extrabold text-xl shadow-lg ring-4 ring-primary-container/20">
                1
              </div>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-primary/5 w-full">
                <h4 className="font-display font-bold text-on-surface text-lg mb-2">Farmers List</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Farmers list their daily harvest directly on our platform after strict quality audit.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 text-center relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 font-extrabold text-xl shadow-lg ring-4 ring-primary-container/20">
                2
              </div>
              <div className="bg-surface-container-low p-6 rounded-2xl border-2 border-primary/20 w-full shadow-md">
                <h4 className="font-display font-bold text-on-surface text-lg mb-2">Consumers Order</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  You pick the freshest produce from your favorite local farmers through our easy app.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 text-center relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 font-extrabold text-xl shadow-lg ring-4 ring-primary-container/20">
                3
              </div>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-primary/5 w-full">
                <h4 className="font-display font-bold text-on-surface text-lg mb-2">Produce Delivered</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Our logistics team ensures your order arrives fresh from the field within hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories (Farmer Section) */}
      <section className="py-16 md:py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
            <div>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-primary mb-2">
                Farmer Success Stories
              </h2>
              <p className="text-md text-on-surface-variant font-medium">
                Empowering those who feed the world.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('farmer')}
              className="text-primary font-bold inline-flex items-center gap-1 hover:gap-2 hover:underline transition-all mt-3 md:mt-0 text-md cursor-pointer"
            >
              View all stories <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Story 1 */}
            <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-soft border border-outline-variant/10">
              <div className="w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk1q0UnOijptSHXoN6fJXwrd2s7kFnZgGEGgUSHr-FTkmqPk9YcB7NxTNPWh3k_jVNrgDWTJOwPbJ7QuMwMhXoC1VEdANWhteDG3en1R4R22dr4EKS1TCSL3yasn4mEHGqlv5bQ2ogbxq3X4lDtajMDKUlG8WMOLZCeFz_QUYqfc-AYvuyTnFk26rOTAeFiQm5IwLxWYyM43pQfnf3kf0WrRzv-i85sjEpI583ehOV6SfncPO5v5AJGC14EeTcCWu55XTrHdX5c5x5" 
                  alt="Samuel K. standing in field with vegetables"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 lg:w-3/5 flex flex-col justify-center">
                <span className="text-tertiary text-xs font-bold uppercase tracking-widest mb-1">
                  Green Valley Farm
                </span>
                <h4 className="font-display text-lg md:text-xl font-bold text-on-surface mb-3 leading-snug">
                  "My revenue increased by 40% in just six months."
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  "Before FarmFresh Direct, I struggled with unpredictable wholesale prices. Now I have a stable income and a direct link to the people enjoying my crops."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-on-secondary-container" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-on-surface text-sm">Samuel K.</h5>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Partner Since 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-soft border border-outline-variant/10">
              <div className="w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYQSK9CKSaHYytLegrEnKzPslbJuH13nN6Gkjw1h2VkA2obHuRHjSTAaR_CGhT2zZTuHMkm5f1gxgd-7po24bMreH-ClhuZ5In2xXStlWt9aT5o50q6mq-xYSEhHNrNgi4lZ_PShP7Kr7vRPjM2eQDtf2C9dEWClPix7L_bBL8r1csn3eatHhxOX2TpjDaAYMKvicKFq2HZx2XNX6ZaVFh6dr67alz_fpLriYSqz_Ov4E1usn-Dmpb6d9UtM9DtYro_eZ4xnXNq7G7" 
                  alt="Elena M. in a glasshouse with tomatoes"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 lg:w-3/5 flex flex-col justify-center">
                <span className="text-tertiary text-xs font-bold uppercase tracking-widest mb-1">
                  Sunlight Organics
                </span>
                <h4 className="font-display text-lg md:text-xl font-bold text-on-surface mb-3 leading-snug">
                  "Finally, a platform that values organic farming practices."
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                  "The chemical-free validation process gave my customers the trust they needed. We've expanded our greenhouse area by 20% to meet the demand."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-on-secondary-container" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-on-surface text-sm">Elena M.</h5>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Partner Since 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Info Banner */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container rounded-full opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container rounded-full opacity-20" />
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-on-primary text-center md:text-left">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              The Farm is Just One Tap Away
            </h2>
            <p className="text-md md:text-lg mb-8 opacity-90 leading-relaxed max-w-lg">
              Download the FarmFresh Direct app to browse local harvests, track your deliveries, and support your community farmers on the go.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="#download-appstore" 
                onClick={(e) => e.preventDefault()}
                className="bg-white text-on-background px-6 py-3 rounded-xl flex items-center gap-3 hover:scale-105 transition shadow-lg border border-white/20"
              >
                <AppWindow className="w-8 h-8 text-primary" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant leading-none">Download on the</p>
                  <p className="font-extrabold text-md text-on-surface">App Store</p>
                </div>
              </a>
              <a 
                href="#download-playstore" 
                onClick={(e) => e.preventDefault()}
                className="bg-white text-on-background px-6 py-3 rounded-xl flex items-center gap-3 hover:scale-105 transition shadow-lg border border-white/20"
              >
                <Play className="w-8 h-8 text-primary fill-primary" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant leading-none">Get it on</p>
                  <p className="font-extrabold text-md text-on-surface">Google Play</p>
                </div>
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-[340px] mx-auto">
              <img 
                className="rounded-[40px] shadow-2xl border-[8px] border-surface-container-highest max-w-full h-auto object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6MtjAquuioExM6cdlp4LZKF0_Br-ast5f0YVo2fT_B6FPid6QMS_we4RxUttfnqOlM0Scg3VPNiGQA8p4NCL-WBKOZ2_L6li4qcpmXfn0Zjao70MmWRjKyFa5vZf8cXsN7pRmVmJLHiVSUNBuSBGySmOrsujhnpHwiDeUhP7QzAHfbvtBEpF-wCBjGcxXQhRNqwXv_CkruQxejrpdLdzJqxjYaOhp9SW68ElGi6fji8btzHja5FwTcLU2Qc4wdBMx9LBU8XT0JCKm" 
                alt="Smartphone app mockup vegetable catalog grids"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
