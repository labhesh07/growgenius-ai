
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
import { Leaf, AlertTriangle } from 'lucide-react';

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

  return (
    <Card className="w-full mt-6 border-2 animate-fadeIn">
      <CardHeader className={detectionResult.diseaseName === "Healthy Plant" ? "bg-green-50" : "bg-amber-50"}>
        <div className="flex items-center gap-2">
          <Leaf className={`h-5 w-5 ${detectionResult.diseaseName === "Healthy Plant" ? "text-green-600" : "text-amber-600"}`} />
          <CardTitle>{detectionResult.diseaseName}</CardTitle>
        </div>
        <CardDescription className="flex justify-between items-center">
          <span>Confidence: {detectionResult.confidence}%</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
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
