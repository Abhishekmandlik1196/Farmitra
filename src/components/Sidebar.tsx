import { NavLink, useLocation } from 'react-router-dom'
import {
  Home, Cloud, TrendingUp, MessageCircle, Leaf, Map, BookOpen,
  Landmark, Calendar, Award, User, ChevronRight, Settings as SettingsIcon, LogOut
} from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  open: boolean
  onClose: () => void
  onOpenSettings: () => void
}

export default function Sidebar({ open, onClose, onOpenSettings }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = useAppStore(s => s.user)
  const logout = useAppStore(s => s.logout)
  const openExpertChat = useAppStore(s => s.openExpertChat)

  const navItems = [
    { to: '/', icon: Home, label: t('dashboard') },
    { to: '/weather', icon: Cloud, label: t('weather_intel') },
    { to: '/mandi', icon: TrendingUp, label: t('mandi_prices') },
    { to: '/assistant', icon: MessageCircle, label: 'Kisan Mitra AI' },
    { to: '/disease', icon: Leaf, label: t('disease') },
    { to: '/soil', icon: Map, label: t('soil') },
    { to: '/traditional', icon: BookOpen, label: t('traditional') },
    { to: '/schemes', icon: Landmark, label: t('govt_schemes') },
    { to: '/calendar', icon: Calendar, label: t('crop_calendar') },
    { to: '/expert', icon: Award, label: t('expert_hub') },
  ]

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/language')
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 z-50 flex flex-col transform transition-transform duration-300 lg:transform-none ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-farm-primary to-green-700 flex items-center justify-center shadow-md">
              <span className="text-2xl">🌾</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-farm-dark leading-tight">{t('app_name')}</h1>
              <p className="text-xs text-gray-500">{t('tagline')}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-farm-primary flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-farm-dark truncate">{user?.name || 'Farmer'}</p>
                <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                  <Map size={11} />
                  {user?.location ? `${user.location.district}, ${user.location.state}` : t('welcome')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto pb-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Farming Tools
          </p>
          <div className="space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.to
              return (
                <NavLink key={item.to} to={item.to} onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-farm-primary text-white shadow-sm shadow-green-200' : 'text-gray-700 hover:bg-gray-100'
                  }`}>
                  <item.icon size={19} className="flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={16} />}
                </NavLink>
              )
            })}
          </div>

          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">
            Connect
          </p>
          <button onClick={() => { openExpertChat(); onClose() }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-farm-primary bg-green-50 hover:bg-green-100">
            <Award size={19} />
            <span className="flex-1 text-left">{t('talk_to_expert')}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </button>
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <NavLink to="/profile" onClick={onClose} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-farm-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <User size={19} /> {t('my_profile')}
          </NavLink>
          <button onClick={() => { onOpenSettings(); onClose() }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 w-full">
            <SettingsIcon size={19} /> {t('settings')}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full">
            <LogOut size={19} /> {t('logout')}
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-2">v1.0 · Made for Annadatas</p>
        </div>
      </aside>
    </>
  )
}
