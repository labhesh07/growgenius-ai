
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import DiseaseResult from '@/components/DiseaseResult';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Sprout, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDiseaseDetection } from '@/context/DiseaseDetectionContext';
import { motion } from 'framer-motion';

const DiseaseDetection = () => {
  // Use the context hook
  const { detectDisease, isLoading, imagePreview, fetchHistory } = useDiseaseDetection();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Fetch detection history if user is logged in
    fetchHistory();
  }, [fetchHistory]);

  const handleAnalyze = async () => {
    try {
      console.log("Analyze button clicked");
      await detectDisease();
    } catch (error) {
      console.error("Error during disease detection:", error);
    }
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

  // Render the component
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/50 to-white">
      <Navbar />
      <main className="flex-grow">
        <motion.div 
          variants={pageVariants}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 py-12 max-w-5xl"
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
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center mb-6">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -10, 0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full"
                >
                  <Sprout className="h-12 w-12 text-green-600 dark:text-green-400" />
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-4">Plant Disease Detection</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Upload a plant image to identify diseases and get treatment suggestions. 
                Our AI analyzes leaf patterns and discoloration to provide accurate diagnosis.
              </p>
            </motion.div>

            <div className="grid gap-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-100">
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
                    className="px-8 bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Image
                        <Leaf className="ml-2 h-4 w-4" />
                      </>
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
