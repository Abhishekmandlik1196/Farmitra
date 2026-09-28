import { useNavigate } from 'react-router-dom'
import { User, MapPin, Bell, Globe, Award, FileText, LogOut, ChevronRight, HelpCircle, Edit3, Leaf, Heart, Settings as SettingsIcon, Headphones } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const user = useAppStore(s => s.user)
  const logout = useAppStore(s => s.logout)

  const handleLogout = () => { logout(); navigate('/language') }

  const menuSections = [
    {
      title: 'My Farm',
      items: [
        { icon: MapPin, label: 'My Farms & Location', desc: 'Manage your farm details', action: () => { navigate('/soil') } },
        { icon: FileText, label: 'My Soil Health Cards', desc: 'View saved soil reports', action: () => { navigate('/soil') } },
        { icon: Leaf, label: 'My Crops', desc: 'Track your sown crops', action: () => { navigate('/calendar') } },
      ]
    },
    {
      title: 'Alerts & Preferences',
      items: [
        { icon: Bell, label: 'Alert Preferences', desc: 'SMS / WhatsApp / Voice alerts', action: () => alert('Settings opens language/notifications from top bar') },
        { icon: Globe, label: t('language_setting'), desc: i18n.language === 'hi' ? 'हिन्दी' : 'English', action: () => alert('Change language from the globe icon in the top bar') },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: Edit3, label: 'Edit Profile', desc: 'Name, photo, phone number', action: () => alert('Edit profile form') },
        { icon: Award, label: 'Become Verified Expert', desc: 'Join expert network', action: () => navigate('/expert') },
        { icon: Heart, label: 'Saved Advisories', desc: 'Your bookmarked tips', action: () => {} },
      ]
    },
    {
      title: 'Help & Support',
      items: [
        { icon: Headphones, label: 'Call Helpline', desc: 'Toll free: 1800-180-1551', action: () => window.open('tel:18001801551') },
        { icon: HelpCircle, label: 'Help Center', desc: 'FAQs and tutorials', action: () => {} },
        { icon: SettingsIcon, label: t('settings'), desc: 'All settings', action: () => {} },
      ]
    }
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="card bg-gradient-to-r from-farm-primary to-green-700 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
            <User size={36} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-2xl">Farmer</p>
            <p className="text-green-100 text-sm">+91 {user?.phone?.slice(3) || 'XXXXXX0000'}</p>
            <p className="text-green-100 text-xs mt-1 flex items-center gap-1">
              <MapPin size={12} /> {user?.location?.district}, {user?.location?.state}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-green-100">My Farms</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-green-100">Saved Tips</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs text-green-100">Queries</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-2.5 text-sm font-medium">Edit Profile</button>
          <button onClick={() => navigate('/soil')} className="flex-1 bg-farm-secondary text-farm-dark hover:bg-yellow-400 rounded-xl py-2.5 text-sm font-medium">Add Farm Details</button>
        </div>
      </div>

      <div className="card border border-dashed border-farm-primary bg-green-50">
        <div className="flex items-start gap-3">
          <Award size={26} className="text-farm-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Are you an Agricultural Expert?</p>
            <p className="text-sm text-gray-600 mt-1">Join our verified expert network - answer queries, publish advisories</p>
            <button onClick={() => navigate('/expert')} className="btn-outline mt-3 text-sm py-2">Apply for Verification <ChevronRight size={14} className="inline" /></button>
          </div>
        </div>
      </div>

      {menuSections.map(section => (
        <div key={section.title} className="card p-0 overflow-hidden">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{section.title}</p>
          {section.items.map((item, idx) => (
            <button key={idx} onClick={item.action} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 border-t border-gray-50 text-left">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <item.icon size={20} className="text-farm-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          ))}
        </div>
      ))}

      <button onClick={handleLogout} className="w-full card flex items-center justify-center gap-2 text-red-600 font-medium hover:bg-red-50">
        <LogOut size={18} /> {t('logout')}
      </button>

      <p className="text-center text-xs text-gray-400 pb-2">Farmitra v1.0 · Made for Bharat's Annadatas</p>
    </div>
  )
}
