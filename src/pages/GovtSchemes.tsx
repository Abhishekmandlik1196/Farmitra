import { Landmark, FileText, Gift, ExternalLink, CheckCircle } from 'lucide-react'
import { mockGovtSchemes } from '../data/mockData'
import { useTranslation } from 'react-i18next'

const schemeDetails: Record<string, { docs: string[]; benefits: string[]; amount: string }> = {
  'PM-KISAN': {
    amount: 'Rs 6,000/year',
    docs: ['Aadhaar Card', 'Land ownership documents (Khasra/Khatuni)', 'Bank account passbook', 'Citizenship certificate'],
    benefits: ['Rs 6,000 per year direct to bank in 3 installments of Rs 2,000 each', 'No eligibility test - all landholding farmers', 'Direct Benefit Transfer (DBT)']
  },
  'PMFBY (Pradhan Mantri Fasal Bima Yojana)': {
    amount: 'Premium: 2% Kharif, 1.5% Rabi',
    docs: ['Aadhaar Card', 'Sowing certificate (Patta)', 'Land records', 'Bank account details', 'Sowing photograph if required'],
    benefits: ['Full crop insurance against natural calamities', 'Low premium rate for farmers', 'Covers yield loss, post-harvest loss, localized calamities']
  },
  'Kisan Credit Card (KCC)': {
    amount: 'Up to Rs 3 lakh at 4% interest',
    docs: ['Aadhaar Card', 'Land records', 'PAN card', 'Bank account', 'Passport size photo'],
    benefits: ['Short-term crop loans at subsidized 4% interest (for prompt repayment)', 'Coverage for crop cultivation, post-harvest, consumption needs', 'ATM-enabled card for easy withdrawal']
  },
  'Soil Health Card Scheme': {
    amount: 'Free of cost',
    docs: ['Aadhaar Card', 'Land details', 'Farm location'],
    benefits: ['Free soil testing once every 2 years', 'Personalized fertilizer recommendations', 'Micronutrient deficiency analysis', 'Improves soil health and reduces cost']
  },
  'PM AASHA': {
    amount: 'MSP + Price Deficiency Support',
    docs: ['Aadhaar Card', 'Land records', 'Sale receipt from mandi', 'Bank account details'],
    benefits: ['Price Support Scheme (PSS) for oilseeds/pulses', 'Price Deficiency Payment Scheme (PDPS) - pays difference if sale price below MSP', 'Private Procurement & Stockist Scheme (PPSS)']
  }
}

export default function GovtSchemes() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="card bg-purple-50 border-l-4 border-purple-500">
        <div className="flex items-start gap-3">
          <Landmark size={22} className="text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-purple-900">Central Government Schemes for Farmers</h3>
            <p className="text-sm text-purple-800 mt-1">All scheme details, document requirements and benefits in one place</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockGovtSchemes.map(scheme => {
          const det = schemeDetails[scheme.name] || { docs: ['Aadhaar Card', 'Land Records', 'Bank Passbook', 'Passport Photo'], benefits: [scheme.description], amount: 'Varies' }
          return (
            <div key={scheme.name} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Landmark size={22} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-farm-dark">{scheme.name}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{scheme.description}</p>
                  <p className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{det.amount}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-semibold text-blue-900 flex items-center gap-1 mb-2"><FileText size={12} /> {t('documents_required')}</p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {det.docs.map(d => (
                      <li key={d} className="flex items-start gap-1"><CheckCircle size={12} className="flex-shrink-0 mt-0.5 text-blue-600" /> {d}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs font-semibold text-green-900 flex items-center gap-1 mb-2"><Gift size={12} /> {t('benefits')}</p>
                  <ul className="text-xs text-green-800 space-y-1">
                    {det.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1"><CheckCircle size={12} className="flex-shrink-0 mt-0.5 text-green-600" /> {b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1">
                  {t('apply')} <ExternalLink size={14} />
                </button>
                <button className="btn-outline text-sm py-2 px-4">Check Status</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
