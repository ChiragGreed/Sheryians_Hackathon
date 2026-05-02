import React from 'react';

const FeatureGrid = () => {
  const features = [
    {
      title: "Automated Ticket Resolution",
      description: "Resolve common customer inquiries instantly without human intervention, reducing wait times and improving satisfaction.",
      icon: "bolt",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Seamless Human Escalation",
      description: "When complex issues arise, our AI intelligently routes the conversation to the right human agent with full context.",
      icon: "support_agent",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "24/7 Global Availability",
      description: "Provide round-the-clock support in multiple languages.",
      icon: "public",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Predictive Insights",
      description: "Analyze sentiment to proactively address customer needs.",
      icon: "monitoring",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="w-full py-24 px-6 lg:px-12 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="font-headline-lg text-3xl md:text-5xl text-white uppercase mb-4">
            <span className="text-primary-fixed">Intelligent Support</span> Catalyst
          </h2>
          <p className="text-on-surface-variant font-body-md max-w-2xl mx-auto md:mx-0">
            Empower your business with a foundational AI layer designed specifically for modern customer support workflows.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[400px]">
          
          {/* Card 0: Wide (Spans 2 columns) */}
          <div className="md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden flex flex-col md:flex-row bg-surface-container-low border border-white/5 hover:border-primary-fixed/30 transition-colors duration-300 group">
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary-fixed">{features[0].icon}</span>
              </div>
              <h3 className="font-headline-md text-xl text-white mb-3 uppercase">{features[0].title}</h3>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                {features[0].description}
              </p>
            </div>
            <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-fixed/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <img src={features[0].image} alt={features[0].title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>

          {/* Card 1: Tall (Spans 2 rows) */}
          <div className="md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden flex flex-col bg-surface-container-low border border-white/5 hover:border-primary-fixed/30 transition-colors duration-300 group">
            <div className="p-8 flex flex-col shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary-fixed">{features[1].icon}</span>
              </div>
              <h3 className="font-headline-md text-xl text-white mb-3 uppercase">{features[1].title}</h3>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                {features[1].description}
              </p>
            </div>
            <div className="flex-1 relative overflow-hidden min-h-[250px]">
              <div className="absolute inset-0 bg-primary-fixed/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <img src={features[1].image} alt={features[1].title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>

          {/* Card 2: Square (1 column, 1 row) */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden flex flex-col bg-surface-container-low border border-white/5 hover:border-primary-fixed/30 transition-colors duration-300 group relative">
             <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-primary-fixed/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                <img src={features[2].image} alt={features[2].title} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
             </div>
             <div className="relative z-10 p-8 flex flex-col h-full justify-end bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/20 backdrop-blur-sm flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-fixed">{features[2].icon}</span>
              </div>
              <h3 className="font-headline-md text-xl text-white mb-2 uppercase">{features[2].title}</h3>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                {features[2].description}
              </p>
            </div>
          </div>

          {/* Card 3: Square (1 column, 1 row) */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden flex flex-col bg-surface-container-low border border-white/5 hover:border-primary-fixed/30 transition-colors duration-300 group relative">
             <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-primary-fixed/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                <img src={features[3].image} alt={features[3].title} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
             </div>
             <div className="relative z-10 p-8 flex flex-col h-full justify-end bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="w-12 h-12 rounded-full bg-primary-fixed/20 backdrop-blur-sm flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-fixed">{features[3].icon}</span>
              </div>
              <h3 className="font-headline-md text-xl text-white mb-2 uppercase">{features[3].title}</h3>
              <p className="text-on-surface-variant font-body-md text-sm leading-relaxed">
                {features[3].description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
