// This file contains the integration with a crop recommendation ML API
// The original mock data is kept as a fallback

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
  season?: string; // Added season information
  growthDuration?: string; // Added growth duration information
}

// Expanded list of crops including more Indian varieties
const CROPS = [
  // Original crops
  'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
  'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
  'banana', 'mango', 'grapes', 'watermelon', 'muskmelon',
  'apple', 'orange', 'papaya', 'coconut', 'cotton',
  'jute', 'coffee',
  
  // Previously added Indian crops
  'wheat', 'sugarcane', 'turmeric', 'ginger', 'mustard',
  'sorghum', 'pearl_millet', 'finger_millet', 'groundnut', 'sesame',
  'cumin', 'coriander', 'fenugreek', 'clove', 'cardamom',
  'chilli', 'garlic', 'onion', 'potato', 'tomato',
  'okra', 'eggplant', 'cauliflower', 'cabbage', 'spinach',
  'guava', 'litchi', 'jackfruit', 'sapota',
  
  // Additional spices
  'black_pepper', 'cinnamon', 'saffron', 'asafoetida', 'fennel',
  'ajwain', 'star_anise', 'nutmeg', 'mace', 'bay_leaf',
  'tamarind', 'curry_leaf',
  
  // Kharif crops (monsoon season)
  'paddy', 'arhar_dal', 'urad_dal', 'sesamum', 'bajra',
  'jowar', 'ragi', 'castor', 'indigo',
  
  // Rabi crops (winter season)
  'barley', 'gram', 'masoor', 'mustard_oil', 'rapeseed',
  'safflower', 'sunflower', 'isabgol',
  
  // Zaid crops (summer season)
  'cucumber', 'watermelon_zaid', 'bitter_gourd', 'pumpkin', 
  'muskmelon_zaid', 'ridge_gourd', 'bottle_gourd',
  
  // Cash crops
  'tea', 'rubber', 'mulberry',
  
  // Other important Indian crops
  'pearl_millet', 'soybean', 'pigeon_pea', 'green_gram', 'black_gram',
  'horse_gram', 'cluster_bean', 'amaranthus', 'quinoa'
];

const CROP_DATA: Record<string, {
  description: string;
  idealConditions: Partial<SoilData>;
  fertilizers: string[];
  season?: string;
  growthDuration?: string;
}> = {
  'rice': {
    description: 'A staple grain that thrives in wet conditions with high temperatures.',
    idealConditions: { nitrogen: 80, phosphorus: 40, potassium: 40, temperature: 25, humidity: 80, ph: 6.5, rainfall: 200 },
    fertilizers: ['Urea', 'NPK 20-20-20', 'Ammonium Sulfate'],
    season: 'Kharif',
    growthDuration: '90-150 days'
  },
  'maize': {
    description: 'A versatile crop used for food, feed, and industrial products.',
    idealConditions: { nitrogen: 60, phosphorus: 60, potassium: 30, temperature: 24, humidity: 65, ph: 6.5, rainfall: 90 },
    fertilizers: ['NPK 15-15-15', 'Urea', 'DAP'],
    season: 'Kharif/Rabi',
    growthDuration: '80-110 days'
  },
  'chickpea': {
    description: 'A protein-rich legume that improves soil fertility.',
    idealConditions: { nitrogen: 20, phosphorus: 50, potassium: 20, temperature: 21, humidity: 50, ph: 7.0, rainfall: 60 },
    fertilizers: ['SSP', 'Rock Phosphate', 'NPK 10-20-10'],
    season: 'Rabi',
    growthDuration: '95-120 days'
  },
  'kidneybeans': {
    description: 'Popular legume that fixes nitrogen in the soil.',
    idealConditions: { nitrogen: 30, phosphorus: 60, potassium: 40, temperature: 20, humidity: 60, ph: 6.0, rainfall: 75 },
    fertilizers: ['NPK 5-10-10', 'DAP', 'Micronutrient Mix'],
    season: 'Kharif',
    growthDuration: '90-120 days'
  },
  'pigeonpeas': {
    description: 'Drought-resistant legume with multiple harvests.',
    idealConditions: { nitrogen: 20, phosphorus: 60, potassium: 20, temperature: 25, humidity: 60, ph: 6.5, rainfall: 65 },
    fertilizers: ['SSP', 'Rock Phosphate', 'Potash'],
    season: 'Kharif',
    growthDuration: '150-180 days'
  },
  'mothbeans': {
    description: 'Heat and drought tolerant legume for arid regions.',
    idealConditions: { nitrogen: 15, phosphorus: 40, potassium: 30, temperature: 27, humidity: 35, ph: 7.5, rainfall: 40 },
    fertilizers: ['Compost', 'Bone Meal', 'Low NPK'],
    season: 'Kharif',
    growthDuration: '75-90 days'
  },
  'mungbean': {
    description: 'Fast-growing pulse crop with high protein content.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 20, temperature: 28, humidity: 70, ph: 7.0, rainfall: 60 },
    fertilizers: ['DAP', 'SSP', 'Organic Matter'],
    season: 'Kharif/Zaid',
    growthDuration: '60-70 days'
  },
  'blackgram': {
    description: 'High-protein legume that improves soil fertility.',
    idealConditions: { nitrogen: 20, phosphorus: 60, potassium: 40, temperature: 25, humidity: 60, ph: 6.5, rainfall: 80 },
    fertilizers: ['NPK 10-26-26', 'Micronutrient Mix', 'SSP'],
    season: 'Kharif',
    growthDuration: '70-90 days'
  },
  'lentil': {
    description: 'Nutritious legume that thrives in cooler temperatures.',
    idealConditions: { nitrogen: 20, phosphorus: 50, potassium: 20, temperature: 18, humidity: 55, ph: 6.0, rainfall: 60 },
    fertilizers: ['DAP', 'MOP', 'Rhizobium Culture'],
    season: 'Rabi',
    growthDuration: '100-120 days'
  },
  'pomegranate': {
    description: 'Drought-tolerant fruit with medicinal properties.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 80, temperature: 25, humidity: 45, ph: 7.0, rainfall: 50 },
    fertilizers: ['NPK 4-8-12', 'Calcium Nitrate', 'Micronutrient Mix'],
    season: 'Perennial',
    growthDuration: '5-7 months (fruiting)'
  },
  'banana': {
    description: 'Tropical fruit that requires consistent moisture.',
    idealConditions: { nitrogen: 100, phosphorus: 75, potassium: 100, temperature: 27, humidity: 75, ph: 6.5, rainfall: 100 },
    fertilizers: ['NPK 13-5-20', 'Urea', 'Potash'],
    season: 'Perennial',
    growthDuration: '10-12 months'
  },
  'mango': {
    description: 'Tropical fruit tree that thrives in warm climates.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 80, temperature: 26, humidity: 60, ph: 6.0, rainfall: 75 },
    fertilizers: ['NPK 10-10-10', 'Ammonium Sulfate', 'MOP'],
    season: 'Perennial',
    growthDuration: '4-5 years for first harvest'
  },
  'grapes': {
    description: 'Perennial vine that produces berries for many uses.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 80, temperature: 22, humidity: 50, ph: 6.0, rainfall: 65 },
    fertilizers: ['NPK 12-12-17', 'Calcium Nitrate', 'Magnesium Sulfate'],
    season: 'Perennial',
    growthDuration: '2-3 years for first harvest'
  },
  'watermelon': {
    description: 'Heat-loving fruit with high water content.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 70, temperature: 27, humidity: 60, ph: 6.5, rainfall: 50 },
    fertilizers: ['NPK 5-10-15', 'Calcium Nitrate', 'Boron'],
    season: 'Kharif/Zaid',
    growthDuration: '80-110 days'
  },
  'muskmelon': {
    description: 'Sweet summer fruit that prefers well-drained soil.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 50, temperature: 26, humidity: 60, ph: 6.5, rainfall: 45 },
    fertilizers: ['NPK 6-12-12', 'Calcium Nitrate', 'Micronutrient Mix'],
    season: 'Zaid',
    growthDuration: '70-90 days'
  },
  'apple': {
    description: 'Temperate fruit that requires winter chilling.',
    idealConditions: { nitrogen: 30, phosphorus: 40, potassium: 60, temperature: 18, humidity: 65, ph: 6.0, rainfall: 80 },
    fertilizers: ['NPK 12-6-6', 'Calcium Nitrate', 'Boron'],
    season: 'Perennial',
    growthDuration: '3-5 years for first harvest'
  },
  'orange': {
    description: 'Citrus fruit that thrives in subtropical climates.',
    idealConditions: { nitrogen: 40, phosphorus: 30, potassium: 50, temperature: 23, humidity: 60, ph: 6.0, rainfall: 70 },
    fertilizers: ['NPK 15-5-15', 'Magnesium Sulfate', 'Zinc Sulfate'],
    season: 'Perennial',
    growthDuration: '2-3 years for first harvest'
  },
  'papaya': {
    description: 'Fast-growing tropical fruit with medicinal properties.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 50, temperature: 28, humidity: 70, ph: 6.5, rainfall: 100 },
    fertilizers: ['NPK 14-14-14', 'Urea', 'Calcium Ammonium Nitrate'],
    season: 'Perennial',
    growthDuration: '8-10 months for first harvest'
  },
  'coconut': {
    description: 'Tropical palm with multiple uses for all parts.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 80, temperature: 27, humidity: 80, ph: 6.0, rainfall: 150 },
    fertilizers: ['NPK 12-4-16', 'Urea', 'MOP'],
    season: 'Perennial',
    growthDuration: '6-8 years for first harvest'
  },
  'cotton': {
    description: 'Fiber crop that thrives in warm, humid conditions.',
    idealConditions: { nitrogen: 60, phosphorus: 30, potassium: 30, temperature: 25, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['NPK 20-10-10', 'Urea', 'DAP'],
    season: 'Kharif',
    growthDuration: '150-180 days'
  },
  'jute': {
    description: 'Natural fiber crop used for rope and fabric.',
    idealConditions: { nitrogen: 50, phosphorus: 20, potassium: 30, temperature: 30, humidity: 85, ph: 7.0, rainfall: 150 },
    fertilizers: ['NPK 10-5-5', 'Urea', 'MOP'],
    season: 'Kharif',
    growthDuration: '100-120 days'
  },
  'coffee': {
    description: 'Tropical evergreen shrub grown for its seeds.',
    idealConditions: { nitrogen: 40, phosphorus: 30, potassium: 50, temperature: 22, humidity: 75, ph: 5.5, rainfall: 150 },
    fertilizers: ['NPK 12-12-17', 'Ammonium Sulfate', 'Dolomite'],
    season: 'Perennial',
    growthDuration: '3-4 years for first harvest'
  },
  // Additional Indian crop data
  'wheat': {
    description: 'A staple cereal grain in India, particularly in northern regions.',
    idealConditions: { nitrogen: 60, phosphorus: 30, potassium: 30, temperature: 20, humidity: 60, ph: 6.5, rainfall: 75 },
    fertilizers: ['Urea', 'DAP', 'MOP'],
    season: 'Rabi',
    growthDuration: '110-130 days'
  },
  'sugarcane': {
    description: 'A major cash crop used for sugar production and jaggery.',
    idealConditions: { nitrogen: 100, phosphorus: 50, potassium: 50, temperature: 27, humidity: 80, ph: 6.5, rainfall: 150 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Perennial',
    growthDuration: '10-12 months'
  },
  'turmeric': {
    description: 'A traditional spice and medicinal crop with vibrant color.',
    idealConditions: { nitrogen: 30, phosphorus: 40, potassium: 120, temperature: 25, humidity: 80, ph: 6.5, rainfall: 150 },
    fertilizers: ['FYM', 'Neem Cake', 'NPK 5-10-30'],
    season: 'Kharif',
    growthDuration: '8-9 months'
  },
  'ginger': {
    description: 'A spice crop grown for its aromatic rhizome widely used in cooking.',
    idealConditions: { nitrogen: 40, phosphorus: 30, potassium: 60, temperature: 25, humidity: 80, ph: 6.0, rainfall: 150 },
    fertilizers: ['Compost', 'NPK 10-10-20', 'Neem Cake'],
    season: 'Kharif',
    growthDuration: '8-10 months'
  },
  'mustard': {
    description: 'An important oilseed crop grown throughout northern India.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 20, humidity: 60, ph: 6.5, rainfall: 60 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Rabi',
    growthDuration: '100-130 days'
  },
  'sorghum': {
    description: 'A drought-resistant grain crop also known as jowar.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 30, temperature: 27, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Kharif/Rabi',
    growthDuration: '100-120 days'
  },
  'pearl_millet': {
    description: 'A highly drought-resistant crop (bajra) common in arid regions.',
    idealConditions: { nitrogen: 40, phosphorus: 20, potassium: 20, temperature: 28, humidity: 50, ph: 7.0, rainfall: 50 },
    fertilizers: ['Urea', 'DAP', 'Compost'],
    season: 'Kharif',
    growthDuration: '90-110 days'
  },
  'finger_millet': {
    description: 'A nutritious grain (ragi) suitable for dry regions.',
    idealConditions: { nitrogen: 30, phosphorus: 20, potassium: 20, temperature: 27, humidity: 60, ph: 6.5, rainfall: 80 },
    fertilizers: ['FYM', 'Compost', 'Low NPK'],
    season: 'Kharif',
    growthDuration: '90-120 days'
  },
  'groundnut': {
    description: 'An important oilseed and food crop also known as peanut.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 30, temperature: 25, humidity: 65, ph: 6.5, rainfall: 90 },
    fertilizers: ['Gypsum', 'SSP', 'NPK 20-40-0'],
    season: 'Kharif',
    growthDuration: '100-130 days'
  },
  'sesame': {
    description: 'An ancient oilseed crop (til) with high oil content.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 30, temperature: 27, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['NPK 10-10-10', 'Urea', 'SSP'],
    season: 'Kharif',
    growthDuration: '80-95 days'
  },
  'cumin': {
    description: 'A popular spice crop grown mainly in Gujarat and Rajasthan.',
    idealConditions: { nitrogen: 20, phosphorus: 30, potassium: 20, temperature: 25, humidity: 50, ph: 7.0, rainfall: 40 },
    fertilizers: ['NPK 10-15-10', 'Compost', 'Micronutrients'],
    season: 'Rabi',
    growthDuration: '100-120 days'
  },
  'coriander': {
    description: 'A versatile herb used for both leaves and seeds in Indian cuisine.',
    idealConditions: { nitrogen: 20, phosphorus: 30, potassium: 20, temperature: 23, humidity: 60, ph: 6.5, rainfall: 60 },
    fertilizers: ['Compost', 'Low NPK', 'Vermicompost'],
    season: 'Rabi',
    growthDuration: '90-120 days'
  },
  'fenugreek': {
    description: 'A dual-purpose crop used as vegetable and spice (methi).',
    idealConditions: { nitrogen: 25, phosphorus: 30, potassium: 20, temperature: 22, humidity: 60, ph: 6.5, rainfall: 50 },
    fertilizers: ['Compost', 'NPK 5-10-5', 'Vermicompost'],
    season: 'Rabi',
    growthDuration: '90-120 days'
  },
  'clove': {
    description: 'A high-value aromatic spice grown in southern India.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 60, temperature: 25, humidity: 70, ph: 6.0, rainfall: 200 },
    fertilizers: ['Compost', 'NPK 10-10-20', 'Potash'],
    season: 'Perennial',
    growthDuration: '6-8 years for first harvest'
  },
  'cardamom': {
    description: 'A high-value spice known as the "Queen of Spices".',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 60, temperature: 22, humidity: 80, ph: 6.0, rainfall: 250 },
    fertilizers: ['Compost', 'NPK 10-10-20', 'Organic Matter'],
    season: 'Perennial',
    growthDuration: '3-4 years for first harvest'
  },
  'chilli': {
    description: 'A popular spice crop grown throughout India.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 50, temperature: 25, humidity: 70, ph: 6.5, rainfall: 75 },
    fertilizers: ['NPK 15-15-15', 'Calcium Nitrate', 'Micronutrients'],
    season: 'Kharif/Rabi',
    growthDuration: '120-150 days'
  },
  'garlic': {
    description: 'An important condiment crop with medicinal properties.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 18, humidity: 60, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 10-10-10', 'Compost', 'Sulfur'],
    season: 'Rabi',
    growthDuration: '130-160 days'
  },
  'onion': {
    description: 'A fundamental ingredient in Indian cooking.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 60, temperature: 20, humidity: 65, ph: 6.5, rainfall: 65 },
    fertilizers: ['NPK 10-10-20', 'Compost', 'MOP'],
    season: 'Rabi/Kharif',
    growthDuration: '100-130 days'
  },
  'potato': {
    description: 'A widely grown tuber crop across northern and eastern India.',
    idealConditions: { nitrogen: 60, phosphorus: 60, potassium: 100, temperature: 18, humidity: 75, ph: 6.0, rainfall: 75 },
    fertilizers: ['NPK 10-20-20', 'Urea', 'MOP'],
    season: 'Rabi',
    growthDuration: '90-120 days'
  },
  'tomato': {
    description: 'A versatile vegetable crop grown throughout India.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 70, temperature: 24, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['NPK 10-20-20', 'Calcium Nitrate', 'Micronutrients'],
    season: 'Rabi/Kharif',
    growthDuration: '90-120 days'
  },
  'okra': {
    description: 'A popular vegetable (ladies finger) grown in warm regions.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 40, temperature: 27, humidity: 70, ph: 6.5, rainfall: 80 },
    fertilizers: ['NPK 10-10-10', 'Compost', 'Micronutrients'],
    season: 'Kharif/Zaid',
    growthDuration: '45-65 days'
  },
  'eggplant': {
    description: 'A widely consumed vegetable (brinjal) in Indian cuisine.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 30, temperature: 26, humidity: 70, ph: 6.0, rainfall: 75 },
    fertilizers: ['NPK 10-10-10', 'Urea', 'Micronutrients'],
    season: 'Kharif/Rabi',
    growthDuration: '100-130 days'
  },
  'cauliflower': {
    description: 'A popular cole crop grown during winter in northern India.',
    idealConditions: { nitrogen: 60, phosphorus: 50, potassium: 50, temperature: 18, humidity: 75, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 15-15-15', 'Urea', 'Boron'],
    season: 'Rabi',
    growthDuration: '90-120 days'
  },
  'cabbage': {
    description: 'A leafy vegetable grown primarily in winter months.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 17, humidity: 70, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 15-15-15', 'Urea', 'Boron'],
    season: 'Rabi',
    growthDuration: '90-120 days'
  },
  'spinach': {
    description: 'A nutritious leafy vegetable grown throughout India.',
    idealConditions: { nitrogen: 50, phosphorus: 30, potassium: 20, temperature: 20, humidity: 70, ph: 6.5, rainfall: 50 },
    fertilizers: ['Compost', 'Low NPK', 'Vermicompost'],
    season: 'Rabi',
    growthDuration: '30-45 days'
  },
  'guava': {
    description: 'A popular tropical fruit rich in vitamin C.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 40, temperature: 26, humidity: 70, ph: 6.5, rainfall: 100 },
    fertilizers: ['NPK 10-10-10', 'FYM', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '2-3 years for first harvest'
  },
  'litchi': {
    description: 'A delicious subtropical fruit grown in eastern India.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 60, temperature: 25, humidity: 75, ph: 6.0, rainfall: 120 },
    fertilizers: ['NPK 10-10-20', 'FYM', 'Zinc Sulfate'],
    season: 'Perennial',
    growthDuration: '3-5 years for first harvest'
  },
  'jackfruit': {
    description: 'The largest tree-borne fruit, popular in southern India.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 60, temperature: 28, humidity: 80, ph: 6.5, rainfall: 150 },
    fertilizers: ['FYM', 'Low NPK', 'Potash'],
    season: 'Perennial',
    growthDuration: '3-5 years for first harvest'
  },
  'sapota': {
    description: 'A tropical fruit (chikoo) popular in western India.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 40, temperature: 28, humidity: 75, ph: 6.5, rainfall: 125 },
    fertilizers: ['NPK 10-10-10', 'FYM', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '4-5 years for first harvest'
  },
  'black_pepper': {
    description: 'Known as "black gold", a high-value spice crop grown in Kerala and other southern states.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 50, temperature: 25, humidity: 80, ph: 5.5, rainfall: 250 },
    fertilizers: ['NPK 10-10-20', 'Organic Manure', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '3-4 years for first harvest'
  },
  'cinnamon': {
    description: 'Aromatic spice obtained from the inner bark of trees, primarily grown in southern India.',
    idealConditions: { nitrogen: 20, phosphorus: 20, potassium: 40, temperature: 27, humidity: 80, ph: 5.5, rainfall: 200 },
    fertilizers: ['Compost', 'NPK 5-10-10', 'Neem Cake'],
    season: 'Perennial',
    growthDuration: '3-5 years for first harvest'
  },
  'saffron': {
    description: 'The world\'s most expensive spice by weight, grown in Kashmir valley.',
    idealConditions: { nitrogen: 15, phosphorus: 20, potassium: 30, temperature: 12, humidity: 60, ph: 6.8, rainfall: 40 },
    fertilizers: ['Well-rotted Manure', 'NPK 10-10-20', 'Bone Meal'],
    season: 'Rabi',
    growthDuration: '3-4 months (annual flowering)'
  },
  'asafoetida': {
    description: 'A resinous gum with pungent taste used in Indian cuisine, grown in cold arid regions.',
    idealConditions: { nitrogen: 20, phosphorus: 20, potassium: 30, temperature: 15, humidity: 40, ph: 7.0, rainfall: 50 },
    fertilizers: ['Compost', 'Bone Meal', 'Low NPK'],
    season: 'Perennial',
    growthDuration: '4-5 years for first harvest'
  },
  'fennel': {
    description: 'Aromatic herb with medicinal properties, extensively grown in Gujarat and Rajasthan.',
    idealConditions: { nitrogen: 30, phosphorus: 40, potassium: 20, temperature: 18, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['NPK 20-20-20', 'Vermicompost', 'Neem Cake'],
    season: 'Rabi',
    growthDuration: '100-130 days'
  },
  'ajwain': {
    description: 'Aromatic spice with digestive properties, primarily grown in Gujarat and Rajasthan.',
    idealConditions: { nitrogen: 25, phosphorus: 40, potassium: 20, temperature: 20, humidity: 50, ph: 7.0, rainfall: 60 },
    fertilizers: ['Organic Manure', 'SSP', 'Low NPK'],
    season: 'Rabi',
    growthDuration: '120-150 days'
  },
  'star_anise': {
    description: 'Star-shaped spice with sweet licorice flavor, grown in northeastern states.',
    idealConditions: { nitrogen: 20, phosphorus: 30, potassium: 40, temperature: 25, humidity: 75, ph: 6.0, rainfall: 180 },
    fertilizers: ['NPK 10-10-10', 'Compost', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '5-6 years for first harvest'
  },
  'nutmeg': {
    description: 'Aromatic spice from the seed of Myristica fragrans, grown in Kerala and Tamil Nadu.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 50, temperature: 27, humidity: 80, ph: 6.0, rainfall: 250 },
    fertilizers: ['NPK 10-5-20', 'Organic Matter', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '7-9 years for first harvest'
  },
  'mace': {
    description: 'Spice from the red aril surrounding the nutmeg seed, grown alongside nutmeg.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 50, temperature: 27, humidity: 80, ph: 6.0, rainfall: 250 },
    fertilizers: ['NPK 10-5-20', 'Organic Matter', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '7-9 years for first harvest'
  },
  'bay_leaf': {
    description: 'Aromatic leaf used in cooking, grown in the subtropical Himalayan regions.',
    idealConditions: { nitrogen: 20, phosphorus: 20, potassium: 30, temperature: 20, humidity: 70, ph: 6.5, rainfall: 150 },
    fertilizers: ['Compost', 'Low NPK', 'Organic Matter'],
    season: 'Perennial',
    growthDuration: '3-4 years for full growth'
  },
  'tamarind': {
    description: 'Sour fruit used in cooking and medicinal preparations, grown in southern India.',
    idealConditions: { nitrogen: 20, phosphorus: 20, potassium: 40, temperature: 30, humidity: 70, ph: 6.5, rainfall: 100 },
    fertilizers: ['FYM', 'NPK 10-10-10', 'Micronutrients'],
    season: 'Perennial',
    growthDuration: '5-7 years for first harvest'
  },
  'curry_leaf': {
    description: 'Aromatic herb used in South Indian cuisine, grown throughout India.',
    idealConditions: { nitrogen: 25, phosphorus: 25, potassium: 30, temperature: 28, humidity: 65, ph: 6.5, rainfall: 150 },
    fertilizers: ['Compost', 'NPK 10-10-10', 'Neem Cake'],
    season: 'Perennial',
    growthDuration: '1-2 years for regular harvesting'
  },
  'paddy': {
    description: 'Major cereal crop of the Kharif season, extensively grown during monsoons.',
    idealConditions: { nitrogen: 80, phosphorus: 40, potassium: 30, temperature: 25, humidity: 85, ph: 6.0, rainfall: 200 },
    fertilizers: ['Urea', 'DAP', 'MOP'],
    season: 'Kharif',
    growthDuration: '90-150 days'
  },
  'arhar_dal': {
    description: 'Also known as toor/pigeon pea, a major pulse crop of the Kharif season.',
    idealConditions: { nitrogen: 20, phosphorus: 60, potassium: 20, temperature: 25, humidity: 60, ph: 6.5, rainfall: 65 },
    fertilizers: ['SSP', 'DAP', 'Micronutrients'],
    season: 'Kharif',
    growthDuration: '150-180 days'
  },
  'urad_dal': {
    description: 'Quick-growing Kharif pulse with soil-enriching properties.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 30, temperature: 30, humidity: 70, ph: 6.0, rainfall: 75 },
    fertilizers: ['SSP', 'Rhizobium Culture', 'FYM'],
    season: 'Kharif',
    growthDuration: '70-90 days'
  },
  'sesamum': {
    description: 'Ancient oilseed crop grown for its nutritious seeds.',
    idealConditions: { nitrogen: 30, phosphorus: 30, potassium: 30, temperature: 27, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['DAP', 'MOP', 'Gypsum'],
    season: 'Kharif',
    growthDuration: '80-95 days'
  },
  'bajra': {
    description: 'Drought-resistant millet widely grown in arid and semi-arid regions.',
    idealConditions: { nitrogen: 40, phosphorus: 20, potassium: 20, temperature: 28, humidity: 50, ph: 7.0, rainfall: 50 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Kharif',
    growthDuration: '90-110 days'
  },
  'jowar': {
    description: 'Drought-tolerant grain used for food, fodder, and industrial purposes.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 30, temperature: 27, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Kharif/Rabi',
    growthDuration: '100-120 days'
  },
  'ragi': {
    description: 'Nutritious millet (finger millet) with excellent drought tolerance.',
    idealConditions: { nitrogen: 30, phosphorus: 20, potassium: 20, temperature: 27, humidity: 60, ph: 6.5, rainfall: 80 },
    fertilizers: ['FYM', 'Compost', 'Low NPK'],
    season: 'Kharif',
    growthDuration: '90-120 days'
  },
  'castor': {
    description: 'Industrial oil crop used in pharmaceuticals and lubricants.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 20, temperature: 25, humidity: 60, ph: 6.5, rainfall: 65 },
    fertilizers: ['NPK 20-20-10', 'Ammonium Sulfate', 'SSP'],
    season: 'Kharif',
    growthDuration: '140-180 days'
  },
  'indigo': {
    description: 'Traditional natural dye crop with medicinal properties.',
    idealConditions: { nitrogen: 30, phosphorus: 40, potassium: 20, temperature: 25, humidity: 70, ph: 7.0, rainfall: 75 },
    fertilizers: ['Compost', 'FYM', 'Low NPK'],
    season: 'Kharif',
    growthDuration: '120-150 days'
  },
  'barley': {
    description: 'Cold-tolerant cereal crop used for food, feed, and malting.',
    idealConditions: { nitrogen: 60, phosphorus: 30, potassium: 30, temperature: 15, humidity: 60, ph: 7.0, rainfall: 40 },
    fertilizers: ['Urea', 'DAP', 'MOP'],
    season: 'Rabi',
    growthDuration: '110-130 days'
  },
  'gram': {
    description: 'Important pulse crop (Bengal gram) grown during the Rabi season.',
    idealConditions: { nitrogen: 20, phosphorus: 50, potassium: 20, temperature: 21, humidity: 50, ph: 7.0, rainfall: 60 },
    fertilizers: ['SSP', 'Rock Phosphate', 'Rhizobium Culture'],
    season: 'Rabi',
    growthDuration: '95-120 days'
  },
  'masoor': {
    description: 'Nutritious lentil variety cultivated in northern plains.',
    idealConditions: { nitrogen: 20, phosphorus: 50, potassium: 20, temperature: 18, humidity: 55, ph: 6.0, rainfall: 60 },
    fertilizers: ['DAP', 'MOP', 'Rhizobium Culture'],
    season: 'Rabi',
    growthDuration: '100-120 days'
  },
  'mustard_oil': {
    description: 'Major oilseed crop in the Rabi season across North India.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 20, humidity: 60, ph: 6.5, rainfall: 60 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Rabi',
    growthDuration: '100-130 days'
  },
  'rapeseed': {
    description: 'Winter oilseed crop used for cooking oil and industrial purposes.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 18, humidity: 60, ph: 6.5, rainfall: 60 },
    fertilizers: ['Urea', 'SSP', 'MOP'],
    season: 'Rabi',
    growthDuration: '100-130 days'
  },
  'safflower': {
    description: 'Drought-tolerant oilseed crop grown in central and peninsular India.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 20, temperature: 20, humidity: 50, ph: 7.0, rainfall: 50 },
    fertilizers: ['NPK 20-40-20', 'Ammonium Sulfate', 'SSP'],
    season: 'Rabi',
    growthDuration: '120-150 days'
  },
  'sunflower': {
    description: 'Important oilseed crop that can be grown in both Rabi and Kharif seasons.',
    idealConditions: { nitrogen: 60, phosphorus: 80, potassium: 40, temperature: 23, humidity: 60, ph: 6.5, rainfall: 70 },
    fertilizers: ['NPK 20-40-20', 'Boron', 'Sulfur'],
    season: 'Rabi/Kharif',
    growthDuration: '90-110 days'
  },
  'isabgol': {
    description: 'Medicinal crop grown for its seed husk used as dietary fiber.',
    idealConditions: { nitrogen: 30, phosphorus: 40, potassium: 20, temperature: 20, humidity: 50, ph: 7.5, rainfall: 40 },
    fertilizers: ['NPK 15-10-10', 'FYM', 'Compost'],
    season: 'Rabi',
    growthDuration: '120-130 days'
  },
  'cucumber': {
    description: 'Quick-growing summer vegetable that requires warm conditions.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 60, temperature: 28, humidity: 60, ph: 6.5, rainfall: 40 },
    fertilizers: ['NPK 10-26-26', 'Urea', 'Micronutrients'],
    season: 'Zaid',
    growthDuration: '45-60 days'
  },
  'watermelon_zaid': {
    description: 'Heat-tolerant fruit crop grown during the summer season.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 70, temperature: 32, humidity: 60, ph: 6.5, rainfall: 50 },
    fertilizers: ['NPK 5-10-15', 'Calcium Nitrate', 'Potash'],
    season: 'Zaid',
    growthDuration: '80-110 days'
  },
  'bitter_gourd': {
    description: 'Summer vegetable with unique bitter flavor and medicinal properties.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 60, temperature: 30, humidity: 70, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 10-10-10', 'Organic Manure', 'Micronutrients'],
    season: 'Zaid',
    growthDuration: '60-80 days'
  },
  'pumpkin': {
    description: 'Warm-season vegetable crop grown during summer months.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 40, temperature: 28, humidity: 60, ph: 6.5, rainfall: 50 },
    fertilizers: ['NPK 10-10-10', 'FYM', 'Compost'],
    season: 'Zaid',
    growthDuration: '85-120 days'
  },
  'muskmelon_zaid': {
    description: 'Sweet summer fruit that requires warm conditions and adequate irrigation.',
    idealConditions: { nitrogen: 40, phosphorus: 60, potassium: 50, temperature: 30, humidity: 60, ph: 6.5, rainfall: 45 },
    fertilizers: ['NPK 6-12-12', 'Calcium Nitrate', 'Micronutrients'],
    season: 'Zaid',
    growthDuration: '70-90 days'
  },
  'ridge_gourd': {
    description: 'Fast-growing summer vegetable grown for its immature fruits.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 60, temperature: 28, humidity: 70, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 10-10-10', 'Urea', 'FYM'],
    season: 'Zaid',
    growthDuration: '50-70 days'
  },
  'bottle_gourd': {
    description: 'Commonly grown summer vegetable with high water content.',
    idealConditions: { nitrogen: 50, phosphorus: 50, potassium: 50, temperature: 28, humidity: 70, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 10-10-10', 'Urea', 'FYM'],
    season: 'Zaid',
    growthDuration: '65-80 days'
  },
  'tea': {
    description: 'Major plantation crop grown in northeastern states and southern highlands.',
    idealConditions: { nitrogen: 50, phosphorus: 40, potassium: 40, temperature: 20, humidity: 80, ph: 5.5, rainfall: 200 },
    fertilizers: ['NPK 10-5-10', 'Ammonium Sulfate', 'Organic Matter'],
    season: 'Perennial',
    growthDuration: '3-5 years for first harvest'
  },
  'rubber': {
    description: 'Commercial plantation crop grown in Kerala and other southern states.',
    idealConditions: { nitrogen: 40, phosphorus: 30, potassium: 40, temperature: 27, humidity: 80, ph: 6.0, rainfall: 250 },
    fertilizers: ['NPK 10-10-10', 'Magnesium Sulfate', 'Organic Matter'],
    season: 'Perennial',
    growthDuration: '7-10 years for tapping'
  },
  'mulberry': {
    description: 'Cultivated for silkworm rearing, important for the sericulture industry.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 25, humidity: 75, ph: 6.5, rainfall: 100 },
    fertilizers: ['NPK 20-20-20', 'FYM', 'Urea'],
    season: 'Perennial',
    growthDuration: '6-8 months for first harvest'
  },
  'soybean': {
    description: 'Major oilseed and protein crop grown in central India.',
    idealConditions: { nitrogen: 30, phosphorus: 60, potassium: 40, temperature: 25, humidity: 70, ph: 6.5, rainfall: 80 },
    fertilizers: ['DAP', 'SSP', 'Rhizobium Culture'],
    season: 'Kharif',
    growthDuration: '90-120 days'
  },
  'green_gram': {
    description: 'Quick-growing pulse crop with high protein content.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 20, temperature: 28, humidity: 70, ph: 7.0, rainfall: 60 },
    fertilizers: ['DAP', 'SSP', 'Rhizobium Culture'],
    season: 'Kharif/Zaid',
    growthDuration: '60-70 days'
  },
  'horse_gram': {
    description: 'Drought-resistant legume grown in rain-fed conditions.',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 20, temperature: 25, humidity: 60, ph: 6.8, rainfall: 50 },
    fertilizers: ['Rock Phosphate', 'FYM', 'Low NPK'],
    season: 'Kharif',
    growthDuration: '120-140 days'
  },
  'cluster_bean': {
    description: 'Drought-tolerant legume used as vegetable and industrial gum (guar).',
    idealConditions: { nitrogen: 20, phosphorus: 40, potassium: 20, temperature: 30, humidity: 60, ph: 7.0, rainfall: 50 },
    fertilizers: ['FYM', 'DAP', 'SSP'],
    season: 'Kharif',
    growthDuration: '90-120 days'
  },
  'amaranthus': {
    description: 'Ancient grain and leafy vegetable with high nutritional value.',
    idealConditions: { nitrogen: 60, phosphorus: 40, potassium: 40, temperature: 25, humidity: 60, ph: 6.5, rainfall: 60 },
    fertilizers: ['NPK 15-15-15', 'Compost', 'Vermicompost'],
    season: 'Kharif/Zaid',
    growthDuration: '30-45 days (leafy), 90-120 days (grain)'
  },
  'quinoa': {
    description: 'New crop to India with high nutritional value, grown in highlands.',
    idealConditions: { nitrogen: 40, phosphorus: 40, potassium: 20, temperature: 20, humidity: 50, ph: 7.0, rainfall: 40 },
    fertilizers: ['NPK 10-20-10', 'Compost', 'FYM'],
    season: 'Rabi',
    growthDuration: '90-120 days'
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

// External API integration
const fetchExternalRecommendation = async (soilData: SoilData): Promise<CropRecommendation[] | null> => {
  try {
    // Using an example API endpoint - replace with your actual ML API
    const response = await fetch('https://crop-recommendation-ml-api.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nitrogen: soilData.nitrogen,
        phosphorus: soilData.phosphorus,
        potassium: soilData.potassium,
        temperature: soilData.temperature,
        humidity: soilData.humidity,
        ph: soilData.ph,
        rainfall: soilData.rainfall
      }),
    });

    if (!response.ok) {
      console.error('API error:', await response.text());
      return null;
    }

    const data = await response.json();
    
    // Map the external API response to our CropRecommendation format
    const recommendations = data.predictions.map((prediction: any) => {
      const cropName = prediction.crop.toLowerCase();
      const cropInfo = CROP_DATA[cropName] || {
        description: `A versatile crop suitable for your conditions.`,
        idealConditions: {},
        fertilizers: ['General purpose fertilizer']
      };
      
      return {
        crop: cropName,
        confidence: prediction.confidence * 100,
        suitabilityScore: prediction.suitability * 100,
        fertilizers: cropInfo.fertilizers,
        description: cropInfo.description,
        idealConditions: cropInfo.idealConditions,
        season: cropInfo.season,
        growthDuration: cropInfo.growthDuration
      };
    });
    
    return recommendations;
  } catch (error) {
    console.error('Error fetching from external API:', error);
    return null;
  }
};

// Original local calculation as fallback
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
    season: CROP_DATA[crop].season,
    growthDuration: CROP_DATA[crop].growthDuration
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
    timeoutId = setTimeout(async () => {
      try {
        // First try to get recommendations from the external API
        const externalRecommendations = await fetchExternalRecommendation(soilData);
        
        if (externalRecommendations && externalRecommendations.length > 0) {
          // Use external recommendations if available
          resolve(externalRecommendations);
        } else {
          // Fall back to local recommendations if external API fails
          console.log('Falling back to local recommendation model');
          resolve(getRecommendation(soilData));
        }
      } catch (error) {
        console.error('Error in recommendation service:', error);
        // Always provide a result even if errors occur
        resolve(getRecommendation(soilData));
      }
      
      timeoutId = null;
    }, 1200);
  });
};
