
import React from 'react';
import { Sprout, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary/30 pt-16 pb-8 mt-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="text-xl font-medium">GrowGenius</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              Empowering farmers with data-driven insights to grow the right crops for the right conditions, maximizing yields and sustainability.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@example.com" 
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">About</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>Email: contact@example.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Farm Lane, Cropville</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} GrowGenius. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
