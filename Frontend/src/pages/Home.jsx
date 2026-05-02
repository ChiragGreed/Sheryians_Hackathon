import React from 'react';
import HeroSection from '../features/home/components/HeroSection';
import FeatureGrid from '../features/home/components/FeatureGrid';
import MethodologySection from '../features/home/components/MethodologySection';
import StatsSection from '../features/home/components/StatsSection';
import ContactSection from '../features/home/components/ContactSection';

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