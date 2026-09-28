import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import PageLayout from './components/PageLayout'
import LanguageSelect from './pages/LanguageSelect'
import Login from './pages/Login'
import Home from './pages/Home'
import Weather from './pages/Weather'
import MandiPrices from './pages/MandiPrices'
import Assistant from './pages/Assistant'
import DiseaseDetection from './pages/DiseaseDetection'
import SoilHub from './pages/SoilHub'
import TraditionalWisdom from './pages/TraditionalWisdom'
import Profile from './pages/Profile'
import GovtSchemes from './pages/GovtSchemes'
import CropCalendar from './pages/CropCalendar'
import ExpertVerification from './pages/ExpertVerification'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/language" replace />
  return <>{children}</>
}

function App() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated)

  return (
    <Routes>
      {/* Auth screens are fullscreen, no layout */}
      <Route path="/language" element={isAuthenticated ? <Navigate to="/" replace /> : <LanguageSelect />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />

      {/* App routes with responsive layout */}
      <Route path="/" element={<ProtectedRoute><PageLayout title="Dashboard"><Home /></PageLayout></ProtectedRoute>} />
      <Route path="/weather" element={<ProtectedRoute><PageLayout title="Weather Intelligence"><Weather /></PageLayout></ProtectedRoute>} />
      <Route path="/mandi" element={<ProtectedRoute><PageLayout title="Live Mandi Prices"><MandiPrices /></PageLayout></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><PageLayout title="Kisan Mitra AI Assistant"><Assistant /></PageLayout></ProtectedRoute>} />
      <Route path="/disease" element={<ProtectedRoute><PageLayout title="Crop Disease Detection"><DiseaseDetection /></PageLayout></ProtectedRoute>} />
      <Route path="/soil" element={<ProtectedRoute><PageLayout title="Soil & Geography Hub"><SoilHub /></PageLayout></ProtectedRoute>} />
      <Route path="/traditional" element={<ProtectedRoute><PageLayout title="Traditional Wisdom"><TraditionalWisdom /></PageLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><PageLayout title="My Profile"><Profile /></PageLayout></ProtectedRoute>} />
      <Route path="/schemes" element={<ProtectedRoute><PageLayout title="Government Schemes"><GovtSchemes /></PageLayout></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><PageLayout title="Crop Calendar"><CropCalendar /></PageLayout></ProtectedRoute>} />
      <Route path="/expert" element={<ProtectedRoute><PageLayout title="Expert Verification"><ExpertVerification /></PageLayout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
