
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SoilData, CropRecommendation, getRecommendationAsync } from '../services/recommendationService';
import { toast } from '@/components/ui/use-toast';

interface RecommendationContextType {
  soilData: SoilData;
  setSoilData: React.Dispatch<React.SetStateAction<SoilData>>;
  recommendations: CropRecommendation[] | null;
  isLoading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
  resetRecommendations: () => void;
}

const defaultSoilData: SoilData = {
  nitrogen: 50,
  phosphorus: 50,
  potassium: 50,
  temperature: 25,
  humidity: 60,
  ph: 6.5,
  rainfall: 100,
};

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [soilData, setSoilData] = useState<SoilData>(defaultSoilData);
  const [recommendations, setRecommendations] = useState<CropRecommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getRecommendationAsync(soilData);
      setRecommendations(data);
      
      // Show success toast
      toast({
        title: "Analysis Complete",
        description: `Recommended crop: ${data[0].crop}`,
        duration: 3000,
      });
      
      return data;
    } catch (err) {
      const errorMessage = 'Failed to get recommendations. Please try again.';
      setError(errorMessage);
      console.error('Error fetching recommendations:', err);
      
      // Show error toast
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetRecommendations = () => {
    setRecommendations(null);
  };

  return (
    <RecommendationContext.Provider
      value={{
        soilData,
        setSoilData,
        recommendations,
        isLoading,
        error,
        fetchRecommendations,
        resetRecommendations,
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
}

export function useRecommendation() {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
}
