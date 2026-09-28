import { Menu, Search, Bell, MapPin, Mic, Globe, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'
import NotificationsPanel from './NotificationsPanel'
import SettingsModal from './SettingsModal'

interface TopBarProps {
  onMenuClick: () => void
  title?: string
}

export default function TopBar({ onMenuClick, title }: TopBarProps) {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const user = useAppStore(s => s.user)
  const notifications = useAppStore(s => s.notifications)
  const openExpertChat = useAppStore(s => s.openExpertChat)

  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/assistant?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setShowSearch(false)
    }
  }

  const unread = notifications.filter(n => !n.read).length

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 px-4 lg:px-6 py-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100">
            <Menu size={22} />
          </button>

          <div className="flex-1 min-w-0">
            {title ? (
              <div className="lg:hidden">
                <h1 className="font-semibold text-farm-dark truncate">{title}</h1>
                {user?.location && (
                  <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                    <MapPin size={11} />
                    {user.location.district}, {user.location.state}
                  </p>
                )}
              </div>
            ) : null}

            <form onSubmit={handleSearch} className="hidden lg:block max-w-2xl">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-farm-primary focus:ring-2 focus:ring-green-100 text-sm transition-all"
                />
                <button type="button" onClick={() => navigate('/assistant')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-farm-primary">
                  <Mic size={18} />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setShowSearch(!showSearch)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Search size={20} />
            </button>

            <div className="relative">
              <button onClick={() => { setLangOpen(!langOpen); setNotifOpen(false); setSettingsOpen(false) }} className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 text-sm">
                <Globe size={18} />
                <span className="hidden sm:inline text-xs font-medium uppercase">{i18n.language}</span>
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 max-h-80 overflow-y-auto">
                    {languages.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                          i18n.changeLanguage(l.code)
                          try { localStorage.setItem('farmitra-language', l.code) } catch {}
                          setLangOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                          i18n.language === l.code ? 'text-farm-primary font-medium bg-green-50' : 'text-gray-700'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button onClick={() => { setNotifOpen(!notifOpen); setLangOpen(false); setSettingsOpen(false) }} className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell size={20} />
              {unread > 0 && <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
            </button>

            <button onClick={() => { setSettingsOpen(!settingsOpen); setLangOpen(false); setNotifOpen(false) }} className="hidden md:inline-flex p-2 rounded-lg hover:bg-gray-100">
              <span className="text-xs font-medium px-1">Settings</span>
            </button>

            <button onClick={openExpertChat} className="hidden md:inline-flex items-center gap-2 bg-farm-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors ml-1">
              <MessageCircle size={16} /> {t('talk_to_expert')}
            </button>
          </div>
        </div>

        {showSearch && (
          <form onSubmit={handleSearch} className="px-4 pb-3 lg:hidden">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                placeholder={t('search_placeholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:border-farm-primary text-sm"
              />
            </div>
          </form>
        )}
      </header>

      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
