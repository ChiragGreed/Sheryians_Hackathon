import React from 'react';
import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <section className="relative w-full pt-32 pb-20 px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-fixed/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-fixed/30 bg-primary-fixed/5 mb-8">
          <span className="material-symbols-outlined text-primary-fixed text-sm" data-icon="smart_toy">smart_toy</span>
          <span className="text-primary-fixed font-label-bold text-xs uppercase tracking-widest">AI Customer Support System</span>
        </div>

        <h1 className="font-headline-xl text-5xl md:text-7xl lg:text-[80px] text-white leading-tight mb-6 uppercase">
          <span className="text-primary-fixed">Transform Support</span> With Our AI-First Approach
        </h1>

        <p className="text-on-surface-variant font-body-lg text-lg md:text-xl max-w-2xl mb-10">
          Deliver instant, accurate, and personalized customer service 24/7. Elevate your team's capabilities with intelligent automation.
        </p>

        <Link
          to="/register"
          className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-full font-label-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,232,122,0.3)] hover:shadow-[0_0_30px_rgba(0,232,122,0.5)] active:scale-95"
        >
          Start Free Trial
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
