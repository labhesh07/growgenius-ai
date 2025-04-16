
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white dark:from-forest-950 dark:to-background py-24 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center justify-center mb-2 md:justify-start">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full"
              >
                <Sprout className="h-7 w-7 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-xl mx-auto md:mx-0">
              Smart Farming with <span className="text-primary bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">GrowGenius</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
              Get AI-powered crop recommendations based on your soil composition and climate conditions to maximize your yield and sustainability.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a href="#recommendation-form">
                <Button size="lg" className="gap-2 w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link to="/disease-detection">
                <Button size="lg" variant="outline" className="gap-2 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-300">
                  Diagnose Plant Disease
                  <Leaf className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className={`relative ${isMobile ? 'mt-8' : ''} hidden md:block`}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-emerald-300/30 dark:from-green-700/20 dark:to-emerald-700/20 rounded-full blur-3xl opacity-70 -z-10"
            />
            
            <div className="relative">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img 
                  src="/placeholder.svg" 
                  alt="GrowGenius Farming" 
                  className="mx-auto max-w-full rounded-2xl shadow-xl border-4 border-white/50 dark:border-forest-800/50"
                  width={500}
                  height={500}
                />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-8 w-16 h-16 bg-green-400/30 dark:bg-green-600/30 rounded-full blur-xl" />
              <div className="absolute bottom-1/4 -right-8 w-20 h-20 bg-emerald-400/30 dark:bg-emerald-600/30 rounded-full blur-xl" />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Mobile image - only shows on small screens */}
      <div className="md:hidden mt-8 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <img 
            src="/placeholder.svg" 
            alt="GrowGenius Farming" 
            className="mx-auto max-w-full rounded-xl shadow-lg border-2 border-white/50 dark:border-forest-800/50"
            width={300}
            height={300}
          />
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-background dark:to-transparent"></div>
    </section>
  );
};

export default Hero;
