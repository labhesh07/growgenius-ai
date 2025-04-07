
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DiseaseDetectionResult, detectDiseaseAsync } from '../services/diseaseDetectionService';
import { toast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface DiseaseDetectionContextType {
  selectedImage: File | null;
  imagePreview: string | null;
  detectionResult: DiseaseDetectionResult | null;
  isLoading: boolean;
  error: string | null;
  setSelectedImage: (file: File | null) => void;
  detectDisease: () => Promise<void>;
  resetDetection: () => void;
  isAnalyzing: boolean;
  history: any[] | null;
  loadingHistory: boolean;
  fetchHistory: () => Promise<void>;
}

const DiseaseDetectionContext = createContext<DiseaseDetectionContextType | undefined>(undefined);

export function DiseaseDetectionProvider({ children }: { children: ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DiseaseDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<any[] | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const handleSetSelectedImage = (file: File | null) => {
    setSelectedImage(file);
    setDetectionResult(null);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const fetchHistory = async (): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        return;
      }
      
      setLoadingHistory(true);
      
      const { data, error } = await supabase
        .from('detection_history')
        .select(`
          id,
          detected_at,
          plant_diseases (
            id,
            disease_name,
            plant_type,
            confidence
          )
        `)
        .eq('user_id', session.user.id)
        .order('detected_at', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error("Error fetching history:", error);
        return;
      }
      
      setHistory(data);
    } catch (err) {
      console.error("Error in fetch history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const detectDisease = async (): Promise<void> => {
    if (!selectedImage) {
      setError("Please select an image first.");
      toast({
        title: "Error",
        description: "Please select an image first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setIsAnalyzing(true);
      setError(null);
      
      // Reset previous result to enable animations when new result comes in
      setDetectionResult(null);
      
      const result = await detectDiseaseAsync(selectedImage);
      
      // Introduce a slight delay to make animation more noticeable
      setTimeout(() => {
        setDetectionResult(result);
        setIsAnalyzing(false);
        
        // Show toast notification with result
        toast({
          title: result.diseaseName,
          description: `Confidence: ${result.confidence}% - ${result.plantType || 'Plant'} analysis complete`,
          duration: 5000,
        });
      }, 500);
      
    } catch (err) {
      const errorMessage = 'Failed to analyze the image. Please try again.';
      setError(errorMessage);
      setIsAnalyzing(false);
      console.error('Error detecting disease:', err);
      
      // Show error toast
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDetectionResult(null);
  };

  return (
    <DiseaseDetectionContext.Provider
      value={{
        selectedImage,
        imagePreview,
        detectionResult,
        isLoading,
        error,
        setSelectedImage: handleSetSelectedImage,
        detectDisease,
        resetDetection,
        isAnalyzing,
        history,
        loadingHistory,
        fetchHistory,
      }}
    >
      {children}
    </DiseaseDetectionContext.Provider>
  );
}

export function useDiseaseDetection() {
  const context = useContext(DiseaseDetectionContext);
  if (context === undefined) {
    throw new Error('useDiseaseDetection must be used within a DiseaseDetectionProvider');
  }
  return context;
}
