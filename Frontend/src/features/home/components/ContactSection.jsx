import React from 'react';
import { Link } from 'react-router';

const ContactSection = () => {
  return (
    <section className="w-full py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side: Contact Form */}
        <div className="w-full md:w-1/2">
          <h2 className="font-headline-lg text-3xl md:text-5xl text-white uppercase mb-4">
            <span className="text-primary-fixed">Let's Connect</span> And Ignite Success
          </h2>
          <p className="text-on-surface-variant font-body-md mb-10 max-w-md">
            Ready to transform your customer support? Reach out to our team to see SolveX in action.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
               <input
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-3 pl-4 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all font-body-md"
                placeholder="Full Name"
                type="text"
              />
            </div>
            <div className="space-y-2">
               <input
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-3 pl-4 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all font-body-md"
                placeholder="Email Address"
                type="email"
              />
            </div>
            <div className="space-y-2">
               <textarea
                className="w-full bg-surface-container-lowest border border-outline/20 text-on-surface py-3 pl-4 rounded-lg focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed outline-none transition-all font-body-md min-h-[120px]"
                placeholder="How can we help your team?"
              ></textarea>
            </div>
            <button
              className="bg-primary-fixed text-on-primary-fixed px-8 py-3 rounded-lg font-label-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-300"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side: Robot Image */}
        <div className="w-full md:w-1/2 relative h-96 md:h-[500px] rounded-3xl overflow-hidden bg-surface-container-low border border-white/5 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-primary-fixed/5 mix-blend-overlay z-10 pointer-events-none"></div>
            <img 
                src="https://images.unsplash.com/photo-1678326935105-08e8b0b8c3ba?q=80&w=800&auto=format&fit=crop" 
                alt="AI Assistant" 
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 opacity-80 transition-all duration-700 rounded-2xl"
            />
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
