
import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-lg shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="text-xl font-medium">GrowGenius</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
