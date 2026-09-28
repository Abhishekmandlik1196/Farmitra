import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n/config'

export type UserRole = 'farmer' | 'expert' | 'admin' | null

export interface User {
  id: string
  name?: string
  phone?: string
  email?: string
  role: UserRole
  language: string
  location?: {
    lat: number
    lng: number
    district: string
    state: string
    village?: string
  }
  verified?: boolean
}

export interface Notification {
  id: number
  type: 'alert' | 'message' | 'price' | 'weather'
  title: string
  message: string
  time: string
  read: boolean
}

export interface ChatMessage {
  id: number
  from: 'me' | 'expert'
  text: string
  time: string
  image?: string
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  notifications: Notification[]
  expertChat: {
    open: boolean
    expert: { id: string; name: string; specialty: string } | null
    messages: ChatMessage[]
  }
  setUser: (user: User | null) => void
  setLanguage: (lang: string) => void
  setLocation: (location: User['location']) => void
  markNotificationRead: (id: number) => void
  clearAllNotifications: () => void
  sendExpertMessage: (text: string, image?: string) => void
  openExpertChat: () => void
  closeExpertChat: () => void
  logout: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      notifications: [
        { id: 1, type: 'weather', title: 'Heavy Rain Expected', message: 'Saturday 3PM to Sunday 8AM. Delay pesticide spraying.', time: '2h ago', read: false },
        { id: 2, type: 'price', title: 'Wheat Price Up', message: 'Wheat reached ₹2210/qtl in Guna Mandi, your target is near.', time: '5h ago', read: false },
        { id: 3, type: 'alert', title: 'Pest Warning', message: 'Aphid risk on mustard high due to humidity. Monitor fields.', time: '1d ago', read: false },
      ],
      expertChat: { open: false, expert: null, messages: [] },

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setLanguage: (lang) => {
        i18n.changeLanguage(lang)
        set((state) => ({ user: state.user ? { ...state.user, language: lang } : null }))
      },

      setLocation: (location) => set((state) => ({
        user: state.user ? { ...state.user, location } : null
      })),

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),

      clearAllNotifications: () => set({ notifications: [] }),

      openExpertChat: () => set({
        expertChat: {
          open: true,
          expert: { id: 'dr-rajesh', name: 'Dr. Rajesh Patel', specialty: 'Agronomist · JNKVV Jabalpur' },
          messages: []
        }
      }),

      closeExpertChat: () => set(state => ({ expertChat: { ...state.expertChat, open: false } })),

      sendExpertMessage: (text, image) => set((state) => ({
        expertChat: {
          ...state.expertChat,
          messages: [
            ...state.expertChat.messages,
            { id: Date.now(), from: 'me', text, time: 'now', image }
          ]
        }
      })),

      logout: () => set({ user: null, isAuthenticated: false })
    }),
    {
      name: 'farmitra-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.user?.language) i18n.changeLanguage(state.user.language)
      }
    }
  )
)
