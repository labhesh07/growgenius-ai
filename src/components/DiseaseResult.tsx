
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useDiseaseDetection } from '@/context/DiseaseDetectionContext';
import { Leaf, AlertTriangle, Info, Sprout, Wind, Droplet, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

const DiseaseResult = () => {
  const { detectionResult, error, isAnalyzing } = useDiseaseDetection();

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Alert variant="destructive" className="my-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (isAnalyzing) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mt-6 flex flex-col items-center justify-center py-12"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
        <p className="mt-4 text-muted-foreground">Analyzing your plant image...</p>
      </motion.div>
    );
  }

  if (!detectionResult) {
    return null;
  }

  const isHealthy = detectionResult.diseaseName === "Healthy Plant";
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.12
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        duration: 0.4,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Beautiful gradient colors based on disease status
  const gradientBg = isHealthy 
    ? "bg-gradient-to-r from-green-50/90 via-emerald-50/80 to-teal-50/70 dark:from-green-950/40 dark:via-emerald-900/30 dark:to-teal-950/20" 
    : "bg-gradient-to-r from-amber-50/90 via-yellow-50/80 to-orange-50/70 dark:from-amber-950/40 dark:via-yellow-900/30 dark:to-orange-950/20";
  
  // Card border color based on disease status
  const cardBorder = isHealthy
    ? "border-emerald-200 dark:border-emerald-800"
    : "border-amber-200 dark:border-amber-800";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={detectionResult.diseaseName}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full mt-6"
      >
        <Card className={`border-2 ${cardBorder} overflow-hidden shadow-lg`}>
          <motion.div className={gradientBg}>
            <CardHeader className="relative">
              <motion.div 
                variants={childVariants}
                className="flex items-center gap-3"
              >
                {isHealthy ? (
                  <Sprout className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Leaf className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                )}
                <div>
                  <CardTitle className="text-xl sm:text-2xl">{detectionResult.diseaseName}</CardTitle>
                  {detectionResult.plantType && (
                    <span className="text-sm text-muted-foreground">Plant type: {detectionResult.plantType}</span>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                variants={childVariants}
                className="flex flex-wrap justify-between items-center mt-3 gap-2"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge 
                    variant={isHealthy ? "outline" : "secondary"} 
                    className={`${isHealthy ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'} font-medium`}
                  >
                    {detectionResult.confidence}% confidence
                  </Badge>
                  {!isHealthy && (
                    <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 font-medium">
                      Requires treatment
                    </Badge>
                  )}
                </div>
              </motion.div>
            </CardHeader>
          </motion.div>
          
          <CardContent className="pt-6 pb-4 px-4 sm:px-6">
            <div className="space-y-6">
              <motion.div variants={childVariants}>
                <h3 className="font-medium mb-3 flex items-center text-lg">
                  <Info className="h-5 w-5 mr-2 text-forest-500 dark:text-forest-400" /> 
                  Description
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{detectionResult.description}</p>
              </motion.div>

              {detectionResult.remedies.length > 0 && (
                <motion.div variants={childVariants}>
                  <h3 className="font-medium mb-3 flex items-center text-lg">
                    <Droplet className="h-5 w-5 mr-2 text-forest-500 dark:text-forest-400" />
                    Recommended Remedies
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 sm:columns-1 md:columns-2 gap-x-6">
                    {detectionResult.remedies.map((remedy, index) => (
                      <motion.li 
                        key={index} 
                        variants={childVariants}
                        className="text-sm md:text-base text-muted-foreground break-inside-avoid-column"
                      >
                        {remedy}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {detectionResult.preventiveMeasures.length > 0 && (
                <motion.div variants={childVariants}>
                  <h3 className="font-medium mb-3 flex items-center text-lg">
                    <Wind className="h-5 w-5 mr-2 text-forest-500 dark:text-forest-400" />
                    Preventive Measures
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 sm:columns-1 md:columns-2 gap-x-6">
                    {detectionResult.preventiveMeasures.map((measure, index) => (
                      <motion.li 
                        key={index}
                        variants={childVariants}
                        className="text-sm md:text-base text-muted-foreground break-inside-avoid-column"
                      >
                        {measure}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default DiseaseResult;
