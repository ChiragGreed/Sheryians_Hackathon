import React from 'react';
import AcceptAgentInvitationForm from '../components/AcceptAgentInvitationForm';

const AcceptAgentInvitation = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row w-full h-full">
      <AcceptAgentInvitationForm />
      <section className="hidden md:block md:w-1/2 relative bg-surface-container-lowest">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10 w-32"></div>
        <img
          alt="AI-powered agent dashboard"
          className="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-60 hover:grayscale-0 transition-all duration-1000 ease-in-out"
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="absolute inset-0 bg-primary-fixed/5 mix-blend-overlay"></div>
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <div className="p-8 bg-background/40 backdrop-blur-xl border border-white/10 rounded-xl inline-block max-w-sm">
            <h3 className="font-headline-md text-xl text-primary mb-2">Join Our Agent Network</h3>
            <p className="text-on-surface-variant text-sm font-body-md leading-relaxed">
              Become part of our intelligent support team and help deliver exceptional customer experiences with AI-powered assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcceptAgentInvitation;
