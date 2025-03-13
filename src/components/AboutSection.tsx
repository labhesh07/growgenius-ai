
import React, { useEffect } from 'react';
import { observeElements } from '../utils/animations';
import { Database, Brain, CloudRain, Sprout, Wheat } from 'lucide-react';

const AboutSection = () => {
  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);

  const features = [
    {
      icon: <Sprout className="w-8 h-8" />,
      title: "22 Crop Varieties",
      description: "Recommendations across 22 different crop varieties, from grains to fruits."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Soil Analysis",
      description: "Considers NPK values, pH levels, and other critical soil metrics."
    },
    {
      icon: <CloudRain className="w-8 h-8" />,
      title: "Climate Factors",
      description: "Takes into account temperature, humidity, and rainfall patterns."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning",
      description: "Powered by advanced machine learning for accurate predictions."
    }
  ];

  return (
    <div id="about" className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block py-1 px-3 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-enter" data-direction="down">
          About the Technology
        </span>
        <h2 className="mb-4 animate-enter" data-direction="up">
          Data-Driven Agriculture
        </h2>
        <p className="text-foreground/80 animate-enter" data-direction="up" style={{ '--index': 1 } as React.CSSProperties}>
          GrowGenius combines soil science, climate data, and machine learning to help farmers make more informed decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-card p-6 animate-enter" 
            data-direction="up" 
            style={{ '--index': index + 2 } as React.CSSProperties}
          >
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              {React.cloneElement(feature.icon, { className: "w-6 h-6 text-primary" })}
            </div>
            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
            <p className="text-foreground/70">{feature.description}</p>
          </div>
        ))}
      </div>

      <div id="how-it-works" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-6">
          <span className="inline-block py-1 px-3 mb-2 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-enter" data-direction="left">
            How It Works
          </span>
          
          <h2 className="animate-enter" data-direction="left" style={{ '--index': 1 } as React.CSSProperties}>
            Cultivating Success Through Technology
          </h2>
          
          <p className="text-foreground/80 animate-enter" data-direction="left" style={{ '--index': 2 } as React.CSSProperties}>
            Our ML model has been trained on extensive agricultural data, considering soil compositions, climate patterns, and historical crop performance to deliver recommendations with high confidence.
          </p>
          
          <div className="space-y-4 pt-4">
            {[
              {
                title: "Input Your Soil Data",
                description: "Enter your soil's NPK values, pH level, and other environmental factors."
              },
              {
                title: "Algorithmic Analysis",
                description: "Our machine learning model processes your inputs against our vast database."
              },
              {
                title: "Tailored Recommendations",
                description: "Receive personalized crop and fertilizer recommendations optimized for your specific conditions."
              },
              {
                title: "Increase Your Yield",
                description: "Implement the suggestions to potentially increase crop yields and farm profitability."
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="flex animate-enter" 
                data-direction="left" 
                style={{ '--index': index + 3 } as React.CSSProperties}
              >
                <div className="flex-none mr-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium text-sm">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">{step.title}</h4>
                  <p className="text-foreground/70 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative">
          <div className="relative bg-gradient-to-br from-secondary to-primary/5 rounded-2xl overflow-hidden aspect-square animate-enter" data-direction="right">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-xs px-6">
                <Wheat className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-medium mb-2">22+ Crops</h3>
                <p className="text-foreground/80">Our system can recommend the optimal crops from over 22 different varieties based on your unique conditions.</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
