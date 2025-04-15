
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RecommendationForm from '@/components/RecommendationForm';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Handle hash navigation for "Get Started" button
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#recommendation-form') {
        const element = document.getElementById('recommendation-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Check for hash on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div id="recommendation-form">
          <RecommendationForm />
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
