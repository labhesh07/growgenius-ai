
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
import { toast } from '@/components/ui/use-toast';

const DiseaseDetection = () => {
  // Use the context hook
  const { detectDisease, isLoading, imagePreview, fetchHistory } = useDiseaseDetection();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Fetch detection history if user is logged in
    fetchHistory().catch(error => {
      console.log("Non-critical error fetching history:", error);
      // This is non-critical so we don't show an error toast
    });
  }, [fetchHistory]);

  const handleAnalyze = async () => {
    try {
      console.log("Analyze button clicked");
      await detectDisease();
    } catch (error) {
      console.error("Error during disease detection:", error);
      toast({
        title: "Detection Failed",
        description: "We couldn't analyze your image. Please try again with a clearer image.",
        variant: "destructive",
        duration: 3000,
      });
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/70 to-white dark:from-forest-950 dark:via-background dark:to-forest-950">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
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
                className="mb-8 flex items-center gap-2 hover:bg-primary/10"
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
                  className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full shadow-md"
                >
                  <Sprout className="h-12 w-12 text-green-600 dark:text-green-400" />
                </motion.div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Plant Disease Detection</h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Upload a plant image to identify diseases and get treatment suggestions. 
                Our AI analyzes leaf patterns and discoloration to provide accurate diagnosis.
              </p>
            </motion.div>

            <div className="glass-card p-8 rounded-xl shadow-md border border-green-100 dark:border-green-900/30">
              <motion.div variants={itemVariants}>
                <ImageUploader />
              </motion.div>
              
              {imagePreview && (
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center mt-8"
                >
                  <Button 
                    onClick={handleAnalyze} 
                    className="px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Image
                        <Leaf className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
              
              <motion.div variants={itemVariants} className="mt-8">
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
