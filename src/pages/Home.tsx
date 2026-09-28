import { Link } from 'react-router-dom'
import {
  Cloud, TrendingUp, MessageCircle, Map, BookOpen, Landmark, Sprout,
  Droplets, Bug, Calendar, Award, ArrowRight, Activity, Wheat, Zap, Wind,
  AlertTriangle, Flower, Apple, CircleDot, CloudRain
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { mockWeather, mockGovtSchemes } from '../data/mockData'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

const quickActions = [
  { to: '/weather', icon: Cloud, color: 'from-blue-400 to-blue-600', label: 'Weather Alerts', desc: 'Forecasts' },
  { to: '/mandi', icon: TrendingUp, color: 'from-yellow-400 to-orange-500', label: 'Mandi Prices', desc: 'Live rates' },
  { to: '/assistant', icon: MessageCircle, color: 'from-green-400 to-green-600', label: 'Kisan Mitra AI', desc: 'Ask anything' },
  { to: '/disease', icon: Bug, color: 'from-red-400 to-red-600', label: 'Detect Disease', desc: 'Photo scan' },
  { to: '/soil', icon: Map, color: 'from-amber-500 to-amber-700', label: 'Soil Hub', desc: 'Health card' },
  { to: '/traditional', icon: BookOpen, color: 'from-orange-400 to-orange-600', label: 'Traditional Wisdom', desc: 'Desi methods' },
  { to: '/schemes', icon: Landmark, color: 'from-purple-400 to-purple-600', label: 'Govt Schemes', desc: 'Benefits' },
  { to: '/calendar', icon: Calendar, color: 'from-teal-400 to-teal-600', label: 'Crop Calendar', desc: 'Kharif/Rabi' },
]

const tempData = [{ t: 24 }, { t: 26 }, { t: 28 }, { t: 31 }, { t: 33 }, { t: 32 }, { t: 29 }, { t: 27 }]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Top stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link to="/weather" className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white relative overflow-hidden md:col-span-2 group hover:shadow-lg transition-shadow">
          <div className="absolute -right-4 -top-4 text-8xl opacity-20 group-hover:scale-110 transition-transform">
            <Cloud size={120} className="text-white/40" />
          </div>
          <div className="relative">
            <p className="text-blue-100 text-sm">{t('current_weather')}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl lg:text-5xl font-bold">{mockWeather.current.temp}°C</span>
              <span className="text-blue-100">{mockWeather.current.condition}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-blue-100">
              <span className="flex items-center gap-1"><Droplets size={14} /> {mockWeather.current.humidity}% {t('humidity')}</span>
              <span className="flex items-center gap-1"><Wind size={14} /> {mockWeather.current.wind_speed} km/h</span>
              <span className="flex items-center gap-1"><CloudRain size={14} /> {mockWeather.current.rainfall_prob}% rain</span>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-red-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                <Zap size={12} /> Rain Saturday
              </span>
              <span className="inline-flex items-center gap-1 bg-green-400/90 text-green-900 text-xs font-medium px-2.5 py-1 rounded-full">
                <Sprout size={12} /> Good sowing window Wed-Fri
              </span>
            </div>
            <div className="h-12 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tempData}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.4}/>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="t" stroke="#ffffff" strokeWidth={2} fill="url(#tempGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Link>

        <Link to="/mandi" className="card group hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">+2.4%</span>
          </div>
          <p className="text-xs text-gray-500 mt-3">Wheat Modal Price</p>
          <p className="text-2xl font-bold text-farm-dark">Rs 2,210<span className="text-sm font-normal text-gray-500">/qtl</span></p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs text-gray-500"><span>Soybean</span><span className="font-medium text-red-600">Rs 4,450 down</span></div>
            <div className="flex justify-between text-xs text-gray-500"><span>Mustard</span><span className="font-medium text-green-600">Rs 5,650 up</span></div>
          </div>
          <p className="text-xs text-farm-primary mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">View all mandis <ArrowRight size={12} /></p>
        </Link>

        <Link to="/assistant" className="card bg-gradient-to-br from-green-500 to-emerald-700 text-white group hover:shadow-lg transition-shadow relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform">
            <MessageCircle size={100} />
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center"><MessageCircle size={20} /></div>
            <p className="text-sm text-green-100 mt-3">Ask Kisan Mitra</p>
            <p className="font-bold text-lg leading-tight">Your AI farming<br/>expert 24x7</p>
            <p className="text-xs text-green-100 mt-2 flex items-center gap-1">Type, voice, or photo <ArrowRight size={12} /></p>
          </div>
        </Link>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-lg text-farm-dark flex items-center gap-2">
            <Activity size={20} className="text-farm-primary" /> Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {quickActions.map(action => (
            <Link key={action.to} to={action.to} className="group">
              <div className={`w-full aspect-square bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all`}>
                <action.icon size={24} strokeWidth={2} />
              </div>
              <p className="text-xs text-center mt-1.5 font-medium text-farm-dark leading-tight">{action.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <section className="lg:col-span-2 space-y-3">
          <h2 className="font-semibold text-lg text-farm-dark flex items-center gap-2">
            <Zap size={20} className="text-red-500" /> Active Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockWeather.alerts.map(alert => (
              <div key={alert.id} className={`card border-l-4 ${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                    alert.severity === 'high' ? 'bg-red-100' : alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }">
                    {alert.severity === 'high' ? <AlertTriangle size={18} className="text-red-600" /> :
                     alert.severity === 'medium' ? <Bug size={18} className="text-yellow-600" /> :
                     <Cloud size={18} className="text-blue-600" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{alert.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{alert.message}</p>
                    <button className="text-xs bg-farm-primary text-white px-3 py-1.5 rounded-lg mt-2 hover:bg-green-700">Enable Alert</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-farm-dark flex items-center gap-1.5">
                <Wheat size={18} className="text-farm-primary" /> Today's Mandi Prices
              </h2>
              <Link to="/mandi" className="text-sm text-farm-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">See all <ArrowRight size={14} /></Link>
            </div>
            <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500">
                    <th className="text-left py-2 font-medium">Crop</th>
                    <th className="text-right py-2 font-medium">Modal</th>
                    <th className="text-right py-2 font-medium hidden sm:table-cell">Min/Max</th>
                    <th className="text-right py-2 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { crop: 'Wheat', icon: Wheat, price: 2200, min: 2100, max: 2300, change: '+75', up: true },
                    { crop: 'Soybean', icon: Sprout, price: 4450, min: 4200, max: 4600, change: '-150', up: false },
                    { crop: 'Mustard', icon: Flower, price: 5650, min: 5400, max: 5800, change: '+120', up: true },
                    { crop: 'Tomato', icon: Apple, price: 1400, min: 800, max: 2200, change: '+200', up: true },
                    { crop: 'Onion', icon: CircleDot, price: 2100, min: 1500, max: 2800, change: '-50', up: false },
                  ].map(item => (
                    <tr key={item.crop} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2.5">
                        <span className="mr-2"><item.icon size={16} className="inline text-farm-primary" /></span>
                        <span className="font-medium">{item.crop}</span>
                      </td>
                      <td className="text-right font-semibold">Rs {item.price.toLocaleString()}</td>
                      <td className="text-right text-gray-500 hidden sm:table-cell">Rs {item.min}–Rs {item.max}</td>
                      <td className={`text-right font-medium ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                        {item.up ? '▲' : '▼'} {item.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="space-y-4">
          <Link to="/expert" className="card block bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-farm-secondary to-orange-400 flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-yellow-900" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-farm-dark">{t('talk_to_expert')}</p>
                <p className="text-sm text-gray-600 mt-0.5">Get advice from agricultural scientists</p>
                <span className="inline-block mt-2 text-sm text-farm-primary font-medium flex items-center gap-1">
                  Connect now <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-3">
              <Sprout size={24} className="text-farm-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-farm-dark text-sm">Tip of the Day</p>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  Treat wheat seeds with <strong>Trichoderma viride @4g/kg</strong> before sowing to prevent root rot. Sowing depth: 4-6 cm for optimal germination.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-farm-dark mb-3 flex items-center gap-2">
              <Landmark size={18} className="text-purple-600" /> Schemes for You
            </h3>
            <div className="space-y-2">
              {mockGovtSchemes.slice(0, 3).map(scheme => (
                <Link to="/schemes" key={scheme.name} className="block p-2 rounded-lg hover:bg-gray-50 -mx-2 px-2">
                  <p className="font-medium text-sm">{scheme.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{scheme.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// End
