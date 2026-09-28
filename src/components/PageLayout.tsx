import { ReactNode, useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import BottomNav from './BottomNav'
import ExpertChat from './ExpertChat'
import SettingsModal from './SettingsModal'

interface PageLayoutProps {
  title?: string
  children: ReactNode
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenSettings={() => setSettingsOpen(true)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} title={title} />

        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-6">
            {title && (
              <div className="hidden lg:flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-farm-dark">{title}</h1>
                  <p className="text-sm text-gray-500 mt-0.5">AI-powered insights tailored for your farm</p>
                </div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>

      <BottomNav />
      <ExpertChat />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
