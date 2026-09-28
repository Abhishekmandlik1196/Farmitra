# 🔌 API Integration Guide – Farmitra

Yahan har API ko code mein kahan plug karna hai, exact file + section bataya hai.

## 📁 File: `.env` (root pe create karo)
Pehle root pe `.env` file banao, sab keys yahan rakho:
```env
VITE_OPEN_METEO_URL=https://api.open-meteo.com/v1
VITE_AGMARKNET_API_KEY=your_data_gov_in_key
VITE_GOOGLE_VISION_KEY=your_gcv_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=farmitra-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=farmitra-xxxxx
VITE_BHASHINI_KEY=your_bhashini_api_key
VITE_CLAUDE_API_KEY=sk-ant-xxx
VITE_GEMINI_KEY=your_gemini_key
VITE_TWILIO_SID=ACxxx
VITE_TWILIO_TOKEN=xxx
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
```

---

## 1. 🔐 Authentication (Phone + OTP / Expert Login)
**File:** `src/pages/Login.tsx`
- **Function:** `sendOtp(e)` (line 22 ke paas) – idhar Firebase/Supabase se OTP bhejo:
  ```ts
  // Firebase auth:
  import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
  // Ya Supabase:
  // const { error } = await supabase.auth.signInWithOtp({ phone: '+91' + phone })
  ```
- **Function:** `verifyOtp(e)` (line ~28) – OTP confirm karo:
  ```ts
  // const result = await confirmationResult.confirm(otp)
  // setUser({...result.user})
  ```
- **Expert login:** same file ke email+password form mein Firebase `signInWithEmailAndPassword` ya Supabase email auth lagao.

**Initialize Firebase/Supabase:** `src/main.tsx` mein pe initializeApp karo.

---

## 2. 🌤️ Weather API
**File:** `src/data/mockData.ts` (ya naya file banao `src/api/weather.ts`)
- **Source replace karo:** `mockWeather` object – isko Open-Meteo API se replace karo.
- **API:** `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&current=temperature_2m,relative_humidity_2m...&hourly=...&daily=...`
- **Call karo in pages:** `src/pages/Weather.tsx` mein `useEffect` lagao (line 7 ke paas) jo location ke according fetch kare:
  ```ts
  useEffect(() => {
    if (user?.location) {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${user.location.lat}&longitude=...`)
        .then(r => r.json())
        .then(setWeather)
    }
  }, [user?.location])
  ```
- **Fallback:** OpenWeatherMap API + IMD + NASA POWER (agro history).

---

## 3. 💰 Mandi Prices
**File:** `src/data/mockData.ts` → `mockMandiPrices`, `priceTrend` arrays replace karo.
- **API source:** data.gov.in Agmarknet API: `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=KEY&format=json&filters[crop]={crop}&filters[state]={state}`
- **e-NAM:** https://enam.gov.in/web/dashboard/trade-data (scrape/official API)
- **MSP data:** static file `src/data/msp.ts` mein rakho ya Krishi Bhawan feed.
- **Call location:** `src/pages/MandiPrices.tsx` mein `selectedCrop` change par `useEffect` fetch kare.
- **Redis cache + cron:** Backend (Node/Python) mein har 2 ghante refresh karo, frontend cached data le.

---

## 4. 🤖 Kisan Mitra AI Chat (RAG)
**File:** `src/pages/Assistant.tsx`
- **Function:** `sendMessage(e)` (line ~73) mein setTimeout wale fake AI response ki jagah real API call lagao:
  ```ts
  const res = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ query, history, location: user.location, weather, image: pendingImage })
  })
  ```
- **Backend route (`/api/chat`):**
  - Embedding: LangChain + Pinecone/Chroma/PgVector vector DB
  - KB mein daalo: ICAR books, SAU package of practices, KVK advisories, Soil Health Card guidelines, PM-KISAN scheme docs
  - LLM: Claude (Anthropic) ya Gemini (Google) – `VITE_CLAUDE_API_KEY` use karo
  - Image analysis: Claude Vision / Gemini Vision (photo diagnosis ke liye)
- **Voice (Bhashini):** Mic button ke onClick mein Bhashini ASRI API call → text → same chat flow.
- **TTS response:** Bhashini TTS ya Google TTS.

---

## 5. 🌱 Disease Detection (Vision Model)
**File:** `src/pages/DiseaseDetection.tsx`
- **Function:** `handleImage(file)` ke setTimeout wale mock diagnosis ko replace karo:
  - **Option A (Cloud):** FastAPI endpoint banao jo TensorFlow Lite/ONNX model serve kare (PlantVillage+PlantDoc trained model), ya Google Vision + fine-tuned model.
  - **Option B (On-device):** `tfjs` ya `onnxruntime-web` use karke browser mein hi inference karo (model `/public/model/` mein rakho).
  ```ts
  const predictions = await model.classify(imageTensor) // top-3 diseases
  setDiagnosisResult(predictions[0])
  ```
- **Confidence < 70%** to automatically expert chat par forward karo.
- **Disease library data:** `src/data/mockData.ts` ke `mockDiseases` ko real DB/JSON se replace karo (200+ diseases ki details).
- **Outbreak reports:** backend endpoint `/api/outbreaks` community geo-reports ke liye.

---

## 6. 🪴 Soil & Geography
**File:** `src/pages/SoilHub.tsx`, `src/data/mockData.ts`
- `mockSoilTypes` ko static hi rakho (NBSS&LUP data change nahi hota).
- **Agro-climatic zones:** bhi static data.
- **Soil Health Card recommendation:** `generateSHC(e)` formula ko ICAR recommendation engine se wire karo (ya backend logic).
- **Map tiles:** Already using OpenStreetMap (free, no key needed).

---

## 7. 🔔 Push/SMS/WhatsApp Alerts
**File:** Weather alerts section (`src/pages/Weather.tsx`, lines ~160) + Notifications (`src/store/useAppStore.ts`)
- **Push:** Firebase Cloud Messaging (FCM) – service worker mein `onMessage` handler.
- **WhatsApp/SMS:** Twilio ya MSG91 API – backend route `/api/notify` call karo jab user "Enable Alert" dabaye.
- **Voice Alerts:** Bhashini TTS se audio banao + Twilio call.

---

## 8. 📍 GPS Auto-Detect Location
**File:** `src/components/SettingsModal.tsx` ke "Detect my location" button mein add karo:
```ts
navigator.geolocation.getCurrentPosition(async (pos) => {
  // Reverse geocode with Nominatim/MapmyIndia API
  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`)
  const data = await res.json()
  // setLocation({lat, lng, state: data.address.state, district: data.address.county})
})
```

---

## 9. 👨‍🌾 Expert Verification Pipeline
**File:** `src/pages/ExpertVerification.tsx`
- **Document upload:** Supabase Storage / Firebase Storage (signed URLs, encrypted)
- **OCR:** Google Vision API / Tesseract.js for auto-extracting name/degree/university
- **Face match:** Face++ ya Azure Face API (selfie vs ID photo compare)
- **Admin dashboard:** naya route `/admin` banao jisme reviewers approve/reject kar sakein.
- **Database:** `experts` table with status columns: pending → under_review → verified/rejected.

---

## 10. 💬 Expert Chat
**File:** `src/components/ExpertChat.tsx`
- Currently mock/simulated hai. Real-time ke liye:
  - Socket.io ya Supabase Realtime
  - Messages table: `expert_messages(id, from_user, to_expert, text, image, timestamp, read)`
  - Expert list endpoint: `/api/experts/online`

---

## 📋 API Client Setup (Recommended)
Ek naya file `src/api/client.ts` banao jo sab API calls handle kare:
```ts
import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })
export default api
```
Phir har page se `import api from '@/api/client'` use karo.

---

## 🔑 Summary Table
| Feature | File | API / Service |
|---|---|---|
| Auth | `src/pages/Login.tsx` | Firebase / Supabase Auth |
| Weather | `src/pages/Weather.tsx` | Open-Meteo, IMD, NASA POWER |
| Mandi Prices | `src/pages/MandiPrices.tsx` | data.gov.in Agmarknet, e-NAM |
| AI Chat/RAG | `src/pages/Assistant.tsx` | Claude/Gemini + LangChain + Vector DB |
| Disease Detect | `src/pages/DiseaseDetection.tsx` | TFLite/ONNX or Cloud vision API |
| Voice | Assistant + Weather alerts | Bhashini API (ASR+TTS) |
| SMS/WhatsApp | Alerts + Notifications | Twilio / MSG91 |
| File uploads | Expert verification, chat | Supabase/Firebase Storage |
| Maps | All map pages | OpenStreetMap (already working free) |
| OCR/Face match | Expert verification | Google Vision, Azure Face |

Sab kuch `.env` variables se control hoga – code mein hardcoded keys mat rakhna.
