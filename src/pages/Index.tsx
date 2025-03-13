
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecommendationForm from '@/components/RecommendationForm';
import ResultsCard from '@/components/ResultsCard';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { RecommendationProvider } from '@/context/RecommendationContext';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RecommendationProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <RecommendationForm />
          <ResultsCard />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </RecommendationProvider>
  );
};

export default Index;
