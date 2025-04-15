
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResultsCard from '@/components/ResultsCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecommendation } from '@/context/RecommendationContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Results = () => {
  const { recommendations, isLoading } = useRecommendation();
  const navigate = useNavigate();

  // Redirect to home if no recommendations are available
  useEffect(() => {
    if (!recommendations && !isLoading) {
      navigate('/');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [recommendations, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-green-50 dark:from-forest-950 dark:via-background dark:to-forest-950">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button 
                variant="outline" 
                size="sm" 
                className="mb-8 flex items-center gap-2 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Form</span>
              </Button>
            </Link>
          </motion.div>
          
          <ResultsCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
