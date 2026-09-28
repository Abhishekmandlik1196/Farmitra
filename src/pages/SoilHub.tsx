import { useState } from 'react'
import { MapPin, Droplets, Leaf, CheckCircle, FileText } from 'lucide-react'
import { mockSoilTypes } from '../data/mockData'
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet'
import { useTranslation } from 'react-i18next'

export default function SoilHub() {
  const { t } = useTranslation()
  const [selectedSoil, setSelectedSoil] = useState(mockSoilTypes[1])
  const [showSoilCard, setShowSoilCard] = useState(false)
  const [recommendation, setRecommendation] = useState<null | { fertilizer: string; crops: string; tips: string[] }>(null)

  const [shc, setShc] = useState({
    n: '', p: '', k: '', ph: '', oc: ''
  })

  const generateSHC = (e: React.FormEvent) => {
    e.preventDefault()
    const n = parseFloat(shc.n) || 280
    const p = parseFloat(shc.p) || 25
    const ph = parseFloat(shc.ph) || 7.5

    let urea = 120, dap = 60, mop = 40
    let tips: string[] = []
    if (n < 280) { urea += 20; tips.push('Nitrogen low - add extra Urea or FYM') }
    if (p < 25) { dap += 10; tips.push('Phosphorus low - apply DAP at sowing') }
    if (ph > 8) { tips.push('Soil is alkaline - apply Gypsum @500kg/ha and green manure') }
    if (ph < 6) { tips.push('Soil is acidic - apply Lime @2t/ha') }
    if (tips.length === 0) tips.push('Soil health is good - follow standard nutrient schedule')

    setRecommendation({
      fertilizer: `Urea ${urea}kg/ha, DAP ${dap}kg/ha, MOP ${mop}kg/ha. Apply full DAP+MOP + 1/3 Urea at sowing. Remaining Urea in 2 splits at 21 and 45 DAS.`,
      crops: 'Wheat, Soybean, Gram, Mustard (suitable for your black soil, pH ' + ph + ')',
      tips
    })
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Current soil */}
      <div className="card" style={{ borderLeft: `4px solid ${selectedSoil.color}` }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl flex-shrink-0" style={{ backgroundColor: selectedSoil.color }}></div>
          <div>
            <p className="text-xs text-gray-500">Your location: Guna, MP</p>
            <h3 className="font-bold text-xl">{selectedSoil.name}</h3>
            <p className="text-sm text-gray-600 mt-1">pH Range: {selectedSoil.ph}</p>
            <p className="text-sm text-gray-700 mt-1">{selectedSoil.properties}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left: Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin size={18} className="text-farm-earth" /> {t('soil_types')} (NBSS&LUP)
            </h3>
            <div className="h-72 w-full rounded-xl overflow-hidden">
              <MapContainer center={[22.5, 80]} zoom={4} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polygon pathOptions={{ color: '#D4A574', fillOpacity: 0.5 }} positions={[[28,72],[31,79],[30,88],[24,88],[24,78],[26,72]]}>
                  <Popup>Alluvial - Indo Gangetic</Popup>
                </Polygon>
                <Polygon pathOptions={{ color: '#3D2314', fillOpacity: 0.5 }} positions={[[22,73],[17,73],[17,80],[22,80],[24,78]]}>
                  <Popup>Black (Regur) - Deccan Plateau</Popup>
                </Polygon>
                <Polygon pathOptions={{ color: '#B7410E', fillOpacity: 0.5 }} positions={[[20,77],[10,77],[10,82],[20,82]]}>
                  <Popup>Red Soil - South India</Popup>
                </Polygon>
                <Polygon pathOptions={{ color: '#EDC9AF', fillOpacity: 0.5 }} positions={[[30,69],[28,75],[24,75],[24,70]]}>
                  <Popup>Desert Soil - Rajasthan</Popup>
                </Polygon>
              </MapContainer>
            </div>
          </div>

          {/* Major soil types list */}
          <div className="card">
            <h3 className="font-semibold mb-3">Major Soil Types of India</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockSoilTypes.map(soil => (
                <button
                  key={soil.id}
                  onClick={() => setSelectedSoil(soil)}
                  className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    selectedSoil.id === soil.id ? 'border-farm-primary bg-green-50 ring-1 ring-farm-primary' : 'border-gray-200 hover:border-farm-primary/40 bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: soil.color }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{soil.name}</p>
                    <p className="text-xs text-gray-500 truncate">{soil.states}</p>
                    <p className="text-xs text-farm-primary mt-1">pH {soil.ph} · <span className="text-gray-600">{soil.suitable_crops.split(',')[0]} etc.</span></p>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected soil details - right below list */}
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedSoil.color }}></div>
                <h4 className="font-bold text-farm-dark">{selectedSoil.name} - Details</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">pH Range</p>
                  <p className="font-medium">{selectedSoil.ph}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Regions Found</p>
                  <p className="text-sm">{selectedSoil.states}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500">Properties</p>
                  <p className="text-sm">{selectedSoil.properties}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Leaf size={12} /> Suitable Crops</p>
                  <p className="text-sm font-medium text-farm-primary">{selectedSoil.suitable_crops}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Droplets size={12} /> Management</p>
                  <p className="text-sm">{selectedSoil.management}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Soil Health Card */}
        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-farm-earth to-amber-900 text-white">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <FileText size={20} /> {t('soil_health_card')}
            </h3>
            <p className="text-amber-100 text-sm mb-3">Enter your soil test values (kg/ha or standard units) for personalized fertilizer and crop recommendations</p>

            {!showSoilCard ? (
              <button onClick={() => setShowSoilCard(true)} className="w-full bg-white text-farm-earth font-medium rounded-lg py-2.5 mt-2 hover:bg-amber-50 transition-colors">
                Enter Soil Test Values
              </button>
            ) : !recommendation ? (
              <form onSubmit={generateSHC} className="space-y-3 mt-2">
                {[
                  { key: 'n', label: t('nitrogen'), placeholder: '280 (kg/ha)', color: 'bg-white/10' },
                  { key: 'p', label: t('phosphorus'), placeholder: '25 (kg/ha)', color: 'bg-white/10' },
                  { key: 'k', label: t('potassium'), placeholder: '240 (kg/ha)', color: 'bg-white/10' },
                  { key: 'ph', label: t('ph_level'), placeholder: '7.5', color: 'bg-white/10' },
                  { key: 'oc', label: t('organic_carbon'), placeholder: '0.5%', color: 'bg-white/10' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-amber-100 block mb-1">{f.label}</label>
                    <input
                      value={(shc as any)[f.key]}
                      onChange={e => setShc({ ...shc, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full rounded-lg bg-white/15 border border-white/20 text-white placeholder-white/50 px-3 py-2 text-sm focus:bg-white/25"
                      type="number"
                      step="0.1"
                    />
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={() => setShowSoilCard(false)} className="flex-1 bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm">Cancel</button>
                  <button type="submit" className="flex-1 bg-farm-secondary text-farm-dark font-medium rounded-lg py-2 text-sm">{t('generate_recommendation')}</button>
                </div>
              </form>
            ) : (
              <div className="bg-white/15 rounded-xl p-3 space-y-3 mt-2">
                <p className="text-xs text-amber-100 font-medium flex items-center gap-1"><CheckCircle size={14} /> Recommendation for your soil</p>
                <div>
                  <p className="text-xs text-amber-100">Fertilizer Dose</p>
                  <p className="text-sm mt-0.5">{recommendation.fertilizer}</p>
                </div>
                <div>
                  <p className="text-xs text-amber-100">Recommended Crops</p>
                  <p className="text-sm mt-0.5">{recommendation.crops}</p>
                </div>
                <div>
                  <p className="text-xs text-amber-100">Key Tips</p>
                  <ul className="text-sm mt-1 space-y-1">
                    {recommendation.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-1"><CheckCircle size={14} className="flex-shrink-0 mt-0.5" /> {tip}</li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => { setRecommendation(null); setShowSoilCard(false) }} className="w-full bg-white text-farm-earth font-medium rounded-lg py-2 text-sm mt-2">New Test</button>
              </div>
            )}
          </div>

          {/* Agro Climatic Zones */}
          <div className="card">
            <h4 className="font-semibold mb-3">15 Agro-Climatic Zones</h4>
            <div className="space-y-2 text-sm">
              <p className="p-2 bg-green-50 rounded-lg"><strong>Zone 10:</strong> Central Plateau & Hills (MP) - your zone</p>
              <p className="text-xs text-gray-500 px-2">Annual rainfall: 1000-1200 mm. Black/red soils. Major crops: Soybean, Wheat, Gram, Cotton.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
