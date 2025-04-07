
// This is a simplified mock service for plant disease detection
// In a real-world application, this would connect to an AI model API

export interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  description: string;
  remedies: string[];
  preventiveMeasures: string[];
  plantType?: string; // Added plant type for more context
}

// Enhanced mock database of plant diseases with more specific conditions
const plantDiseaseDatabase: Record<string, DiseaseDetectionResult> = {
  "tomato_late_blight": {
    diseaseName: "Tomato Late Blight",
    confidence: 95,
    plantType: "Tomato",
    description: "A devastating fungal disease (Phytophthora infestans) causing dark, water-soaked spots on leaves, stems, and fruits. In humid conditions, white fungal growth appears on leaf undersides.",
    remedies: [
      "Apply copper-based fungicides immediately upon detection",
      "Remove and destroy all infected plant material",
      "Increase plant spacing to improve air circulation",
      "Water at soil level, avoiding leaf wetting"
    ],
    preventiveMeasures: [
      "Plant certified disease-free seeds and resistant varieties",
      "Rotate crops (avoid planting tomatoes in the same location for 3-4 years)",
      "Keep foliage dry with proper spacing and morning watering",
      "Apply preventative fungicides during humid weather"
    ]
  },
  "tomato_early_blight": {
    diseaseName: "Tomato Early Blight",
    confidence: 93,
    plantType: "Tomato",
    description: "Caused by Alternaria solani fungus, characterized by concentric dark rings forming target-like patterns on lower, older leaves first. Spreads upward as the season progresses.",
    remedies: [
      "Remove infected leaves immediately",
      "Apply recommended fungicides (chlorothalonil or copper-based)",
      "Ensure proper plant nutrition with balanced fertilizers",
      "Mulch around plants to prevent soil-splash"
    ],
    preventiveMeasures: [
      "Rotate crops annually",
      "Space plants adequately for good air circulation",
      "Stake or cage plants to keep foliage off the ground",
      "Apply mulch to prevent spore splash from soil"
    ]
  },
  "tomato_septoria_leaf_spot": {
    diseaseName: "Tomato Septoria Leaf Spot",
    confidence: 91,
    plantType: "Tomato",
    description: "Caused by Septoria lycopersici fungus, creating small circular spots with dark borders and light centers, primarily on lower leaves first. Severe cases lead to complete defoliation.",
    remedies: [
      "Remove and destroy infected leaves",
      "Apply fungicides containing chlorothalonil, copper, or mancozeb",
      "Improve air circulation by pruning lower branches",
      "Water at the base to keep foliage dry"
    ],
    preventiveMeasures: [
      "Practice crop rotation (3-year cycle)",
      "Control weeds which can harbor the disease",
      "Apply mulch to prevent splash from soil to leaves",
      "Clean tools and stakes between seasons"
    ]
  },
  "potato_late_blight": {
    diseaseName: "Potato Late Blight",
    confidence: 94,
    plantType: "Potato",
    description: "Caused by Phytophthora infestans, resulting in dark, water-soaked patches on leaves that quickly turn necrotic. Can spread to tubers causing rot with reddish-brown granular tissue.",
    remedies: [
      "Apply copper-based or specialty fungicides",
      "Remove infected plants and destroy (do not compost)",
      "Harvest potatoes early if disease is detected in your area",
      "Store harvested tubers in cool, dry conditions"
    ],
    preventiveMeasures: [
      "Plant certified disease-free seed potatoes",
      "Choose resistant varieties when available",
      "Hill potatoes well to protect tubers",
      "Destroy volunteer potatoes that may harbor disease"
    ]
  },
  "cucumber_downy_mildew": {
    diseaseName: "Cucumber Downy Mildew",
    confidence: 93,
    plantType: "Cucumber",
    description: "Caused by Pseudoperonospora cubensis, creating angular yellow spots on upper leaf surfaces with grayish-purple fuzzy growth on undersides in humid conditions.",
    remedies: [
      "Apply fungicides containing chlorothalonil, mancozeb, or copper",
      "Remove heavily infected leaves",
      "Improve air circulation by proper spacing",
      "Water at the base of plants in early morning"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Orient rows with prevailing winds",
      "Avoid overhead irrigation",
      "Apply preventative fungicides during periods of high humidity"
    ]
  },
  "rice_blast": {
    diseaseName: "Rice Blast",
    confidence: 96,
    plantType: "Rice",
    description: "Caused by Magnaporthe oryzae fungus, producing diamond-shaped lesions on leaves and stems. Can infect all parts of the rice plant at any growth stage.",
    remedies: [
      "Apply recommended fungicides (tricyclazole or azoxystrobin)",
      "Maintain balanced fertilization (avoid excess nitrogen)",
      "Drain fields periodically to reduce humidity",
      "Remove and destroy severely infected plants"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Use certified disease-free seeds",
      "Practice balanced fertilization",
      "Adjust planting dates to avoid peak disease periods"
    ]
  },
  "wheat_leaf_rust": {
    diseaseName: "Wheat Leaf Rust",
    confidence: 92,
    plantType: "Wheat",
    description: "Caused by Puccinia triticina, showing small, round to oval orange-brown pustules primarily on upper leaf surfaces. Severe infections cause leaf yellowing and premature leaf death.",
    remedies: [
      "Apply triazole or strobilurin fungicides",
      "Monitor fields regularly for early detection",
      "Ensure balanced nutrition",
      "Harvest early if infection is severe"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Rotate crops - avoid wheat following wheat",
      "Eliminate volunteer wheat plants",
      "Plant after the 'fly-free' date in your region"
    ]
  },
  "apple_scab": {
    diseaseName: "Apple Scab",
    confidence: 90,
    plantType: "Apple",
    description: "Caused by Venturia inaequalis fungus, creating olive-green to black velvety spots on leaves and fruits that later become corky. Severe infections cause premature leaf drop and unmarketable fruit.",
    remedies: [
      "Apply protective fungicides like captan or myclobutanil",
      "Remove fallen leaves in autumn to reduce overwintering spores",
      "Prune trees to improve air circulation and light penetration",
      "Thin fruit clusters to reduce humidity"
    ],
    preventiveMeasures: [
      "Plant resistant varieties when possible",
      "Apply fungicides from bud break until early summer",
      "Improve orchard sanitation by removing leaf litter",
      "Ensure proper tree spacing for ventilation"
    ]
  },
  "grape_downy_mildew": {
    diseaseName: "Grape Downy Mildew",
    confidence: 89,
    plantType: "Grape",
    description: "Caused by Plasmopara viticola, showing yellow, oily spots on upper leaf surfaces with white, downy fungal growth on the undersides. Can rapidly defoliate vines and damage fruit.",
    remedies: [
      "Apply copper or specialized fungicides",
      "Remove affected leaves and fruit",
      "Improve air circulation through canopy management",
      "Use fans in humid areas to reduce leaf wetness"
    ],
    preventiveMeasures: [
      "Train vines for maximum airflow",
      "Orient rows to maximize sun exposure and airflow",
      "Apply preventative fungicides before rain events",
      "Remove basal leaves around fruit zones"
    ]
  },
  "cotton_boll_rot": {
    diseaseName: "Cotton Boll Rot",
    confidence: 88,
    plantType: "Cotton",
    description: "Various fungi causing discoloration and decay of cotton bolls. Often enters through insect damage or during prolonged wet periods.",
    remedies: [
      "Apply recommended fungicides",
      "Control insect pests to prevent entry points",
      "Remove and destroy infected bolls",
      "Improve field drainage"
    ],
    preventiveMeasures: [
      "Manage plant density to improve airflow",
      "Control insects effectively",
      "Time irrigation to allow foliage to dry before evening",
      "Avoid excessive nitrogen fertilization"
    ]
  },
  "citrus_greening": {
    diseaseName: "Citrus Greening (HLB)",
    confidence: 97,
    plantType: "Citrus",
    description: "Caused by Candidatus Liberibacter bacteria spread by psyllids. Symptoms include blotchy mottling of leaves, lopsided bitter fruit, yellow shoots, and gradual tree decline.",
    remedies: [
      "There is no cure once infected - management focuses on slowing disease progression",
      "Control Asian citrus psyllid with approved insecticides",
      "Enhance tree health with optimal nutrition and irrigation",
      "Prune symptomatic branches if early in infection"
    ],
    preventiveMeasures: [
      "Plant certified disease-free trees",
      "Monitor and control psyllid populations",
      "Create psyllid barriers with trap crops or physical barriers",
      "Consider screenhouse production in high-risk areas"
    ]
  },
  "powdery_mildew": {
    diseaseName: "Powdery Mildew",
    confidence: 94,
    description: "A common fungal disease that appears as white powdery spots on leaves, stems, and sometimes fruit. Can affect many plant species from vegetables to ornamentals.",
    remedies: [
      "Apply neem oil, potassium bicarbonate, or sulfur-based fungicides",
      "Remove heavily infected parts",
      "Increase air circulation by proper spacing and pruning",
      "Use milk spray (1:10 milk to water) as an organic treatment"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Avoid overcrowding plants",
      "Water at the base of plants, not on foliage",
      "Rotate susceptible crops"
    ]
  },
  "bacterial_spot": {
    diseaseName: "Bacterial Spot",
    confidence: 91,
    description: "A bacterial infection causing small, dark, water-soaked spots on leaves, stems, and fruit. Common in peppers and tomatoes.",
    remedies: [
      "Apply copper-based bactericides early in disease development",
      "Remove infected plant parts",
      "Avoid working with wet plants to prevent spread",
      "Improve air circulation around plants"
    ],
    preventiveMeasures: [
      "Use certified disease-free seeds",
      "Practice crop rotation (3-4 years)",
      "Sanitize garden tools regularly",
      "Use drip irrigation instead of overhead watering"
    ]
  },
  "rust": {
    diseaseName: "Rust",
    confidence: 93,
    description: "A fungal disease causing orange, yellow, or reddish-brown pustules on the underside of leaves. Can affect many plants including beans, roses, and grains.",
    remedies: [
      "Apply fungicides containing sulfur or tebuconazole",
      "Remove and destroy infected plant material",
      "Improve air circulation by proper spacing and pruning",
      "Avoid wetting foliage during irrigation"
    ],
    preventiveMeasures: [
      "Plant resistant varieties",
      "Space plants properly",
      "Apply preventative fungicides during humid weather",
      "Remove alternate host plants if applicable"
    ]
  },
  "mosaic_virus": {
    diseaseName: "Mosaic Virus",
    confidence: 89,
    description: "A viral disease causing mottled patterns of yellow, light green, and dark green on leaves. Can stunt growth and reduce yields. Affects many plants including cucurbits, tomatoes, and tobacco.",
    remedies: [
      "Remove and destroy infected plants immediately",
      "Control insect vectors like aphids",
      "No chemical cure available - focus on prevention",
      "Disinfect tools between handling plants"
    ],
    preventiveMeasures: [
      "Use virus-free seeds and transplants",
      "Control weeds that may harbor the virus",
      "Wash hands and tools after handling infected plants",
      "Use reflective mulches to repel aphids"
    ]
  },
  "healthy": {
    diseaseName: "Healthy Plant",
    confidence: 98,
    description: "This plant appears healthy with no visible signs of disease. It shows good color, vigor, and normal growth patterns.",
    remedies: [
      "Continue regular maintenance",
      "Monitor for any changes in appearance",
      "Follow normal watering and fertilization schedules"
    ],
    preventiveMeasures: [
      "Maintain proper watering schedule",
      "Ensure adequate nutrition",
      "Regular monitoring for early disease detection",
      "Practice good sanitation in the garden"
    ]
  }
};

// Improved detection algorithm that provides more consistent results
export const detectDiseaseAsync = async (imageFile: File): Promise<DiseaseDetectionResult> => {
  return new Promise((resolve) => {
    // Simulate more intelligent image analysis
    setTimeout(() => {
      // In a real implementation, this would analyze the image using an AI model
      
      // Get image information that might help "guide" our mock analysis
      const fileName = imageFile.name.toLowerCase();
      const fileType = imageFile.type;
      const fileSize = imageFile.size;
      
      // Attempt to match image name with potential plant types for more relevant results
      let potentialMatches: string[] = [];
      
      // Look for plant type keywords in the file name
      const plantKeywords = [
        { words: ['tomato', 'tomatoes'], diseases: ['tomato_late_blight', 'tomato_early_blight', 'tomato_septoria_leaf_spot'] },
        { words: ['potato', 'potatoes'], diseases: ['potato_late_blight'] },
        { words: ['cucumber', 'cucumbers'], diseases: ['cucumber_downy_mildew', 'powdery_mildew'] },
        { words: ['rice'], diseases: ['rice_blast'] },
        { words: ['wheat'], diseases: ['wheat_leaf_rust'] },
        { words: ['apple', 'apples'], diseases: ['apple_scab'] },
        { words: ['grape', 'grapes', 'vine'], diseases: ['grape_downy_mildew'] },
        { words: ['cotton'], diseases: ['cotton_boll_rot'] },
        { words: ['citrus', 'orange', 'lemon'], diseases: ['citrus_greening'] },
        { words: ['healthy', 'normal', 'good'], diseases: ['healthy'] }
      ];
      
      // Look for disease keywords in the file name
      const diseaseKeywords = [
        { words: ['blight'], diseases: ['tomato_late_blight', 'tomato_early_blight', 'potato_late_blight'] },
        { words: ['mildew', 'downy'], diseases: ['cucumber_downy_mildew', 'grape_downy_mildew', 'powdery_mildew'] },
        { words: ['spot', 'leaf spot'], diseases: ['tomato_septoria_leaf_spot', 'bacterial_spot'] },
        { words: ['rust'], diseases: ['wheat_leaf_rust', 'rust'] },
        { words: ['scab'], diseases: ['apple_scab'] },
        { words: ['rot'], diseases: ['cotton_boll_rot'] },
        { words: ['greening'], diseases: ['citrus_greening'] },
        { words: ['mosaic', 'virus'], diseases: ['mosaic_virus'] }
      ];
      
      // Check for plant type matches
      for (const plant of plantKeywords) {
        if (plant.words.some(word => fileName.includes(word))) {
          potentialMatches = [...potentialMatches, ...plant.diseases];
        }
      }
      
      // Check for disease matches
      for (const disease of diseaseKeywords) {
        if (disease.words.some(word => fileName.includes(word))) {
          potentialMatches = [...potentialMatches, ...disease.diseases];
        }
      }
      
      // If we have potential matches based on the file name, prioritize those
      let selectedDisease: string;
      if (potentialMatches.length > 0) {
        selectedDisease = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
      } else {
        // If no specific matches, select a random disease (weighted toward common diseases)
        const diseases = Object.keys(plantDiseaseDatabase);
        
        // Add more common diseases multiple times to increase their probability
        const weightedDiseases = [
          ...diseases,
          'powdery_mildew', 'powdery_mildew', // Common disease, add twice more
          'tomato_early_blight', 'tomato_early_blight',
          'rust', 'rust',
          'bacterial_spot',
          'healthy', 'healthy', 'healthy' // High chance of healthy plants
        ];
        
        selectedDisease = weightedDiseases[Math.floor(Math.random() * weightedDiseases.length)];
      }
      
      resolve(plantDiseaseDatabase[selectedDisease]);
    }, 2000); // Simulate network delay
  });
};
