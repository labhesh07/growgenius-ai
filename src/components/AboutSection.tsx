
import React, { useEffect } from 'react';
import { observeElements } from '../utils/animations';
import { Database, Brain, CloudRain, Sprout, Wheat, Beaker, Scale } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutSection = () => {
  const isMobile = useIsMobile();
  
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
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block py-1 px-3 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-enter" data-direction="down">
          About Our Technology
        </span>
        <h2 className="mb-4 animate-enter" data-direction="up">
          AI-Powered Agricultural Solutions
        </h2>
        <p className="text-foreground/80 animate-enter" data-direction="up" style={{ '--index': 1 } as React.CSSProperties}>
          GrowGenius combines advanced machine learning algorithms with agricultural science to provide data-driven recommendations for farmers and gardeners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-card p-6 hover:shadow-lg transition-all duration-300 animate-enter" 
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 space-y-6">
          <span className="inline-block py-1 px-3 mb-2 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-enter" data-direction="left">
            Our Technology
          </span>
          
          <h2 className="animate-enter" data-direction="left" style={{ '--index': 1 } as React.CSSProperties}>
            Powered by Data Science & Agricultural Expertise
          </h2>
          
          <p className="text-foreground/80 animate-enter" data-direction="left" style={{ '--index': 2 } as React.CSSProperties}>
            Our system leverages supervised machine learning models trained on extensive agricultural datasets. We analyze soil composition, climate data, and historical crop performance to deliver recommendations with high confidence levels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="glass-card p-5 animate-enter" data-direction="left" style={{ '--index': 3 } as React.CSSProperties}>
              <div className="flex items-center mb-3 gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Beaker className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Data-Driven Approach</h4>
              </div>
              <p className="text-sm text-foreground/70">
                Our models analyze thousands of data points to determine optimal growing conditions for each crop variety.
              </p>
            </div>
            
            <div className="glass-card p-5 animate-enter" data-direction="left" style={{ '--index': 4 } as React.CSSProperties}>
              <div className="flex items-center mb-3 gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Proven Accuracy</h4>
              </div>
              <p className="text-sm text-foreground/70">
                Our crop recommendations achieve over 90% accuracy in field testing compared to expert agriculturist advice.
              </p>
            </div>
            
            <div className="glass-card p-5 animate-enter" data-direction="left" style={{ '--index': 5 } as React.CSSProperties}>
              <div className="flex items-center mb-3 gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Computer Vision</h4>
              </div>
              <p className="text-sm text-foreground/70">
                Our disease detection system uses deep learning convolutional neural networks to identify plant diseases from images.
              </p>
            </div>
            
            <div className="glass-card p-5 animate-enter" data-direction="left" style={{ '--index': 6 } as React.CSSProperties}>
              <div className="flex items-center mb-3 gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-medium">Sustainable Farming</h4>
              </div>
              <p className="text-sm text-foreground/70">
                Get recommendations that balance yield potential with environmental sustainability and resource optimization.
              </p>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative">
          <div className="relative bg-gradient-to-br from-secondary to-primary/5 rounded-2xl overflow-hidden aspect-square animate-enter" data-direction="right">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-xs px-6 bg-background/60 backdrop-blur-sm p-6 rounded-xl">
                <Wheat className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-medium mb-2">ML-Powered Insights</h3>
                <p className="text-foreground/80">Our models are trained on data from thousands of real farms across diverse growing conditions.</p>
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
