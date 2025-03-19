
import React, { useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRecommendation } from '../context/RecommendationContext';
import { observeElements } from '../utils/animations';
import { Leaf, Droplets, Thermometer, Cloud, BarChart3, Check } from 'lucide-react';

const ResultsCard = () => {
  const { recommendations, isLoading, soilData } = useRecommendation();

  useEffect(() => {
    const cleanup = observeElements();
    return cleanup;
  }, []);

  if (!recommendations || isLoading) {
    return null;
  }

  const topRecommendation = recommendations[0];
  
  // Format crop name for display (replace underscores with spaces and capitalize)
  const formatCropName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="section-container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block py-1 px-3 mb-4 text-xs font-medium tracking-wider uppercase rounded-full bg-primary/10 text-primary animate-enter" data-direction="down">
          Analysis Complete
        </span>
        <h2 className="mb-4 animate-enter" data-direction="up">
          Your Personalized Crop Recommendations
        </h2>
        <p className="text-foreground/80 animate-enter" data-direction="up" style={{ '--index': 1 } as React.CSSProperties}>
          Based on your soil analysis, we recommend the following crops for optimal growth and yield.
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className="glass-card max-w-4xl mx-auto p-6 sm:p-8 mb-8 animate-enter" data-direction="up" style={{ '--index': 2 } as React.CSSProperties}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-primary/10 mr-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-medium capitalize mb-1">{formatCropName(topRecommendation.crop)}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                    Top Recommendation
                  </span>
                  <span className="text-sm text-foreground/60">
                    {Math.round(topRecommendation.confidence)}% confidence
                  </span>
                </div>
              </div>
            </div>
            
            <p className="mb-6 text-foreground/80">{topRecommendation.description}</p>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Suitability Score</h4>
              <div className="flex items-center space-x-4">
                <Progress value={topRecommendation.suitabilityScore} className="flex-1 h-2" />
                <span className="text-sm font-medium">{Math.round(topRecommendation.suitabilityScore)}%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Recommended Fertilizers</h4>
              <div className="flex flex-wrap gap-2">
                {topRecommendation.fertilizers.map((fertilizer, i) => (
                  <span 
                    key={i}
                    className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <Check className="w-3 h-3 mr-1.5" />
                    {fertilizer}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-5">
            <h4 className="text-sm font-medium mb-4">Ideal Growing Conditions</h4>
            <div className="space-y-4">
              {Object.entries(topRecommendation.idealConditions).map(([key, value]) => {
                const currentValue = soilData[key as keyof typeof soilData];
                const difference = Math.abs(Number(currentValue) - Number(value));
                const percentDiff = value ? (difference / Number(value)) * 100 : 0;
                const isClose = percentDiff < 20; // Within 20% of ideal
                
                let icon;
                switch(key) {
                  case 'nitrogen':
                  case 'phosphorus':
                  case 'potassium':
                    icon = <BarChart3 className="w-4 h-4" />;
                    break;
                  case 'temperature':
                    icon = <Thermometer className="w-4 h-4" />;
                    break;
                  case 'humidity':
                    icon = <Cloud className="w-4 h-4" />;
                    break;
                  case 'ph':
                    icon = <Droplets className="w-4 h-4" />;
                    break;
                  case 'rainfall':
                    icon = <Cloud className="w-4 h-4" />;
                    break;
                  default:
                    icon = <Leaf className="w-4 h-4" />;
                }
                
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-full ${isClose ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        {icon}
                      </div>
                      <span className="text-sm capitalize">
                        {key === 'ph' ? 'pH' : key}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm ${isClose ? 'text-green-600' : 'text-yellow-600'}`}>
                        Ideal: {value}
                      </span>
                      <span className="text-xs text-foreground/60">
                        Your value: {currentValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Alternative Recommendations */}
      <h3 className="text-xl font-medium mb-4 text-center animate-enter" data-direction="up" style={{ '--index': 3 } as React.CSSProperties}>
        Alternative Options
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {recommendations.slice(1).map((rec, index) => (
          <Card 
            key={index} 
            className="glass-card p-5 animate-enter" 
            data-direction="up" 
            style={{ '--index': index + 4 } as React.CSSProperties}
          >
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-secondary mr-3">
                <Leaf className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-medium capitalize">{formatCropName(rec.crop)}</h4>
                <span className="text-xs text-foreground/60">
                  {Math.round(rec.suitabilityScore)}% suitable
                </span>
              </div>
            </div>
            
            <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{rec.description}</p>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Suitability Score</span>
                <span>{Math.round(rec.suitabilityScore)}%</span>
              </div>
              <Progress value={rec.suitabilityScore} className="h-1.5" />
            </div>
            
            <div>
              <h5 className="text-xs font-medium mb-2">Recommended Fertilizers</h5>
              <div className="flex flex-wrap gap-1.5">
                {rec.fertilizers.slice(0, 2).map((fertilizer, i) => (
                  <span key={i} className="bg-secondary/60 px-2 py-0.5 rounded-full text-xs">
                    {fertilizer}
                  </span>
                ))}
                {rec.fertilizers.length > 2 && (
                  <span className="bg-secondary/60 px-2 py-0.5 rounded-full text-xs">
                    +{rec.fertilizers.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsCard;
