import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Mail, Lock, Award, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/useAppStore'

type Mode = 'farmer' | 'expert'

export default function Login() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const setUser = useAppStore(s => s.setUser)
  const [mode, setMode] = useState<Mode>('farmer')
  const [step, setStep] = useState<'cred' | 'otp'>('cred')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'farmer' ? phone.length === 10 : email.includes('@') && password.length >= 4) {
      setStep('otp')
    }
  }

  const verifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 6) {
      setUser({
        id: mode === 'farmer' ? 'demo-farmer-1' : 'demo-expert-1',
        phone: mode === 'farmer' ? `+91${phone}` : undefined,
        email: mode === 'expert' ? email : undefined,
        role: mode,
        language: i18n.language || 'en',
        location: { lat: 24.65, lng: 77.31, district: 'Guna', state: 'Madhya Pradesh' },
        verified: mode === 'expert'
      })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left brand panel - desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-farm-primary via-green-700 to-emerald-900 p-12 flex-col justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-3xl">🌾</span>
          </div>
          <div>
            <p className="font-bold text-2xl">{t('app_name')}</p>
            <p className="text-green-200 text-sm">{t('tagline')}</p>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Kheti ko banaye<br/>smart aur labhdayak
          </h2>
          <p className="text-green-100 max-w-md">
            Hyperlocal weather, live mandi prices, AI disease diagnosis, and expert advice — all in one app, in your language.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { num: '50L+', label: 'Farmers' },
              { num: '12', label: 'Languages' },
              { num: '5000+', label: 'Verified Experts' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-bold">{s.num}</p>
                <p className="text-green-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-green-200 text-sm">Made in India, for India's Annadatas</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center p-6 lg:p-12 max-w-md lg:max-w-lg mx-auto w-full">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-farm-primary rounded-xl flex items-center justify-center">
            <span className="text-2xl">🌾</span>
          </div>
          <p className="font-bold text-xl text-farm-dark">{t('app_name')}</p>
        </div>

        {/* Role toggle */}
        <div className="bg-gray-100 p-1 rounded-xl flex gap-1 mb-6">
          <button
            onClick={() => { setMode('farmer'); setStep('cred') }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              mode === 'farmer' ? 'bg-white shadow-sm text-farm-dark' : 'text-gray-600'
            }`}>
            <span className="text-base leading-none">🌾</span> {t('farmer_login')}
          </button>
          <button
            onClick={() => { setMode('expert'); setStep('cred') }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              mode === 'expert' ? 'bg-white shadow-sm text-farm-dark' : 'text-gray-600'
            }`}>
            <Award size={16} /> {t('expert_login')}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-farm-dark mb-1">{t('login')}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {mode === 'farmer' ? 'Login with your phone number' : 'Expert portal - email + password + OTP'}
        </p>

        {step === 'cred' ? (
          <form onSubmit={sendOtp} className="space-y-4">
            {mode === 'farmer' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone_number')}</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">+91</span>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="9876543210" className="flex-1 input-field rounded-l-none" inputMode="numeric" />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-600"><Mail size={16} /></span>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="expert@university.ac.in" className="flex-1 input-field rounded-l-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-600"><Lock size={16} /></span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="flex-1 input-field rounded-l-none" />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={mode === 'farmer' ? phone.length !== 10 : !email.includes('@') || password.length < 4}>
              {t('otp_send')} <ArrowRight size={18} />
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              By continuing you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div className="p-3 bg-green-50 rounded-xl text-sm text-green-800 flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>OTP sent to {mode === 'farmer' ? `+91 ${phone}` : email} (Demo: any 6 digits)</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('enter_otp')}</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" className="input-field text-center text-xl tracking-[0.5em]" inputMode="numeric" />
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={otp.length !== 6}>
              <ShieldCheck size={18} /> {t('verify_otp')}
            </button>
            <button type="button" onClick={() => setStep('cred')} className="text-sm text-farm-primary text-center w-full">Change details</button>
          </form>
        )}
      </div>
    </div>
  )
}
