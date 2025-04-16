
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResultsCard from '@/components/ResultsCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecommendation } from '@/context/RecommendationContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Results = () => {
  const { recommendations, isLoading } = useRecommendation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Redirect to home if no recommendations are available
  useEffect(() => {
    if (!recommendations && !isLoading) {
      navigate('/');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [recommendations, isLoading, navigate]);

  const handleDownload = () => {
    // This is just a placeholder - in a real app you'd generate a PDF
    toast({
      title: "Download started",
      description: "Your recommendations are being prepared for download.",
    });
  };

  const handleShare = () => {
    // This is just a placeholder - in a real app you'd implement sharing
    toast({
      title: "Share feature",
      description: "Sharing functionality would be implemented here.",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-green-50 dark:from-forest-950 dark:via-background dark:to-forest-950">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Link to="/">
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "sm"}
                  className="mb-4 sm:mb-0 flex items-center gap-2 hover:bg-primary/10 border-green-200 dark:border-green-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Form</span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "sm"}
                  className="flex items-center gap-2 border-green-200 dark:border-green-800"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                
                <Button 
                  variant="default" 
                  size={isMobile ? "default" : "sm"}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download Report</span>
                </Button>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left mb-2 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
                Your Crop Recommendations
              </h1>
              <p className="text-muted-foreground text-center sm:text-left mb-8">
                Based on your soil and climate data, here are the best crops for your farm
              </p>
            </motion.div>
          </motion.div>
          
          <ResultsCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
