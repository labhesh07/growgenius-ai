
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
import { Leaf, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DiseaseResult = () => {
  const { detectionResult, error } = useDiseaseDetection();

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!detectionResult) {
    return null;
  }

  const isHealthy = detectionResult.diseaseName === "Healthy Plant";

  return (
    <Card className="w-full mt-6 border-2 animate-fadeIn">
      <CardHeader className={isHealthy ? "bg-green-50" : "bg-amber-50"}>
        <div className="flex items-center gap-2">
          <Leaf className={`h-5 w-5 ${isHealthy ? "text-green-600" : "text-amber-600"}`} />
          <div>
            <CardTitle>{detectionResult.diseaseName}</CardTitle>
            {detectionResult.plantType && (
              <span className="text-sm text-muted-foreground">Plant type: {detectionResult.plantType}</span>
            )}
          </div>
        </div>
        <CardDescription className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <Badge variant={isHealthy ? "outline" : "secondary"} className="mr-2">
              {detectionResult.confidence}% confidence
            </Badge>
            {!isHealthy && (
              <Badge variant="destructive">Requires treatment</Badge>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2" /> 
              Description
            </h3>
            <p className="text-sm text-muted-foreground">{detectionResult.description}</p>
          </div>

          {detectionResult.remedies.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Recommended Remedies</h3>
              <ul className="list-disc pl-5 space-y-1">
                {detectionResult.remedies.map((remedy, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{remedy}</li>
                ))}
              </ul>
            </div>
          )}

          {detectionResult.preventiveMeasures.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Preventive Measures</h3>
              <ul className="list-disc pl-5 space-y-1">
                {detectionResult.preventiveMeasures.map((measure, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{measure}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseResult;
