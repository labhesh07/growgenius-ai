
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Results = () => {
  const { recommendations, isLoading, soilData } = useRecommendation();
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

  // Format crop name for display (replace underscores with spaces and capitalize)
  const formatCropName = (name: string) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleDownload = () => {
    if (!recommendations || recommendations.length === 0) {
      toast({
        title: "No data available",
        description: "There are no recommendations to download.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      let yPos = 20;
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(39, 119, 54); // Green color
      doc.text('Your Crop Recommendations', 105, yPos, { align: 'center' });
      yPos += 10;
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100);
      const today = new Date().toLocaleDateString();
      doc.text(`Generated on: ${today}`, 105, yPos, { align: 'center' });
      yPos += 15;
      
      // Add soil data table
      doc.setFontSize(14);
      doc.setTextColor(39, 119, 54);
      doc.text('Your Soil Data', 14, yPos);
      yPos += 5;
      
      const soilDataArray = [
        ['Parameter', 'Value', 'Unit'],
        ['Nitrogen', soilData.nitrogen.toString(), 'kg/ha'],
        ['Phosphorus', soilData.phosphorus.toString(), 'kg/ha'],
        ['Potassium', soilData.potassium.toString(), 'kg/ha'],
        ['Temperature', soilData.temperature.toString(), '°C'],
        ['Humidity', soilData.humidity.toString(), '%'],
        ['pH', soilData.ph.toString(), ''],
        ['Rainfall', soilData.rainfall.toString(), 'mm'],
      ];
      
      // Track table end position
      const tableEndY = autoTable(doc, {
        startY: yPos,
        head: [soilDataArray[0]],
        body: soilDataArray.slice(1),
        theme: 'grid',
        headStyles: { 
          fillColor: [39, 119, 54],
          textColor: 255 
        },
      });
      
      // Update position after table
      yPos = tableEndY.finalY + 20;
      
      // Add primary recommendation
      const topRecommendation = recommendations[0];
      
      doc.setFontSize(14);
      doc.setTextColor(39, 119, 54);
      doc.text('Top Recommendation', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(16);
      doc.text(formatCropName(topRecommendation.crop), 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      const descriptionLines = doc.splitTextToSize(topRecommendation.description, 180);
      doc.text(descriptionLines, 14, yPos);
      yPos += descriptionLines.length * 5 + 10;
      
      // Add suitability score
      doc.setFontSize(12);
      doc.setTextColor(39, 119, 54);
      doc.text(`Suitability Score: ${Math.round(topRecommendation.suitabilityScore)}%`, 14, yPos);
      yPos += 10;
      
      // Add fertilizers
      doc.setFontSize(12);
      doc.text('Recommended Fertilizers:', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      let fertilizerText = topRecommendation.fertilizers.join(', ');
      const fertilizerLines = doc.splitTextToSize(fertilizerText, 180);
      doc.text(fertilizerLines, 14, yPos);
      
      // Add table for alternative recommendations
      doc.addPage();
      yPos = 20;
      
      doc.setFontSize(14);
      doc.setTextColor(39, 119, 54);
      doc.text('Alternative Recommendations', 14, yPos);
      yPos += 10;
      
      const alternativeData = recommendations.slice(1).map(rec => [
        formatCropName(rec.crop),
        `${Math.round(rec.suitabilityScore)}%`,
        rec.fertilizers.slice(0, 2).join(', ')
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Crop', 'Suitability', 'Recommended Fertilizers']],
        body: alternativeData,
        theme: 'grid',
        headStyles: { 
          fillColor: [39, 119, 54],
          textColor: 255 
        },
      });
      
      // Add disclaimer
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text('This report is based on the soil data provided and should be used as a guideline.', 105, 280, { align: 'center' });
      doc.text('Consult with an agricultural expert for specific advice for your farm.', 105, 285, { align: 'center' });
      
      // Save the PDF
      doc.save('crop-recommendations.pdf');
      
      toast({
        title: "Report downloaded",
        description: "Your crop recommendations have been saved as a PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    }
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
