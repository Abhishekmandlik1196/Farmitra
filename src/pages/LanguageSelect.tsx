import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'od', name: 'ଓଡ଼ିଆ' },
]

export default function LanguageSelect() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const selectLanguage = (langCode: string) => {
    try { localStorage.setItem('farmitra-language', langCode) } catch {}
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-primary via-green-700 to-emerald-900 p-6 flex flex-col">
      <div className="text-center mb-8 mt-8 lg:mt-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl mb-6 shadow-xl">
          <span className="text-5xl">🌾</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t('welcome')}</h1>
        <p className="text-green-100 max-w-md mx-auto">{t('tagline')}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 flex-1 max-w-2xl mx-auto w-full">
        <h2 className="text-lg font-semibold text-farm-dark mb-4 text-center">{t('select_language')}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {languages.map(lang => (
            <button key={lang.code} onClick={() => selectLanguage(lang.code)}
              className="p-4 border border-gray-200 rounded-xl hover:border-farm-primary hover:bg-farm-light active:scale-95 transition-all text-left flex items-center justify-between group">
              <span className="font-medium text-farm-dark">{lang.name}</span>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-farm-primary transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-green-200 text-xs mt-4">12 Indian languages supported · Voice input available</p>
    </div>
  )
}
