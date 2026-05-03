import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import MethodologySection from '../components/MethodologySection';
import StatsSection from '../components/StatsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <div className="w-full flex flex-col pt-20">
      <HeroSection />
      <FeatureGrid />
      <MethodologySection />
      <StatsSection />
      <ContactSection />
    </div>
  );
};

export default Home;