import { Upload, CheckCircle, Clock, AlertTriangle, Award, ShieldCheck } from 'lucide-react'

import { useState } from 'react'

export default function ExpertVerification() {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'under_review' | 'verified' | 'rejected'>('pending')

  const steps = [
    { label: 'Create Account', completed: true },
    { label: 'Upload Degree Certificate', completed: verificationStatus !== 'pending' },
    { label: 'Upload Government ID + Selfie', completed: verificationStatus === 'under_review' || verificationStatus === 'verified' },
    { label: 'Admin Review', completed: verificationStatus === 'verified' },
    { label: 'Get Verified Badge', completed: verificationStatus === 'verified' }
  ]

  return (
    <div className="space-y-4 lg:space-y-6">
      

      <div className="space-y-4 lg:space-y-6">
        {verificationStatus === 'verified' ? (
          <div className="card bg-green-50 border-2 border-green-500 text-center py-8">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 text-white">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-xl font-bold text-green-800">Verification Complete!</h2>
            <p className="text-green-700 mt-2">You are now a Verified Agriculturist</p>
            <span className="inline-flex items-center gap-1 mt-4 bg-green-600 text-white px-4 py-2 rounded-full font-medium">
              <Award size={16} /> Verified Agriculturist
            </span>
          </div>
        ) : (
          <>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-orange-600" />
                <h3 className="font-semibold">Verification Progress</h3>
              </div>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {step.completed ? (
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                    )}
                    <p className={`text-sm ${step.completed ? 'text-green-700 font-medium' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-3">Document Upload</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Degree Certificate (B.Sc/M.Sc/PhD Agriculture)
                  </label>
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-farm-primary">
                    <Upload size={24} className="text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Tap to upload</p>
                    <input type="file" className="hidden" accept="image/*,application/pdf" />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Certificate must be from ICAR/State Agricultural University</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">University Details</label>
                  <input className="input-field" placeholder="University Name" />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input className="input-field" placeholder="Enrollment Number" />
                    <input className="input-field" placeholder="Year of Passing" />
                  </div>
                  <input className="input-field mt-2" placeholder="ICAR/KVK ID (optional)" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Government Photo ID + Selfie (for face match)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-farm-primary">
                      <Upload size={20} className="text-gray-400" />
                      <p className="text-xs text-gray-500 mt-1">Upload ID</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-farm-primary">
                      <Upload size={20} className="text-gray-400" />
                      <p className="text-xs text-gray-500 mt-1">Take Selfie</p>
                      <input type="file" className="hidden" accept="image/*" capture="user" />
                    </label>
                  </div>
                </div>

                <button className="btn-primary w-full" onClick={() => setVerificationStatus('under_review')}>
                  Submit for Review
                </button>

                <p className="text-xs text-gray-500 text-center flex items-start gap-1 justify-center">
                  <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                  Documents are encrypted and stored securely. OCR will automatically verify details against your certificate. Admin review usually takes 24-48 hours.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
