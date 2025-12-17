'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * BASKETBALL AI ASSISTANT - The MH5 Knowledge Hub
 * ================================================
 * Floating AI chatbot that knows basketball facts
 * Playing off Springfield = Birthplace of Basketball angle
 *
 * Uses Google Gemini API for intelligent responses
 * Focused on basketball history, facts, training tips
 */

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const QUICK_PROMPTS = [
  "Who invented basketball?",
  "Tell me about the Hall of Fame",
  "What's a good crossover move?",
  "MH5's biggest achievement?",
  "Training tips for guards",
  "Best NBA point guards ever",
]

export default function BasketballAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Add greeting when first opened
  useEffect(() => {
    if (isOpen && !hasGreeted && messages.length === 0) {
      setHasGreeted(true)
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: "Hey! I'm the MH5 Basketball AI, powered by the spirit of Springfield - the birthplace of basketball! Ask me anything about hoops, the Hall of Fame, training tips, or Milan Harrison's journey. What's on your mind?",
        timestamp: new Date()
      }])
    }
  }, [isOpen, hasGreeted, messages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/basketball-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || "Sorry, I couldn't process that. Try asking about basketball history, training, or the Hall of Fame!",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Oops! Something went wrong. Let me try again - ask me about basketball!",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--color-primary)] rounded-md shadow-lg shadow-[var(--color-primary)]/30 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.div
              key="ball"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              {/* Basketball Icon */}
              <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="black" opacity="0.3"/>
                <path d="M12 2v20M2 12h20" stroke="black" strokeWidth="0.5" opacity="0.5"/>
                <path d="M4.93 4.93c4.39 4.39 4.39 9.75 0 14.14M19.07 4.93c-4.39 4.39-4.39 9.75 0 14.14" stroke="black" strokeWidth="0.5" opacity="0.5"/>
              </svg>
              {/* AI Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                <span className="text-[8px] text-[var(--color-primary)] font-bold">AI</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-[#111] rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[var(--color-primary)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm">MH5 Basketball AI</h3>
                  <p className="text-[10px] text-gray-400">Powered by Springfield Heritage</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-sm bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-green-400 font-medium">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-[var(--color-primary)] text-black rounded-br-md'
                        : 'bg-white/10 text-white rounded-bl-md'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/40 rounded-sm animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-white/40 rounded-sm animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white/40 rounded-sm animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.slice(0, 4).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleQuickPrompt(prompt)}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[11px] rounded-lg transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about basketball..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)]/50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-[var(--color-primary)] rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-4 py-2 bg-black/30 border-t border-white/5">
              <p className="text-[9px] text-gray-600 text-center">
                From Springfield, MA - Where Basketball Was Born
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
