import { useState, useRef, useEffect } from 'react'
import { X, Send, User as UserIcon, Award, Image as ImageIcon } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'

export default function ExpertChat() {
  const { t } = useTranslation()
  const { expertChat, closeExpertChat, sendExpertMessage } = useAppStore()
  const [text, setText] = useState('')
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [expertChat.messages])

  // Simulated expert auto-reply
  useEffect(() => {
    const lastMsg = expertChat.messages[expertChat.messages.length - 1]
    if (lastMsg && lastMsg.from === 'me') {
      const timer = setTimeout(() => {
        useAppStore.setState(state => ({
          expertChat: {
            ...state.expertChat,
            messages: [
              ...state.expertChat.messages,
              {
                id: Date.now() + 1,
                from: 'expert',
                text: 'Namaste! Main aapki samasya samajh gaya hoon. Kripya thodi aur detail dein — fasal ka naam, kitne din se ye problem hai, aur agar photo bheji hai to main uska bhi nirakaran karunga. Jald hi aapko poora treatment plan deta hoon.',
                time: 'now'
              }
            ]
          }
        }))
      }, 2200)
      return () => clearTimeout(timer)
    }
  }, [expertChat.messages.length])

  if (!expertChat.open || !expertChat.expert) return null

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => setPreviewImg(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() && !previewImg) return
    sendExpertMessage(text.trim(), previewImg || undefined)
    setText('')
    setPreviewImg(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[60] lg:bg-transparent" onClick={closeExpertChat} />

      {/* Chat Window */}
      <div className="fixed z-[70] inset-x-0 bottom-0 lg:bottom-auto lg:top-20 lg:right-6 lg:left-auto lg:w-[380px] lg:h-[560px] lg:rounded-2xl bg-white shadow-2xl flex flex-col h-[75vh] lg:h-[560px]">
        {/* Header */}
        <div className="bg-farm-primary text-white p-3 flex items-center gap-3 lg:rounded-t-2xl">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
            <Award size={20} />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-farm-primary"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold flex items-center gap-1 text-sm">
              {expertChat.expert.name}
              <Award size={12} className="text-yellow-300 fill-yellow-300" />
            </p>
            <p className="text-xs text-green-100 truncate">{expertChat.expert.specialty}</p>
          </div>
          <button onClick={closeExpertChat} className="p-1.5 hover:bg-white/20 rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {expertChat.messages.length === 0 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Award size={28} className="text-farm-primary" />
              </div>
              <p className="font-medium text-sm">Dr. Rajesh Patel is online</p>
              <p className="text-xs text-gray-500 mt-1 px-6">
                Apni kheti se judi problem bataein, photo attach karein. Expert aapko turant guide karenge.
              </p>
              <div className="mt-4 space-y-2 text-left">
                {['Wheat me peela pan kyu aa raha hai?', 'Soybean me flower drop ki problem', 'Mujhe konsi fertilizer dalni chahiye?'].map(q => (
                  <button key={q} onClick={() => setText(q)} className="block w-full text-left text-sm p-2 bg-white border border-gray-200 rounded-lg hover:border-farm-primary">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {expertChat.messages.map(m => (
            <div key={m.id} className={`flex gap-2 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              {m.from === 'expert' && <div className="w-7 h-7 rounded-full bg-farm-primary text-white flex items-center justify-center flex-shrink-0"><Award size={14} /></div>}
              <div className={`max-w-[75%] ${m.from === 'me' ? 'order-first' : ''}`}>
                <div className={`px-3 py-2 rounded-2xl text-sm ${
                  m.from === 'me' ? 'bg-farm-primary text-white rounded-tr-sm' : 'bg-white rounded-tl-sm border border-gray-100 shadow-sm'
                }`}>
                  {m.image && <img src={m.image} alt="" className="rounded-lg mb-2 max-w-full" />}
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5 px-1">{m.time}</p>
              </div>
              {m.from === 'me' && <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><UserIcon size={13} className="text-gray-600" /></div>}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Preview */}
        {previewImg && (
          <div className="px-3 py-2 border-t bg-white flex items-center gap-2">
            <img src={previewImg} alt="" className="w-12 h-12 object-cover rounded-lg" />
            <button onClick={() => setPreviewImg(null)} className="text-xs text-red-600">Remove</button>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSend} className="p-2 bg-white border-t flex items-center gap-2">
          <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current?.click()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <ImageIcon size={20} />
          </button>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={t('type_message')}
            className="flex-1 rounded-xl bg-gray-100 border-transparent focus:bg-white focus:border-farm-primary px-3 py-2 text-sm"
          />
          <button type="submit" disabled={!text.trim() && !previewImg} className="p-2 rounded-xl bg-farm-primary text-white disabled:opacity-40">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  )
}
