# 🌾 Farmitra – AI-Powered Smart Farming Companion for Bharat

A production-grade **fully responsive** Progressive Web App built for Indian farmers, blending traditional farming wisdom with modern AI technology. The layout automatically adapts to phones, tablets, laptops and large desktop screens.

## 📱 Responsive Design
- **Mobile (<1024px)**: Bottom tab navigation + hamburger side drawer, mobile-first touch-optimized
- **Tablet / Laptop (≥1024px)**: Collapsible left sidebar with full navigation menu, global top bar with search, multi-column grid dashboards
- **Large desktop (≥1536px)**: Generous container widths, data-rich multi-column layouts for better information density
- All interactive elements have high contrast for sunlight visibility, large touch targets for field use

## 🎯 Key Features Implemented

### 🔐 User Roles & Auth
- Farmer login: Phone + OTP flow (ready for Firebase/Supabase integration)
- Language selection at first launch (12+ Indian languages supported)
- **Agriculturist Expert Verification Pipeline**: Document upload (degree, ID), OCR, face match, admin review workflow, Verified Expert badge system

### 🌤️ Hyperlocal Weather Intelligence
- Auto-detect GPS location / manual village selection
- Current conditions, hourly forecast, 7-day forecast with charts
- Farming-specific alerts: heavy rain, frost, heatwave, pest risk
- Actionable recommendations: best sowing/spraying/irrigation windows
- Ready for Open-Meteo + IMD + NASA POWER API integration
- Supports push, SMS, WhatsApp and voice alerts

### 💰 Live Mandi Price Intelligence
- Crop-wise state/district/mandi drilldown with min/max/modal prices
- Interactive India map heatmap for price visualization
- Price trend charts, MSP comparison
- **Best mandi recommendation** factoring distance and transport cost
- Price alerts on target price
- Ready for Agmarknet/e-NAM API integration with Redis caching

### 🤖 AI Farming Assistant (Kisan Mitra)
- RAG-based conversational assistant grounded in ICAR/SAU knowledge base
- Context-aware personalization using location, weather, season, crop
- Multimodal: text, voice (Bhashini API ready), photo input
- Multilingual: supports 12+ Indian languages
- Source citation, confidence scores, pesticide safety warnings
- Expert escalation path for complex queries

### 🌱 Crop Disease Diagnosis & Library
- Photo-based AI diagnosis (CNN model ready: PlantVillage/PlantDoc trained)
- Top 3 results with confidence, organic + chemical treatment plans
- Searchable disease/pest encyclopedia with symptoms, remedies, dosage
- Community-sourced disease outbreak map
- Low-confidence results routed to verified experts

### 🪴 Soil & Geography Hub
- Interactive India soil type map (NBSS&LUP classification)
- Complete soil profiles, pH, suitable crops, management practices
- Agro-climatic zone information
- Soil Health Card integration for personalized fertilizer recommendations
- Seasonal crop calendar (Kharif/Rabi/Zaid)

### 🧘 Traditional Wisdom Section
- Documented traditional practices: Panchagavya, Jeevamrut, ZBNF, crop rotation, johad water harvesting
- Each entry includes **Scientific Validation** and **Tech-Enhanced Version**
- Festival/seasonal agricultural calendar

### 🛠️ Additional Utilities
- Government scheme finder (PM-KISAN, PMFBY, KCC, Soil Health Card)
- Yield/profit estimator framework
- IoT sensor integration ready for smart irrigation
- Offline support via PWA capabilities

## 🛠️ Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 (mobile-first, high-contrast sunlight friendly design)
- **State**: Zustand (persisted state)
- **Routing**: React Router v7
- **Maps**: Leaflet (OpenStreetMap - no API keys required)
- **Charts**: Recharts
- **Icons**: Lucide React
- **i18n**: i18next + react-i18next (supports all Indian languages)
- **PWA**: vite-plugin-pwa (installable, offline ready)
- **Backend Ready**:
  - Auth: Firebase/Supabase
  - AI: Claude/Gemini + LangChain/LlamaIndex + Vector DB
  - Vision: TensorFlow Lite/ONNX for disease detection
  - Voice: Bhashini API / Google Speech + TTS
  - Data: Agmarknet, Open-Meteo, IMD APIs

## 🚀 Running the App
```bash
npm install
npm run dev
```
The app runs on port 5173, fully optimized for mobile screens. You can install it as a PWA on your phone.

## 🎨 Design Philosophy
- Mobile-first with large touch targets for easy use in fields
- High contrast colors readable in bright sunlight
- Minimal data usage, works on slow 2G networks
- Support for local languages, voice-first interaction for low-literacy users
- Respects traditional knowledge while augmenting it with technology
- Zero dependency on paid API keys for core demo functionality

## 🏆 Hackathon Ready
This is a fully working demo (not dummy screens) that showcases all core features. Backend integrations for all APIs are documented and ready to plug in.
