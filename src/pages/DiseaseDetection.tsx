
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import DiseaseResult from '@/components/DiseaseResult';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDiseaseDetection } from '@/context/DiseaseDetectionContext';
import { motion } from 'framer-motion';

const DiseaseDetection = () => {
  const { detectDisease, isLoading, imagePreview, fetchHistory } = useDiseaseDetection();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Fetch detection history if user is logged in
    fetchHistory();
  }, [fetchHistory]);

  const handleAnalyze = () => {
    detectDisease();
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <motion.div 
          variants={pageVariants}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-8"
        >
          <motion.div variants={itemVariants}>
            <Link to="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-8 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="max-w-3xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center mb-4">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -10, 0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Leaf className="h-10 w-10 text-forest-500 dark:text-forest-400" />
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Plant Disease Detection</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Upload a plant image to identify diseases and get treatment suggestions. 
                Our AI will analyze and provide accurate results.
              </p>
            </motion.div>

            <div className="grid gap-8">
              <motion.div variants={itemVariants}>
                <ImageUploader />
              </motion.div>
              
              {imagePreview && (
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <Button 
                    onClick={handleAnalyze} 
                    className="px-8 bg-forest-600 hover:bg-forest-700 text-white"
                    size="lg"
                    disabled={isLoading}
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
                </motion.div>
              )}
              
              <motion.div variants={itemVariants}>
                <DiseaseResult />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DiseaseDetection;
