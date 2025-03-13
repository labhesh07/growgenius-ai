
import React, { useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { observeElements } from '../utils/animations';
import { useRecommendation } from '../context/RecommendationContext';
import { BarChart3, Thermometer, Droplets, Cloud, Sprout } from 'lucide-react';

const sliderConfig = [
  { 
    name: 'nitrogen', 
    label: 'Nitrogen (N)', 
    min: 0, 
    max: 140, 
    step: 1, 
    unit: 'kg/ha',
    icon: <BarChart3 className="w-5 h-5 text-sage-500" />
  },
  { 
    name: 'phosphorus', 
    label: 'Phosphorus (P)', 
    min: 0, 
    max: 140, 
    step: 1, 
    unit: 'kg/ha',
    icon: <BarChart3 className="w-5 h-5 text-sage-500" />
  },
  { 
    name: 'potassium', 
    label: 'Potassium (K)', 
    min: 0, 
    max: 140, 
    step: 1, 
    unit: 'kg/ha',
    icon: <BarChart3 className="w-5 h-5 text-sage-500" />
  },
  { 
    name: 'temperature', 
    label: 'Temperature', 
    min: 0, 
    max: 40, 
    step: 0.1, 
    unit: '°C',
    icon: <Thermometer className="w-5 h-5 text-sage-500" />
  },
  { 
    name: 'humidity', 
    label: 'Humidity', 
    min: 0, 
    max: 100, 
    step: 1, 
    unit: '%',
    icon: <Cloud className="w-5 h-5 text-sage-500" />
  },
  { 
    name: 'ph', 
    label: 'pH Level', 
    min: 0, 
    max: 14, 
    step: 0.1, 
    unit: 'pH',
    icon: <Droplets className="w-5 h-5 text-sage-500" />
  },
  { 
    name: 'rainfall', 
    label: 'Rainfall', 
    min: 0, 
    max: 300, 
    step: 1, 
    unit: 'mm',
    icon: <Cloud className="w-5 h-5 text-sage-500" />
  },
];

const RecommendationForm = () => {
  const { soilData, setSoilData, recommendations, isLoading, fetchRecommendations } = useRecommendation();

  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);

  const handleSliderChange = (name: string, value: number[]) => {
    setSoilData(prev => ({
      ...prev,
      [name]: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecommendations();
  };

  // If we already have recommendations, don't show the form
  if (recommendations) {
    return null;
  }

  return (
    <div id="recommendation-form" className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block py-1 px-3 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-enter" data-direction="down">
          Start Here
        </span>
        <h2 className="mb-4 animate-enter" data-direction="up">
          Enter Your Soil Conditions
        </h2>
        <p className="text-foreground/80 animate-enter" data-direction="up" style={{ '--index': 1 } as React.CSSProperties}>
          Provide information about your soil and climate conditions to get personalized crop recommendations.
        </p>
      </div>

      <Card className="glass-card max-w-3xl mx-auto p-6 sm:p-8 animate-enter" data-direction="up" style={{ '--index': 2 } as React.CSSProperties}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sliderConfig.map((config, index) => (
              <div key={config.name} className="space-y-3 animate-enter" data-direction="up" style={{ '--index': index + 3 } as React.CSSProperties}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {config.icon}
                    <label htmlFor={config.name} className="text-sm font-medium">
                      {config.label}
                    </label>
                  </div>
                  <span className="text-sm font-medium bg-secondary px-2 py-1 rounded">
                    {soilData[config.name as keyof typeof soilData]} {config.unit}
                  </span>
                </div>
                <Slider
                  id={config.name}
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={[soilData[config.name as keyof typeof soilData]]}
                  onValueChange={(value) => handleSliderChange(config.name, value)}
                  className="py-2"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center animate-enter" data-direction="up" style={{ '--index': 10 } as React.CSSProperties}>
            <Button 
              type="submit" 
              size="lg" 
              disabled={isLoading}
              className="w-full sm:w-auto px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sprout className="w-5 h-5" />
                  <span>Get Recommendations</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RecommendationForm;
