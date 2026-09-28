import { Leaf, FlaskConical, Sparkles } from 'lucide-react'

import { mockTraditionalPractices } from '../data/mockData'

export default function TraditionalWisdom() {
  return (
    <div className="space-y-4 lg:space-y-6">
      

      <div className="space-y-4 lg:space-y-6">
        <div className="card bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500">
          <div className="flex items-start gap-2">
            <Sparkles size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900">Respecting Bharat's Farming Heritage</h3>
              <p className="text-sm text-orange-800 mt-1">
                Our ancient farming wisdom honed over thousands of years works hand in hand with modern technology for sustainable, profitable farming.
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg">Traditional Practices & Scientific Validation</h3>

        <div className="space-y-4">
          {mockTraditionalPractices.map((practice) => (
            <div key={practice.id} className="card">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Leaf size={18} className="text-orange-700" />
                </div>
                <div>
                  <h4 className="font-bold">{practice.name}</h4>
                  <p className="text-sm text-gray-600 mt-0.5">{practice.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-green-50">
                  <p className="text-xs font-medium text-green-800 flex items-center gap-1">
                    <FlaskConical size={14} /> Scientific Validation
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">{practice.scientific_validation}</p>
                </div>

                <div className="p-2 rounded-lg bg-blue-50">
                  <p className="text-xs font-medium text-blue-800"> Best For</p>
                  <p className="text-xs text-blue-700 mt-0.5">{practice.use_cases}</p>
                </div>

                <div className="p-2 rounded-lg bg-purple-50">
                  <p className="text-xs font-medium text-purple-800"> Tech Enhanced Version</p>
                  <p className="text-xs text-purple-700 mt-0.5">{practice.tech_version}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Festival Calendar */}
        <div className="card">
          <h3 className="font-semibold text-lg mb-3"> Festival & Agricultural Calendar</h3>
          <div className="space-y-2">
            {[
              { festival: 'Baisakhi', date: 'April 13', significance: 'Harvest festival of Punjab, marks Rabi harvest' },
              { festival: 'Pongal', date: 'January 14-17', significance: 'Tamil harvest festival, thanksgiving to Sun, nature and cattle' },
              { festival: 'Onam', date: 'Aug/Sep', significance: 'Kerala harvest festival, marks rice harvest' },
              { festival: 'Hareli', date: 'July/August', significance: 'Chhattisgarh/Madhya Pradesh festival marking beginning of Shravan, worship of farm tools' },
              { festival: 'Nuakhai', date: 'Aug/Sep', significance: 'Odisha festival celebrating new rice harvest' },
            ].map((f) => (
              <div key={f.festival} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="text-center w-14">
                  <p className="text-xs text-orange-600 font-medium">{f.date}</p>
                </div>
                <div>
                  <p className="font-medium text-sm">{f.festival}</p>
                  <p className="text-xs text-gray-600">{f.significance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
