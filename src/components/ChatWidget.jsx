import { useState } from "react";
import { apiChat } from "@/api/mainApi";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([{
        role: 'ai',
        text: 'Welcome to the Hideaway Traveller, How can I assist you?'
    }])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim()) return
        const userMsg = { role: 'user', text: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            const res = await apiChat(input)
            setMessages(prev => [...prev, { role: 'ai', text: res.data.answer }])
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', text: 'The Archivist is currently ... unresponsive' }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-80 h-96 bg-[#1a1a1a] border border-white/10 shadow-2xl
      flex flex-col">
                    {/* Header */}
                    <div className="bg-accent p-4 text-black font-black text-[10px]
      tracking-[0.2em] uppercase flex justify-between">
                        <span>The Archivist</span>
                        <button onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m, i) => (
                            <div key={i} className={`text-xs ${m.role === 'user' ?
                                'text-right text-accent' : 'text-neutral'}`}>
                                <span className="opacity-50 text-[8px] block">{m.role ===
                                    'user' ? 'GUEST' : 'ARCHIVIST'}</span>
                                {m.text}
                            </div>
                        ))}
                        {loading && <div className="text-neutral text-xs italic
      opacity-50">Thinking...</div>}
                    </div>

                    {/* Input Area */}
                    <div className="p-2 border-t border-white/5 flex gap-2">
                        <input
                            className="flex-1 bg-black text-white p-2 text-xs outline-none
      focus:border-accent border border-white/10"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                        />
                        <button onClick={handleSend} className="text-accent text-xs
      font-bold px-2 hover:text-white">SEND</button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-12 h-12 bg-accent rounded-full shadow-lg flex
      items-center justify-center font-black text-black hover:scale-105 transition-transform"
                >
                    ?
                </button>
            )}
        </div>

    )
}

export default ChatWidget