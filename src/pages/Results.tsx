
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ResultsCard from '@/components/ResultsCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecommendation } from '@/context/RecommendationContext';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-8 animate-enter flex items-center space-x-2"
              data-direction="left"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Form</span>
            </Button>
          </Link>
          
          <ResultsCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
