
// This is a simplified mock service for plant disease detection
// In a real-world application, this would connect to an AI model API

export interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  description: string;
  remedies: string[];
  preventiveMeasures: string[];
}

// Mock database of plant diseases
const plantDiseaseDatabase: Record<string, DiseaseDetectionResult> = {
  "leaf_blight": {
    diseaseName: "Leaf Blight",
    confidence: 92,
    description: "A fungal disease that causes brown, dead patches on leaves, which may be surrounded by yellow halos.",
    remedies: [
      "Remove and destroy infected leaves",
      "Apply fungicide specifically labeled for leaf blight",
      "Ensure proper air circulation around plants"
    ],
    preventiveMeasures: [
      "Avoid overhead watering",
      "Maintain proper spacing between plants",
      "Use disease-resistant varieties when available"
    ]
  },
  "powdery_mildew": {
    diseaseName: "Powdery Mildew",
    confidence: 88,
    description: "A fungal disease that appears as white powdery spots on leaves, stems, and sometimes fruit.",
    remedies: [
      "Apply neem oil or potassium bicarbonate spray",
      "Remove heavily infected parts",
      "Increase air circulation"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid overcrowding plants",
      "Water at the base of plants, not on foliage"
    ]
  },
  "bacterial_spot": {
    diseaseName: "Bacterial Spot",
    confidence: 85,
    description: "A bacterial infection causing small, dark, water-soaked spots on leaves, stems, and fruit.",
    remedies: [
      "Apply copper-based bactericides",
      "Remove infected plant parts",
      "Avoid working with wet plants"
    ],
    preventiveMeasures: [
      "Use certified disease-free seeds",
      "Practice crop rotation",
      "Sanitize garden tools regularly"
    ]
  },
  "rust": {
    diseaseName: "Rust",
    confidence: 90,
    description: "A fungal disease causing orange, yellow, or reddish-brown pustules on the underside of leaves.",
    remedies: [
      "Apply fungicides containing sulfur",
      "Remove and destroy infected plant material",
      "Improve air circulation"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid wetting foliage when watering",
      "Space plants properly"
    ]
  },
  "early_blight": {
    diseaseName: "Early Blight",
    confidence: 87,
    description: "A fungal disease causing dark, concentric rings on older leaves first, causing them to yellow and die.",
    remedies: [
      "Remove infected leaves",
      "Apply appropriate fungicide",
      "Ensure proper plant nutrition"
    ],
    preventiveMeasures: [
      "Mulch around plants",
      "Rotate crops",
      "Stake plants to improve air circulation"
    ]
  },
  "late_blight": {
    diseaseName: "Late Blight",
    confidence: 93,
    description: "A serious fungal disease causing dark, water-soaked spots on leaves and stems, with white fungal growth in humid conditions.",
    remedies: [
      "Apply copper-based fungicides",
      "Remove and destroy infected plants immediately",
      "Harvest remaining crops if infection is widespread"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid overhead irrigation",
      "Destroy volunteer plants"
    ]
  },
  "mosaic_virus": {
    diseaseName: "Mosaic Virus",
    confidence: 81,
    description: "A viral disease causing mottled patterns of yellow, light green, and dark green on leaves.",
    remedies: [
      "Remove and destroy infected plants",
      "Control insect vectors like aphids",
      "No chemical cure available"
    ],
    preventiveMeasures: [
      "Use virus-free seeds and transplants",
      "Control weeds that may harbor the virus",
      "Wash hands and tools after handling infected plants"
    ]
  },
  "healthy": {
    diseaseName: "Healthy Plant",
    confidence: 95,
    description: "This plant appears healthy with no visible signs of disease.",
    remedies: [
      "Continue regular maintenance",
      "Monitor for any changes"
    ],
    preventiveMeasures: [
      "Maintain proper watering schedule",
      "Ensure adequate nutrition",
      "Regular monitoring for early disease detection"
    ]
  }
};

// Simulated AI analysis function
export const detectDiseaseAsync = async (imageFile: File): Promise<DiseaseDetectionResult> => {
  return new Promise((resolve) => {
    // In a real implementation, this would send the image to an AI model API
    // For this mock version, we'll randomly select a disease after a delay
    
    setTimeout(() => {
      const diseases = Object.keys(plantDiseaseDatabase);
      // Randomly select a disease from our database
      const selectedDisease = diseases[Math.floor(Math.random() * diseases.length)];
      
      resolve(plantDiseaseDatabase[selectedDisease]);
    }, 2000); // Simulate network delay
  });
};
