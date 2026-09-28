import { NavLink } from 'react-router-dom'
import { Home, Cloud, TrendingUp, MessageCircle, Leaf } from 'lucide-react'

export default function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/weather', icon: Cloud, label: 'Weather' },
    { to: '/mandi', icon: TrendingUp, label: 'Mandi' },
    { to: '/assistant', icon: MessageCircle, label: 'Mitr' },
    { to: '/disease', icon: Leaf, label: 'Disease' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center py-1 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 text-[11px] font-medium transition-colors rounded-lg min-w-[60px] ${
                isActive ? 'text-farm-primary bg-green-50' : 'text-gray-500'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2} className="mb-0.5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
