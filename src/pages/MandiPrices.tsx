import { useState } from 'react'
import { MapPin, TrendingUp, TrendingDown, Bell, Star } from 'lucide-react'
import { mockMandiPrices, mockCrops } from '../data/mockData'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const priceTrend = [
  { day: 'Oct 1', price: 2120 },
  { day: 'Oct 7', price: 2150 },
  { day: 'Oct 14', price: 2140 },
  { day: 'Oct 21', price: 2180 },
  { day: 'Oct 28', price: 2200 },
  { day: 'Today', price: 2210 },
]

export default function MandiPrices() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat')

  const filteredPrices = mockMandiPrices.filter(p => p.crop === selectedCrop)
  const msp = filteredPrices[0]?.msp || 0
  const sorted = [...filteredPrices].sort((a, b) => b.modal - a.modal)
  const bestPrice = sorted[0]?.modal || 0

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Crop Selector */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {mockCrops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCrop === crop ? 'bg-farm-primary text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="card bg-gradient-to-br from-green-500 to-green-700 text-white">
          <p className="text-green-100 text-xs">Today's Modal Price</p>
          <p className="text-2xl lg:text-3xl font-bold mt-1">₹{sorted[0]?.modal || 0}</p>
          <p className="text-green-100 text-xs mt-1">per quintal · {sorted[0]?.mandi}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-100">
            <TrendingUp size={14} /> +₹75 from yesterday
          </div>
        </div>
        <div className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <p className="text-blue-100 text-xs">MSP Price</p>
          <p className="text-2xl lg:text-3xl font-bold mt-1">₹{msp}</p>
          <p className="text-blue-100 text-xs mt-1">per quintal (government)</p>
          <div className="mt-2 text-sm text-blue-100">
            {sorted[0]?.modal > msp ? ' Above MSP' : ' Below MSP'}
          </div>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">Day Range</p>
          <p className="text-2xl lg:text-3xl font-bold mt-1 text-farm-dark">
            ₹{Math.min(...filteredPrices.map(p => p.min))}–₹{Math.max(...filteredPrices.map(p => p.max))}
          </p>
          <p className="text-xs text-gray-500 mt-1">Min / Max across mandis</p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">7 Day Forecast</p>
          <p className="text-2xl lg:text-3xl font-bold mt-1 text-orange-600">₹2300</p>
          <p className="text-xs text-green-600 mt-1"> Expected to rise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left: Best mandi + trend */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Best Mandi */}
          <div className="card border-2 border-farm-primary/20 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center gap-2 mb-3">
              <Star size={18} className="text-farm-primary fill-farm-primary" />
              <h3 className="font-semibold text-farm-dark">Best Mandi to Sell Nearby</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-500">Highest Price</p>
                <p className="font-bold text-xl text-green-700">
                  {sorted[0]?.mandi}
                </p>
                <p className="text-sm text-gray-600">
                  ₹{bestPrice}/qtl · {sorted[0]?.distance} km
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-500">Estimated Net Profit</p>
                <p className="font-bold text-xl text-farm-primary">
                  ₹{bestPrice - 2200 - (sorted[0]?.distance || 0) * 2}/qtl
                </p>
                <p className="text-sm text-gray-600">After transport @ ₹2/qtl/km</p>
              </div>
            </div>
          </div>

          {/* Price Trend */}
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-farm-dark">Price Trend (30 days)</h3>
              <div className="flex gap-2">
                <button className="text-xs px-2 py-1 bg-farm-primary text-white rounded">1M</button>
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">3M</button>
                <button className="text-xs px-2 py-1 bg-gray-100 rounded">1Y</button>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={['dataMin - 20', 'dataMax + 20']} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#15803d" strokeWidth={2.5} dot={{ r: 4, fill: '#15803d' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
              <span> AI Forecast: Likely ₹2300 by next week (demand surge expected)</span>
              <button className="text-farm-primary flex items-center gap-1 font-medium hover:gap-2 transition-all">
                <Bell size={14} /> Set Price Alert
              </button>
            </div>
          </div>

          {/* Mandi List */}
          <div className="card">
            <h3 className="font-semibold text-farm-dark mb-3">All Nearby Mandis</h3>
            <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs text-gray-500">
                    <th className="text-left py-2 font-medium">Mandi</th>
                    <th className="text-right py-2 font-medium hidden sm:table-cell">Distance</th>
                    <th className="text-right py-2 font-medium">Min/Max</th>
                    <th className="text-right py-2 font-medium">Modal</th>
                    <th className="text-right py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((price, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-green-50/30">
                      <td className="py-3">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-farm-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{price.mandi}</p>
                            <p className="text-xs text-gray-500">{price.district}, {price.state}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right text-gray-500 hidden sm:table-cell">{price.distance} km</td>
                      <td className="text-right text-gray-600 text-xs">₹{price.min}-{price.max}</td>
                      <td className={`text-right font-bold ${price.modal > msp ? 'text-green-600' : 'text-red-600'}`}>₹{price.modal}</td>
                      <td className="text-right">
                        {price.modal >= priceTrend[priceTrend.length-1].price ? (
                          <TrendingUp size={14} className="inline text-green-600" />
                        ) : (
                          <TrendingDown size={14} className="inline text-red-600" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="card">
          <h3 className="font-semibold text-farm-dark mb-2">All India Price Heatmap</h3>
          <p className="text-xs text-gray-500 mb-2">Green = higher price, Red = lower</p>
          <div className="h-72 lg:h-[500px] w-full rounded-xl overflow-hidden border border-gray-200">
            <MapContainer center={[22.5, 80]} zoom={5} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredPrices.map((mandi, idx) => (
                <Marker
                  key={idx}
                  position={[
                    23 + idx * 0.7,
                    76 + (idx % 3) * 2
                  ]}
                >
                  <Popup>
                    <p className="font-semibold">{mandi.mandi}</p>
                    <p className="text-green-700 font-bold">₹{mandi.modal}/quintal</p>
                    <p className="text-xs text-gray-500">{mandi.district}, {mandi.state} · {mandi.distance}km</p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2">Click markers for details · Price refreshes every 2 hours from Agmarknet</p>
        </div>
      </div>
    </div>
  )
}
