import React from 'react';

const MethodologySection = () => {
  const steps = [
    {
      number: "01",
      title: "Instant Inquiry Analysis",
      description: "Our NLP engine categorizes and processes incoming tickets within milliseconds, extracting key intents and user sentiment."
    },
    {
      number: "02",
      title: "Contextual Data Retrieval",
      description: "The AI securely scans your knowledge base and CRM to fetch highly relevant data for accurate responses."
    },
    {
      number: "03",
      title: "Automated Resolution",
      description: "Drafts and delivers personalized solutions to the user instantly, closing up to 70% of tier-1 support tickets."
    },
    {
      number: "04",
      title: "Smart Agent Handoff",
      description: "If a human touch is needed, the system seamlessly escalates the ticket with a full summary to the right department."
    }
  ];

  return (
    <section className="w-full py-24 px-6 lg:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Steps */}
        <div className="w-full lg:w-1/2 z-10">
          <h2 className="font-headline-lg text-3xl md:text-5xl text-white uppercase mb-12 leading-tight">
            A Deep Dive Into <br/>
            <span className="text-primary-fixed">Our AI Resolution</span> <br/>
            Methodology
          </h2>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-shrink-0">
                  <span className="text-primary-fixed/50 font-headline-xl text-4xl group-hover:text-primary-fixed transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-md text-xl text-white mb-2 uppercase group-hover:text-primary-fixed transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant font-body-md text-sm leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual representation */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative z-10">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Glowing orb */}
            <div className="absolute inset-0 bg-primary-fixed/30 blur-[60px] rounded-full animate-pulse"></div>
            {/* Core orb */}
            <div className="absolute inset-8 bg-gradient-to-tr from-primary-fixed to-[#b8fc79] rounded-full blur-[20px] mix-blend-screen opacity-80"></div>
            {/* Inner detailed orb */}
            <div className="absolute inset-16 bg-gradient-to-br from-[#d4fca3] to-primary-fixed rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MethodologySection;
