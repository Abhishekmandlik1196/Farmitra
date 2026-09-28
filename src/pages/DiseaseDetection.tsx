import { useState, useRef } from 'react'
import { Upload, Camera, Search, AlertTriangle, CheckCircle, ShieldAlert, MapPin, Leaf, Bug, Activity, RefreshCw, XCircle } from 'lucide-react'
import { mockDiseases } from '../data/mockData'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useTranslation } from 'react-i18next'

type Tab = 'detect' | 'library' | 'outbreak'

export default function DiseaseDetection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<Tab>('detect')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDiagnosing, setIsDiagnosing] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState<typeof mockDiseases[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  const handleImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = ev => {
      setUploadedImage(ev.target?.result as string)
      setIsDiagnosing(true)
      setTimeout(() => { setIsDiagnosing(false); setDiagnosisResult(mockDiseases[0]) }, 2500)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImage(file)
  }

  const reset = () => { setUploadedImage(null); setDiagnosisResult(null) }

  const tabs = [
    { id: 'detect' as Tab, label: t('ai_diagnosis'), icon: Bug },
    { id: 'library' as Tab, label: t('disease_library'), icon: Leaf },
    { id: 'outbreak' as Tab, label: t('outbreak_map'), icon: MapPin }
  ]

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fungal', label: 'Fungal' },
    { id: 'bacterial', label: 'Bacterial' },
    { id: 'viral', label: 'Viral' },
    { id: 'pest', label: 'Insect Pest' },
  ]

  const filteredDiseases = mockDiseases.filter(d => {
    const matchSearch = !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.crops.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    const matchCat = selectedCategory === 'all' || d.category === selectedCategory
    return matchSearch && matchCat
  })

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Tabs - horizontal scroll on mobile, pill buttons */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-farm-primary text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:border-farm-primary'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'detect' && (
        <>
          {!uploadedImage ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2">
                <div className="card text-center py-16 border-2 border-dashed border-farm-primary/30 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="inline-flex w-24 h-24 rounded-full bg-white shadow-lg items-center justify-center mb-6">
                    <Bug size={44} className="text-farm-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-farm-dark mb-2">{t('scan_crop')}</h3>
                  <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto px-4">
                    Take a clear photo of the affected leaf, stem or fruit in natural sunlight. Our AI will diagnose the disease in seconds with treatment plan.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 px-6 max-w-md mx-auto">
                    <label className="btn-primary flex-1 flex items-center justify-center gap-2 cursor-pointer">
                      <Camera size={18} /> {t('take_photo')}
                      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleUpload} />
                    </label>
                    <label className="btn-outline flex-1 flex items-center justify-center gap-2 cursor-pointer">
                      <Upload size={18} /> {t('upload_gallery')}
                      <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                    </label>
                  </div>

                  <p className="text-xs text-gray-500 mt-6 flex items-center justify-center gap-1">
                    <ShieldAlert size={14} /> Images processed securely. Never shared without consent.
                  </p>
                </div>

                {/* How to take a good photo */}
                <div className="card mt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity size={18} className="text-farm-primary" /> Tips for accurate diagnosis
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    {[
                      { icon: Camera, t: 'Natural Light', d: 'Take photo in daylight, avoid flash or shadows' },
                      { icon: Leaf, t: 'Close Focus', d: 'Capture affected leaf/stem at close range with clear focus' },
                      { icon: Bug, t: 'Show Both Sides', d: 'Include healthy and diseased parts for comparison' }
                    ].map((tip, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <tip.icon size={20} className="text-farm-primary mb-1" />
                        <p className="font-medium text-sm">{tip.t}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{tip.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card bg-blue-50 border-blue-200">
                  <p className="font-semibold text-blue-900 mb-1">AI Model Info</p>
                  <p className="text-xs text-blue-800">Trained on 50,000+ images of 100+ crop diseases from PlantVillage + PlantDoc datasets. 94% accuracy.</p>
                </div>
                <div className="card">
                  <p className="font-semibold mb-2">Recently Detected Nearby</p>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <p className="font-medium">Wheat Leaf Rust</p>
                      <p className="text-xs text-gray-500">5km away · 2 days ago</p>
                    </div>
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <p className="font-medium">Aphid on Mustard</p>
                      <p className="text-xs text-gray-500">18km away · 5 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : isDiagnosing ? (
            <div className="card text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-farm-light"></div>
                <div className="absolute inset-0 rounded-full border-4 border-farm-primary border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center"><Bug size={36} className="text-farm-primary" /></div>
              </div>
              <h3 className="font-bold text-xl text-farm-dark">{t('analyzing')}</h3>
              <p className="text-gray-500 text-sm mt-2">Identifying patterns across 100+ crop diseases</p>
              <div className="mt-6 max-w-sm mx-auto space-y-1 text-xs text-left text-gray-500">
                <p className="flex items-center gap-2 text-green-600"><CheckCircle size={14} /> Image quality check passed</p>
                <p className="flex items-center gap-2 text-green-600"><CheckCircle size={14} /> Plant part detected: Leaf</p>
                <p className="flex items-center gap-2"><RefreshCw size={14} className="animate-spin" /> Matching against disease database...</p>
              </div>
            </div>
          ) : diagnosisResult && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="relative">
                  <img src={uploadedImage} alt="Uploaded crop" className="w-full h-72 object-cover rounded-xl shadow-md" />
                  <button onClick={reset} className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black/80">
                    <XCircle size={18} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={14} /> 87% match
                  </div>
                </div>

                <div className="card border-l-4 border-yellow-500 bg-yellow-50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={22} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-yellow-700 font-medium">MOST PROBABLE DISEASE</p>
                      <p className="font-bold text-xl text-farm-dark">{diagnosisResult.name}</p>
                      <p className="text-sm text-gray-600">{diagnosisResult.local_name} · {diagnosisResult.category}</p>
                      <p className="text-xs text-gray-500 mt-1">Confidence: 87% · Affected crops: {diagnosisResult.crops.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><ShieldAlert size={18} className="text-red-600" /> Symptoms</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{diagnosisResult.symptoms}</p>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs font-medium text-blue-800">Favourable conditions</p>
                    <p className="text-sm text-blue-700">{diagnosisResult.favourable_conditions}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-green-50 border-green-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-800"><Leaf size={18} /> Organic/Desi Treatment</h4>
                    <p className="text-sm text-green-900">{diagnosisResult.treatment_organic}</p>
                  </div>
                  <div className="card bg-blue-50 border-blue-200">
                    <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-800">Chemical Treatment</h4>
                    <p className="text-sm text-blue-900">{diagnosisResult.treatment_chemical}</p>
                    <p className="text-xs text-red-700 mt-2 flex items-start gap-1">
                      <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                      {diagnosisResult.dosage_note}. Always wear protective gear. Wait 15 days before harvesting.
                    </p>
                  </div>
                </div>

                <button className="btn-secondary w-full flex items-center justify-center gap-2">
                  <CheckCircle size={18} /> Get Expert Confirmation
                </button>
              </div>

              <div className="space-y-4">
                <div className="card">
                  <p className="font-semibold mb-2">Other Possibilities</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded-lg flex justify-between">
                      <span className="text-sm">Leaf Blight</span><span className="text-xs font-medium text-yellow-600">58%</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg flex justify-between">
                      <span className="text-sm">Nutrient Deficiency</span><span className="text-xs font-medium text-orange-600">32%</span>
                    </div>
                  </div>
                </div>
                <button onClick={reset} className="btn-outline w-full flex items-center justify-center gap-2">
                  <RefreshCw size={16} /> Scan Another Photo
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === 'library' && (
        <>
          <div className="card">
            <div className="relative mb-3">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search disease, crop, pest..." className="input-field pl-10" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {categories.map(c => (
                <button key={c.id} onClick={() => setSelectedCategory(c.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm border ${
                    selectedCategory === c.id ? 'bg-farm-primary text-white border-farm-primary' : 'bg-white border-gray-200 text-gray-700'
                  }`}>{c.label}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDiseases.map(d => (
              <div key={d.id} className="card hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bug size={32} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.local_name}</p>
                    <span className="badge bg-red-100 text-red-700 mt-1">{d.crops.join(', ')}</span>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{d.symptoms}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'outbreak' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card lg:col-span-2">
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin size={18} className="text-red-500" /> Disease Outbreak Map</h3>
            <p className="text-xs text-gray-500 mb-2">Community-reported outbreaks in your region</p>
            <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-200">
              <MapContainer center={[23, 78]} zoom={5} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[23.2, 77.4]}><Popup>Wheat Leaf Rust · Guna · 2 days ago</Popup></Marker>
                <Marker position={[23.5, 77.8]}><Popup>Aphid attack · Ashoknagar · 5 days ago</Popup></Marker>
                <Marker position={[22.7, 75.9]}><Popup>Late blight · Indore · 1 week ago</Popup></Marker>
              </MapContainer>
            </div>
          </div>
          <div className="card">
            <h4 className="font-semibold mb-3">Reported Near You</h4>
            <div className="space-y-2">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="text-sm font-medium">Wheat Leaf Rust</p>
                <p className="text-xs text-gray-600">Guna · 5km away · 2 days ago</p>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <p className="text-sm font-medium">Aphid on Mustard</p>
                <p className="text-xs text-gray-600">Aron · 18km · 5 days ago</p>
              </div>
              <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
                <p className="text-sm font-medium">Late Blight</p>
                <p className="text-xs text-gray-600">Indore · 180km · 1 week ago</p>
              </div>
            </div>
            <button className="btn-primary w-full mt-4 text-sm py-2">Report Disease in Your Area</button>
          </div>
        </div>
      )}
    </div>
  )
}
