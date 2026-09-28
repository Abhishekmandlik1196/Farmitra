import { MapPin, Bell, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  const user = useAppStore((state) => state.user)

  return (
    <header className="sticky top-0 z-40 bg-farm-primary text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <div>
            <h1 className="font-semibold text-base leading-tight">{title}</h1>
            {user?.location ? (
              <p className="text-xs text-green-100 leading-tight">
                {user.location.district}, {user.location.state}
              </p>
            ) : (
              <p className="text-xs text-green-100 leading-tight">Select your location</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-1.5 hover:bg-green-700 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Link to="/profile" className="p-1.5 hover:bg-green-700 rounded-lg">
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  )
}
