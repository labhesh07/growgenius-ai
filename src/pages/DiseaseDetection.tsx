
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import DiseaseResult from '@/components/DiseaseResult';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDiseaseDetection } from '@/context/DiseaseDetectionContext';

const DiseaseDetection = () => {
  const { detectDisease, isLoading, imagePreview } = useDiseaseDetection();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleAnalyze = () => {
    detectDisease();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-8 animate-enter flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Plant Disease Detection</h1>
              <p className="text-muted-foreground mt-2">
                Upload a plant image to identify diseases and get treatment suggestions
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              <ImageUploader />
              
              {imagePreview && (
                <div className="flex justify-center">
                  <Button 
                    onClick={handleAnalyze} 
                    className="px-8"
                    disabled={isLoading || !imagePreview}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </Button>
                </div>
              )}
              
              <DiseaseResult />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseDetection;
