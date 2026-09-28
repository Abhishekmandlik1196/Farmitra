import { X, Cloud, TrendingUp, AlertTriangle, Bell as BellIcon, CheckCheck } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  onClose: () => void
}

const iconForType = (type: string) => {
  switch (type) {
    case 'weather': return <Cloud size={18} className="text-blue-600" />
    case 'price': return <TrendingUp size={18} className="text-green-600" />
    case 'message': return <BellIcon size={18} className="text-purple-600" />
    default: return <AlertTriangle size={18} className="text-yellow-600" />
  }
}

const bgForType = (type: string) => {
  switch (type) {
    case 'weather': return 'bg-blue-50'
    case 'price': return 'bg-green-50'
    case 'message': return 'bg-purple-50'
    default: return 'bg-yellow-50'
  }
}

export default function NotificationsPanel({ open, onClose }: Props) {
  const { t } = useTranslation()
  const { notifications, markNotificationRead, clearAllNotifications } = useAppStore()

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60]" onClick={onClose} />
      <div className="fixed top-[60px] lg:top-[70px] right-2 lg:right-6 w-[calc(100%-16px)] sm:w-96 bg-white rounded-2xl shadow-2xl z-[70] max-h-[70vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h3 className="font-bold text-farm-dark flex items-center gap-2">
              <BellIcon size={18} className="text-farm-primary" /> {t('notifications')}
            </h3>
            <p className="text-xs text-gray-500">{notifications.filter(n => !n.read).length} unread</p>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button onClick={clearAllNotifications} className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1">
                <CheckCheck size={14} /> Clear all
              </button>
            )}
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <BellIcon size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">{t('no_notifications')}</p>
            </div>
          ) : (
            notifications.map(n => (
              <button
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`w-full text-left p-3 rounded-xl ${bgForType(n.type)} flex gap-3 ${!n.read ? 'border-l-4 border-farm-primary' : ''}`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  {iconForType(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!n.read ? 'text-farm-dark' : 'text-gray-600'}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 bg-farm-primary rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  )
}
