// Mock data for demo - in production these come from real APIs

export const mockWeather = {
  current: {
    temp: 28,
    feels_like: 30,
    humidity: 65,
    wind_speed: 12,
    rainfall_prob: 20,
    uv_index: 6,
    soil_temp: 26,
    condition: 'Partly Cloudy',
    icon: '⛅'
  },
  hourly: [
    { time: 'Now', temp: 28, rain: 10, icon: '⛅' },
    { time: '12PM', temp: 30, rain: 5, icon: '☀️' },
    { time: '1PM', temp: 32, rain: 5, icon: '☀️' },
    { time: '2PM', temp: 33, rain: 15, icon: '🌤️' },
    { time: '3PM', temp: 32, rain: 40, icon: '🌧️' },
    { time: '4PM', temp: 30, rain: 60, icon: '🌧️' },
    { time: '5PM', temp: 29, rain: 30, icon: '🌦️' },
    { time: '6PM', temp: 27, rain: 10, icon: '⛅' },
  ],
  daily: [
    { day: 'Today', high: 33, low: 24, rain: 60, icon: '🌧️', condition: 'Light Rain' },
    { day: 'Tue', high: 32, low: 23, rain: 30, icon: '🌦️', condition: 'Partly Cloudy' },
    { day: 'Wed', high: 34, low: 24, rain: 10, icon: '☀️', condition: 'Sunny' },
    { day: 'Thu', high: 35, low: 25, rain: 5, icon: '☀️', condition: 'Sunny' },
    { day: 'Fri', high: 33, low: 24, rain: 40, icon: '🌤️', condition: 'Scattered Showers' },
    { day: 'Sat', high: 31, low: 23, rain: 70, icon: '🌧️', condition: 'Heavy Rain Warning' },
    { day: 'Sun', high: 30, low: 22, rain: 20, icon: '⛅', condition: 'Partly Cloudy' },
  ],
  alerts: [
    { id: 1, type: 'warning', title: 'Heavy Rain Expected', message: 'Saturday 3PM - Sunday 8AM. Delay pesticide spraying.', severity: 'high' },
    { id: 2, type: 'info', title: 'Best Sowing Window', message: 'Wednesday to Friday - ideal moisture and temperature for wheat sowing.', severity: 'low' },
    { id: 3, type: 'alert', title: 'Pest Risk High', message: 'Current humidity favourable for aphid attack on mustard. Monitor fields.', severity: 'medium' },
  ]
}

export const mockMandiPrices = [
  { crop: 'Wheat', state: 'Madhya Pradesh', district: 'Guna', mandi: 'Guna Mandi', min: 2100, max: 2300, modal: 2200, msp: 2125, distance: 0 },
  { crop: 'Wheat', state: 'Madhya Pradesh', district: 'Guna', mandi: 'Aron Mandi', min: 2125, max: 2275, modal: 2210, msp: 2125, distance: 18 },
  { crop: 'Wheat', state: 'Madhya Pradesh', district: 'Shivpuri', mandi: 'Shivpuri Mandi', min: 2150, max: 2350, modal: 2275, msp: 2125, distance: 42 },
  { crop: 'Wheat', state: 'Rajasthan', district: 'Kota', mandi: 'Kota Mandi', min: 2200, max: 2400, modal: 2300, msp: 2125, distance: 125 },
  { crop: 'Rice', state: 'Punjab', district: 'Ludhiana', mandi: 'Ludhiana Mandi', min: 2050, max: 2250, modal: 2180, msp: 2183, distance: 650 },
  { crop: 'Soybean', state: 'Madhya Pradesh', district: 'Indore', mandi: 'Indore Mandi', min: 4200, max: 4600, modal: 4450, msp: 4600, distance: 180 },
  { crop: 'Mustard', state: 'Rajasthan', district: 'Alwar', mandi: 'Alwar Mandi', min: 5400, max: 5800, modal: 5650, msp: 5650, distance: 280 },
  { crop: 'Tomato', state: 'Madhya Pradesh', district: 'Bhopal', mandi: 'Bhopal Mandi', min: 800, max: 2200, modal: 1400, msp: 0, distance: 200 },
  { crop: 'Onion', state: 'Maharashtra', district: 'Lasalgaon', mandi: 'Lasalgaon Mandi', min: 1500, max: 2800, modal: 2100, msp: 0, distance: 580 },
]

export const mockCrops = ['Wheat', 'Rice', 'Soybean', 'Mustard', 'Maize', 'Cotton', 'Tomato', 'Onion', 'Potato', 'Sugarcane', 'Gram', 'Tur Dal']

export const mockSoilTypes = [
  { id: 'alluvial', name: 'Alluvial Soil', color: '#D4A574', states: 'Indo-Gangetic plains, Gujarat, deltas', ph: '6.5 - 8.0', suitable_crops: 'Wheat, Rice, Sugarcane, Cotton, Pulses', properties: 'Very fertile, high in potash, low in nitrogen and organic matter', management: 'Add green manure, crop rotation with legumes' },
  { id: 'black', name: 'Black (Regur) Soil', color: '#3D2314', states: 'Deccan plateau: Maharashtra, Gujarat, Madhya Pradesh, Telangana', ph: '7.2 - 8.5', suitable_crops: 'Cotton, Soybean, Wheat, Jowar, Oilseeds', properties: 'High clay content, high water retention, rich in lime, magnesium, potash; low in nitrogen, phosphorus', management: 'Avoid waterlogging, add gypsum if alkaline' },
  { id: 'red', name: 'Red Soil', color: '#B7410E', states: 'South India, parts of Odisha, Chhattisgarh', ph: '5.5 - 7.0', suitable_crops: 'Millets, Pulses, Oilseeds, Cotton, Vegetables', properties: 'Low in nutrients, porous, friable, rich in iron oxide', management: 'Add compost, fertilizers, proper irrigation' },
  { id: 'laterite', name: 'Laterite Soil', color: '#C46210', states: 'High rainfall areas: Kerala, Karnataka, Assam hills', ph: '4.5 - 6.5', suitable_crops: 'Tea, Coffee, Rubber, Cashew, Coconut, Spices', properties: 'High iron/aluminium, low nutrients, hardens when dry', management: 'Add organic matter, terracing for slopes' },
  { id: 'desert', name: 'Desert Soil', color: '#EDC9AF', states: 'Rajasthan, parts of Gujarat', ph: '7.6 - 8.4', suitable_crops: 'Bajra, Guar, Dates, Mustard, Wheat (with irrigation)', properties: 'Sandy, low organic matter, high salt, low water retention', management: 'Drip irrigation, wind breaks, green manuring' },
  { id: 'mountain', name: 'Mountain Soil', color: '#6B8E23', states: 'Himalayan regions, Western Ghats', ph: '5.0 - 6.5', suitable_crops: 'Tea, Fruits, Maize, Wheat, Barley', properties: 'Thin layer, rich in humus in forests, acidic', management: 'Terrace farming, contour ploughing' },
]

export const mockDiseases = [
  { id: 'leaf_rust_wheat', name: 'Wheat Leaf Rust', local_name: 'गेरुआ रोग', category: 'fungal', crops: ['Wheat'], symptoms: 'Orange-brown pustules on leaves, appears in cool humid weather', treatment_organic: 'Spray neem oil 5ml/L + cow dung slurry', treatment_chemical: 'Propiconazole 25EC @ 0.1%, Tebuconazole @ 0.1%', dosage_note: 'Spray at first symptom, repeat after 15 days', favourable_conditions: '15-22°C temperature, high humidity, cloudy days', images: ['https://picsum.photos/id/118/400/300'] },
  { id: 'blight_rice', name: 'Rice Blast', local_name: 'अंगमारी रोग', category: 'fungal', crops: ['Rice'], symptoms: 'Diamond-shaped lesions with grey centre on leaves, rotting of neck', treatment_organic: 'Tulsi leaf extract, Trichoderma viride @ 4g/kg seed', treatment_chemical: 'Tricyclazole 75WP @ 0.06%, Carbendazim 50WP @ 0.1%', dosage_note: 'Ensure complete coverage, avoid toxic period', favourable_conditions: '24-28°C, high humidity, leaf wetness >6 hours', images: ['https://picsum.photos/id/119/400/300'] },
  { id: 'early_blight_tomato', name: 'Early Blight (Tomato)', local_name: 'अगेती झुलसा', category: 'fungal', crops: ['Tomato', 'Potato'], symptoms: 'Concentric ring spots on lower leaves, stem lesions', treatment_organic: 'Jeevamrut spray, copper sulphate + lime (Bordeaux mixture)', treatment_chemical: 'Mancozeb 75WP @ 0.25%, Azoxystrobin @ 0.1%', dosage_note: 'Rotate chemicals to prevent resistance', favourable_conditions: '24-29°C, intermittent rain, dew', images: ['https://picsum.photos/id/120/400/300'] },
]

export const mockTraditionalPractices = [
  { id: 'panchagavya', name: 'Panchagavya', description: 'Traditional organic input made from five cow products: cow dung, cow urine, milk, curd, ghee, fermented with other ingredients', scientific_validation: 'Proven to contain growth regulators, beneficial microorganisms; improves soil health and plant immunity', use_cases: 'Foliar spray, soil drench, seed treatment', tech_version: 'AI-powered dosage calculators based on crop stage and soil health, targeted spray schedules' },
  { id: 'jeevamrut', name: 'Jeevamrut', description: 'Fermented microbial culture made with cow dung, cow urine, jaggery, gram flour and soil', scientific_validation: 'Boosts native soil microbial activity by up to 300%, enhances nutrient availability, suppresses pathogens', use_cases: 'Soil application, foliar spray for all crops', tech_version: 'IoT soil sensor triggers application when microbial activity drops' },
  { id: 'zbnf', name: 'Zero Budget Natural Farming', description: 'Subhash Palekar methodology using only local inputs, no external chemicals/fertilizers', scientific_validation: 'Multiple field trials show reduced input costs by 60-80%, maintained yields in rainfed areas', use_cases: 'All crop types, especially smallholder farms', tech_version: 'Digital crop calendar tailored for ZBNF practices with local weather integration' },
  { id: 'crop_rotation', name: 'Crop Rotation & Mixed Cropping', description: 'Traditional practice of rotating legumes with cereals, growing multiple crops together', scientific_validation: 'Reduces pest build-up, improves soil fertility, reduces risk of total crop failure, increases biodiversity', use_cases: 'All farming systems', tech_version: 'AI recommends optimal crop combinations and rotation schedules based on soil, climate and market prices' },
  { id: 'johad', name: 'Johad Water Harvesting', description: 'Traditional earthen check dams in Haryana/Rajasthan to capture rainwater and recharge groundwater', scientific_validation: 'Raises groundwater table by 3-5m in surrounding villages, increases well water availability', use_cases: 'Dryland and semi-arid regions', tech_version: 'Satellite mapping identifies optimal locations for new johads, IoT water level monitors' },
]

export const mockGovtSchemes = [
  { name: 'PM-KISAN', description: 'Rs 6000 per year direct benefit transfer to all eligible farmer families', eligibility: 'All landholding farmer families', link: 'https://pmkisan.gov.in' },
  { name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)', description: 'Crop insurance against natural calamities, pests and diseases at very low premium', eligibility: 'All farmers growing notified crops', link: 'https://pmfby.gov.in' },
  { name: 'Kisan Credit Card (KCC)', description: 'Short term credit at 4% interest for crop cultivation, allied activities', eligibility: 'All farmers, tenants, sharecroppers', link: 'https://www.myscheme.gov.in/schemes/kcc' },
  { name: 'Soil Health Card Scheme', description: 'Free soil testing and nutrient recommendations for every farm every 2 years', eligibility: 'All farmers', link: 'https://soilhealth.dac.gov.in' },
  { name: 'PM AASHA', description: 'Price support and price deficiency payment scheme for oilseeds and pulses', eligibility: 'Farmers growing notified oilseeds/pulses', link: '' },
]

export const mockChatResponses = [
  { query: 'when to sow wheat', answer: 'Wheat sowing in your region (Madhya Pradesh) is ideal from 15 October to 15 November. Current weather shows good soil moisture expected next week, which is perfect for sowing. Recommended seed rate: 100 kg/ha for timely sown wheat. Treat seeds with Trichoderma @4g/kg before sowing for disease protection.', confidence: 0.95, source: 'ICAR Indian Institute of Wheat and Barley Research' },
  { query: 'fertilizer for rice', answer: 'For transplanted rice, recommended fertilizer dose is 120:60:40 kg NPK per hectare. Apply full P and K + 1/3 N at transplanting, 1/3 N at tillering stage, 1/3 N at panicle initiation. For your soil type (black soil), add 5 tonnes of FYM per hectare before ploughing. Use neem-coated urea to reduce nitrogen loss.', confidence: 0.92, source: 'JNKVV Jabalpur Package of Practices' },
]

// India state coordinates for map
export const indiaStatesCoords: Record<string, [number, number]> = {
  'Madhya Pradesh': [23.47, 77.94],
  'Rajasthan': [27.02, 74.22],
  'Uttar Pradesh': [26.85, 80.91],
  'Punjab': [31.15, 75.34],
  'Haryana': [29.06, 76.08],
  'Maharashtra': [19.75, 75.71],
  'Gujarat': [22.26, 71.19],
  'Bihar': [25.79, 85.31],
  'West Bengal': [22.99, 87.85],
  'Tamil Nadu': [11.13, 78.66],
  'Karnataka': [15.32, 75.72],
  'Telangana': [17.97, 79.59],
  'Andhra Pradesh': [15.91, 79.74],
  'Odisha': [20.54, 85.15],
  'Kerala': [10.85, 76.27],
  'Assam': [26.24, 92.53],
}
