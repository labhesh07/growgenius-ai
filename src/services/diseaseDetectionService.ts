
import { supabase } from "@/integrations/supabase/client";

export interface DiseaseDetectionResult {
  id?: string;
  diseaseName: string;
  confidence: number;
  description: string;
  remedies: string[];
  preventiveMeasures: string[];
  plantType?: string;
}

// Enhanced detection algorithm that uses our Supabase database
export const detectDiseaseAsync = async (imageFile: File): Promise<DiseaseDetectionResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      // In a real app, we would upload the image and analyze it with ML
      // For now, we'll use some image analysis heuristics and our database
      
      // Simulate image analysis delay
      setTimeout(async () => {
        // Extract image information that might help "guide" our mock analysis
        const fileName = imageFile.name.toLowerCase();
        const fileSize = imageFile.size;
        
        // Extract some basic features from the image name for more relevant matching
        const extractedPlantType = extractPlantTypeFromFileName(fileName);
        const extractedDiseaseType = extractDiseaseFromFileName(fileName);
        
        console.log("Image analysis:", { 
          fileName, 
          fileSize, 
          extractedPlantType, 
          extractedDiseaseType 
        });
        
        // Query our disease database to get a relevant match based on the extracted info
        const { data: diseases, error } = await supabase
          .from('plant_diseases')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching diseases from database:", error);
          reject(error);
          return;
        }
        
        if (!diseases || diseases.length === 0) {
          reject(new Error("No disease data available"));
          return;
        }
        
        let matchedDiseases = diseases;
        
        // If we could extract plant type from the filename, filter by that
        if (extractedPlantType) {
          const plantMatches = diseases.filter(
            d => d.plant_type.toLowerCase() === extractedPlantType || 
                 d.plant_type.toLowerCase().includes(extractedPlantType)
          );
          if (plantMatches.length > 0) {
            matchedDiseases = plantMatches;
          }
        }
        
        // If we could extract disease type from filename, filter by that
        if (extractedDiseaseType) {
          const diseaseMatches = matchedDiseases.filter(
            d => d.disease_name.toLowerCase().includes(extractedDiseaseType)
          );
          if (diseaseMatches.length > 0) {
            matchedDiseases = diseaseMatches;
          }
        }
        
        // Add more randomness - either select from our matched subset
        // or have a small chance to detect a healthy plant
        let selectedDisease;
        
        // 85% chance to use our matched disease subset, 15% chance for a random disease
        if (matchedDiseases.length > 0 && Math.random() < 0.85) {
          // Select from matched diseases
          selectedDisease = matchedDiseases[Math.floor(Math.random() * matchedDiseases.length)];
        } else {
          // Select a completely random disease
          selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
          
          // Small chance (10%) to detect a healthy plant if filename contains positive terms
          const healthyTerms = ["healthy", "good", "normal", "fine"];
          if (healthyTerms.some(term => fileName.includes(term)) || Math.random() < 0.1) {
            selectedDisease = diseases.find(d => d.disease_name === "Healthy Plant") || selectedDisease;
          }
        }
        
        // Save detection to history if user is logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // We'd normally upload the image to storage first and get its path
          // For now, just save the detection without the image
          const { error: historyError } = await supabase
            .from('detection_history')
            .insert({
              user_id: session.user.id,
              disease_id: selectedDisease.id,
              detected_at: new Date().toISOString()
            });
            
          if (historyError) {
            console.error("Error saving detection history:", historyError);
          }
        }
        
        // Map the database result to our interface format
        const result: DiseaseDetectionResult = {
          id: selectedDisease.id,
          diseaseName: selectedDisease.disease_name,
          confidence: selectedDisease.confidence,
          description: selectedDisease.description,
          remedies: selectedDisease.remedies,
          preventiveMeasures: selectedDisease.preventive_measures,
          plantType: selectedDisease.plant_type
        };
        
        resolve(result);
      }, 1500);
    } catch (err) {
      console.error("Error in disease detection:", err);
      reject(err);
    }
  });
};

// Helper function to extract plant type from file name
function extractPlantTypeFromFileName(fileName: string): string | null {
  const plantTypes = [
    "tomato", "potato", "apple", "grape", "corn", "wheat", 
    "rice", "cucumber", "pepper", "strawberry", "citrus", 
    "rose", "elm", "brassica", "cotton"
  ];
  
  for (const plant of plantTypes) {
    if (fileName.includes(plant)) {
      return plant;
    }
  }
  
  return null;
}

// Helper function to extract disease type from file name
function extractDiseaseFromFileName(fileName: string): string | null {
  const diseaseTypes = [
    "blight", "scab", "spot", "mildew", "powdery", "downy", 
    "rust", "wilt", "canker", "smut", "rot", "mosaic", "virus", 
    "gall", "anthracnose", "greening"
  ];
  
  for (const disease of diseaseTypes) {
    if (fileName.includes(disease)) {
      return disease;
    }
  }
  
  return null;
}
