
import { supabase, uploadPlantImage } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export interface DiseaseDetectionResult {
  id?: string;
  diseaseName: string;
  confidence: number;
  description: string;
  remedies: string[];
  preventiveMeasures: string[];
  plantType?: string;
  severity?: string;
  scientificName?: string;
  symptoms?: string[];
  imageUrl?: string;
}

type PlantDisease = Database['public']['Tables']['plant_diseases']['Row'];

// Enhanced detection algorithm that uses our Supabase database
export const detectDiseaseAsync = async (imageFile: File): Promise<DiseaseDetectionResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Starting disease detection for image:", imageFile.name);
      
      // In a real app, we would use ML to analyze the image
      // For now, we'll use some image analysis heuristics and our database
      
      // Upload the image to Supabase Storage for record keeping
      let imagePath: string | null = null;
      let imageUrl: string | null = null;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log("User is logged in, uploading image");
          const uploadResult = await uploadPlantImage(imageFile, session.user.id);
          imagePath = uploadResult.filePath;
          imageUrl = uploadResult.publicUrl;
          console.log("Image uploaded successfully:", imageUrl);
        } else {
          console.log("No user session found, continuing without uploading");
        }
      } catch (uploadError) {
        console.error("Image upload failed, continuing with analysis:", uploadError);
      }
      
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
          .select('*');
        
        if (error) {
          console.error("Error fetching diseases from database:", error);
          reject(error);
          return;
        }
        
        if (!diseases || diseases.length === 0) {
          console.error("No disease data available in the database");
          reject(new Error("No disease data available"));
          return;
        }
        
        console.log(`Found ${diseases.length} diseases in the database`);
        let matchedDiseases = diseases;
        
        // If we could extract plant type from the filename, filter by that
        if (extractedPlantType) {
          const plantMatches = diseases.filter(
            (d: PlantDisease) => d.plant_type.toLowerCase() === extractedPlantType || 
                 d.plant_type.toLowerCase().includes(extractedPlantType)
          );
          if (plantMatches.length > 0) {
            console.log(`Filtered to ${plantMatches.length} diseases by plant type: ${extractedPlantType}`);
            matchedDiseases = plantMatches;
          }
        }
        
        // If we could extract disease type from filename, filter by that
        if (extractedDiseaseType) {
          const diseaseMatches = matchedDiseases.filter(
            (d: PlantDisease) => d.disease_name.toLowerCase().includes(extractedDiseaseType)
          );
          if (diseaseMatches.length > 0) {
            console.log(`Filtered to ${diseaseMatches.length} diseases by disease type: ${extractedDiseaseType}`);
            matchedDiseases = diseaseMatches;
          }
        }
        
        // Add more randomness - either select from our matched subset
        let selectedDisease: PlantDisease;
        
        // 85% chance to use our matched disease subset, 15% chance for a random disease
        if (matchedDiseases.length > 0 && Math.random() < 0.85) {
          // Select from matched diseases
          selectedDisease = matchedDiseases[Math.floor(Math.random() * matchedDiseases.length)];
          console.log("Selected disease from matched subset:", selectedDisease.disease_name);
        } else {
          // Select a completely random disease
          selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
          console.log("Selected random disease:", selectedDisease.disease_name);
          
          // Small chance (10%) to detect a healthy plant if filename contains positive terms
          const healthyTerms = ["healthy", "good", "normal", "fine"];
          if (healthyTerms.some(term => fileName.includes(term)) || Math.random() < 0.1) {
            const healthyPlant = diseases.find((d: PlantDisease) => d.disease_name === "Healthy Plant");
            if (healthyPlant) {
              selectedDisease = healthyPlant;
              console.log("Healthy plant detected!");
            }
          }
        }
        
        // Save detection to history if user is logged in
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            console.log("Saving detection to user history");
            // Save the detection to history
            const { error: historyError } = await supabase
              .from('detection_history')
              .insert({
                user_id: session.user.id,
                disease_id: selectedDisease.id,
                image_path: imagePath,
                detected_at: new Date().toISOString()
              });
              
            if (historyError) {
              console.error("Error saving detection history:", historyError);
            } else {
              console.log("Detection saved to history successfully");
            }
          }
        } catch (historyError) {
          console.error("Error in history saving:", historyError);
        }
        
        // Map the database result to our interface format (including new fields)
        const result: DiseaseDetectionResult = {
          id: selectedDisease.id,
          diseaseName: selectedDisease.disease_name,
          confidence: selectedDisease.confidence,
          description: selectedDisease.description,
          remedies: selectedDisease.remedies,
          preventiveMeasures: selectedDisease.preventive_measures,
          plantType: selectedDisease.plant_type,
          severity: selectedDisease.severity_level || undefined,
          scientificName: selectedDisease.scientific_name || undefined,
          symptoms: selectedDisease.symptoms || undefined,
          imageUrl: selectedDisease.image_url || undefined
        };
        
        console.log("Disease detection completed successfully");
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
