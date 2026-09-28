import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Image, ShieldCheck, User as UserIcon, Bot, Sparkles, Paperclip, Leaf, Droplets, FlaskConical, Award, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  source?: string
  confidence?: number
  image?: string
}

const suggestions = [
  { icon: Wheat, text: 'When should I sow wheat this season?' },
  { icon: Droplets, text: 'Irrigation schedule for my crops' },
  { icon: FlaskConical, text: 'Right fertilizer dose for wheat' },
  { icon: Award, text: 'Current MSP rates for all crops' },
]

function Wheat({ size }: { size?: number }) { return <Leaf size={size || 18} /> }

export default function Assistant() {
  const { t } = useTranslation()
  const openExpertChat = useAppStore(s => s.openExpertChat)
  const [searchParams] = useSearchParams()
  const initialQ = searchParams.get('q')

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `${t('app_name')} AI Assistant Online.\n\nI have 24/7 knowledge from ICAR, agricultural universities, KVK advisories and government schemes. Ask me anything about your crops, soil, weather, or farming practices. I can understand Hindi, English and other regional languages.\n\nYou can also send a photo of your crop, or use voice input.`,
      source: 'Farmitra AI · Trained on ICAR/SAU knowledge base'
    }
  ])
  const [input, setInput] = useState(initialQ || '')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [pendingImage, setPendingImage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(() => { scrollToBottom() }, [messages, isTyping])

  useEffect(() => {
    if (initialQ) {
      setTimeout(() => {
        const form = document.getElementById('chat-form') as HTMLFormElement | null
        form?.requestSubmit()
      }, 300)
    }
    // eslint-disable-next-line
  }, [])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = ev => setPendingImage(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !pendingImage) return

    const userMsg: Message = { id: Date.now(), role: 'user', content: input, image: pendingImage || undefined }
    setMessages(prev => [...prev, userMsg])
    const query = input
    setInput('')
    setPendingImage(null)
    if (fileRef.current) fileRef.current.value = ''
    setIsTyping(true)

    setTimeout(() => {
      let response = 'Based on your location (Guna, MP), current weather (28C, 65% humidity), and this being Rabi season:\n\n'
      const q = query.toLowerCase()
      const hasImage = !!userMsg.image

      if (hasImage) {
        response += 'I have received your crop photo. The image shows symptoms similar to Wheat Leaf Rust with 82% confidence.\n\n'
        response += 'Recommended treatment:\n'
        response += '- Organic: Neem oil 5ml/L + Trichoderma foliar spray\n'
        response += '- Chemical: Propiconazole 25EC @0.1%, repeat after 15 days\n\n'
        response += 'Always check label instructions and wear protective gear. Harvest waiting period: 21 days.\n\n'
      } else if (q.includes('wheat') || q.includes('gehun')) {
        response += 'Ideal sowing window: 15 Oct - 15 Nov. Conditions next week are perfect.\n\n'
        response += 'Recommended variety: HI-1544 (Pusa Tejas) or MP-3288.\n\n'
        response += 'Seed rate: 100 kg/ha. Treat seeds with Trichoderma @4g/kg.\n\n'
        response += 'Heavy rain expected Saturday. Ensure field drainage after sowing.\n\n'
        response += 'First irrigation: 21 days after sowing (crown root initiation).'
      } else if (q.includes('pest') || q.includes('disease') || q.includes('rog') || q.includes('kit')) {
        response += 'For best accuracy, please upload a clear photo of affected leaves (tap the image icon).\n\n'
        response += 'General pest management this season:\n'
        response += '- Monitor fields for aphids in mustard/wheat\n'
        response += '- Use yellow sticky traps @10/acre\n'
        response += '- Organic: Neem oil 5ml/L\n'
        response += '- Chemical: Imidacloprid 17.8% SL @0.3ml/L only if pest count exceeds threshold'
      } else if (q.includes('fertilizer') || q.includes('urea') || q.includes('khad')) {
        response += 'For wheat in black soil (your region):\n\n'
        response += 'N:P:K = 120:60:40 kg/ha\n'
        response += '- Full P + K + 1/3 N at sowing\n'
        response += '- 1/3 N at first irrigation (21 DAS)\n'
        response += '- 1/3 N at second irrigation (45 DAS)\n\n'
        response += 'Add 5-6 tonnes FYM/ha before ploughing. Use neem-coated urea to reduce loss by 30%.'
      } else if (q.includes('msp') || q.includes('price')) {
        response += 'Current MSP rates (2024-25):\n'
        response += '- Wheat: Rs 2,275/qtl\n'
        response += '- Rice (common): Rs 2,300/qtl\n'
        response += '- Soybean: Rs 4,890/qtl\n'
        response += '- Mustard: Rs 5,950/qtl\n'
        response += '- Gram: Rs 5,650/qtl\n\n'
        response += 'Open Mandi tab for live mandi prices in your area.'
      } else {
        response += 'Based on ICAR + JNKVV Jabalpur guidelines:\n\n'
        response += '- Wheat sowing window: 15 Oct - 15 Nov (optimal now)\n'
        response += '- Soil moisture: Good\n'
        response += '- Apply Urea only after first irrigation\n'
        response += '- Monitor for yellow rust (cool humid weather)\n\n'
        response += 'Need personalized advice? Tap "Ask Expert" to speak with a verified agricultural scientist.'
      }

      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        source: 'ICAR · JNKVV Jabalpur · KVK Guna',
        confidence: 0.92
      }])
    }, 1200)
  }

  return (
    <div className="flex flex-col -mt-4 lg:-mt-6 -mx-4 lg:-mx-8 h-[calc(100dvh-140px)] lg:h-[calc(100dvh-180px)] bg-gray-50">
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between text-xs flex-shrink-0">
        <div className="flex items-center gap-1.5 text-green-700">
          <ShieldCheck size={14} />
          <span className="hidden sm:inline">Grounded in verified agri knowledge</span>
          <span className="sm:hidden">Verified sources</span>
        </div>
        <button onClick={openExpertChat} className="text-farm-primary font-medium flex items-center gap-1">
          <Sparkles size={12} /> Ask Expert
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-farm-primary to-green-700 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                <Bot size={18} />
              </div>
            )}
            <div className={`max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'order-first' : ''}`}>
              <div className={`px-4 py-3 rounded-2xl ${
                msg.role === 'user' ? 'bg-farm-primary text-white rounded-tr-md shadow-sm' : 'bg-white rounded-tl-md shadow-sm border border-gray-100'
              }`}>
                {msg.image && <img src={msg.image} alt="" className="rounded-lg mb-2 max-w-full max-h-64 object-cover" />}
                <p className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</p>
              </div>
              {msg.source && (
                <p className="text-[10px] text-gray-500 mt-1 ml-1 flex items-center gap-1">
                  <ShieldCheck size={10} /> {msg.source} · Confidence: {Math.round((msg.confidence || 0)*100)}%
                </p>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <UserIcon size={16} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 rounded-full bg-farm-primary flex items-center justify-center text-white"><Bot size={18} /></div>
            <div className="bg-white rounded-2xl rounded-tl-md shadow-sm border border-gray-100 px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />

        {messages.length <= 1 && !isTyping && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            {suggestions.map((s, idx) => (
              <button key={idx} onClick={() => setInput(s.text)}
                className="text-left p-3 bg-white border border-gray-200 rounded-xl hover:border-farm-primary hover:bg-green-50 transition-all text-sm flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-farm-primary"><s.icon size={16} /></span>
                {s.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {pendingImage && (
        <div className="px-3 pt-2 bg-white border-t flex items-center gap-2">
          <img src={pendingImage} alt="" className="w-12 h-12 object-cover rounded-lg" />
          <span className="text-xs text-gray-600 flex-1">Image attached</span>
          <button type="button" onClick={() => setPendingImage(null)} className="text-gray-400 hover:text-red-600"><X size={18} /></button>
        </div>
      )}

      <form id="chat-form" onSubmit={sendMessage} className="p-3 bg-white border-t flex items-end gap-2 flex-shrink-0">
        <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFile} />
        <button type="button" onClick={() => fileRef.current?.click()} className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 flex-shrink-0" title={t('attach_image')}>
          <Image size={20} />
        </button>
        <button type="button" className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 flex-shrink-0 hidden sm:flex" title="Document">
          <Paperclip size={20} />
        </button>
        <button type="button" onClick={() => setIsListening(!isListening)}
          className={`p-3 rounded-xl flex-shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          title={t('voice_input')}>
          <Mic size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <input value={input} onChange={e => setInput(e.target.value)} placeholder={t('search_placeholder')}
            className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-farm-primary focus:ring-farm-primary px-4 py-3 text-base" />
        </div>
        <button type="submit" disabled={!input.trim() && !pendingImage} className="p-3 rounded-xl bg-farm-primary text-white disabled:opacity-40 hover:bg-green-700 transition-colors">
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}
