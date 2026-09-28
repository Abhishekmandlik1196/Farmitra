import { Droplets, Wind, Thermometer, CloudRain, Navigation, Gauge, Bell, MessageCircle } from 'lucide-react'
import { mockWeather } from '../data/mockData'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function Weather() {
  const { current, hourly, daily, alerts } = mockWeather

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Current Weather - 2 cols on large */}
        <div className="lg:col-span-2 card bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 text-white p-6 lg:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute right-6 top-6 text-7xl lg:text-9xl opacity-20">{current.icon}</div>
          <div className="relative">
            <p className="text-blue-100 text-sm">Guna, Madhya Pradesh</p>
            <div className="flex items-baseline gap-3 mt-2">
              <p className="text-5xl lg:text-7xl font-light">{current.temp}°</p>
              <div>
                <p className="text-lg font-medium">Feels like {current.feels_like}°C</p>
                <p className="text-blue-100">{current.condition}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                <Droplets size={18} className="text-blue-100" />
                <p className="text-xs text-blue-100 mt-1">Humidity</p>
                <p className="text-xl font-semibold">{current.humidity}%</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                <Wind size={18} className="text-blue-100" />
                <p className="text-xs text-blue-100 mt-1">Wind Speed</p>
                <p className="text-xl font-semibold">{current.wind_speed} km/h</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                <CloudRain size={18} className="text-blue-100" />
                <p className="text-xs text-blue-100 mt-1">Rain Probability</p>
                <p className="text-xl font-semibold">{current.rainfall_prob}%</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3">
                <Thermometer size={18} className="text-blue-100" />
                <p className="text-xs text-blue-100 mt-1">Soil Temp</p>
                <p className="text-xl font-semibold">{current.soil_temp}°C</p>
              </div>
            </div>

            <button className="mt-5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl py-2.5 px-4 text-sm flex items-center gap-2 transition-colors">
              <Navigation size={16} /> Detect location / Change village
            </button>
          </div>
        </div>

        {/* Farming Advisories */}
        <div className="card">
          <h3 className="font-semibold text-farm-dark mb-3 flex items-center gap-2">
            <Gauge size={18} className="text-farm-primary" /> Today's Farm Advisory
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-green-50 border border-green-100">
              <p className="text-xs text-green-800 font-medium">Sowing Window</p>
              <p className="font-bold text-green-900 mt-0.5">Optimal </p>
              <p className="text-xs text-green-700 mt-0.5">Good moisture expected Wed-Fri</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-800 font-medium">Spraying Window</p>
              <p className="font-bold text-red-900 mt-0.5">Not Recommended </p>
              <p className="text-xs text-red-700 mt-0.5">Rain expected today & Saturday</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-800 font-medium">Irrigation Need</p>
              <p className="font-bold text-blue-900 mt-0.5">Low </p>
              <p className="text-xs text-blue-700 mt-0.5">Rainfall will water crops</p>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-100">
              <p className="text-xs text-yellow-800 font-medium">Pest Risk</p>
              <p className="font-bold text-yellow-900 mt-0.5">Medium </p>
              <p className="text-xs text-yellow-700 mt-0.5">Check for aphids on mustard</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly + Daily */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="card lg:col-span-1">
          <h3 className="font-semibold text-farm-dark mb-3">Hourly Forecast</h3>
          <div className="flex lg:grid lg:grid-cols-2 gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {hourly.map((hour) => (
              <div key={hour.time} className="flex-shrink-0 lg:w-auto text-center p-3 rounded-xl bg-gray-50">
                <p className="text-xs text-gray-600 font-medium">{hour.time}</p>
                <p className="text-2xl my-1">{hour.icon}</p>
                <p className="font-bold text-lg">{hour.temp}°</p>
                <p className="text-xs text-blue-600 mt-0.5"> {hour.rain}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-farm-dark mb-3">7 Day Forecast</h3>

          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={daily}>
                <defs>
                  <linearGradient id="highTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="lowTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[20, 40]} />
                <Tooltip />
                <Area type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} fill="url(#highTemp)" />
                <Area type="monotone" dataKey="low" stroke="#0284c7" strokeWidth={2} fill="url(#lowTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="divide-y divide-gray-100">
            {daily.map((day) => (
              <div key={day.day} className="flex items-center justify-between py-2.5">
                <p className="font-medium w-20">{day.day}</p>
                <span className="text-2xl w-10 text-center">{day.icon}</span>
                <p className="text-sm text-gray-600 flex-1 ml-2 truncate hidden sm:block">{day.condition}</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-blue-600 w-10 text-right">{day.low}°</span>
                  <div className="w-16 h-1.5 rounded-full bg-gray-200 overflow-hidden hidden sm:block">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-yellow-400 to-orange-500" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-orange-600 font-semibold w-10">{day.high}°</span>
                  <span className="text-blue-500 text-xs hidden md:inline w-10">{day.rain}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card">
        <h3 className="font-semibold text-farm-dark mb-3">Farming Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border-l-4 ${
                alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                'bg-blue-50 border-blue-500'
              }`}
            >
              <p className="font-medium">{alert.title}</p>
              <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <button className="text-xs bg-farm-primary text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <Bell size={12} /> Enable Alert
                </button>
                <button className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <MessageCircle size={12} /> SMS/WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
