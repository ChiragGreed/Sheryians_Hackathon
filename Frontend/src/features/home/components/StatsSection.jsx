import React from 'react';

const StatsSection = () => {
  return (
    <section className="w-full py-20 px-6 lg:px-12 bg-[#081800] border-y border-primary-fixed/20 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00E87A 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <h2 className="font-headline-lg text-2xl md:text-4xl text-center text-primary-fixed uppercase mb-16 max-w-2xl">
          Empowering Support Success in Numbers
        </h2>
        
        <div className="flex flex-col md:flex-row justify-around items-center w-full gap-12 md:gap-0">
          <div className="flex flex-col items-center text-center group">
            <div className="font-headline-xl text-6xl md:text-7xl text-white mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-primary-fixed">97%</div>
            <div className="font-label-bold text-on-surface-variant uppercase tracking-widest text-sm">Automated Resolution</div>
          </div>
          
          <div className="w-px h-24 bg-white/10 hidden md:block"></div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="font-headline-xl text-6xl md:text-7xl text-white mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-primary-fixed">50+</div>
            <div className="font-label-bold text-on-surface-variant uppercase tracking-widest text-sm">Languages Supported</div>
          </div>
          
          <div className="w-px h-24 bg-white/10 hidden md:block"></div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="font-headline-xl text-6xl md:text-7xl text-white mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-primary-fixed">10x</div>
            <div className="font-label-bold text-on-surface-variant uppercase tracking-widest text-sm">Faster Response</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
