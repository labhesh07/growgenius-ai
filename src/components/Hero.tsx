
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { observeElements } from '../utils/animations';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById('recommendation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="section-container relative z-10 flex flex-col items-center justify-center text-center">
        <div className="animate-enter" data-direction="down">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary">
            Machine Learning Enabled
          </span>
        </div>
        
        <h1 className="animate-enter mb-6 leading-tight" data-direction="up">
          Grow <span className="text-primary">Smarter</span>,<br />
          Harvest <span className="text-primary">Better</span>
        </h1>
        
        <p className="animate-enter max-w-2xl mb-10 text-lg text-foreground/80" data-direction="up" style={{ '--index': 1 } as React.CSSProperties}>
          GrowGenius uses advanced machine learning to recommend the perfect crop for your soil conditions, 
          helping you maximize yields while minimizing inputs.
        </p>
        
        <div className="animate-enter flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4" data-direction="up" style={{ '--index': 2 } as React.CSSProperties}>
          <button 
            onClick={scrollToForm}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-sm"
          >
            Get Recommendations
          </button>
          <a 
            href="#how-it-works" 
            className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-foreground/50" />
      </div>
    </div>
  );
};

export default Hero;
