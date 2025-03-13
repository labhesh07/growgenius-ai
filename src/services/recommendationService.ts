// This is a simplified version of what would be a machine learning model in production
// For demonstration purposes, we're using a rule-based approach

export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropRecommendation {
  crop: string;
  confidence: number;
  suitabilityScore: number;
  fertilizers: string[];
  description: string;
  idealConditions: Partial<SoilData>;
}

const CROPS = [
  'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
  'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
  'banana', 'mango', 'grapes', 'watermelon', 'muskmelon',
  'apple', 'orange', 'papaya', 'coconut', 'cotton',
  'jute', 'coffee'
];

const CROP_DATA: Record<string, {
  description: string;
  idealConditions: Partial<SoilData>;
  fertilizers: string[];
}> = {
  'rice': {
    description: 'A staple grain that thrives in wet conditions with high temperatures.',
    idealConditions: { nitrogen: 80, phosphorus: 40, potassium: 40, temperature: 25, humidity: 80, ph: 6.5, rainfall: 200 },
    fertilizers: ['Urea', 'NPK 20-20-20', 'Ammonium Sulfate']
  },
  'maize': {
    description: 'A versatile crop used for food, feed, and industrial products.',
    idealConditions: { nitrogen: 60, phosphorus: 60, potassium: 30, temperature: 24, humidity: 65, ph: 6.5, rainfall: 90 },
    fertilizers: ['NPK 15-15-15', 'Urea', 'DAP']
  },
  'chickpea': {
    description: 'A protein-rich legume that improves soil fertility.',
    idealConditions: { nitrogen: 20, phosphorus: 50, potassium: 20, temperature: 21, humidity: 50, ph: 7.0, rainfall: 60 },
    fertilizers: ['SSP', 'Rock Phosphate', 'NPK 10-20-10']
  },
  'kidneybeans': {
    description: 'Popular legume that fixes nitrogen in the soil.',
    idealConditions: { nitrogen: 30, phosphorus: 60, potassium: 40, temperature: 20, humidity: 60, ph: 6.0, rainfall: 75 },
    fertilizers: ['NPK 5-10-10', 'DAP', 'Micronutrient Mix']
  },
  'pigeonpeas': {
    description: 'Drought-resistant legume with multiple harvests.',
    idealConditions: { nitrogen: 20, phosphorus: 60, potassium: 20, temperature: 25, humidity: 60, ph: 6.5, rainfall: 65 },
    fertilizers: ['SSP', 'Rock Phosphate', 'Potash']
  },
  'mothbeans': {
    description: 'Heat and drought tolerant legume for arid regions.',
    idealConditions: { nitrogen: 15, phosphorus: 40, potassium: 30, temperature: 27, humidity: 35, ph: 7.5, rainfall: 40 },
    fertilizers: ['Compost', 'Bone Meal', 'Low NPK']
  },
  'mungbean': {
    description: 'Fast-growing pulse crop with high protein content.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 20, temperature: 28, humidity: 70, ph: 7.0, rainfall: 60 },
    fertilizers: ['DAP', 'SSP', 'Organic Matter']
  },
  'blackgram': {
    description: 'High-protein legume that improves soil fertility.',
    idealConditions: { nitrogen: 20, phosphorus: 60, potassium: 40, temperature: 25, humidity: 60, ph: 6.5, rainfall: 80 },
    fertilizers: ['NPK 10-26-26', 'Micronutrient Mix', 'SSP']
  },
  'lentil': {
    description: 'Nutritious legume that thrives in cooler temperatures.',
    idealConditions: { nitrogen: 20, phosphorus: 50, potassium: 20, temperature: 18, humidity: 55, ph: 6.0, rainfall: 60 },
    fertilizers: ['DAP', 'MOP', 'Rhizobium Culture']
  },
  'pomegranate': {
    description: 'Drought-tolerant fruit with medicinal properties.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 80, temperature: 25, humidity: 45, ph: 7.0, rainfall: 50 },
    fertilizers: ['NPK 4-8-12', 'Calcium Nitrate', 'Micronutrient Mix']
  },
  'banana': {
    description: 'Tropical fruit that requires consistent moisture.',
    idealConditions: { nitrogen: 100, phosphorus: 75, potassium: 100, temperature: 27, humidity: 75, ph: 6.5, rainfall: 100 },
    fertilizers: ['NPK 13-5-20', 'Urea', 'Potash']
  },
  'mango': {
    description: 'Tropical fruit tree that thrives in warm climates.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 80, temperature: 26, humidity: 60, ph: 6.0, rainfall: 75 },
    fertilizers: ['NPK 10-10-10', 'Ammonium Sulfate', 'MOP']
  },
  'grapes': {
    description: 'Perennial vine that produces berries for many uses.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 80, temperature: 22, humidity: 50, ph: 6.0, rainfall: 65 },
    fertilizers: ['NPK 12-12-17', 'Calcium Nitrate', 'Magnesium Sulfate']
  },
  'watermelon': {
    description: 'Heat-loving fruit with high water content.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 70, temperature: 27, humidity: 60, ph: 6.5, rainfall: 50 },
    fertilizers: ['NPK 5-10-15', 'Calcium Nitrate', 'Boron']
  },
  'muskmelon': {
    description: 'Sweet summer fruit that prefers well-drained soil.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 50, temperature: 26, humidity: 60, ph: 6.5, rainfall: 45 },
    fertilizers: ['NPK 6-12-12', 'Calcium Nitrate', 'Micronutrient Mix']
  },
  'apple': {
    description: 'Temperate fruit that requires winter chilling.',
    idealConditions: { nitrogen: 30, phosphorus: 40, potassium: 60, temperature: 18, humidity: 65, ph: 6.0, rainfall: 80 },
    fertilizers: ['NPK 12-6-6', 'Calcium Nitrate', 'Boron']
  },
  'orange': {
    description: 'Citrus fruit that thrives in subtropical climates.',
    idealConditions: { nitrogen: 40, phosphorus: 30, potassium: 50, temperature: 23, humidity: 60, ph: 6.0, rainfall: 70 },
    fertilizers: ['NPK 15-5-15', 'Magnesium Sulfate', 'Zinc Sulfate']
  },
  'papaya': {
    description: 'Fast-growing tropical fruit with medicinal properties.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 50, temperature: 28, humidity: 70, ph: 6.5, rainfall: 100 },
    fertilizers: ['NPK 14-14-14', 'Urea', 'Calcium Ammonium Nitrate']
  },
  'coconut': {
    description: 'Tropical palm with multiple uses for all parts.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 80, temperature: 27, humidity: 80, ph: 6.0, rainfall: 150 },
    fertilizers: ['NPK 12-4-16', 'Urea', 'MOP']
  },
  'cotton': {
    description: 'Fiber crop that thrives in warm, humid conditions.',
    idealConditions: { nitrogen: 60, phosphorus: 30, potassium: 30, temperature: 25, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['NPK 20-10-10', 'Urea', 'DAP']
  },
  'jute': {
    description: 'Natural fiber crop used for rope and fabric.',
    idealConditions: { nitrogen: 50, phosphorus: 20, potassium: 30, temperature: 30, humidity: 85, ph: 7.0, rainfall: 150 },
    fertilizers: ['NPK 10-5-5', 'Urea', 'MOP']
  },
  'coffee': {
    description: 'Tropical evergreen shrub grown for its seeds.',
    idealConditions: { nitrogen: 40, phosphorus: 30, potassium: 50, temperature: 22, humidity: 75, ph: 5.5, rainfall: 150 },
    fertilizers: ['NPK 12-12-17', 'Ammonium Sulfate', 'Dolomite']
  }
};

// Memoize calculation results for better performance
const calculateSuitabilityScoreWithCache = (() => {
  const cache = new Map();
  
  return (crop: string, soilData: SoilData): number => {
    // Create a cache key using crop and stringified soil data
    const key = `${crop}-${JSON.stringify(soilData)}`;
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const ideal = CROP_DATA[crop].idealConditions;
    
    // Calculate difference from ideal conditions
    const nitrogenDiff = Math.abs((soilData.nitrogen - (ideal.nitrogen || 0)) / (ideal.nitrogen || 1));
    const phosphorusDiff = Math.abs((soilData.phosphorus - (ideal.phosphorus || 0)) / (ideal.phosphorus || 1));
    const potassiumDiff = Math.abs((soilData.potassium - (ideal.potassium || 0)) / (ideal.potassium || 1));
    const temperatureDiff = Math.abs((soilData.temperature - (ideal.temperature || 0)) / (ideal.temperature || 1));
    const humidityDiff = Math.abs((soilData.humidity - (ideal.humidity || 0)) / (ideal.humidity || 1));
    const phDiff = Math.abs((soilData.ph - (ideal.ph || 0)) / (ideal.ph || 1));
    const rainfallDiff = Math.abs((soilData.rainfall - (ideal.rainfall || 0)) / (ideal.rainfall || 1));
    
    // Calculate total difference (weighted)
    const totalDiff = (
      nitrogenDiff * 0.15 + 
      phosphorusDiff * 0.15 + 
      potassiumDiff * 0.15 + 
      temperatureDiff * 0.15 + 
      humidityDiff * 0.15 + 
      phDiff * 0.15 + 
      rainfallDiff * 0.1
    );
    
    // Convert to a score (0-100)
    const result = Math.max(0, Math.min(100, 100 - (totalDiff * 100)));
    
    // Store in cache for future use
    cache.set(key, result);
    
    return result;
  };
})();

export const getRecommendation = (soilData: SoilData): CropRecommendation[] => {
  // Calculate suitability scores for all crops
  const scores = CROPS.map(crop => ({
    crop,
    suitabilityScore: calculateSuitabilityScoreWithCache(crop, soilData),
  }));
  
  // Sort by suitability score (descending)
  scores.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  
  // Return top 3 recommendations with details
  return scores.slice(0, 3).map(({ crop, suitabilityScore }) => ({
    crop,
    confidence: Math.min(99, suitabilityScore * 0.9 + Math.random() * 10), // Simulated ML confidence
    suitabilityScore,
    fertilizers: CROP_DATA[crop].fertilizers,
    description: CROP_DATA[crop].description,
    idealConditions: CROP_DATA[crop].idealConditions,
  }));
};

// Use a debouncing function for the async recommendation to prevent overloading
let timeoutId: ReturnType<typeof setTimeout> | null = null;

export const getRecommendationAsync = async (soilData: SoilData): Promise<CropRecommendation[]> => {
  // Clear any existing timeout
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  // Return a promise that resolves after the debounce period
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve(getRecommendation(soilData));
      timeoutId = null;
    }, 1200);
  });
};
