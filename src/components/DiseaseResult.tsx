
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
import { Leaf, AlertTriangle, Info, Sprout, Wind, Droplet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const DiseaseResult = () => {
  const { detectionResult, error } = useDiseaseDetection();

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
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: i => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mt-6"
    >
      <Card className="border-2 overflow-hidden shadow-lg">
        <motion.div
          initial={{ background: "linear-gradient(to right, rgba(236, 253, 245, 0), rgba(236, 253, 245, 0))" }}
          animate={{ 
            background: isHealthy 
              ? "linear-gradient(to right, rgba(236, 253, 245, 0.7), rgba(209, 250, 229, 0.4))" 
              : "linear-gradient(to right, rgba(254, 252, 232, 0.7), rgba(254, 240, 138, 0.4))" 
          }}
          transition={{ duration: 1 }}
        >
          <CardHeader className="relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              {isHealthy ? (
                <Sprout className="h-6 w-6 text-emerald-600" />
              ) : (
                <Leaf className="h-6 w-6 text-amber-600" />
              )}
              <div>
                <CardTitle className="text-xl sm:text-2xl">{detectionResult.diseaseName}</CardTitle>
                {detectionResult.plantType && (
                  <span className="text-sm text-muted-foreground">Plant type: {detectionResult.plantType}</span>
                )}
              </div>
            </motion.div>
            
            <CardDescription className="flex flex-wrap justify-between items-center mt-3 gap-2">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-2"
              >
                <Badge 
                  variant={isHealthy ? "outline" : "secondary"} 
                  className={`${isHealthy ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'} font-medium`}
                >
                  {detectionResult.confidence}% confidence
                </Badge>
                {!isHealthy && (
                  <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 font-medium">
                    Requires treatment
                  </Badge>
                )}
              </motion.div>
            </CardDescription>
          </CardHeader>
        </motion.div>
        
        <CardContent className="pt-6 pb-4 px-6">
          <div className="space-y-6">
            <motion.div
              custom={0}
              variants={childVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="font-medium mb-3 flex items-center text-lg">
                <Info className="h-5 w-5 mr-2 text-emerald-600" /> 
                Description
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">{detectionResult.description}</p>
            </motion.div>

            {detectionResult.remedies.length > 0 && (
              <motion.div
                custom={1}
                variants={childVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="font-medium mb-3 flex items-center text-lg">
                  <Droplet className="h-5 w-5 mr-2 text-emerald-600" />
                  Recommended Remedies
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {detectionResult.remedies.map((remedy, index) => (
                    <motion.li 
                      key={index} 
                      custom={index + 2}
                      variants={childVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-sm md:text-base text-muted-foreground"
                    >
                      {remedy}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {detectionResult.preventiveMeasures.length > 0 && (
              <motion.div
                custom={detectionResult.remedies.length + 2}
                variants={childVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="font-medium mb-3 flex items-center text-lg">
                  <Wind className="h-5 w-5 mr-2 text-emerald-600" />
                  Preventive Measures
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {detectionResult.preventiveMeasures.map((measure, index) => (
                    <motion.li 
                      key={index}
                      custom={index + detectionResult.remedies.length + 3}
                      variants={childVariants}
                      initial="hidden"
                      animate="visible" 
                      className="text-sm md:text-base text-muted-foreground"
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
  );
};

export default DiseaseResult;
