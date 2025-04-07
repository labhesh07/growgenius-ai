
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl">
              Smart Farming Solutions with <span className="text-primary bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">GrowGenius</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
              Get AI-powered crop recommendations based on your soil composition and climate conditions to maximize your farm's yield and sustainability.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link to="#recommendation-form">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/disease-detection">
                <Button size="lg" variant="outline" className="gap-2">
                  Diagnose Plant Disease
                  <Leaf className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-full blur-3xl opacity-70 -z-10"></div>
            <img 
              src="/placeholder.svg" 
              alt="GrowGenius Farming" 
              className="mx-auto max-w-full rounded-2xl shadow-xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
