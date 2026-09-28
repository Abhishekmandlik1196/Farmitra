import { useState } from 'react'
import { X, MapPin, Globe, Save, User, Bell } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'

interface Props { open: boolean; onClose: () => void }

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'od', label: 'ଓଡ଼ିଆ' },
]

const states = ['Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh', 'Punjab', 'Haryana', 'Maharashtra', 'Gujarat', 'Bihar', 'West Bengal', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Odisha', 'Kerala', 'Assam']

const districtsByState: Record<string, string[]> = {
  'Madhya Pradesh': ['Guna', 'Indore', 'Bhopal', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Rewa'],
  'Rajasthan': ['Jaipur', 'Kota', 'Alwar', 'Udaipur', 'Jodhpur', 'Bikaner'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Meerut', 'Agra', 'Varanasi', 'Prayagraj'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar', 'Bathinda'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Asansol'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'Haryana': ['Gurugram', 'Faridabad', 'Karnal', 'Hisar'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat'],
}

export default function SettingsModal({ open, onClose }: Props) {
  const { t } = useTranslation()
  const user = useAppStore(s => s.user)
  const setLanguage = useAppStore(s => s.setLanguage)
  const setLocation = useAppStore(s => s.setLocation)
  const [state, setState] = useState(user?.location?.state || 'Madhya Pradesh')
  const [district, setDistrict] = useState(user?.location?.district || 'Guna')
  const [village, setVillage] = useState(user?.location?.village || '')

  const districts = districtsByState[state] || []

  const save = () => {
    setLocation({ lat: 23, lng: 77, state, district, village })
    onClose()
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 lg:inset-0 lg:flex lg:items-center lg:justify-center z-[70]">
        <div className="bg-white rounded-t-2xl lg:rounded-2xl w-full lg:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
            <h3 className="font-bold text-lg text-farm-dark">{t('settings')}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
          </div>

          <div className="p-4 space-y-5">
            {/* Language */}
            <div>
              <label className="flex items-center gap-2 font-medium text-sm mb-2">
                <Globe size={16} className="text-farm-primary" /> {t('language_setting')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`py-2 text-sm rounded-lg border ${
                      (user?.language || 'en') === l.code
                        ? 'border-farm-primary bg-farm-light text-farm-primary font-medium'
                        : 'border-gray-200 hover:border-farm-primary'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 font-medium text-sm mb-2">
                <MapPin size={16} className="text-farm-primary" /> {t('change_location')}
              </label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">{t('state_label')}</label>
                    <select value={state} onChange={e => { setState(e.target.value); setDistrict((districtsByState[e.target.value] || [''])[0]) }} className="input-field py-2 text-sm mt-0.5">
                      {states.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">{t('district_label')}</label>
                    <select value={district} onChange={e => setDistrict(e.target.value)} className="input-field py-2 text-sm mt-0.5">
                      {districts.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">{t('village_label')} (optional)</label>
                  <input value={village} onChange={e => setVillage(e.target.value)} placeholder="e.g. Rampur" className="input-field py-2 text-sm mt-0.5" />
                </div>
                <button onClick={save} className="btn-primary w-full flex items-center justify-center gap-2">
                  <Save size={16} /> Save Location
                </button>
              </div>
            </div>

            {/* Notification pref */}
            <div>
              <label className="flex items-center gap-2 font-medium text-sm mb-2">
                <Bell size={16} className="text-farm-primary" /> Notification Preferences
              </label>
              <div className="space-y-2">
                {['Weather Alerts', 'Price Alerts', 'Disease Outbreaks', 'Government Schemes'].map(label => (
                  <label key={label} className="flex items-center justify-between p-2 rounded-lg border border-gray-100">
                    <span className="text-sm">{label}</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-farm-primary rounded focus:ring-farm-primary" />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-medium text-sm mb-2">
                <User size={16} className="text-farm-primary" /> Account
              </label>
              <p className="text-xs text-gray-500 mb-2">Phone: +91 {user?.phone?.slice(3) || 'XXXXXX0000'}</p>
              <button className="w-full border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
