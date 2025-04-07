
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DiseaseDetectionResult, detectDiseaseAsync } from '../services/diseaseDetectionService';
import { toast } from '@/hooks/use-toast';

interface DiseaseDetectionContextType {
  selectedImage: File | null;
  imagePreview: string | null;
  detectionResult: DiseaseDetectionResult | null;
  isLoading: boolean;
  error: string | null;
  setSelectedImage: (file: File | null) => void;
  detectDisease: () => Promise<void>;
  resetDetection: () => void;
}

const DiseaseDetectionContext = createContext<DiseaseDetectionContextType | undefined>(undefined);

export function DiseaseDetectionProvider({ children }: { children: ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DiseaseDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(null);
      const result = await detectDiseaseAsync(selectedImage);
      setDetectionResult(result);
      
      // Show toast notification with result
      toast({
        title: result.diseaseName,
        description: `Confidence: ${result.confidence}% - ${result.description.substring(0, 60)}...`,
        duration: 5000,
      });
      
    } catch (err) {
      const errorMessage = 'Failed to analyze the image. Please try again.';
      setError(errorMessage);
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
